# features

a list of what annealogy does today, and how each piece works at a high level.

## structured explanations

every concept is rendered in the same five-part structure: analogy, mapping, visual, real explanation, limits. the structure is enforced by the backend tool-calling schema, not by prompt instructions alone, so the model cannot return a free-form paragraph even if it tries.

how it works:
- the explain edge function calls the lovable ai gateway with a function-calling tool whose parameters define every required field.
- the response is parsed as structured json before reaching the client.
- the ui renders each section into its own collapsible card.

## strict analogy system library

ten allowed systems, defined once in `src/features/analogy/systems.ts`:

- relationship dynamics
- gaming and progression
- cooking and recipes
- building and lego
- story and fandom
- company and startup
- traffic and flow
- plant and growth
- brain and habit loops
- storage and organization

the model cannot invent new systems. the api validates the requested system against the allowlist before calling the gateway.

## thinking-style onboarding

on first visit the user picks how their brain naturally understands things. that pick maps to a default analogy system, which is preselected on every new explanation. the user can always switch.

stored in localStorage under `annealogy.preferences.v1`. no account required.

## per-explanation system switching

on the explanation screen the user can swap analogy systems with one click. swapping triggers a fresh request, so the explanation is regenerated end-to-end through the new system. the url stays in sync so any state is shareable.

## explain again differently

a single button on the explanation screen re-fires the request with the same system, asking the model for a different angle. useful when the first analogy did not land.

## curated demo library

a set of hand-written explanations ships with the app. they appear on the home screen so a brand-new user has something to read before typing anything. they also serve as a quality bar for what an explanation should look like.

how it works:
- defined in `src/features/analogy/curated.ts` as plain typescript.
- the explanation screen detects `?curated=id` and loads from the library with no network call.

## visual diagrams via mermaid

the visual section renders mermaid diagrams. the model is asked to return a small graph or flow, kept under nine nodes for readability. mermaid is themed to match the warm-paper palette so the diagram does not look like a separate widget glued onto the page.

## local recents

the last twelve explanations are cached in localStorage under `annealogy.recents.v1`. they show on the home screen and can be reopened instantly without hitting the gateway again. revisits are deterministic because the full explanation payload is cached, not just the prompt.

## shareable urls

every explanation lives at a url that contains the concept and the system. opening the url on a fresh device regenerates the same explanation through the same system.
