/**
 * Cognalia Atlas Content Module Index
 * Re-exports content modules, types, and datasets for Atlas visual aids.
 * Resolves potential export name conflicts explicitly.
 */

export {
  type ArchiveSection,
  type ArchiveFacts,
  type ArchiveEntry,
  ARCHIVE,
  hasArchive,
} from "./archive.ts";

export {
  type FilterId,
  type FilterDef,
  FILTERS,
  WORLD_FILTERS,
  EUROPE_FILTERS,
  filtersFor,
  affiliationsForCountry,
} from "./filters.ts";

export {
  type WarSide,
  type WarDef,
  WARS,
  type TradeArrow,
  type TradeDef,
  TRADES,
  type AttackDef,
  ATTACKS,
  type EraDef,
  MAJOR_EVENTS,
} from "./history-events.ts";

export {
  COUNTRY_BIRTH,
  type Polity,
  POLITIES,
  polititiesAt,
  suppressedIsos,
  countryExists,
  COUNTRY_PAGE,
} from "./history.ts";

export {
  type Tag,
  religionsFor,
  languagesFor,
  type TagKind,
  countriesForTag,
  colorForTag,
  allKnownCountries,
} from "./identity.ts";

export {
  type LegalSystem,
  type LegalSystemDef,
  LEGAL_SYSTEMS,
  LEGAL_ORDER,
  legalBlend,
} from "./legal.ts";

export {
  type RegionConfig,
  REGIONS,
  REGION_ORDER,
  OTHER_ORDER,
} from "./regions.ts";

export {
  type PerspectiveFrame,
  type ConflictDef,
  CONFLICTS,
  getConflict,
  getPerspective,
  listConflicts,
} from "./conflicts.ts";

export {
  type ProvenanceManifest,
  DATA_PROVENANCE,
} from "./provenance.ts";
