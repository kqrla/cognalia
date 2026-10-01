import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as AtlasContent from "../src/atlas/content/index.ts";
import {
  CONFLICTS,
  getConflict,
  getPerspective,
  listConflicts,
} from "../src/atlas/content/conflicts.ts";
import { DATA_PROVENANCE } from "../src/atlas/content/provenance.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Atlas Content Suite", () => {
  describe("1. Core Conflict Labels & Perspectives (incl. Crimea)", () => {
    it("should load the Crimea conflict definition correctly", () => {
      const crimea = getConflict("crimea");
      assert.ok(crimea, "Crimea conflict definition should exist");
      assert.equal(crimea.id, "crimea");
      assert.equal(crimea.label, "crimea & eastern ukraine");
      assert.equal(crimea.blurb, "annexed in one atlas, occupied in another.");
      assert.deepEqual(crimea.center, [46.5, 35]);
      assert.equal(crimea.zoom, 5);
      assert.deepEqual(crimea.parties, ["UKR", "RUS"]);
      assert.deepEqual(crimea.allies, ["USA"]);
    });

    it("should provide attributed perspective frames for Crimea", () => {
      const crimea = CONFLICTS.crimea;
      assert.ok(crimea);

      const russiaP = getPerspective("crimea", "russia");
      assert.ok(russiaP);
      assert.equal(russiaP.label, "russia perspective");
      assert.equal(russiaP.overrides.UKR, "Ukraine (excl. Crimea, Donbas)");
      assert.equal(russiaP.isAttributedFrame, true);
      assert.equal(russiaP.frameType, "attributed_perspective");
      assert.ok(russiaP.attributionNote.includes("not a factual endorsement"));

      const ukraineP = getPerspective("crimea", "ukraine");
      assert.ok(ukraineP);
      assert.equal(ukraineP.label, "ukraine perspective");
      assert.equal(ukraineP.overrides.UKR, "Ukraine (incl. Crimea & occupied oblasts)");
      assert.equal(ukraineP.isAttributedFrame, true);
      assert.equal(ukraineP.frameType, "attributed_perspective");

      const neutralP = getPerspective("crimea", "neutral");
      assert.ok(neutralP);
      assert.equal(neutralP.label, "un cartography");
      assert.equal(neutralP.overrides.UKR, "Ukraine");
      assert.equal(neutralP.isAttributedFrame, true);
      assert.equal(neutralP.frameType, "neutral_cartography");
    });

    it("should mark ALL perspective labels across all conflicts as attributed frames", () => {
      const allConflicts = listConflicts();
      assert.equal(allConflicts.length, 17, "Should have 17 conflict definitions");

      for (const conflict of allConflicts) {
        assert.ok(conflict.id, "Conflict must have an id");
        assert.ok(conflict.label, "Conflict must have a label");
        assert.ok(Array.isArray(conflict.perspectives), "Must have perspectives array");
        assert.ok(conflict.perspectives.length > 0, "Perspectives array must not be empty");

        for (const p of conflict.perspectives) {
          assert.equal(
            p.isAttributedFrame,
            true,
            `Perspective ${p.id} in ${conflict.id} must be marked isAttributedFrame=true`
          );
          assert.ok(
            ["attributed_perspective", "neutral_cartography"].includes(p.frameType),
            `Perspective ${p.id} in ${conflict.id} must have valid frameType`
          );
          assert.ok(
            typeof p.attributionNote === "string" && p.attributionNote.length > 0,
            `Perspective ${p.id} in ${conflict.id} must have non-empty attributionNote`
          );
        }
      }
    });
  });

  describe("2. Mapping & Data Helper Functions", () => {
    it("should look up conflicts and perspectives via helper functions", () => {
      const kashmir = getConflict("kashmir");
      assert.ok(kashmir);
      assert.equal(kashmir.label, "kashmir");

      const indiaP = getPerspective("kashmir", "india");
      assert.ok(indiaP);
      assert.equal(indiaP.overrides.IND, "India (incl. J&K)");

      const nonExistent = getConflict("non-existent-id");
      assert.equal(nonExistent, undefined);
    });

    it("should execute region and filter mapping queries", () => {
      const europeFilters = AtlasContent.filtersFor("europe");
      assert.ok(Array.isArray(europeFilters));
      assert.ok(europeFilters.includes("eu"));

      const indReligions = AtlasContent.religionsFor("IND");
      assert.ok(indReligions);
      assert.ok(Array.isArray(indReligions.tags));

      const legal = AtlasContent.legalBlend("GBR", ["common"]);
      assert.ok(Array.isArray(legal) || legal === null);

      assert.equal(AtlasContent.countryExists("USA", 2020), true);
    });
  });

  describe("3. Data Import Reachability & Index Export", () => {
    it("should reach all exported data structures through the index export", () => {
      assert.ok(AtlasContent.ARCHIVE, "ARCHIVE re-export must be defined");
      assert.equal(typeof AtlasContent.hasArchive, "function");

      assert.ok(AtlasContent.FILTERS, "FILTERS re-export must be defined");
      assert.ok(Array.isArray(AtlasContent.WORLD_FILTERS));

      assert.ok(AtlasContent.WARS, "WARS re-export must be defined");
      assert.ok(AtlasContent.TRADES, "TRADES re-export must be defined");
      assert.ok(AtlasContent.ATTACKS, "ATTACKS re-export must be defined");
      assert.ok(AtlasContent.MAJOR_EVENTS, "MAJOR_EVENTS re-export must be defined");

      assert.ok(AtlasContent.COUNTRY_BIRTH, "COUNTRY_BIRTH re-export must be defined");
      assert.ok(Array.isArray(AtlasContent.POLITIES));

      assert.ok(AtlasContent.LEGAL_SYSTEMS, "LEGAL_SYSTEMS re-export must be defined");
      assert.ok(Array.isArray(AtlasContent.LEGAL_ORDER));

      assert.ok(AtlasContent.REGIONS, "REGIONS re-export must be defined");
      assert.ok(Array.isArray(AtlasContent.REGION_ORDER));

      assert.ok(AtlasContent.CONFLICTS, "CONFLICTS re-export must be defined");
      assert.ok(AtlasContent.DATA_PROVENANCE, "DATA_PROVENANCE re-export must be defined");
    });

    it("should provide complete provenance manifest metadata", () => {
      const prov = DATA_PROVENANCE;
      assert.equal(prov.sourceArchive, "incoming_files/1beb0ab8e_soft-atlas-explorer-main1.zip");
      assert.ok(prov.importProvenance.includes("soft-atlas-explorer-main"));
      assert.ok(prov.authorityDisclaimer.includes("MUST NOT be treated as a verified external authority"));
      assert.ok(prov.knownApproximations.coordinates);
      assert.ok(prov.completenessCaveats.length > 0);
      assert.ok(prov.importedModules.includes("conflicts.ts"));
    });
  });

  describe("4. No React / Lovable Scaffolding Dependencies", () => {
    it("should contain zero React or Lovable UI dependencies in atlas content files", () => {
      const contentDir = path.resolve(__dirname, "../src/atlas/content");
      const files = fs.readdirSync(contentDir);

      assert.ok(files.length >= 9, "Content directory must contain all imported pure TS modules");

      for (const file of files) {
        if (!file.endsWith(".ts")) continue;
        const filePath = path.join(contentDir, file);
        const code = fs.readFileSync(filePath, "utf-8");

        assert.doesNotMatch(
          code,
          /import\s+.*?\s+from\s+['"]react['"]/,
          `${file} must not import from 'react'`
        );
        assert.doesNotMatch(
          code,
          /import\s+.*?\s+from\s+['"]lucide-react['"]/,
          `${file} must not import from 'lucide-react'`
        );
        assert.doesNotMatch(
          code,
          /import\s+.*?\s+from\s+['"]@\/components/,
          `${file} must not import Lovable component scaffolding`
        );
        assert.doesNotMatch(
          code,
          /import\s+.*?\s+from\s+['"]@\/hooks/,
          `${file} must not import Lovable hook scaffolding`
        );
        assert.doesNotMatch(
          code,
          /useState|useMemo|useEffect|useCallback/,
          `${file} must not contain React hook calls`
        );
      }
    });
  });
});
