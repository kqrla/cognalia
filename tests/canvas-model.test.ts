import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCanvasOperation, visibleItemIds, chartLifecycle, type CanvasDocument, type CanvasOperation } from '../src/canvas/model.ts';
import type { ChartSpec } from '../src/charts/spec.ts';
import type { ChartItem } from '../src/canvas/model.ts';

const CHART: ChartSpec = { kind: 'venn', title: 'memberships', sets: [
  { key: 'eu', label: 'eu', members: ['AUT', 'BEL', 'FRA'] },
  { key: 'eea', label: 'eea', members: ['AUT', 'BEL', 'ISL', 'LIE'] },
] };

function apply(doc: CanvasDocument, ops: CanvasOperation[]): CanvasDocument {
  return ops.reduce((current, op) => applyCanvasOperation(current, op), doc);
}

function emptyDoc(): CanvasDocument {
  return { id: '', title: '', rootSectionId: '', sections: {}, items: {} };
}

function seed(): CanvasDocument {
  return apply(emptyDoc(), [
    { type: 'create-canvas', canvasId: 'geo', title: 'geography office hours', sessionId: 'call-1' },
    { type: 'create-section', sectionId: 'buckets', title: 'buckets', parentSectionId: 'geo-root' },
    { type: 'create-section', sectionId: 'sources', title: 'sources', parentSectionId: 'geo-root' },
    { type: 'create-item', item: { id: 'text-1', kind: 'text', text: 'ange explains', sectionId: 'geo-root', position: { x: 0, y: 0 }, dimensions: { width: 120, height: 24 } } },
    { type: 'create-item', item: { id: 'chart-1', kind: 'chart', chart: CHART, sectionId: 'buckets', position: { x: 0, y: 40 }, dimensions: { width: 320, height: 240 } } },
    { type: 'create-item', item: { id: 'text-2', kind: 'text', text: 'wikipedia caveat', sectionId: 'sources', position: { x: 0, y: 300 }, dimensions: { width: 160, height: 24 } } },
  ]);
}

test('a canvas document is sections and items with exactly-one-section membership', () => {
  const doc = seed();
  assert.equal(doc.sections['geo-root'].parentSectionId, null);
  assert.equal(doc.sections['buckets'].parentSectionId, 'geo-root');
  assert.deepEqual(doc.sections['geo-root'].sections, ['buckets', 'sources']);
  for (const item of Object.values(doc.items)) assert.ok(doc.sections[item.sectionId].items.includes(item.id));
  assert.equal(new Set(Object.values(doc.items).map(i => i.id)).size, 3);
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(doc)));
});

test('collapse is structural: visible items respect expansion, not zoom tricks', () => {
  const doc = seed();
  assert.deepEqual(visibleItemIds(doc), ['text-1', 'chart-1', 'text-2']);
  const collapsed = applyCanvasOperation(doc, { type: 'set-section-expanded', sectionId: 'buckets', expanded: false });
  assert.deepEqual(visibleItemIds(collapsed), ['text-1', 'text-2']);
  assert.equal(doc.sections['buckets'].expanded, true, 'operations are immutable; the source document is untouched');
});

test('collapsing a section releases its chart renderer and expanding remounts it', () => {
  const doc = seed();
  const collapsed = applyCanvasOperation(doc, { type: 'set-section-expanded', sectionId: 'buckets', expanded: false });
  assert.deepEqual(chartLifecycle(doc, collapsed), { mount: [], unmount: ['chart-1'], remount: [] });
  const expanded = applyCanvasOperation(collapsed, { type: 'set-section-expanded', sectionId: 'buckets', expanded: true });
  assert.deepEqual(chartLifecycle(collapsed, expanded), { mount: ['chart-1'], unmount: [], remount: [] });
});

test('updating a visible chart item remounts it; updating a hidden one does not', () => {
  const doc = seed();
  const updated = applyCanvasOperation(doc, { type: 'update-chart-item', itemId: 'chart-1', chart: { ...CHART, kind: 'euler' } });
  assert.deepEqual(chartLifecycle(doc, updated), { mount: [], unmount: [], remount: ['chart-1'] });
  const collapsed = applyCanvasOperation(doc, { type: 'set-section-expanded', sectionId: 'buckets', expanded: false });
  const hidden = applyCanvasOperation(collapsed, { type: 'update-chart-item', itemId: 'chart-1', chart: { ...CHART, kind: 'euler' } });
  assert.deepEqual(chartLifecycle(collapsed, hidden), { mount: [], unmount: [], remount: [] });
  assert.equal((hidden.items['chart-1'] as ChartItem).chart.kind, 'euler');
});

test('chart items validate their specification; unsafe specs never enter the document', () => {
  assert.throws(() => applyCanvasOperation(seed(), {
    type: 'create-item',
    item: { id: 'chart-2', kind: 'chart', chart: { kind: 'venn', sets: CHART.sets, plugins: ['labels'] } as unknown as ChartSpec, sectionId: 'buckets', position: { x: 0, y: 0 }, dimensions: { width: 320, height: 240 } },
  }), /rejected/);
  assert.throws(() => applyCanvasOperation(seed(), {
    type: 'update-chart-item', itemId: 'chart-1', chart: { kind: 'venn', sets: [{ key: 'a', label: 'a', members: ['1'] }] },
  }), /at least two sets/);
});

test('moves, grouping, deletion and fail-closed invariants hold', () => {
  const doc = seed();
  const moved = applyCanvasOperation(doc, { type: 'move-item', itemId: 'text-2', toSectionId: 'geo-root', index: 0 });
  assert.deepEqual(moved.sections['sources'].items, []);
  assert.deepEqual(moved.sections['geo-root'].items, ['text-2', 'text-1']);
  assert.equal(moved.items['text-2'].sectionId, 'geo-root');
  const grouped = applyCanvasOperation(moved, { type: 'group-items-into-section', itemIds: ['text-2', 'text-1'], sectionId: 'lenses', title: 'lenses' });
  assert.deepEqual(grouped.sections['geo-root'].items, []);
  assert.deepEqual(grouped.sections['lenses'].items, ['text-2', 'text-1']);
  assert.equal(grouped.items['text-1'].sectionId, 'lenses');
  assert.equal(grouped.items['chart-1'].sectionId, 'buckets');
  assert.throws(() => applyCanvasOperation(moved, { type: 'group-items-into-section', itemIds: ['text-1', 'chart-1'], sectionId: 'mixed', title: 'mixed' }), /one section/);
  const deleted = applyCanvasOperation(grouped, { type: 'delete-section', sectionId: 'lenses' });
  assert.equal(deleted.sections['lenses'], undefined);
  assert.equal(deleted.items['text-1'], undefined);
  assert.equal(deleted.items['text-2'], undefined);
  assert.ok(deleted.items['chart-1'], 'deleting a sibling section never touches items outside it');
  const reparented = applyCanvasOperation(seed(), { type: 'create-section', sectionId: 'nested', title: 'nested', parentSectionId: 'sources' });
  assert.throws(() => applyCanvasOperation(reparented, { type: 'move-section', sectionId: 'sources', toSectionId: 'nested' }), /descendant/);
  assert.throws(() => applyCanvasOperation(reparented, { type: 'move-section', sectionId: 'sources', toSectionId: 'sources' }), /itself/);
  assert.throws(() => applyCanvasOperation(seed(), { type: 'delete-section', sectionId: 'geo-root' }), /root section/);
  assert.throws(() => applyCanvasOperation(seed(), { type: 'move-item', itemId: 'nope', toSectionId: 'geo-root' }), /unknown item/);
  assert.throws(() => applyCanvasOperation(seed(), { type: 'set-section-expanded', sectionId: 'ghost', expanded: true }), /unknown section/);
});

test('session ids ride along on operations without the document gaining call coupling', () => {
  const doc = apply(seed(), [
    { type: 'create-item', sessionId: 'call-2', item: { id: 'sketch-1', kind: 'sketch', strokeCount: 3, sectionId: 'geo-root', position: { x: 10, y: 10 }, dimensions: { width: 80, height: 80 } } },
  ]);
  assert.equal(doc.items['sketch-1'].kind, 'sketch');
  assert.equal('sessionId' in doc, false, 'session metadata never leaks into the document shape');
  assert.equal('call' in doc, false);
});
