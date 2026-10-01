# cognalia canvas

the persistent, infinite, figma-like whiteboard that belongs to the user. this branch is the canvas spec and the canvas system as it gets built.

**read the spec: [`docs/canvas.md`](./docs/canvas.md)**

chart items now have a standalone chart.js renderer foundation, including community venn/euler support. see [chart rendering](./docs/charts.md) for setup, the data contract, and limitations. this is not yet a running collaborative whiteboard.

wandery visual aids now include imported atlas content, attributed perspective lenses, and a source-backed crimea/sevastopol geometry comparison. see [wandery visual aids](./docs/atlas.md). this is a standalone module and demo, not yet wired into live calls.

the canvas is not a feature of the call. the call is a feature of it. canvases exist out-of-call, organized into folders, revisitable anytime. each call opens one; when the call ends, the canvas is still yours.

for the call layer itself, see the `main` branch. for the teaching engine, see the `analogize` branch.

---

below is the general cognalia readme, kept here for context.

analogize (the explanation engine) answers "what does this concept mean, in my world?". cognalia is where the engine goes live: a voice call with a shared canvas, where the explanation unfolds in front of you, drawn, narrated, and editable while it happens.

## what a call looks like

- you join a call the way you'd join a zoom: one click, you're talking
- the agent explains a concept the analogize way, but live: it sketches the analogy world on the canvas as it speaks (hatching-style doodles, not clip art), then the mapping, then the systems diagram
- you can take the pen at any moment. circle the part that isn't landing, draw your own version, annotate the agent's sketch. the agent reads your marks and adjusts
- a chat panel runs alongside the call. drop a link, an image, a pdf, a question mid-call. the agent ingests it in real time, no need to hang up
- when the call ends, the canvas doesn't. it's yours to keep, revisit, and continue in the next call

## the canvas

the canvas is a persistent, infinite, figma-like whiteboard organized into collapsible sections. it lives outside the call as a first-class artifact, and each call opens one. it is built on this repository, decoupled from but synchronized with the call layer. full spec: [`docs/canvas.md`](./docs/canvas.md), also pinned on the `canvas` branch.

## how cognalia relates to analogize

cognalia depends on analogize as its teaching engine. everything about *what* the agent teaches and *how* it teaches comes from the analogize branch:

- the strict explanation contract: analogy → mapping → visual → bridge → real explanation → limits, including the mandatory "where this breaks" honesty section
- the twelve analogy systems and the user's chosen thinking style
- the refusal to hand over a definition first: you earn the definition through the translation
- the feynman-extension philosophy: build the learner a place to stand, not a summary

nothing about that pedagogy is duplicated here. cognalia is the delivery layer: voice, canvas, chat, and the real-time glue between them. if you want to understand what the agent says, read the `analogize` branch. if you want to understand how it gets said aloud and drawn live, you're in the right place.

## architecture at a glance

the call system and the canvas system are developed **in parallel but decoupled**:

| layer | owns | branch |
|---|---|---|
| analogize engine | explanation contract, analogy systems, teaching rules | `analogize` |
| canvas | persistent whiteboard, sections, folders, sync | `canvas` |
| call | voice, live sketching, chat panel, real-time session glue | `main` (here) |

the contract between them is deliberately thin: the call layer produces explanation requests the analogize engine answers, and renders those answers as canvas objects. the canvas layer never needs to know a call exists; the call layer treats the canvas as a shared document it can write to.

## status

cognalia is in the architecture phase. this branch holds the project definition and specs; code lands here as the call layer is built. the canvas spec lives on the `canvas` branch (mirror of `docs/canvas.md` here).
