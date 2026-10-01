import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import polygonClipping from 'polygon-clipping';
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { buildCrimeaPartition, crimeaScene, geometryAvailability, validateBoundaries } from '../src/atlas/geometry/territories.ts';
import { createAtlasAid, applyAtlasOperation, territorialSceneFor, geometryPath, geometryBounds } from '../src/atlas/visualAid.ts';

const boundaries = JSON.parse(fs.readFileSync(new URL('../public/atlas/ukraine-adm1.geojson', import.meta.url), 'utf8')) as FeatureCollection<Polygon | MultiPolygon>;
const partition = buildCrimeaPartition(boundaries);
function area(coordinates: number[][][][]): number {
  return coordinates.reduce((total, polygon) => total + polygon.reduce((sum, ring, i) => {
    const a = Math.abs(ring.reduce((s, p, j) => { const q = ring[(j + 1) % ring.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
    return sum + (i === 0 ? a : -a);
  }, 0), 0);
}
function contains(geometry: MultiPolygon, x: number, y: number): boolean {
  // Interior test by intersection with a tiny rectangle, avoiding exact boundary ambiguity.
  const epsilon = 0.00001;
  const box: polygonClipping.Polygon = [[[x-epsilon,y-epsilon],[x+epsilon,y-epsilon],[x+epsilon,y+epsilon],[x-epsilon,y+epsilon],[x-epsilon,y-epsilon]]];
  return area(polygonClipping.intersection(geometry.coordinates as polygonClipping.MultiPolygon, box)) > 0;
}
test('licensed snapshot contains 27 administrative features including Sevastopol', () => {
  assert.equal(boundaries.features.length, 27);
  assert.ok(boundaries.features.some(f => f.properties?.shapeISO === 'UA-43'));
  assert.ok(boundaries.features.some(f => f.properties?.shapeISO === 'UA-40'));
  assert.doesNotThrow(() => validateBoundaries(boundaries));
});
test('territorial geometry really partitions Crimea from mainland, not just labels', () => {
  assert.ok(contains(partition.crimea, 34.10, 44.95)); // Simferopol
  assert.ok(contains(partition.crimea, 33.53, 44.60)); // Sevastopol
  assert.equal(contains(partition.mainland, 34.10, 44.95), false);
  assert.ok(contains(partition.mainland, 30.52, 50.45)); // Kyiv
  assert.equal(contains(partition.crimea, 30.52, 50.45), false);
  assert.ok(area(partition.recognizedUkraine.coordinates) > area(partition.mainland.coordinates));
  assert.ok(area(polygonClipping.intersection(partition.mainland.coordinates as polygonClipping.MultiPolygon, partition.crimea.coordinates as polygonClipping.MultiPolygon)) < 1e-8);
  assert.ok(Math.abs(area(partition.recognizedUkraine.coordinates) - area(partition.mainland.coordinates) - area(partition.crimea.coordinates)) < 1e-7);
});
test('switching to a claim changes geometry classification while retaining recognized sovereignty', () => {
  const recognized = crimeaScene(partition, 'recognized');
  const claim = crimeaScene(partition, 'russia-claim');
  assert.equal(recognized.layers[2].displayedClaimant, 'UKR');
  assert.equal(claim.layers[2].displayedClaimant, 'RUS');
  assert.equal(claim.layers[2].recognizedSovereign, 'UKR');
  assert.equal(claim.layers[2].style, 'claim-hatch');
  assert.deepEqual(claim.layers[0].geometry, recognized.layers[0].geometry);
  assert.ok(claim.layers.every(l => l.evidenceIds.length >= 2));
  assert.ok(claim.layers.every(l => l.evidenceIds.every(id => claim.sources.some(s => s.id === id))));
});
test('missing territory data fails closed instead of drawing made-up borders', () => {
  const missing = { ...boundaries, features: boundaries.features.filter(f => f.properties?.shapeISO !== 'UA-40') };
  assert.throws(() => buildCrimeaPartition(missing), /Sevastopol/);
  assert.equal(geometryAvailability('kashmir').available, false);
});
test('malformed coordinates are rejected before clipping', () => {
  const invalid = structuredClone(boundaries);
  const g = invalid.features[0].geometry;
  const ring = g.type === 'Polygon' ? g.coordinates[0] : g.coordinates[0][0];
  ring[1][0] = NaN;
  assert.throws(() => validateBoundaries(invalid), /finite WGS84/);
});
test('agent and learner operations have the same serializable immutable contract', () => {
  const state = createAtlasAid();
  const next = applyAtlasOperation(state, { type: 'set-perspective', perspectiveId: 'russia' });
  assert.equal(state.perspectiveId, 'neutral');
  assert.equal(territorialSceneFor(JSON.parse(JSON.stringify(next)), partition).lens, 'russia-claim');
  const one = applyAtlasOperation(next, { type: 'toggle-membership', id: 'eu' });
  assert.deepEqual(one.activeMemberships, ['eu']);
  assert.deepEqual(applyAtlasOperation(one, { type: 'toggle-membership', id: 'eu' }).activeMemberships, []);
  assert.throws(() => territorialSceneFor({ ...state, year: 2013 }, partition), /backward/);
  assert.throws(() => territorialSceneFor({ ...state, conflictId: 'kashmir' }, partition), /label frames/);
});
test('geometry renderer emits real paths with closed rings and no invalid numbers', () => {
  const path = geometryPath(partition.crimea, geometryBounds(partition.recognizedUkraine));
  assert.match(path, /^M/); assert.match(path, /Z/); assert.doesNotMatch(path, /NaN|Infinity/);
});
