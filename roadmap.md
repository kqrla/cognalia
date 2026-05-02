# roadmap

future improvements grouped by horizon. this list is intentionally short. annealogy is a focused tool, and most "features" should be rejected unless they make explanations land harder.

## short term

- multi-system mode. show the same concept through two analogy systems side by side, on a single screen.
- copy-to-clipboard for individual sections, so a user can paste just the analogy or just the mapping into their notes.
- keyboard shortcuts on the explanation screen: `r` to regenerate, `1-9` to switch system, `esc` to go home.
- a small "favorite" toggle on recents so the most useful explanations stay pinned.
- print stylesheet so the explanation page exports cleanly to pdf.

## mid term

- accounts and cross-device sync, executed exactly as described in `portsb.md`. preferences and recents migrate from localStorage to lovable cloud tables, with a one-time merge on first login.
- streaming the explanation section by section so the user sees the analogy first while the rest is still being generated.
- a small thumbs up / thumbs down per section that feeds back into the prompt for the next regenerate, without sending feedback to a server.
- export an explanation as a single self-contained html file (analogy, mapping, mermaid svg inlined, the works).
- per-domain analogy presets. for example, when explaining a finance concept, weight the cooking and traffic systems lower because they tend to mislead in that domain.

## long term

- a personal analogy memory: when the user accepts an explanation, the system remembers the analogy and reuses its language when explaining related concepts later. this is the feature that makes annealogy feel like it learns how *you* think.
- side-by-side concept comparison. give it two concepts, get one explanation that contrasts them through a single analogy system.
- a small library of community-contributed curated concepts, gated behind a quality bar so the demo library does not become a dumping ground.
- an offline-first pwa build with a small on-device model for the analogy section, falling back to the gateway for the harder structured fields.
- a public api so other tools can request annealogy-shaped explanations directly. keeping the contract narrow makes this realistic.
