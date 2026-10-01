import { FILTERS, CONFLICTS, ARCHIVE, affiliationsForCountry, religionsFor, languagesFor, countriesForTag, legalBlend, LEGAL_SYSTEMS, POLITIES } from './content/index.ts';
import type { LegalSystem } from './content/legal.ts';
import type { AtlasAidState } from './visualAid.ts';
import { geometryAvailability } from './geometry/territories.ts';

export type MembershipLayer = { id: string; label: string; countryIds: string[]; evidenceId: 'atlas-import'; temporalStatus: 'undated-import' };
export type ExplorationModel = {
  perspective: { id: string; label: string; attributed: true; labels: Record<string, string>; geometryAvailable: boolean } | null;
  memberships: MembershipLayer[];
  intersections: Array<{ memberships: string[]; countryIds: string[] }>;
  identity: { kind: string; tag: string; countryIds: string[] } | null;
  legal: Array<{ iso: string; rgb: [number, number, number] }>;
  historicalPolities: Array<{ id: string; label: string; modernCountryIds: string[]; approximation: true }>;
  warnings: string[];
};
/** The same model can feed an interactive map, editable set diagram, country card or agent narration. */
export function explorationModel(state: AtlasAidState): ExplorationModel {
  const conflict = CONFLICTS[state.conflictId];
  const frame = conflict?.perspectives.find(p => p.id === state.perspectiveId);
  if (conflict && !frame) throw new Error('unknown perspective for this conflict');
  const memberships = state.activeMemberships.map(id => {
    const filter = FILTERS[id];
    if (!filter) throw new Error(`unknown membership layer: ${id}`);
    return { id, label: filter.label, countryIds: [...filter.countries].sort(), evidenceId: 'atlas-import' as const, temporalStatus: 'undated-import' as const };
  });
  const intersections: ExplorationModel['intersections'] = [];
  for (let i = 0; i < memberships.length; i++) for (let j = i + 1; j < memberships.length; j++) {
    const a = memberships[i], b = memberships[j];
    intersections.push({ memberships: [a.id, b.id], countryIds: a.countryIds.filter(iso => b.countryIds.includes(iso)) });
  }
  const allCountries = new Set(Object.values(LEGAL_SYSTEMS).flatMap(f => [...f.countries]));
  const legal: ExplorationModel['legal'] = [];
  for (const family of state.legalFamilies) if (!['common', 'civil', 'religious', 'customary'].includes(family)) throw new Error('unknown legal family');
  for (const iso of allCountries) {
    const rgb = legalBlend(iso, state.legalFamilies as LegalSystem[], state.legalSubtraditions);
    if (rgb) legal.push({ iso, rgb });
  }
  const geometry = geometryAvailability(state.conflictId);
  return {
    perspective: frame ? { id: frame.id, label: frame.label, attributed: true, labels: { ...frame.overrides }, geometryAvailable: geometry.available } : null,
    memberships, intersections,
    identity: state.identityTag ? { ...state.identityTag, countryIds: countriesForTag(state.identityTag.kind, state.identityTag.tag) } : null,
    legal,
    historicalPolities: POLITIES.filter(p => state.year >= p.from && state.year <= p.to).map(p => ({ id: p.id, label: p.name, modernCountryIds: [...p.members], approximation: true })),
    warnings: [
      'Imported memberships, identity labels and prose are not externally verified evidence.',
      'Membership sets are undated snapshots; moving the historical dial does not make them historically correct.',
      'Historical polity members are modern-country proxies, not reconstructed historical boundary polygons.',
      ...(geometry.available ? [] : [geometry.reason]),
    ],
  };
}
export function countryExplanationCard(iso: string) {
  return {
    iso, memberships: affiliationsForCountry(iso), religions: religionsFor(iso), languages: languagesFor(iso),
    narrative: ARCHIVE[iso] ?? null,
    evidenceId: 'atlas-import', verification: 'imported-unverified' as const,
  };
}
