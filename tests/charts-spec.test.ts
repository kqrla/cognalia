import test from 'node:test';
import assert from 'node:assert/strict';
import { validateChartSpec, deriveSetRegions, MAX_VENN_SETS, type NamedSet } from '../src/charts/spec.ts';
import { FILTERS } from '../src/atlas/content/index.ts';

const eu: NamedSet = { key: 'eu', label: 'eu', members: ['AUT', 'BEL', 'FRA', 'DEU'] };
const eea: NamedSet = { key: 'eea', label: 'eea', members: ['AUT', 'BEL', 'FRA', 'ISL', 'LIE', 'NOR'] };
const nato: NamedSet = { key: 'nato', label: 'nato', members: ['FRA', 'ISL', 'NOR', 'USA'] };

test('valid specifications survive strict validation, rejecting only what is unsafe', () => {
  assert.equal(validateChartSpec({ kind: 'bar', labels: ['a'], datasets: [{ label: 'x', values: [1, 2] }] }).kind, 'bar');
  assert.equal(validateChartSpec({ kind: 'venn', sets: [eu, eea] }).kind, 'venn');
  for (const bad of [
    { kind: 'bar', labels: [], datasets: [{ values: [1] }], plugins: ['labels'] },
    { kind: 'bar', labels: ['a'], datasets: [{ values: [1] }], onClick: () => {} },
    { kind: 'bar', labels: ['a'], datasets: [{ values: [1], script: 'https://example.test/x.js' }] },
    { kind: 'unknown', labels: [], datasets: [] },
    { kind: 'bar', labels: ['a'], datasets: [{ values: [Number.NaN] }] },
    { kind: 'bar', labels: ['a'], datasets: [{ values: [Infinity] }] },
    { kind: 'bar', labels: ['a'], datasets: [] },
    { kind: 'venn', sets: [{ key: 'a', label: 'a', members: ['x'] }] },
    { kind: 'venn', sets: [eu, { ...eea, key: 'eu' }] },
    { kind: 'venn', sets: [eu, { key: 'bad', label: 'bad', members: ['x', 'https://spam.test'] }] },
    'not an object',
  ]) assert.throws(() => validateChartSpec(bad), /rejected/);
  assert.throws(() => validateChartSpec({
    kind: 'venn', sets: Array.from({ length: MAX_VENN_SETS + 1 }, (_, i) => ({ key: `s${i}`, label: `s${i}`, members: [`m${i}`] })),
  }), /at most 5 sets/);
});

test('regions derive exactly from member lists with no guessed overlaps', () => {
  const regions = deriveSetRegions([eu, eea, nato]);
  const find = (...keys: string[]) => regions.find(r => [...keys].sort().join('|') === [...r.sets].sort().join('|'));
  assert.equal(find('eu')!.value, 1);           // DEU only
  assert.equal(find('eea')!.value, 1);          // LIE only
  assert.equal(find('nato')!.value, 1);         // USA only
  assert.equal(find('eu', 'eea')!.value, 2);    // AUT, BEL
  assert.equal(find('eea', 'nato')!.value, 2);  // ISL, NOR
  assert.equal(find('eu', 'nato'), undefined, 'an empty region is omitted entirely');
  assert.equal(find('eu', 'eea', 'nato')!.value, 1); // FRA
  assert.equal(regions.reduce((sum, r) => sum + r.value, 0), new Set([...eu.members, ...eea.members, ...nato.members]).size);
});

test('empty intersections are omitted as zero, never invented, and atlas sets derive cleanly', () => {
  const atlasRegions = deriveSetRegions((['eu', 'eea', 'nato'] as const).map(id => ({ key: id, label: id, members: [...FILTERS[id].countries] })));
  assert.ok(atlasRegions.every(r => Number.isInteger(r.value) && r.value > 0));
  const total = atlasRegions.reduce((sum, r) => sum + r.value, 0);
  const distinct = new Set(['eu', 'eea', 'nato'].flatMap(id => [...FILTERS[id].countries])).size;
  assert.equal(total, distinct);
  assert.ok(atlasRegions.filter(r => r.sets.length === 2).length > 0);
  const noverlap = deriveSetRegions([
    { key: 'a', label: 'a', members: ['1', '2'] }, { key: 'b', label: 'b', members: ['3', '4'] },
  ]);
  assert.deepEqual(noverlap.map(r => r.sets), [['a'], ['b']]);
  assert.equal(noverlap.some(r => r.sets.length === 2), false, 'an empty overlap is not a region and is never drawn as an invented value');
});
