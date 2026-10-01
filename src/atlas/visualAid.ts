import type { MultiPolygon } from 'geojson';
import { crimeaScene, geometryAvailability, type CrimeaPartition, type TerritorialLens, type TerritorialScene } from './geometry/territories.ts';

/** Serializable shared-item state. Transport, storage and voice are deliberately external. */
export type AtlasAidState = {
  kind: 'atlas-aid'; version: 1; conflictId: string; perspectiveId: string;
  year: number; activeMemberships: string[]; identityTag: { kind: 'religion' | 'language' | 'secular'; tag: string } | null;
  legalFamilies: string[]; legalSubtraditions: string[];
};
export type AtlasAidOperation =
  | { type: 'set-perspective'; perspectiveId: string }
  | { type: 'set-year'; year: number }
  | { type: 'toggle-membership'; id: string }
  | { type: 'set-identity-tag'; tag: AtlasAidState['identityTag'] }
  | { type: 'set-legal-families'; families: string[]; subtraditions?: string[] };
export function createAtlasAid(conflictId = 'crimea'): AtlasAidState {
  return { kind: 'atlas-aid', version: 1, conflictId, perspectiveId: 'neutral', year: 2025,
    activeMemberships: [], identityTag: null, legalFamilies: [], legalSubtraditions: [] };
}
export function applyAtlasOperation(state: AtlasAidState, operation: AtlasAidOperation): AtlasAidState {
  switch (operation.type) {
    case 'set-perspective': return { ...state, perspectiveId: operation.perspectiveId };
    case 'set-year': {
      if (!Number.isInteger(operation.year) || operation.year < 1200 || operation.year > 2025) throw new Error('ported timeline range is 1200–2025; newer historical data is not supplied');
      return { ...state, year: operation.year };
    }
    case 'toggle-membership': return { ...state, activeMemberships: state.activeMemberships.includes(operation.id)
      ? state.activeMemberships.filter(id => id !== operation.id) : [...state.activeMemberships, operation.id] };
    case 'set-identity-tag': return { ...state, identityTag: operation.tag ? { ...operation.tag } : null };
    case 'set-legal-families': return { ...state, legalFamilies: [...new Set(operation.families)], legalSubtraditions: [...new Set(operation.subtraditions ?? [])] };
  }
}
export function territorialSceneFor(state: AtlasAidState, partition: CrimeaPartition): TerritorialScene {
  if (!geometryAvailability(state.conflictId).available) throw new Error('this conflict has attributed label frames only, not territorial geometry');
  if (state.year < 2014) throw new Error('post-2014 claim comparison cannot be projected backward into history');
  const lenses: Record<string, TerritorialLens> = { neutral: 'recognized', ukraine: 'ukraine', russia: 'russia-claim' };
  const lens = lenses[state.perspectiveId];
  if (!lens) throw new Error('unsupported Crimea perspective');
  return crimeaScene(partition, lens);
}

export function geometryBounds(geometry: MultiPolygon): [number, number, number, number] {
  let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
  for (const polygon of geometry.coordinates) for (const ring of polygon) for (const [x, y] of ring) {
    west = Math.min(west, x); south = Math.min(south, y); east = Math.max(east, x); north = Math.max(north, y);
  }
  return [west, south, east, north];
}
/** Local equirectangular teaching view, not a navigational/area-accurate projection. */
export function geometryPath(geometry: MultiPolygon, bounds: [number, number, number, number], width = 800, height = 540): string {
  const [west, south, east, north] = bounds;
  const cosine = Math.cos(((south + north) / 2) * Math.PI / 180);
  const scale = Math.min((width - 48) / ((east - west) * cosine), (height - 48) / (north - south));
  const xOffset = (width - (east - west) * cosine * scale) / 2;
  const yOffset = (height - (north - south) * scale) / 2;
  return geometry.coordinates.flatMap(polygon => polygon.map(ring => ring.map(([x, y], i) =>
    `${i ? 'L' : 'M'}${(xOffset + (x - west) * cosine * scale).toFixed(3)},${(yOffset + (north - y) * scale).toFixed(3)}`).join(' ') + ' Z')).join(' ');
}
/** Replace only this item's SVG contents; never flatten it into a screenshot. */
export function renderTerritorialAid(svg: SVGSVGElement, scene: TerritorialScene, onSelect?: (id: string) => void): void {
  const NS = 'http://www.w3.org/2000/svg';
  svg.replaceChildren(); svg.setAttribute('viewBox', '0 0 800 540');
  svg.setAttribute('role', onSelect ? 'group' : 'img'); svg.setAttribute('aria-label', `${scene.scope} Lens: ${scene.lens}`);
  const title = document.createElementNS(NS, 'title'); title.textContent = scene.scope; svg.append(title);
  // Per-instance ids prevent collision when several aids live on one whiteboard.
  const hatchId = `claim-${globalThis.crypto.randomUUID()}`;
  const defs = document.createElementNS(NS, 'defs');
  const pattern = document.createElementNS(NS, 'pattern'); pattern.setAttribute('id', hatchId);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse'); pattern.setAttribute('width', '8'); pattern.setAttribute('height', '8');
  const line = document.createElementNS(NS, 'path'); line.setAttribute('d', 'M0,8 L8,0'); line.setAttribute('stroke', 'currentColor'); line.setAttribute('stroke-width', '1.5');
  pattern.append(line); defs.append(pattern); svg.append(defs);
  const bounds = geometryBounds(scene.layers[0].geometry);
  // Territories first; recognized boundary stays visible above every claim.
  const layers = [...scene.layers].sort((a, b) => Number(a.role === 'recognized-outline') - Number(b.role === 'recognized-outline'));
  for (const layer of layers) {
    const path = document.createElementNS(NS, 'path'); path.setAttribute('d', geometryPath(layer.geometry, bounds));
    path.setAttribute('fill-rule', 'evenodd'); path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', layer.role === 'recognized-outline' ? '2' : '0.8');
    path.setAttribute('fill', layer.style === 'outline' ? 'none' : layer.style === 'claim-hatch' ? `url(#${hatchId})` : 'currentColor');
    if (layer.style === 'solid') path.setAttribute('fill-opacity', layer.id === 'crimea-sevastopol' ? '0.55' : '0.16');
    if (layer.style === 'outline' || layer.style === 'claim-hatch') path.setAttribute('stroke-dasharray', '5 3');
    path.dataset.layerId = layer.id; path.dataset.recognizedSovereign = layer.recognizedSovereign;
    const tooltip = document.createElementNS(NS, 'title'); tooltip.textContent = layer.label; path.append(tooltip);
    if (layer.role === 'recognized-outline') path.setAttribute('pointer-events', 'none');
    else if (onSelect) {
      path.setAttribute('tabindex', '0'); path.setAttribute('role', 'button'); path.setAttribute('aria-label', layer.label);
      path.addEventListener('click', () => onSelect(layer.id));
      path.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(layer.id); } });
    }
    svg.append(path);
  }
}
