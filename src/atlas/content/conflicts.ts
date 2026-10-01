/**
 * Conflict definitions and perspective frames for Atlas visual aids.
 *
 * Extracted from Conflict page into pure TS content.
 * Perspective labels are marked as attributed frames, not factual endorsements.
 * Contains no React dependencies and does not mutate REGIONS.
 */

export interface PerspectiveFrame {
  id: string;
  label: string;
  /** ISO 3166-1 alpha-3 code overrides applied to labels + tooltips */
  overrides: Record<string, string>;
  /** Explicit attribution metadata designating this entry as a perspective frame */
  isAttributedFrame: true;
  frameType: "attributed_perspective" | "neutral_cartography";
  attributionNote: string;
}

export interface ConflictDef {
  id: string;
  label: string;
  blurb: string;
  center: [number, number];
  zoom: number;
  /** ISO codes of the parties tangled in the dispute */
  parties: string[];
  /** ISO codes of outside powers backing a side ("primary ally") */
  allies?: string[];
  perspectives: PerspectiveFrame[];
}

export const CONFLICTS: Record<string, ConflictDef> = {
  kashmir: {
    id: "kashmir",
    label: "kashmir",
    blurb: "a valley claimed by three states; the border depends on the page.",
    center: [34, 76],
    zoom: 6,
    parties: ["IND", "PAK", "CHN"],
    perspectives: [
      {
        id: "india",
        label: "india perspective",
        overrides: { IND: "India (incl. J&K)", PAK: "Pakistan-Occupied Kashmir" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to the Indian state perspective; not a factual endorsement.",
      },
      {
        id: "pakistan",
        label: "pakistan perspective",
        overrides: { PAK: "Pakistan (incl. Azad Kashmir)", IND: "India (Indian-Occupied Kashmir)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to the Pakistani state perspective; not a factual endorsement.",
      },
      {
        id: "neutral",
        label: "neutral cartography",
        overrides: { IND: "India", PAK: "Pakistan" },
        isAttributedFrame: true,
        frameType: "neutral_cartography",
        attributionNote: "Attributed to international neutral cartographic conventions; not a factual endorsement.",
      },
    ],
  },
  palestine: {
    id: "palestine",
    label: "palestine · israel",
    blurb: "the same coastline, named twice. the dial swaps the legend.",
    center: [31.5, 35],
    zoom: 7,
    parties: ["ISR", "PSE"],
    allies: ["USA"],
    perspectives: [
      {
        id: "arab",
        label: "arab perspective",
        overrides: { ISR: "Palestine (1948 borders)", PSE: "Palestine" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to the Arab regional perspective; not a factual endorsement.",
      },
      {
        id: "imperial",
        label: "imperial / western perspective",
        overrides: { ISR: "Israel", PSE: "West Bank & Gaza" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Western/imperial cartographic framing; not a factual endorsement.",
      },
      {
        id: "neutral",
        label: "neutral cartography",
        overrides: { ISR: "Israel · Palestine", PSE: "Palestinian Territories" },
        isAttributedFrame: true,
        frameType: "neutral_cartography",
        attributionNote: "Attributed to international neutral cartographic naming; not a factual endorsement.",
      },
    ],
  },
  taiwan: {
    id: "taiwan",
    label: "taiwan strait",
    blurb: "a province on one map, a republic on the other.",
    center: [24, 121],
    zoom: 6,
    parties: ["CHN", "TWN"],
    allies: ["USA"],
    perspectives: [
      {
        id: "prc",
        label: "prc perspective",
        overrides: { TWN: "Taiwan Province (PRC)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to the PRC official perspective; not a factual endorsement.",
      },
      {
        id: "roc",
        label: "taiwan perspective",
        overrides: { TWN: "Republic of China (Taiwan)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to the Republic of China (Taiwan) perspective; not a factual endorsement.",
      },
      {
        id: "neutral",
        label: "neutral cartography",
        overrides: { TWN: "Taiwan" },
        isAttributedFrame: true,
        frameType: "neutral_cartography",
        attributionNote: "Attributed to informal common usage cartography; not a factual endorsement.",
      },
    ],
  },
  westernsahara: {
    id: "westernsahara",
    label: "western sahara",
    blurb: "the last unfinished decolonisation in africa.",
    center: [24.5, -13],
    zoom: 5,
    parties: ["MAR", "ESH"],
    perspectives: [
      {
        id: "morocco",
        label: "morocco perspective",
        overrides: { ESH: "Southern Provinces (Morocco)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Moroccan administration perspective; not a factual endorsement.",
      },
      {
        id: "polisario",
        label: "sahrawi (polisario) perspective",
        overrides: { ESH: "Sahrawi Arab Democratic Republic" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Polisario Front / SADR perspective; not a factual endorsement.",
      },
      {
        id: "neutral",
        label: "un cartography",
        overrides: { ESH: "Western Sahara (non-self-governing)" },
        isAttributedFrame: true,
        frameType: "neutral_cartography",
        attributionNote: "Attributed to United Nations non-self-governing territory designation.",
      },
    ],
  },
  crimea: {
    id: "crimea",
    label: "crimea & eastern ukraine",
    blurb: "annexed in one atlas, occupied in another.",
    center: [46.5, 35],
    zoom: 5,
    parties: ["UKR", "RUS"],
    allies: ["USA"],
    perspectives: [
      {
        id: "russia",
        label: "russia perspective",
        overrides: { UKR: "Ukraine (excl. Crimea, Donbas)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Russian official perspective; not a factual endorsement.",
      },
      {
        id: "ukraine",
        label: "ukraine perspective",
        overrides: { UKR: "Ukraine (incl. Crimea & occupied oblasts)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Ukrainian state perspective; not a factual endorsement.",
      },
      {
        id: "neutral",
        label: "un cartography",
        overrides: { UKR: "Ukraine" },
        isAttributedFrame: true,
        frameType: "neutral_cartography",
        attributionNote: "Attributed to UN General Assembly recognized borders; not a factual endorsement.",
      },
    ],
  },
  cyprus: {
    id: "cyprus",
    label: "cyprus",
    blurb: "one island, one green line.",
    center: [35, 33],
    zoom: 8,
    parties: ["CYP", "TUR"],
    perspectives: [
      {
        id: "roc",
        label: "republic of cyprus",
        overrides: { CYP: "Republic of Cyprus (whole island)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Republic of Cyprus legal framing; not a factual endorsement.",
      },
      {
        id: "trnc",
        label: "turkish perspective",
        overrides: { CYP: "Cyprus · TRNC (north)" },
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Turkish / TRNC administration frame; not a factual endorsement.",
      },
    ],
  },
  hongkong: {
    id: "hongkong",
    label: "hong kong",
    blurb: "one country, two systems — until when?",
    center: [22.3, 114.1],
    zoom: 9,
    parties: ["CHN"],
    perspectives: [
      {
        id: "prc",
        label: "prc perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to PRC central government framing; not a factual endorsement.",
      },
      {
        id: "prodem",
        label: "pro-democracy perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Hong Kong pro-democracy civil perspective; not a factual endorsement.",
      },
    ],
  },
  puertorico: {
    id: "puertorico",
    label: "puerto rico",
    blurb: "territory, state, or sovereign — three maps in waiting.",
    center: [18.2, -66.5],
    zoom: 8,
    parties: ["USA"],
    perspectives: [
      {
        id: "usa",
        label: "us territory",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to US Commonwealth political status; not a factual endorsement.",
      },
      {
        id: "statehood",
        label: "statehood advocates",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Puerto Rican statehood movement framing; not a factual endorsement.",
      },
      {
        id: "independence",
        label: "independence advocates",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Puerto Rican independence movement framing; not a factual endorsement.",
      },
    ],
  },
  tibet: {
    id: "tibet",
    label: "tibet",
    blurb: "a plateau, a government-in-exile, a contested past.",
    center: [31.5, 88],
    zoom: 5,
    parties: ["CHN"],
    perspectives: [
      {
        id: "prc",
        label: "prc perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to PRC Autonomous Region framing; not a factual endorsement.",
      },
      {
        id: "exile",
        label: "tibetan gov-in-exile",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Central Tibetan Administration framing; not a factual endorsement.",
      },
    ],
  },
  chechnya: {
    id: "chechnya",
    label: "chechnya",
    blurb: "a federation subject, or a sovereign caucasus.",
    center: [43.4, 45.7],
    zoom: 7,
    parties: ["RUS"],
    perspectives: [
      {
        id: "russia",
        label: "russia perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Russian Federal Subject framing; not a factual endorsement.",
      },
      {
        id: "separatist",
        label: "chechen separatist",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Chechen Republic of Ichkeria framing; not a factual endorsement.",
      },
    ],
  },
  gibraltar: {
    id: "gibraltar",
    label: "gibraltar",
    blurb: "a rock with two flags pinned to it.",
    center: [36.14, -5.35],
    zoom: 11,
    parties: ["GBR", "ESP"],
    perspectives: [
      {
        id: "uk",
        label: "uk perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to British Overseas Territory framing; not a factual endorsement.",
      },
      {
        id: "spain",
        label: "spain perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Spanish territorial claim framing; not a factual endorsement.",
      },
    ],
  },
  greenland: {
    id: "greenland",
    label: "greenland",
    blurb: "a kingdom holding an island that's almost a continent.",
    center: [72, -40],
    zoom: 3,
    parties: ["DNK", "GRL"],
    perspectives: [
      {
        id: "denmark",
        label: "kingdom of denmark",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Kingdom of Denmark realm framing; not a factual endorsement.",
      },
      {
        id: "independence",
        label: "independence advocates",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Greenlandic sovereignty movement framing; not a factual endorsement.",
      },
    ],
  },
  falklands: {
    id: "falklands",
    label: "falklands · malvinas",
    blurb: "two names, one wind-scraped archipelago.",
    center: [-51.7, -59],
    zoom: 7,
    parties: ["GBR", "ARG"],
    perspectives: [
      {
        id: "uk",
        label: "uk perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to British Overseas Territory framing; not a factual endorsement.",
      },
      {
        id: "argentina",
        label: "argentina perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Argentine sovereignty claim framing; not a factual endorsement.",
      },
    ],
  },
  guantanamo: {
    id: "guantanamo",
    label: "guantánamo bay",
    blurb: "a lease that one side stopped cashing.",
    center: [19.9, -75.15],
    zoom: 10,
    parties: ["USA", "CUB"],
    perspectives: [
      {
        id: "usa",
        label: "us perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to US perpetual lease framing; not a factual endorsement.",
      },
      {
        id: "cuba",
        label: "cuba perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Cuban sovereign territory framing; not a factual endorsement.",
      },
    ],
  },
  catalonia: {
    id: "catalonia",
    label: "catalonia",
    blurb: "a parliament, a referendum, a republic still pending.",
    center: [41.8, 1.7],
    zoom: 7,
    parties: ["ESP"],
    perspectives: [
      {
        id: "spain",
        label: "spain perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Spanish Autonomous Community framing; not a factual endorsement.",
      },
      {
        id: "indep",
        label: "catalan independence",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Catalan self-determination movement framing; not a factual endorsement.",
      },
    ],
  },
  basque: {
    id: "basque",
    label: "basque country",
    blurb: "a language older than the borders that cross it.",
    center: [43, -2],
    zoom: 7,
    parties: ["ESP", "FRA"],
    perspectives: [
      {
        id: "spain",
        label: "spain perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Spanish regional governance framing; not a factual endorsement.",
      },
      {
        id: "basque",
        label: "basque nationalist",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Basque cultural/nationalist framing; not a factual endorsement.",
      },
    ],
  },
  golan: {
    id: "golan",
    label: "golan heights",
    blurb: "a plateau annexed on one map, occupied on another.",
    center: [33, 35.8],
    zoom: 9,
    parties: ["ISR", "SYR"],
    allies: ["USA"],
    perspectives: [
      {
        id: "israel",
        label: "israel perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Israeli sovereignty law framing; not a factual endorsement.",
      },
      {
        id: "syria",
        label: "syria perspective",
        overrides: {},
        isAttributedFrame: true,
        frameType: "attributed_perspective",
        attributionNote: "Attributed to Syrian sovereign territory framing; not a factual endorsement.",
      },
    ],
  },
};

export function getConflict(id: string): ConflictDef | undefined {
  return CONFLICTS[id];
}

export function getPerspective(conflictId: string, perspectiveId: string): PerspectiveFrame | undefined {
  const conflict = CONFLICTS[conflictId];
  return conflict?.perspectives.find((p) => p.id === perspectiveId);
}

export function listConflicts(): ConflictDef[] {
  return Object.values(CONFLICTS);
}
