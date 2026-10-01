import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { buildCrimeaPartition } from '../../src/atlas/geometry/territories.ts';
import { createAtlasAid, applyAtlasOperation, territorialSceneFor, renderTerritorialAid, type AtlasAidOperation } from '../../src/atlas/visualAid.ts';
import { explorationModel, countryExplanationCard } from '../../src/atlas/exploration.ts';
import { ARCHIVE } from '../../src/atlas/content/index.ts';

const $ = (id: string) => document.getElementById(id)!;
const svg = $('territory') as unknown as SVGSVGElement;
let state = createAtlasAid();
const response = await fetch('/atlas/ukraine-adm1.geojson');
if (!response.ok) throw new Error('boundary snapshot could not be loaded');
const partition = buildCrimeaPartition(await response.json() as FeatureCollection<Polygon | MultiPolygon>);
const perspectiveNames: Record<string, string> = { neutral: 'international recognition', ukraine: 'ukrainian framing', russia: 'russian annexation claim' };
for (const [id, label] of Object.entries(perspectiveNames)) {
  const button = document.createElement('button'); button.textContent = label; button.dataset.perspective = id;
  button.addEventListener('click', () => dispatch({ type: 'set-perspective', perspectiveId: id })); $('perspectives').append(button);
}
for (const id of ['eu', 'eea', 'schengen', 'nato', 'brics']) {
  const button = document.createElement('button'); button.textContent = id; button.dataset.membership = id;
  button.addEventListener('click', () => dispatch({ type: 'toggle-membership', id })); $('memberships').append(button);
}
function list(element: HTMLElement, texts: string[]): void {
  element.replaceChildren();
  for (const text of texts) { const item = document.createElement('li'); item.textContent = text; element.append(item); }
}
function dispatch(operation: AtlasAidOperation): void { state = applyAtlasOperation(state, operation); render(); }
function render(): void {
  const scene = territorialSceneFor(state, partition);
  renderTerritorialAid(svg, scene, id => {
    const layer = scene.layers.find(l => l.id === id)!;
    $('selection').textContent = `${layer.label}. Recognized sovereign: ${layer.recognizedSovereign}. Evidence: ${layer.evidenceIds.join(', ')}.`;
  });
  $('selection').textContent = 'select a territory to inspect its evidence.';
  document.querySelectorAll<HTMLButtonElement>('[data-perspective]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.perspective === state.perspectiveId)));
  document.querySelectorAll<HTMLButtonElement>('[data-membership]').forEach(b => b.setAttribute('aria-pressed', String(state.activeMemberships.includes(b.dataset.membership!))));
  $('sources').replaceChildren();
  for (const source of scene.sources) {
    const p = document.createElement('p'), link = document.createElement('a'); link.href = source.url; link.textContent = source.title;
    link.target = '_blank'; link.rel = 'noopener noreferrer'; p.append(link, ` (${source.role}${source.license ? '; ' + source.license : ''})`); $('sources').append(p);
  }
  list($('limitations'), scene.limitations);
  const model = explorationModel(state);
  $('membership-result').replaceChildren();
  for (const layer of model.memberships) {
    const details = document.createElement('details'), summary = document.createElement('summary'), p = document.createElement('p');
    summary.textContent = `${layer.label}: ${layer.countryIds.length} imported members`; p.textContent = layer.countryIds.join(', '); details.append(summary, p); $('membership-result').append(details);
  }
  for (const intersection of model.intersections) {
    const p = document.createElement('p'); p.textContent = `${intersection.memberships.join(' ∩ ')}: ${intersection.countryIds.length} (${intersection.countryIds.join(', ')})`; $('membership-result').append(p);
  }
  $('identity-result').textContent = model.identity ? `${model.identity.countryIds.length} tagged countries: ${model.identity.countryIds.join(', ')}` : '';
  $('legal-result').textContent = model.legal.length ? `${model.legal.length} matching countries: ${model.legal.map(l => l.iso).join(', ')}` : '';
  $('state').textContent = JSON.stringify(state, null, 2); list($('warnings'), model.warnings);
}
$('identity').addEventListener('change', e => {
  const value = (e.target as HTMLSelectElement).value;
  if (!value) return dispatch({ type: 'set-identity-tag', tag: null });
  const [kind, tag] = value.split(':');
  dispatch({ type: 'set-identity-tag', tag: { kind: kind as 'language' | 'religion' | 'secular', tag } });
});
$('legal').addEventListener('change', e => dispatch({ type: 'set-legal-families', families: (e.target as HTMLSelectElement).value ? [(e.target as HTMLSelectElement).value] : [] }));
const country = $('country') as HTMLSelectElement;
for (const [iso, entry] of Object.entries(ARCHIVE)) {
  const option = document.createElement('option'); option.value = iso; option.textContent = entry.name; country.append(option);
}
function countryProse(): void {
  const card = countryExplanationCard(country.value); $('country-prose').replaceChildren();
  if (!card.narrative) return;
  const intro = document.createElement('p'); intro.textContent = `${card.narrative.tagline}. Languages: ${card.languages.join(', ')}.`; $('country-prose').append(intro);
  for (const section of card.narrative.sections) {
    const details = document.createElement('details'), summary = document.createElement('summary'), p = document.createElement('p');
    summary.textContent = section.heading; p.textContent = section.body; details.append(summary, p); $('country-prose').append(details);
  }
}
country.addEventListener('change', countryProse); country.value = 'UKR'; countryProse(); render();
