# the cognalia canvas

a persistent, infinite, figma-like whiteboard that belongs to the user. it is not a feature of the call. the call is a feature of it.

the core inversion: most video-call whiteboards die when the call ends. in cognalia, the canvas exists first, out-of-call, organized and revisitable. when you hop on a call, it opens a canvas. when the call ends, that canvas is still yours.

## data model

the canvas is **sections and items**, not graph edges:

- **item**: the atomic unit. text, sketch strokes, a mermaid/chart diagram, an image, an annotation. an item belongs to exactly one section (the canvas root is a section)
- **section**: a container that holds items and other sections. sections nest arbitrarily deep
- **canvas**: the root document. the thing a call opens and a user revisits

sections are first-class, not visual grouping. this is what makes collapse meaningful: a collapsed section isn't a zoom trick, it's a structural summary that still shows its title and presence.

## the figma-like interaction model

- multiselect any items, group them into a new section in one action
- collapse a section: its contents fold away, the section keeps its title and a quiet presence on the board
- expand only what you're working on. the board stays readable as it grows
- move a section: everything inside moves with it, nested sections included
- reorganize freely: drag an item or a whole section into another section at any depth

## out-of-call organization

canvases are organized into **folders and subfolders**, browsable on the main canvas page anytime, no call required:

- started a topic today, closed the call, came back tomorrow? open the same canvas and continue, even from a brand-new call
- intentionally starting a new project? open a fresh canvas in its own folder
- same study topic, different subtopics? nested sections and subfolders are built for exactly that

## canvases and calls

- each call opens a canvas. default: continue the canvas you last used for this topic. explicit choice: open any existing canvas, or start a new one
- during a call, the canvas is the shared surface: the agent sketches (rough.js hatching doodles, interactive chart.js diagrams, handwritten-font labels), the user can take the pen at any time
- everything that happens on the canvas in-call is just canvas operations with a session id attached. no special "call mode" data model. the canvas layer never knows a call exists
- when the call ends, nothing is torn down. the canvas keeps its state, its structure, and its history

## sync

- voice, chat, and canvas are one synchronized session. drop a link in chat mid-call and it can appear on the canvas; circle something on the canvas and the agent reads it aloud
- canvas edits sync in real time for both parties, bidirectionally, without either side "presenting"
- if the call drops, the canvas is unaffected; rejoin and continue

## why sections and not the understanding graph

the analogize branch has an understanding graph (concepts tangle; nothing sits in folders). the canvas deliberately does not reuse it:

- the graph answers "how do concepts relate across everything i know" (traversal, weights, the shape of knowledge)
- the canvas answers "how do i organize my working notes on this topic" (structure, containment, focus)

a tangled graph is for thinking across topics. sections are for working within one. both can exist; they are not the same data model, and forcing them together would ruin both.

## status

spec phase. the canvas system is developed on this branch, decoupled from but in parallel with the call layer on `main`. the shared contract: the call layer may only touch the canvas through canvas operations, nothing more.
