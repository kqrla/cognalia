# analogize

a cognitive translation tool. you give it a concept you do not understand, and it explains that concept using the mental models you already use to make sense of the world.

it is not a tutor. it is not a flashcard app. it does not hand you a definition. it translates.

## what it is

ask it about any concept and it renders the idea in a strict structure:

1. **analogy** — a vivid pass entirely inside a world you already navigate fluently. no jargon allowed.
2. **mapping** — explicit pairs: this piece of the analogy world is this real technical term.
3. **visual** — a systems diagram of how the thing actually works, drawn with analogy-specific labels.
4. **bridge** — one sentence that walks you across: "in other words, ...".
5. **real explanation** — the actual concept in proper terms, now that you have a place to stand.
6. **limits** — the honest part: exactly where the analogy breaks. every model of a thing fails somewhere; knowing where is the skill.

the structure is enforced by the backend tool-calling schema, not by prompt instructions alone. the model cannot return a free-form paragraph even if it tries.

## the core idea

the feynman technique says: if you cannot explain something simply, you do not really understand it. analogize adds the preparation step the feynman technique leaves out.

> before you can explain something simply, you need a simple place to stand.

you are not simplifying from above. you are translating across. a concept you can only access through jargon is a concept you do not own.

## analogy systems

twelve allowed systems, defined once and validated server-side against an allowlist. the model cannot invent new ones:

building lego, cooking recipes, storage organization, traffic flow, relationship dynamics, gaming progression, story narrative, company startup, sports team strategy, film production, social media, music playlists.

on first visit you pick how your brain naturally understands things, and that maps to your default system. you can switch per explanation, and you can reframe the same concept through a fresh lens that is forbidden from paraphrasing the previous one.

you can also teach it your own references: personal presets are offered to the model as soft guidance, used only when they genuinely improve the analogy.

## what else is in here

- **subjects catalog** — domains and the analogy angles we like to take in each
- **understanding graph** — concepts tangle instead of sitting in folders; explore your knowledge structure
- **curated examples** — a demo library so the product shows its shape before you type anything
- **cloud sync (optional)** — accounts are opt-in; the app works fully offline-first from localStorage

## running it

the project is intentionally portable: a vite single-page app on the front, deno edge functions on the back. see `port.md` for local setup and deployment, `portsb.md` for the cloud-sync migration path.

you need a gemini api key (free from [google ai studio](https://aistudio.google.com)) as `GEMINI_API_KEY` for the edge functions. models used: `gemini-3.1-pro-preview` for explanations, `gemini-2.5-flash` for clarifications and periphery, `gemini-2.5-flash-lite` for disambiguation.

## branch map

this repository hosts two projects on separate branches:

- **`analogize`** (this branch) — the explanation engine described above.
- **`main`** — cognalia, the live-call expansion: hop on a voice call, the agent explains by sketching on a shared whiteboard. analogize is the engine cognalia teaches with; cognalia is where the engine goes live.
- **`canvas`** — the cognalia canvas spec: the persistent, take-home whiteboard system.
