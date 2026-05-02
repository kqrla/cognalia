// shape of an explanation as returned by the explain edge function.
// kept identical to the tool-call schema so the contract is in one place.

import type { AnalogySystemId } from "./systems";

export type AnalogyMappingPair = {
  analogy_part: string;
  real_part: string;
};

export type VisualKind = "mindmap" | "tree" | "flow" | "stack";

export type Explanation = {
  analogy: string;
  mapping: AnalogyMappingPair[];
  visual_mermaid: string;
  visual_kind: VisualKind;
  real_explanation: string;
  limits: string;
};

export type RecentConcept = {
  id: string;
  concept: string;
  system: AnalogySystemId;
  createdAt: number;
  // we cache the full explanation locally so revisiting is instant
  // and works offline. the edge function is only called for new concepts.
  explanation: Explanation;
  source: "ai" | "curated";
};
