
create table public.shared_explanations (
  id uuid primary key default gen_random_uuid(),
  concept text not null,
  system text not null,
  explanation jsonb not null,
  domain text,
  created_at timestamptz not null default now()
);

alter table public.shared_explanations enable row level security;

create policy "anyone can read shared explanations"
  on public.shared_explanations for select
  using (true);

create policy "anyone can publish a shared explanation"
  on public.shared_explanations for insert
  with check (true);

create index shared_explanations_created_at_idx on public.shared_explanations (created_at desc);
