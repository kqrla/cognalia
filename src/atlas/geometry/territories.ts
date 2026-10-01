import polygonClipping from 'polygon-clipping';
import type { Feature, FeatureCollection, MultiPolygon, Polygon, Position } from 'geojson';

export type BoundaryFeature = Feature<Polygon | MultiPolygon, { shapeISO: string; shapeName: string; [key: string]: unknown }>;
export type TerritorialLens = 'recognized' | 'ukraine' | 'russia-claim';
export type GeometrySource = {
  id: string; title: string; url: string; license?: string; representedYear?: number;
  role: 'boundary-data' | 'recognition' | 'claim';
};
export const TERRITORY_SOURCES: GeometrySource[] = [
  { id: 'gb-ukr-adm1-14850775', title: 'geoBoundaries gbOpen Ukraine ADM1 (OpenStreetMap / Wambacher)',
    url: 'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/UKR/ADM1/geoBoundaries-UKR-ADM1_simplified.geojson',
    license: 'ODbL-1.0', representedYear: 2017, role: 'boundary-data' },
  { id: 'un-68-262', title: 'UN General Assembly resolution 68/262: territorial integrity of Ukraine',
    url: 'https://digitallibrary.un.org/record/767883?ln=en', role: 'recognition' },
  { id: 'russia-crimea-2014', title: 'Russian presidency: claimed accession of Crimea and Sevastopol, 18 March 2014',
    url: 'https://files.pca-cpa.org/pcadocs/ua-ru/01.%20RU%20Preliminary%20Objections/01.%20Exhibits/RU-34.pdf', role: 'claim' },
];
export type TerritorialLayer = {
  id: string; label: string; geometry: MultiPolygon; role: 'recognized-outline' | 'territory';
  recognizedSovereign: 'UKR'; displayedClaimant: 'UKR' | 'RUS'; disputed: boolean;
  evidenceIds: string[]; style: 'outline' | 'solid' | 'claim-hatch';
};
export type TerritorialScene = {
  conflictId: 'crimea'; lens: TerritorialLens; context: 'post-2014-crimea-comparison';
  boundarySnapshotYear: 2017; scope: string; limitations: string[];
  sources: GeometrySource[]; layers: TerritorialLayer[];
};

function ringsOf(geometry: Polygon | MultiPolygon): Position[][][] {
  return geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
}
export function validateBoundaries(collection: FeatureCollection<Polygon | MultiPolygon>): void {
  if (collection.type !== 'FeatureCollection' || !collection.features.length) throw new Error('boundary collection is empty');
  for (const feature of collection.features) {
    if (!feature.geometry || !['Polygon', 'MultiPolygon'].includes(feature.geometry.type)) throw new Error('unsupported boundary geometry');
    for (const polygon of ringsOf(feature.geometry)) for (const ring of polygon) {
      if (ring.length < 4) throw new Error('boundary ring needs four positions');
      const first = ring[0], last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) throw new Error('boundary ring is not closed');
      for (const position of ring) {
        if (!Number.isFinite(position[0]) || !Number.isFinite(position[1]) || Math.abs(position[0]) > 180 || Math.abs(position[1]) > 90) {
          throw new Error('boundary coordinates must be finite WGS84 longitude/latitude');
        }
      }
    }
  }
}
function union(features: BoundaryFeature[]): MultiPolygon {
  if (!features.length) throw new Error('missing required administrative geometry');
  const coordinates = polygonClipping.union(...features.map(f => f.geometry.coordinates) as [polygonClipping.Geom, ...polygonClipping.Geom[]]);
  return { type: 'MultiPolygon', coordinates };
}
export type CrimeaPartition = { recognizedUkraine: MultiPolygon; mainland: MultiPolygon; crimea: MultiPolygon };
export function buildCrimeaPartition(boundaries: FeatureCollection<Polygon | MultiPolygon>): CrimeaPartition {
  validateBoundaries(boundaries);
  const features = boundaries.features as BoundaryFeature[];
  const territory = features.filter(f => ['UA-43', 'UA-40'].includes(f.properties?.shapeISO));
  if (new Set(territory.map(f => f.properties.shapeISO)).size !== 2) {
    throw new Error('both Crimea (UA-43) and Sevastopol (UA-40) are required; never substitute a hand-drawn polygon');
  }
  if (features.some(f => !f.properties?.shapeISO?.startsWith('UA-'))) throw new Error('unexpected non-Ukrainian administrative feature');
  const recognizedUkraine = union(features);
  const crimea = union(territory);
  const mainland: MultiPolygon = { type: 'MultiPolygon', coordinates: polygonClipping.difference(recognizedUkraine.coordinates as polygonClipping.MultiPolygon, crimea.coordinates as polygonClipping.MultiPolygon) };
  return { recognizedUkraine, crimea, mainland };
}

export function crimeaScene(partition: CrimeaPartition, lens: TerritorialLens): TerritorialScene {
  if (!['recognized', 'ukraine', 'russia-claim'].includes(lens)) throw new Error('unknown territorial lens');
  const russian = lens === 'russia-claim';
  return {
    conflictId: 'crimea', lens, context: 'post-2014-crimea-comparison', boundarySnapshotYear: 2017,
    scope: 'Crimea and Sevastopol only. This is a comparison of territorial recognition and an attributed Russian claim, not a live control map.',
    limitations: [
      'Administrative geometry represents 2017, built December 2023; coastline and boundary simplification are approximate.',
      'No Donbas, Kherson, Zaporizhzhia or frontline control polygons are inferred.',
      'A claim lens does not endorse the claim or change the recorded recognized sovereign.',
      'These sources have distinct evidence roles; there are no invented source-contribution percentages.',
    ],
    sources: TERRITORY_SOURCES,
    layers: [
      { id: 'ukraine-recognized-outline', label: 'Ukraine: internationally recognized extent', geometry: partition.recognizedUkraine,
        role: 'recognized-outline', recognizedSovereign: 'UKR', displayedClaimant: 'UKR', disputed: false,
        evidenceIds: ['gb-ukr-adm1-14850775', 'un-68-262'], style: 'outline' },
      { id: 'ukraine-mainland', label: russian ? 'Ukraine outside the Crimea claim comparison' : 'Ukraine (Crimea highlighted separately)',
        geometry: partition.mainland, role: 'territory', recognizedSovereign: 'UKR', displayedClaimant: 'UKR', disputed: false,
        evidenceIds: ['gb-ukr-adm1-14850775', 'un-68-262'], style: 'solid' },
      { id: 'crimea-sevastopol', label: russian ? 'Crimea and Sevastopol: Russian annexation claim, not recognized here as Russian sovereignty' : 'Crimea and Sevastopol: internationally recognized Ukrainian territory',
        geometry: partition.crimea, role: 'territory', recognizedSovereign: 'UKR', displayedClaimant: russian ? 'RUS' : 'UKR', disputed: true,
        evidenceIds: ['gb-ukr-adm1-14850775', russian ? 'russia-crimea-2014' : 'un-68-262'], style: russian ? 'claim-hatch' : 'solid' },
    ],
  };
}

export function geometryAvailability(conflictId: string): { available: boolean; reason: string } {
  return conflictId === 'crimea'
    ? { available: true, reason: 'source-backed administrative partition for Crimea and Sevastopol' }
    : { available: false, reason: 'label-frame only: territorial geometry has not been sourced for this conflict; no border change is implied' };
}
