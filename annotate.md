# annotate.md

a tiny annotation system for the marketing / content pages (anything outside the app shell). it is plain css that
makes inline text look like it has been highlighted, underlined or marked up by hand on cream paper.

inspired by the visual vocabulary of [quire's annotations](https://quire.wiki/note/notes/annotations).

## where it lives

- styles: `src/styles/annotation.css`
- loaded globally from `src/main.tsx`, so every page can use it immediately

do not duplicate these styles into individual components. just add the classes inline.

## scope

intended for: `/`, `/about`, `/features`, `/faq`, `/goals`, `/mechanisms`, `/philosophy`, `/roadmap`.

not intended for: anything inside `/app`, `/explain`, `/graph`, `/history`. the app shell has its own visual
language and these editorial marks would clash with it.

## classes

all classes are composable. wrap your text in a `<span>` (or any inline element) and stack what you need.

### highlights (soft marker strokes)

base: `a-hl` plus a color modifier.

| class | feel | use for |
| --- | --- | --- |
| `a-hl a-hl-yellow` | warm, attentional | primary emphasis, main ideas |
| `a-hl a-hl-sage`   | ecological, grounded | systems, nature, process |
| `a-hl a-hl-blue`   | coolly analytical | definitions, key terms |
| `a-hl a-hl-pink`   | tender, uncertain | speculation, soft hypotheses |
| `a-hl a-hl-orange` | urgent, not aggressive | warnings, time-sensitive notes |
| `a-hl a-hl-gray`   | the quietest highlight | asides, caveats |

### underlines

base: `a-u` plus a style and (optionally) a weight.

styles: `a-u-solid`, `a-u-dotted`, `a-u-dashed`, `a-u-wavy`.

weights: `a-u-w1`, `a-u-w2` (default), `a-u-w3`, `a-u-w4`.

| combination | feel |
| --- | --- |
| `a-u a-u-solid` | firm editorial mark, no ambiguity |
| `a-u a-u-wavy` | uncertainty, flag this, might be wrong |
| `a-u a-u-dashed` | defer, come back later |
| `a-u a-u-dotted` | the quietest signal, a whisper |

### text styles

| class | meaning |
| --- | --- |
| `a-b`  | bold, weight 1 (semibold) |
| `a-bb` | bold, weight 2 (heavier) |
| `a-i`  | italic |

### external links

use `a-ext` on an anchor. it adds a wavy underline and a small superscript arrow to signal departure.

```html
<a class="a-ext" href="https://en.wikipedia.org" target="_blank" rel="noreferrer">wikipedia</a>
```

## composition examples

```html
<p>
  before you can explain something simply,
  <span class="a-hl a-hl-yellow a-b">you need a simple place to stand</span>.
  the rest of the path
  <span class="a-u a-u-wavy">might be wrong</span>,
  but this part is
  <span class="a-u a-u-solid a-u-w3">solid</span>.
</p>
```

```html
<p>
  see also
  <a class="a-ext" href="https://en.wikipedia.org/wiki/Hypertext">ted nelson on hypertext</a>
  for the original framing.
</p>
```

## adding a new color or style

extend `src/styles/annotation.css` with a new modifier class. keep the naming convention `a-hl-<name>` for
highlights, `a-u-<name>` for underline variants. always use hsl tokens, never raw hex.
