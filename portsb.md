# portsb

a concrete migration guide for moving annealogy onto lovable cloud (or any standalone supabase project) for cross-device sync, accounts, and shared explanations. v1 ships with localStorage-only persistence; this document is the path off of that.

this guide is actionable. follow it top to bottom and you will end up with a multi-device version of the app.

## current backend dependencies

annealogy v1 uses two backend pieces:

| dependency | purpose | current implementation |
|---|---|---|
| explain edge function | structured ai explanations | already on lovable cloud, deployed at `/functions/v1/explain` |
| client-side persistence | thinking style + recent explanations | `localStorage` keys `annealogy.preferences.v1` and `annealogy.recents.v1` |

migration only touches the second row. the edge function is already cloud-native.

## target architecture

| concern | from | to |
|---|---|---|
| auth | none | supabase auth (email plus password, optional google) |
| user profile | none | `profiles` table keyed by `auth.uid()` |
| preferences | localStorage | `user_preferences` table |
| recents | localStorage | `user_recents` table |
| explain function | unchanged | unchanged, but optionally protected behind `verify_jwt = true` |

## step 1: enable authentication

in lovable cloud, turn on email plus password sign-in. optionally enable google. annealogy is a low-friction product; do not enable email confirmation in development.

acceptance: a user can sign up and sign in via the lovable cloud auth ui or via `supabase.auth.signInWithPassword`.

## step 2: define the schema

run this as a single migration. all tables have row-level security and policies that scope data to the owning user.

```sql
-- profiles. created on first login via a trigger so we never depend on the
-- client to insert it. roles are deliberately not stored here; if roles
-- become a feature, create a separate user_roles table per the security guide.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "owners can update their profile"
  on public.profiles for update
  using (auth.uid() = id);

-- user_preferences. one row per user. matches the Preferences type in
-- src/features/analogy/store.ts plus the user id.
create table public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  thinking_style_id text,
  default_system text,
  onboarded boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "owners can read their preferences"
  on public.user_preferences for select using (auth.uid() = user_id);

create policy "owners can upsert their preferences"
  on public.user_preferences for insert with check (auth.uid() = user_id);

create policy "owners can update their preferences"
  on public.user_preferences for update using (auth.uid() = user_id);

-- user_recents. mirrors the RecentConcept type. explanation is stored as
-- jsonb because the shape is enforced by the edge function, not the db.
create table public.user_recents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  concept text not null,
  system text not null,
  source text not null check (source in ('ai', 'curated')),
  explanation jsonb not null,
  created_at timestamptz not null default now()
);

create index user_recents_user_id_created_at_idx
  on public.user_recents (user_id, created_at desc);

alter table public.user_recents enable row level security;

create policy "owners can read their recents"
  on public.user_recents for select using (auth.uid() = user_id);

create policy "owners can insert their recents"
  on public.user_recents for insert with check (auth.uid() = user_id);

create policy "owners can delete their recents"
  on public.user_recents for delete using (auth.uid() = user_id);

-- auto-create a profile row on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  insert into public.user_preferences (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

## step 3: replace the store

`src/features/analogy/store.ts` is the only client file that talks to localStorage. swap its readers and writers for supabase calls, behind the same hook signatures so no consumer needs to change.

minimum change set:

- `usePreferences` reads from `user_preferences` for the current user, returns the default preferences if no session.
- `updatePreferences` upserts the row.
- `useRecents` selects the latest twelve rows ordered by `created_at desc`.
- `addRecent` inserts a row and trims to twelve via either an after-insert trigger or a periodic cleanup.

a sketch:

```ts
const { data: prefRow } = await supabase
  .from("user_preferences")
  .select("*")
  .eq("user_id", user.id)
  .maybeSingle();
```

keep the localStorage path as a fallback for unauthenticated visitors so the app still works without an account.

## step 4: one-time merge on first login

when a user logs in for the first time on a device that has localStorage data, copy it into the cloud:

1. read both localStorage keys.
2. upsert preferences if the cloud row is empty.
3. insert recents that are not already present (dedupe by concept + system).
4. clear the localStorage keys to avoid future drift.

this should run inside an auth state change listener, gated by a `merged` flag in localStorage so it only happens once per device.

## step 5: protect the explain function (optional)

if you want to bill ai usage per user, set `verify_jwt = true` in `supabase/config.toml` for `[functions.explain]` and pass the user jwt with each call. `supabase.functions.invoke` already does this when a session is present.

if the function stays public, add a per-ip rate limit using a small `rate_limits` table or an external limiter. the function already returns a 429-shaped error, which the client surfaces as a toast.

## limitations and differences

- realtime: not used in v1. if cross-tab sync of recents matters, enable realtime on `user_recents` and subscribe in `useRecents`.
- offline: the localStorage version works fully offline. the cloud version requires a network round trip on cold start. if offline is a goal, layer a service worker over the supabase client and replay writes when reconnected.
- shareable urls: the v1 url already encodes the concept and system, which keeps explanations shareable across users without any cloud changes. shared explanations do not require auth.
- no migration of curated concepts. they ship in the bundle and stay there. moving them to a database would only make sense if non-developers needed to edit them.
- model output schema. the edge function is unchanged. if you swap models, retest tool calling carefully; not every model is equally reliable at strict structured output.
