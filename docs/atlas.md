# wandery visual aids for cognalia

cognalia is for curiosity, not coursework. this module ports wandery's uploaded atlas content and perspective lenses into reusable visual aids without importing its application shell, auth, lovable configuration or leaflet/carto runtime. it is not a deployed voice/canvas app.

## included

- pure content modules: memberships, languages, religions, secular categories, legal families and subtraditions, regions, historical polity proxies, wars, trade routes, attacks, major events and country archive prose.
- 17 conflict definitions with explicit attributed perspective metadata. an attributed position is not an endorsement or a verified statement about the opinions of an entire population.
- 12 original about/philosophy sections in `src/atlas/narratives.ts`, separate from relational datasets and factual evidence.
- serializable `AtlasAidState` and immutable `AtlasAidOperation` operations. a future agent and learner can use the same operations; this change does not implement transport, persistence or voice synchronization.
- `explorationModel` exposes actual membership identifiers/intersections, tag matches and legal combinations for set diagrams, country cards or another renderer. chart.js can consume these structured memberships separately from geographic shapes; no membership is inferred from drawn overlap.
- an interactive SVG geometry renderer, territory selection and a standalone demo. SVG is for geographic boundary paths, not a replacement for chart.js quantitative diagrams.

## territorial geometry fix

`buildCrimeaPartition` unions the 27 sourced Ukrainian ADM1 features, unions Crimea (`UA-43`) and Sevastopol (`UA-40`), then subtracts that territory from the recognized country extent. this is real polygon union/difference, not a label-only override or a hand-traced drawing.

`crimeaScene` separates:

1. the internationally recognized outline of Ukraine, retained across lenses;
2. mainland geometry outside the Crimea comparison;
3. Crimea and Sevastopol geometry, classified as Ukrainian territory in recognition/Ukraine lenses, or displayed as an attributed Russian annexation claim with hatching in the claim lens.

recognized sovereignty remains `UKR` in the data regardless of the selected claim. political evidence has its own source role, separate from cartographic geometry. no live military control or Donbas extent is invented. the comparison is explicitly post-2014 and rejects earlier historical years. it does not reconstruct the full Russian claimed extent after 2022.

other conflicts retain their attributed label frames with `geometryAvailable: false`. the model warns explicitly that no border change is implied. `territorialSceneFor` rejects requests for unsupported geometry instead of silently supplying fake outlines. each requires its own appropriately sourced polygons before being represented as a geometry-backed lens.

## boundary provenance and licensing

`public/atlas/ukraine-adm1.geojson` is the pinned geoBoundaries gbOpen simplified Ukraine ADM1 dataset, commit `9469f09`, boundary ID `UKR-ADM1-14850775`, represented year 2017, built December 2023. its 761,290 bytes have SHA-256:

`4a5947e7497574d51f93255dfa7e03dce0c7acf6ecee52d25773a5205854a399`

source: OpenStreetMap / Wambacher via geoBoundaries. license: ODbL 1.0. the database and derived partitions carry the database license independently of the software. retain the source database, metadata and `public/atlas/NOTICE.md` in distribution.

recognition reference: UN General Assembly resolution 68/262. claim reference: the Russian presidency's 18 March 2014 statement, archived as a document at the Permanent Court of Arbitration. that primary source supports attribution of the claim, not its legality.

`src/atlas/content/provenance.ts` describes the uploaded ZIP's import provenance. it is intentionally not a claim that the archive's prose, identity categories or memberships are verified current facts. the historical dial must not convert undated memberships into historical evidence, and historical polity shapes remain modern-country proxies rather than accurate reconstructed borders.

firecrawl was used during source research with the owner's securely stored key. its Alexandria developer index returned polygon-clipping references, and web search returned geoBoundaries/HDX references. `public/atlas/research-receipts.json` records selected URLs and the retrieval method without credentials. source retrieval is not source endorsement. no key is shipped in browser code and there is no production firecrawl runtime integration in this change.

## provenancebehindprose integration boundary

future call UX: top three-dot menu → transcript → tiny provenance label and downward chevron per agent message. the two expanded tabs show defined source-contribution weights and source priority, with audit rationale and relevant counterevidence.

the atlas supplies source IDs and distinct evidence roles to that future engine. it does not pretend to implement per-message percentages, the transcript view, or hidden model reasoning. imported narrative, factual claims, an authority's frame and source-backed geometry stay separate.

## try it

```sh
npm install
npm test
npm run typecheck
npm run build:demos
npm run dev:demos
```

open `/demos/atlas/` on the local vite server. the demo has working Crimea perspective controls, selectable geometry with evidence IDs, membership intersections, identity/legal lenses and expandable country prose. the historical datasets are portable but there is no precise historical geometry renderer or reconstructed global atlas in this demo.

19 tests cover content imports, frame attribution, geometry partition/area consistency, Simferopol and Sevastopol membership, claim classification, retained recognized outline, missing geometry, invalid coordinates, serializable item operations, SVG selections and membership intersections. browser automation has not been run; the interactive SVG is exercised with jsdom, plus a production bundle build.
