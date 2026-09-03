# analogize

you are building a product called “annealogy" (temporary name) — a cognitive translation tool that explains complex concepts using the user’s existing mental models.

this is NOT a generic ai tutor. do not default to flashcards, quizzes, or textbook explanations.

core principle
the app must translate ideas into the way the user already thinks, using structured analogy systems + visual understanding.

---

PRODUCT BEHAVIOR

when a user asks to explain a concept, the system must ALWAYS follow this exact structure:

1. analogy first (no jargon)
2. explicit mapping (analogy → real components)
3. visual structure (mindmap / tree / flow)
4. real explanation (technical but grounded)
5. where the analogy breaks

never skip steps. never reorder.

---

ANALOGY SYSTEM LIBRARY (STRICT)

you may ONLY use these systems:

1. relationship dynamics
2. gaming / progression
3. cooking / recipe
4. building / lego
5. story / fandom
6. company / startup
7. traffic / flow
8. plant / growth
9. brain / habit loops
10. storage / organization

do NOT invent new analogy systems.

each explanation must choose ONE system unless user requests multiple.

---

USER PERSONALIZATION

on onboarding, ask:

“how does your brain naturally understand things?”

present selectable options:

* i think in stories
* i think in systems
* i think in real-life examples
* i think in visuals
* i think in internet culture
* i think in step-by-step processes

store this preference and use it to select analogy systems.

allow user to switch system per explanation.

---

OUTPUT FORMAT (MANDATORY)

every explanation must follow this structured format:

[analogy]
short, intuitive explanation in chosen system (2–4 sentences max)

[mapping]
bullet mapping between analogy elements and real concept components

[visual]
render a simple structured diagram using text (mindmap / tree / flow)
must be clean, minimal, and readable

[real explanation]
clear explanation of the actual concept using proper terminology

[limits]
explicit explanation of where the analogy stops working

---

VISUAL RULES

visuals must feel like sketchnotes:

* simple nodes and arrows
* no clutter
* readable hierarchy
* use indentation or arrows
* no ascii overload

choose visual type based on concept:

* mindmap → relationships between parts
* tree → decisions / branching
* flow → processes
* stack → layers

---

UI REQUIREMENTS

HOME SCREEN

* input field: “explain anything…”
* system selector (chips or dropdown)
* recent concepts

EXPLANATION SCREEN

* collapsible sections:
  analogy / mapping / visual / explanation / limits
* toggle between analogy systems
* “explain again differently” button

ONBOARDING

* select thinking style
* optional: pick favorite domains (gaming, fandom, etc.)

---

INTERACTION RULES

* never start with definitions
* never overload with paragraphs
* always anchor to familiar concepts first
* always include mapping
* always include limits
* explanations must feel human, not textbook

---

ANTI-PATTERNS (STRICTLY AVOID)

* generic ai tutor tone
* long unstructured paragraphs
* vague analogies
* skipping mapping
* skipping limitations
* inventing random metaphors

---

GOAL

the user should feel:
“this finally makes sense in my head”

not:
“this is a simplified explanation”

---

OPTIONAL ADVANCED FEATURE (IF IMPLEMENTED)

multi-system mode:
allow user to view the same concept in 2 different analogy systems side-by-side

---

DESIGN STYLE

* soft, minimal, slightly playful
* rounded elements
* pastel or adaptive color system
* clean typography (inter / poppins style)

---

FINAL NOTE

this is a thinking tool, not a learning platform.

prioritize clarity, structure, and cognitive resonance over completeness.

you are building this project under a consistent personal system. follow all instructions strictly. this is not optional styling, it is part of the product.

core philosophy
this project must feel human-made, readable, and intentionally structured. avoid generic ai patterns, vague naming, and unexplained decisions.

every part of the codebase and documentation should feel like it was written by someone who understands why things are built a certain way.

code quality and structure
refactor all code to use clear, descriptive, human-readable names

avoid abbreviations unless standard (id, url, api)
avoid single-letter variable names except for simple loops
prefer multi-word names that describe purpose
organize the project into consistent, logical folders

group by feature or domain, not by file type alone
keep related logic, components, and utilities close together
add comments that explain why decisions were made, not just what the code does

highlight tradeoffs, assumptions, and constraints where relevant
remove unnecessary complexity and avoid over-engineering

backend portability requirement
the project must not be locked into a single platform.

create the following files:

port.md
a clear, step-by-step guide to running the project locally

installation steps
environment setup
how to start development server
how to build and deploy
portsb.md
a concrete migration guide to supabase

identify all backend dependencies currently used
map each dependency to a supabase equivalent (auth, database, storage, functions)
define required database schema in detail
explain how to migrate authentication
explain how to migrate any server logic to edge functions
include any limitations or differences
do not be vague. make this actionable.

ui and visual rules
do not use emojis anywhere
use lucide icons for all iconography
maintain a clean, minimal, readable interface
writing and tone rules
apply these rules to:

all user-facing text
all markdown and documentation files
all internal non-code written content
rules:

everything must be written in lowercase, including proper nouns
do not use emojis
do not use em dashes
keep language clear, direct, and human
required documentation files
create and maintain the following files in the root of the project:

underthehood.md
explain how the system is structured internally

architecture decisions
data flow
key abstractions
why things are organized the way they are
features.md
list and explain all features

what each feature does
how it works at a high level
techstack.md
explain the technologies used and why

focus on reasoning and tradeoffs
do not mention any ai tools
describe the underlying structure and choices
roadmap.md
outline future improvements and expansions

short term
mid term
long term
overview.md
a clear, human-readable overview of the project

what it is
who it is for
what problem it solves
how it feels to use
this is not the same as a readme. it should read more like a product overview than setup instructions.

consistency requirement
all parts of the project must follow these rules. do not partially apply them.

if a decision conflicts with these instructions, prioritize these instructions.

this system defines the identity of the project.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://analogize.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ae521051-4554-4bd0-a542-59f8a4993b3d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
