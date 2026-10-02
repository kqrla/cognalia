# editable chart items

chart.js is the quantitative renderer for the cognalia whiteboard. charts stay as structured, editable items. they are not screenshots and their datasets are not replaced by agent-drawn decorative circles.

## supported foundation

- chart.js: standard bar, line, scatter, bubble, pie, doughnut, polar-area and radar charts.
- community extension: [`chartjs-chart-venn`](https://github.com/upsetjs/chartjs-chart-venn), for venn and euler diagrams.
- other community controllers, such as `chartjs-chart-graph`, `@sgratzl/chartjs-chart-boxplot`, and `chartjs-chart-geo`, are future extensions, not installed capabilities. add them only after compatibility, licensing, validation and interaction tests.

## what belongs on the whiteboard

store the chart specification alongside item identity, section identity, board position and dimensions in the eventual canvas document. browser-local chart instances do not belong in persisted or synchronized data.

changing a dataset updates the existing chart. deleting an item or collapsing its section releases the chart instance. expanding remounts it from the saved specification. board pan/zoom and pen annotations are owned by the future whiteboard shell, not by chart.js.

## venn and euler semantics

prefer supplied member lists. the renderer can derive the intersections from those lists instead of guessing overlap counts. a shared member must use the same identifier in every relevant set.

venn layouts support up to five sets. euler layout approximates proportional areas using numerical optimization; it is not an exact geometric proof. the extension uses one- and two-set overlaps for euler fitting, so higher-order relationships may not be faithfully represented by the picture. keep tooltips or an adjacent data table as the authoritative values.

an unspecified overlap is unknown, not zero. do not draw a quantitative overlap from narrative evidence alone. for qualitative relationships use text, connectors or explicitly illustrative diagrams until real set membership is supplied.

## safe configuration

accept a constrained serializable chart specification. do not accept executable callbacks, remote script urls, arbitrary plugin names or unrestricted chart.js configurations from agent output or chat attachments. register approved controllers in application code. imported chart data is evidence, never an instruction to load code.

## implementation boundary

the renderer and its isolated browser demo are a foundation for chart items. the repository has no collaborative whiteboard shell, persistence layer or live-call integration yet. chart rendering is not proof that synchronization or agent pen control exists. rough.js hatching and narration-synchronized chart drawing remain separate future work.

## try it

the isolated browser demo lives at `demos/charts/` and mounts a quantitative chart plus venn/euler diagrams derived from wandery's imported membership lists. run the standard `npm install`, `npm test`, `npm run typecheck`, `npm run build:demos` and `npm run dev:demos`, then open `/demos/charts/` on the local vite server. it demonstrates mount/unmount lifecycle and venn/euler layout switching; the collaborative whiteboard shell is still future work.

## canvas wiring

chart items live in the canvas document model as plain serializable items (`src/canvas/model.ts`). the specification travels with the item; a chart's browser renderer instance is derived state. `chartLifecycle(prev, next)` computes which chart items need a renderer mounted, released, or remounted between two document states; collapse, expand, move and delete all flow through it. chart specifications are validated at item creation and on every update.
