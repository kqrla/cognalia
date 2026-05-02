# under the hood

how annealogy is structured internally, and why the structure is the way it is.

## guiding principle

the product is a strict format. the code mirrors that. anything that defines the format lives in one place, so changing the format never means hunting through ten files.

## folder layout

```
src/
  features/
    analogy/                  everything about the explanation engine
      systems.ts              the strict analogy system library + thinking styles
      types.ts                the explanation contract shared with the edge function
      curated.ts              the curated demo library
      store.ts                localStorage-backed preferences and recents
      api.ts                  thin client over the explain edge function
      components/
        ExplanationView.tsx   renders the five mandatory sections
        SystemChip.tsx        single chip for an analogy system
        SystemSelector.tsx    chip group for picking a system
        MermaidDiagram.tsx    safe mermaid renderer
  pages/
    Home.tsx                  input, system selector, recents, curated library
    Explain.tsx               the explanation screen
    Onboarding.tsx            thinking-style picker
    NotFound.tsx
  components/ui/              shadcn primitives (untouched)
  integrations/supabase/      auto-generated cloud client and types
supabase/
  functions/explain/index.ts  the edge function backing every fresh explanation
  config.toml                 verify_jwt = false on the explain function
```

the folder structure is by feature, not by file type. all explanation code sits in one place because every change to the format touches several of those files at once.

## data flow

a request for a fresh explanation:

1. user types a concept on the home screen and submits.
2. the home screen navigates to `/explain?q=...&system=...`.
3. the explain page mounts, sees no cached payload, calls `requestExplanation`.
4. `requestExplanation` invokes the `explain` edge function via the supabase client.
5. the edge function validates the system against the allowlist, then calls the lovable ai gateway with a function-calling tool whose schema is the explanation contract.
6. the gateway returns structured arguments, the function parses them, and responds with `{ explanation }`.
7. the explain page renders the five sections, then writes the explanation into `recents` so the next visit is instant.

a request for a curated or recent explanation skips steps 3 to 6. it loads from local data and renders immediately.

## key abstractions

### the explanation contract

the `Explanation` type in `features/analogy/types.ts` is the single source of truth for what an explanation contains. the same shape is mirrored as the json schema of the edge function tool call. if these two ever drift, the model will return data the ui cannot render. they are kept side-by-side on purpose.

### the analogy system library

`analogySystems` in `features/analogy/systems.ts` is the only list of allowed systems. it is consumed by the ui, the store, and (by id) the edge function. adding a new system is a three-step change: this file, the matching color token in `index.css`, and the `allowedSystems` array in the edge function.

### the store

a tiny localStorage layer with a manual subscription pattern. we did not pull in a state library because there are exactly two slices (preferences and recents) and they only need to sync across a handful of components. the store is intentionally synchronous so the home page never flickers.

### the explanation view

renders the five sections in the correct order, with the analogy section tinted by the chosen system color. the sections are collapsible but default to expanded, because hiding a section breaks the format guarantee on first read.

## why these decisions

### structured output via tool calling, not json mode

the model is much more reliable at filling a function signature than at returning free-form json that matches a schema. tool calling also lets the gateway enforce required fields server-side, which means the client never has to defend against missing keys.

### localStorage for v1, supabase for later

the spec asked for a portable backend. shipping localStorage now means the app works offline and has zero auth friction, while `portsb.md` describes exactly how to graduate to cloud-backed storage when sync is needed.

### mermaid instead of a custom svg renderer

mermaid produces clean, structured diagrams from a tiny string. asking the model for mermaid keeps the visual section deterministic and lets us re-theme everything via mermaid's css variables instead of writing layout code. the tradeoff is that occasional invalid syntax has to be caught and shown gracefully, which `MermaidDiagram` already handles.

### one accent color, ten system tints

the brand has exactly one strong color (a dusty rose) used for primary actions. each analogy system has its own soft tint, used only as a background hint on chips and the analogy card. this keeps the ui calm while still giving every system its own identity.

### the limits section is not optional

most explanation tools quietly omit the "where the analogy breaks" part. annealogy makes it a required section in the schema. the model literally cannot return a valid response without it. this is the most important product decision in the codebase.
