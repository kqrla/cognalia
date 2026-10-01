/**
 * Data Provenance Manifest for Atlas Content in Cognalia
 *
 * Describes the origin, import status, disclaimers, and caveats for the
 * imported wandery content.
 */

export interface ProvenanceManifest {
  title: string;
  sourceArchive: string;
  importProvenance: string;
  authorityDisclaimer: string;
  attributionPolicy: string;
  knownApproximations: Record<string, string>;
  completenessCaveats: string[];
  importedModules: string[];
}

export const DATA_PROVENANCE: ProvenanceManifest = {
  title: "Wandery Content Import Provenance for Cognalia",
  sourceArchive: "incoming_files/1beb0ab8e_soft-atlas-explorer-main1.zip",
  importProvenance:
    "Wandery content imported from soft-atlas-explorer-main sandbox archive. Designed for portable visual aids and analogical mapping in Cognalia.",
  authorityDisclaimer:
    "This dataset serves as import provenance for sandbox visualization and MUST NOT be treated as a verified external authority or official cartographic endorsement.",
  attributionPolicy:
    "All perspective labels, territorial overrides, and conflict framings are attributed frames for comparative analysis and do NOT represent factual endorsements.",
  knownApproximations: {
    coordinates: "Center points and zoom levels are simplified heuristics optimized for interactive visual canvases.",
    territorialBoundaries: "Country affiliations use ISO 3166-1 alpha-3 identifiers and do not convey precise geodetic boundary lines.",
    historicalTimelines: "Polity spans and event dates are generalized models for narrative context.",
  },
  completenessCaveats: [
    "Dataset contains selective regional subsets rather than exhaustive global survey data.",
    "Legal systems and identity tags are high-level categorizations subject to historical and regional variations.",
    "Conflict perspectives represent key public positions and do not capture all internal nuance or sub-factions.",
  ],
  importedModules: [
    "archive.ts",
    "filters.ts",
    "history-events.ts",
    "history.ts",
    "identity.ts",
    "legal.ts",
    "regions.ts",
    "conflicts.ts",
  ],
};
