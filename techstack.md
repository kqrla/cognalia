# tech stack

the technologies annealogy is built on, and why each one was chosen over the obvious alternatives.

## frontend

### react 18 with vite 5

react gives us the component model the ui needs (collapsible sections, chip groups, dynamic system switching). vite gives us instant dev startup and a tiny production bundle. we are not using a framework like next or remix because annealogy has no server-rendered pages and no need for file-based routing beyond three screens.

### typescript 5

the explanation contract is defined as a typescript type and mirrored as a json schema in the edge function. typescript catches drift between the two before it becomes a runtime bug. it also makes refactoring the analogy system library safe, since adding or removing a system surfaces every usage at compile time.

### react router 6

three routes, no nested layouts, no data loaders needed. react router is the smallest viable option that supports url-based state, which we rely on for shareable explanations.

### tailwind css 3 with a token-driven design system

every color, shadow, font, and analogy-system tint lives in `index.css` as an hsl token. tailwind consumes those tokens via `tailwind.config.ts`. components never hardcode colors. this means a theme change is one file, not a hundred, and the dark mode is essentially free.

we use the typography plugin to keep prose blocks readable inside cards.

### shadcn/ui primitives

we use a small subset (sonner toast, tooltip) for behavior we do not want to write ourselves. everything visual on the explanation and home screens is built from scratch on top of design tokens, so the app does not look like every other shadcn project.

### lucide icons

one icon set, tree-shaken, consistent stroke weight. matches the soft-minimal aesthetic without bringing in a heavy icon library.

### mermaid

the visual section asks the model to return a mermaid graph. mermaid renders it to inline svg with our themed colors. the tradeoff is occasional invalid syntax, which the renderer handles gracefully. the upside is a clean structured diagram in a tiny string, no layout engine to maintain.

### react-markdown

available for any prose surface that needs markdown later. currently most copy is rendered as plain text because the model is asked for short, structured fields rather than long markdown blocks.

## backend

### lovable cloud

provides the database, authentication primitives, and edge function runtime without an external account. we use it almost entirely for the edge function host.

### the explain edge function

a single deno serverless function that:
- validates the requested analogy system against the allowlist.
- calls the lovable ai gateway with a function-calling tool whose parameters are the explanation contract.
- parses the structured response and returns it.
- maps gateway 429 and 402 statuses to user-readable error messages.

it has `verify_jwt = false` because the app does not require login. the function does not store anything; persistence is the client's job for now.

### lovable ai gateway

we use the gateway instead of calling a model provider directly so the api key stays on the server, the model can be swapped without redeploying the client, and rate-limit and credit errors come back in a uniform shape.

default model is `google/gemini-3-flash-preview`. it is fast enough for a single-shot structured response and reliable at function calling.

## storage

### localStorage for preferences and recents

simple, synchronous, and works offline. `annealogy.preferences.v1` holds the thinking-style choice. `annealogy.recents.v1` holds up to twelve full explanations so revisits are instant.

we deliberately did not start with a database. nothing in v1 needs cross-device sync, and adding auth before it is needed would have added friction without unlocking a feature. `portsb.md` describes the exact migration path when sync becomes a goal.

## tradeoffs we accepted

- no streaming. the explanation comes back as a single structured payload because partial structured output is hard to render coherently. the latency cost is small for a five-section response.
- no account system in v1. that means no cross-device history. the upside is zero onboarding friction.
- mermaid is a runtime dependency. it adds weight to the bundle, but writing a custom diagram renderer would have been weeks of work for a marginal gain.
- the analogy library is hardcoded. adding a new system requires a code change. this is intentional. the product depends on the library being curated, not user-generated.
