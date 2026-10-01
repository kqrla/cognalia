import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { buildCrimeaPartition, crimeaScene } from '../src/atlas/geometry/territories.ts';
import { renderTerritorialAid, createAtlasAid, applyAtlasOperation } from '../src/atlas/visualAid.ts';
import { explorationModel, countryExplanationCard } from '../src/atlas/exploration.ts';
import { ATLAS_NARRATIVES } from '../src/atlas/narratives.ts';

const boundaries = JSON.parse(readFileSync(new URL('../public/atlas/ukraine-adm1.geojson', import.meta.url), 'utf8'));
const partition = buildCrimeaPartition(boundaries);
test('interactive SVG displays distinct claim geometry and accessible selection', () => {
  const dom = new JSDOM('<svg id="one"></svg><svg id="two"></svg>');
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: dom.window.document });
  try {
    const svg = dom.window.document.getElementById('one')! as unknown as SVGSVGElement;
    let selected = '';
    renderTerritorialAid(svg, crimeaScene(partition, 'russia-claim'), id => selected = id);
    const territory = svg.querySelector('[data-layer-id="crimea-sevastopol"]')!;
    assert.match(territory.getAttribute('fill')!, /^url\(#claim-/);
    assert.equal(territory.getAttribute('data-recognized-sovereign'), 'UKR');
    territory.dispatchEvent(new dom.window.Event('click')); assert.equal(selected, 'crimea-sevastopol');
    selected = ''; territory.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Enter' })); assert.equal(selected, 'crimea-sevastopol');
    const outline = svg.querySelector('[data-layer-id="ukraine-recognized-outline"]')!;
    assert.equal(outline.getAttribute('pointer-events'), 'none');
    const other = dom.window.document.getElementById('two')! as unknown as SVGSVGElement;
    renderTerritorialAid(other, crimeaScene(partition, 'russia-claim'));
    assert.notEqual(svg.querySelector('pattern')?.id, other.querySelector('pattern')?.id);
    renderTerritorialAid(svg, crimeaScene(partition, 'recognized'));
    assert.equal(svg.querySelectorAll('[data-layer-id="crimea-sevastopol"]').length, 1);
    assert.equal(svg.querySelector('[data-layer-id="crimea-sevastopol"]')?.getAttribute('fill'), 'currentColor');
  } finally {
    if (previous) Object.defineProperty(globalThis, 'document', previous); else Reflect.deleteProperty(globalThis, 'document');
    dom.window.close();
  }
});
test('membership intersections come from identifiers, not drawn geometry or inference', () => {
  let state = createAtlasAid();
  state = applyAtlasOperation(state, { type: 'toggle-membership', id: 'eu' });
  state = applyAtlasOperation(state, { type: 'toggle-membership', id: 'eea' });
  const model = explorationModel(state);
  assert.equal(model.memberships.find(m => m.id === 'eu')!.countryIds.length, 27);
  assert.equal(model.intersections[0].countryIds.length, 27);
  assert.ok(model.warnings.some(w => w.includes('undated')));
  assert.doesNotThrow(() => JSON.stringify(model));
});
test('perspectives without sourced geometry remain clearly identified label frames', () => {
  const model = explorationModel({ ...createAtlasAid('kashmir'), perspectiveId: 'india' });
  assert.equal(model.perspective?.geometryAvailable, false);
  assert.ok(model.warnings.some(w => w.includes('no border change')));
});
test('narrative prose is kept separate from evidence and source facts', () => {
  assert.equal(ATLAS_NARRATIVES.length, 12);
  assert.ok(ATLAS_NARRATIVES.every(n => n.layer === 'narrative' && n.verification === 'imported-unverified'));
  assert.ok(ATLAS_NARRATIVES.some(n => n.sourceHeading === 'learning is exploration'));
  assert.equal(countryExplanationCard('UKR').verification, 'imported-unverified');
});
