// mock data for /demo/dashboard - shows what a populated account
// looks like without anyone ever creating one. shapes match the real
// RecentConcept / AnalogyPreset types so the dashboard view renders
// identically.

import type { RecentConcept } from "./types";
import type { AnalogyPreset } from "./presets";

const day = (n: number) => Date.now() - n * 86_400_000;

const filler = {
  mapping: [],
  visual_mermaid: "",
  visual_kind: "mindmap" as const,
  bridge: "",
  real_explanation: "",
  limits: "",
};

export const demoRecents: RecentConcept[] = [
  { id: "d1", concept: "backpropagation", system: "cooking_recipe", createdAt: day(0), source: "ai", tags: ["machine learning", "calculus"], explanation: { ...filler, analogy: "tasting a stew, then adjusting each ingredient by how much it threw off the final flavour." } },
  { id: "d2", concept: "monads", system: "building_lego", createdAt: day(1), source: "ai", tags: ["programming", "abstraction"], explanation: { ...filler, analogy: "snap-on adapters that let two lego pieces with incompatible studs still click together." } },
  { id: "d3", concept: "entropy", system: "storage_organization", createdAt: day(2), source: "ai", tags: ["physics", "information"], explanation: { ...filler, analogy: "the number of equally-valid ways your drawer could be 'this messy'." } },
  { id: "d4", concept: "TCP handshake", system: "relationship_dynamics", createdAt: day(2), source: "ai", tags: ["networking"], explanation: { ...filler, analogy: "two strangers confirming they can both hear each other before starting a real conversation." } },
  { id: "d5", concept: "git rebase", system: "story_narrative", createdAt: day(4), source: "ai", tags: ["programming"], explanation: { ...filler, analogy: "re-editing your diary so it reads as if today's plot twist was always coming." } },
  { id: "d6", concept: "feynman technique", system: "story_narrative", createdAt: day(5), source: "ai", tags: ["learning"], explanation: { ...filler, analogy: "teaching it to a child until your own confusion bubbles up where the language breaks." } },
  { id: "d7", concept: "byzantine fault tolerance", system: "relationship_dynamics", createdAt: day(6), source: "ai", tags: ["distributed systems"], explanation: { ...filler, analogy: "agreeing on dinner plans in a group chat where some friends are actively lying." } },
  { id: "d8", concept: "kafka topics", system: "traffic_flow", createdAt: day(8), source: "ai", tags: ["distributed systems"], explanation: { ...filler, analogy: "a postal sorting belt: producers drop letters, consumers pick them up at their own pace." } },
  { id: "d9", concept: "transformers attention", system: "relationship_dynamics", createdAt: day(9), source: "ai", tags: ["machine learning"], explanation: { ...filler, analogy: "in a noisy room, deciding who to lean toward based on who's currently saying something relevant." } },
  { id: "d10", concept: "category theory", system: "building_lego", createdAt: day(11), source: "ai", tags: ["abstraction"], explanation: { ...filler, analogy: "the grammar of how lego sets translate into other lego sets while preserving their shape." } },
  { id: "d11", concept: "double-entry accounting", system: "storage_organization", createdAt: day(12), source: "ai", tags: ["finance"], explanation: { ...filler, analogy: "every money move recorded twice — once as 'left the room', once as 'entered another room'." } },
  { id: "d12", concept: "kubernetes operators", system: "company_startup", createdAt: day(13), source: "ai", tags: ["distributed systems"], explanation: { ...filler, analogy: "a manager you hired specifically to keep one weird internal service alive and on-spec." } },
];

export const demoPresets: AnalogyPreset[] = [
  { id: "p1", label: "kitchen as systems lab", description: "every appliance is a process; every counter is a buffer.", createdAt: day(20) },
  { id: "p2", label: "library card catalog", description: "an index that points at where the real content lives.", createdAt: day(22) },
  { id: "p3", label: "concert sound mixing", description: "tuning many overlapping signals so each stays legible.", createdAt: day(25) },
];
