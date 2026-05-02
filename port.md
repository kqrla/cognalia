# port

how to run annealogy locally and how to deploy it elsewhere. the project is intentionally portable: a vite single-page app on the front, a single deno edge function on the back, and a thin contract between them.

## prerequisites

- node 18 or newer, or bun 1.0 or newer.
- the deno cli, only if you want to run the edge function locally.
- a lovable ai gateway api key, exposed as `LOVABLE_API_KEY`. in lovable cloud this is provided automatically.

## installation

```
bun install
```

or, if you prefer npm:

```
npm install
```

## environment

the project reads three variables from `.env`. lovable cloud writes this file for you. if you are running outside lovable, create `.env` with:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-ref>
```

the edge function additionally needs `LOVABLE_API_KEY` set in its runtime environment. inside lovable cloud this is automatic.

## development server

```
bun run dev
```

opens the app on `http://localhost:5173`. hot reload is on. typescript errors surface in the browser overlay.

## running the edge function locally

if you have the supabase cli installed:

```
supabase functions serve explain --no-verify-jwt
```

set `LOVABLE_API_KEY` in your shell before running. point the client at the local function by overriding `VITE_SUPABASE_URL` to your local supabase instance.

## build

```
bun run build
```

produces a static bundle in `dist/`. the bundle has no server dependency: it can be served from any static host.

## deploy

### the frontend

deploy `dist/` to any static host. examples:

- netlify: `netlify deploy --dir=dist --prod`
- vercel: `vercel --prod` from the project root
- cloudflare pages: connect the repo, set build command to `bun run build` and output directory to `dist`
- github pages: push `dist/` to the `gh-pages` branch
- s3 plus cloudfront: sync `dist/` to the bucket and invalidate the distribution

make sure the host serves `index.html` for unknown paths so client-side routing works (for example `/explain` should fall back to `index.html`).

### the edge function

option a, on lovable cloud or supabase: `supabase functions deploy explain` from the project root. set `LOVABLE_API_KEY` as a function secret.

option b, anywhere else: the function is a single `serve()` handler with no supabase-specific imports. it can be ported to:

- deno deploy: copy `supabase/functions/explain/index.ts`, expose `LOVABLE_API_KEY` as an env var.
- a node server: rewrite the `serve(...)` wrapper as an express or hono handler. the rest of the file is plain fetch calls.
- a cloudflare worker: drop in the `fetch` handler shape, set the env binding, replace `Deno.env.get` with `env.LOVABLE_API_KEY`.

the client only cares that the function lives at `<VITE_SUPABASE_URL>/functions/v1/explain` and accepts a json body with `concept`, `system`, and optional `thinkingStyle`.

## smoke test after deploy

1. open the deployed url. the home screen should load with the curated examples visible.
2. complete onboarding by picking a thinking style.
3. type "binary search" and submit. an explanation should arrive in a few seconds with all five sections present and a mermaid diagram in the visual section.
4. switch the analogy system using a chip. a fresh explanation should regenerate.

if the explanation never arrives, check the function logs. the most common issues are a missing `LOVABLE_API_KEY` and a misconfigured cors header on a custom host.
