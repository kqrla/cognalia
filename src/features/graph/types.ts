// understanding graph types. this is a living map of how the user
// understands concepts, not a notes store. nodes and edges are
// minimal on purpose - depth comes from the relationships, not
// from text crammed inside boxes.

import type { AnalogySystemId } from "@/features/analogy/systems";
import type { Explanation } from "@/features/analogy/types";

export type UnderstandingState = "clicked" | "kinda" | "unclear";

export type GraphNode = {
  id: string; // slug of concept, lowercased
  concept: string;
  state: UnderstandingState;
  // last analogy system used to explain this concept
  system: AnalogySystemId;
  systemsUsed: AnalogySystemId[];
  createdAt: number;
  updatedAt: number;
  // optional cached explanation snapshot so revisiting from the
  // graph is instant. the full explain page can refetch if needed.
  lastExplanation?: Explanation;
  // per-system "click signal". each entry tracks how many times the
  // user *kept* an analogy (shown) vs how many times they immediately
  // regenerated away from it (regen). low keep / high regen ⇒ this
  // analogy didn't land for this user, so we deprioritise it next time.
  systemSignals?: Record<string, { shown: number; regen: number }>;
};

// strict edge vocabulary. generic "related" is intentionally not allowed.
export type EdgeType =
  | "part_of"
  | "similar_pattern"
  | "depends_on"
  | "behaves_like";

export type GraphEdge = {
  id: string; // `${from}->${to}:${type}`
  from: string;
  to: string;
  type: EdgeType;
  // optional human-readable reason. surfaced when a user taps the edge.
  reason?: string;
  createdAt: number;
  // pending = suggested but not yet accepted
  status: "active" | "pending";
};

export type GraphState = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export const edgeStyle: Record<
  EdgeType,
  { label: string; line: "solid" | "dashed"; tone: "structural" | "analogy" }
> = {
  part_of: { label: "is a part of", line: "solid", tone: "structural" },
  depends_on: { label: "depends on", line: "solid", tone: "structural" },
  similar_pattern: {
    label: "similar pattern to",
    line: "dashed",
    tone: "analogy",
  },
  behaves_like: { label: "behaves like", line: "dashed", tone: "analogy" },
};
