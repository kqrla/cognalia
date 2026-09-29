# architecture: the call layer

cognalia's call layer is the real-time delivery system around the analogize engine. this document is the spec for what gets built on this branch.

## layers

```
┌─────────────────────────────────────────────┐
│                  call layer                 │
│  voice (live) + shared canvas + chat panel  │
└──────────┬──────────────────────┬───────────┘
           │ explanation requests │ canvas objects
           ▼                      ▼
   ┌──────────────┐       ┌──────────────┐
   │   analogize  │       │    canvas    │
   │   (engine)   │       │  (branch)    │
   └──────────────┘       └──────────────┘
```

## voice

live, low-latency conversation. the agent narrates explanations the way a person would on a zoom call: the hook, the walk-through, the "here's where this stops being true."

- turn-taking: natural interruptions allowed. mid-sentence, mid-sketch, whenever
- the agent's narration follows the analogize contract, section by section, but spoken, not dumped

## live sketching

the agent draws on the canvas *while it speaks*, like a teacher at a whiteboard:

- rough.js-style hatching doodles: hand-drawn lines, sketchiness that reads as alive, not clip-art
- chart.js diagrams (rough-styled) for systems visuals: they stay interactive, not static
- a handwritten font for on-canvas labels and notes
- sketches are drawn stroke by stroke in sync with the narration, not rendered all at once

## shared control

the canvas is bidirectional. this is not screen sharing:

- the user can take the pen mid-call: draw, type, annotate, circle what doesn't land
- the agent treats user marks as input: "you circled the spice rack, let me go back to that"
- both parties can move, edit, or restructure anything on the board. ownership is negotiated by context, not enforced by system role

## chat panel

text runs alongside the call, always:

- questions can be typed while the agent talks; it works them in at natural pauses
- attachments (links, images, pdfs) dropped mid-call are ingested live and can change the explanation or appear on the canvas
- nothing requires ending the call. the call, the chat, and the canvas are one session

## sync rules

- voice, chat, and canvas are one synchronized session: anything sent in one shows in the others as it happens
- canvas actions during a call are just canvas operations with a session id. the canvas layer never knows a call is happening
- if the call drops, the canvas keeps its state; rejoin resumes

## explicit non-goals (for now)

- no recording/transcription features until the core loop is solid
- no multi-party calls (user + agent only for v1)
- no agent-authored persistence beyond the canvas: the canvas is the artifact
