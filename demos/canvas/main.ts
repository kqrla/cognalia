import { applyCanvasOperations, applyCanvasOperation, visibleItemIds, chartLifecycle, type CanvasOperation, type ChartItem, type Section } from '../../src/canvas/index.ts';
import { mountChart, type MountedChart } from '../../src/charts/index.ts';
import type { ChartSpec } from '../../src/charts/spec.ts';

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const CHART: ChartSpec = { kind: 'venn', title: 'imported memberships (wandery snapshot)', sets: [
  { key: 'eu', label: 'eu', members: ['AUT', 'BEL', 'FRA', 'DEU', 'ISL'] },
  { key: 'eea', label: 'eea', members: ['AUT', 'BEL', 'FRA', 'DEU', 'ISL', 'LIE', 'NOR'] },
  { key: 'efta', label: 'efta', members: ['ISL', 'LIE', 'NOR', 'CHE'] },
] };

let doc = applyCanvasOperations({ id: '', title: '', rootSectionId: '', sections: {}, items: {} }, [
  { type: 'create-canvas', canvasId: 'geo', title: 'geography office hours', sessionId: 'call-demo' },
  { type: 'create-section', sectionId: 'buckets', title: 'buckets', parentSectionId: 'geo-root' },
  { type: 'create-section', sectionId: 'notes', title: 'notes', parentSectionId: 'geo-root' },
  { type: 'create-item', item: { id: 'chart-1', kind: 'chart', chart: CHART, sectionId: 'buckets', position: { x: 0, y: 0 }, dimensions: { width: 320, height: 240 } } },
  { type: 'create-item', item: { id: 'note-1', kind: 'text', text: 'euler diagrams show containment; overlap regions come from member lists, never guessed', sectionId: 'notes', position: { x: 0, y: 260 }, dimensions: { width: 300, height: 40 } } },
  { type: 'create-item', item: { id: 'note-2', kind: 'text', text: 'collapse is structural, not a zoom trick', sectionId: 'notes', position: { x: 0, y: 310 }, dimensions: { width: 300, height: 40 } } },
] as CanvasOperation[]);

const log = $<HTMLPreElement>('log');
const logLines: string[] = [];
let instances: MountedChart[] = [];

function operate(operation: CanvasOperation): void {
  const prev = doc;
  doc = applyCanvasOperation(doc, operation);
  const { mount, unmount, remount } = chartLifecycle(prev, doc);
  logLines.unshift(`mount: [${mount.join(', ') || '–'}]  unmount: [${unmount.join(', ') || '–'}]  remount: [${remount.join(', ') || '–'}]`);
  log.textContent = logLines.slice(0, 8).join('\n');
  render();
}

/** renderer instances belong to the browser: every re-render releases old instances and mounts fresh ones for visible chart items only */
function render(): void {
  for (const instance of instances) instance.destroy();
  instances = [];
  const board = $<HTMLDivElement>('board');
  board.replaceChildren(renderSection(doc.sections[doc.rootSectionId], 0));
  const visible = new Set(visibleItemIds(doc));
  for (const id of visible) {
    const item = doc.items[id];
    if (item.kind !== 'chart') continue;
    const canvas = board.querySelector(`canvas[data-chart-id="${id}"]`) as HTMLCanvasElement | null;
    if (canvas) instances.push(mountChart(canvas, (item as ChartItem).chart));
  }
}

function renderSection(section: Section, depth: number): HTMLElement {
  const wrap = document.createElement('section');
  wrap.className = 'tree';
  const row = document.createElement('div');
  row.className = 'row';
  const toggle = document.createElement('button');
  toggle.textContent = section.expanded ? '−' : '+';
  toggle.setAttribute('aria-pressed', String(section.expanded));
  toggle.setAttribute('aria-label', `${section.expanded ? 'collapse' : 'expand'} ${section.title}`);
  toggle.addEventListener('click', () => operate({ type: 'set-section-expanded', sectionId: section.id, expanded: !section.expanded }));
  const title = document.createElement('h3');
  title.textContent = section.title;
  title.style.margin = '0';
  const quiet = document.createElement('span');
  quiet.className = 'quiet';
  quiet.textContent = `${section.items.length} items · ${section.sections.length} sections · depth ${depth}`;
  row.append(toggle, title, quiet);
  wrap.append(row);
  for (const itemId of section.items) wrap.append(renderItem(itemId));
  for (const childId of section.sections) wrap.append(renderSection(doc.sections[childId], depth + 1));
  return wrap;
}

function renderItem(itemId: string): HTMLElement {
  const item = doc.items[itemId];
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `item-${item.id}`;
  if (item.kind === 'text') {
    card.textContent = item.text;
  } else if (item.kind === 'sketch') {
    card.textContent = `(sketch · ${item.strokeCount} strokes)`;
  } else {
    const canvas = document.createElement('canvas');
    canvas.dataset.chartId = item.id;
    const box = document.createElement('div');
    box.className = 'chart-box';
    box.append(canvas);
    card.append(box);
  }
  return card;
}

$<HTMLButtonElement>('collapse-all').addEventListener('click', () =>
  Object.values(doc.sections).filter(s => s.id !== doc.rootSectionId && s.expanded).forEach(s => operate({ type: 'set-section-expanded', sectionId: s.id, expanded: false })));
$<HTMLButtonElement>('expand-all').addEventListener('click', () =>
  Object.values(doc.sections).filter(s => s.id !== doc.rootSectionId && !s.expanded).forEach(s => operate({ type: 'set-section-expanded', sectionId: s.id, expanded: true })));
$<HTMLButtonElement>('regroup').addEventListener('click', () => {
  if (doc.sections['merged']) return;
  operate({ type: 'group-items-into-section', itemIds: ['note-1', 'note-2'], sectionId: 'merged', title: 'merged notes', sessionId: 'call-demo' });
});
$<HTMLButtonElement>('euler').addEventListener('click', () => {
  const current = (doc.items['chart-1'] as ChartItem).chart.kind;
  operate({ type: 'update-chart-item', itemId: 'chart-1', chart: { ...CHART, kind: current === 'venn' ? 'euler' : 'venn' }, sessionId: 'call-demo' });
});

render();
logLines.push('initial: chart-1 mounted (visible chart items get renderer instances)');
log.textContent = logLines.join('\n');
