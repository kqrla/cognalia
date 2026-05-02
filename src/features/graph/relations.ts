// connection generation rules. quality over quantity.
//
// we deliberately do NOT auto-link by keyword soup. instead we use:
//   1. a curated map of well-known relationships between common concepts
//   2. a strict containment check ("git" contained in "git branches" → part_of)
//
// anything that does not match either rule produces NO edge. that keeps
// the graph meaningful: every line on the canvas exists for a reason.

import type { EdgeType } from "./types";

type Hint = {
  // both ids are slugs (snake_case). order matters for directed types.
  a: string;
  b: string;
  type: EdgeType;
  reason: string;
};

// a small, hand-curated relation library. expand carefully — every entry
// is an editorial decision about how concepts relate.
const curatedRelations: Hint[] = [
  // structural
  { a: "git", b: "branches", type: "part_of", reason: "branches live inside git" },
  { a: "git", b: "commits", type: "part_of", reason: "commits are the atoms of a git history" },
  { a: "git", b: "merge", type: "part_of", reason: "merging is part of how git resolves divergent histories" },
  { a: "api", b: "network", type: "depends_on", reason: "an api call is a network request under the hood" },
  { a: "rest_api", b: "network", type: "depends_on", reason: "rest sits on top of http on top of the network" },
  { a: "promises", b: "event_loop", type: "depends_on", reason: "promises are scheduled by the event loop" },
  { a: "react", b: "components", type: "part_of", reason: "components are react's primary unit" },
  { a: "components", b: "props", type: "part_of", reason: "props are how components receive data" },
  { a: "database", b: "indexes", type: "part_of", reason: "indexes live inside the database engine" },

  // analogy / behaves_like
  { a: "recursion", b: "git", type: "similar_pattern", reason: "both branch a smaller version of the same shape from a larger one" },
  { a: "recursion", b: "nested_loops", type: "similar_pattern", reason: "both repeat structure inside structure" },
  { a: "recursion", b: "decision_tree", type: "behaves_like", reason: "each call opens another branch to explore" },
  { a: "git", b: "decision_tree", type: "behaves_like", reason: "branches in git are alternate decision paths" },
  { a: "promises", b: "callbacks", type: "similar_pattern", reason: "both defer work until later" },
  { a: "promises", b: "async_await", type: "behaves_like", reason: "async/await is sugar over promises" },
  { a: "transformers", b: "attention", type: "depends_on", reason: "transformers are built around the attention mechanism" },
  { a: "neural_networks", b: "transformers", type: "part_of", reason: "transformers are a kind of neural network" },
  { a: "blockchain", b: "git", type: "behaves_like", reason: "both chain immutable snapshots that reference the previous state" },
];

// derive `to_part_of` candidates from name containment.
// e.g. user already has "git" and now adds "git branches" → part_of.
const containmentEdges = (
  newId: string,
  existingIds: string[],
): Hint[] => {
  const hints: Hint[] = [];
  for (const existing of existingIds) {
    if (existing === newId) continue;
    const parts = newId.split("_");
    const otherParts = existing.split("_");
    // newer id contains the older one as a prefix word → new is part of old
    if (parts.length > otherParts.length && newId.startsWith(existing + "_")) {
      hints.push({
        a: existing,
        b: newId,
        type: "part_of",
        reason: `${newId.replace(/_/g, " ")} sits inside ${existing.replace(/_/g, " ")}`,
      });
    } else if (otherParts.length > parts.length && existing.startsWith(newId + "_")) {
      hints.push({
        a: newId,
        b: existing,
        type: "part_of",
        reason: `${existing.replace(/_/g, " ")} sits inside ${newId.replace(/_/g, " ")}`,
      });
    }
  }
  return hints;
};

export type Suggestion = {
  from: string;
  to: string;
  type: EdgeType;
  reason: string;
};

export const suggestEdgesFor = (
  newId: string,
  existingIds: string[],
): Suggestion[] => {
  const set = new Set(existingIds);
  const out: Suggestion[] = [];

  for (const r of curatedRelations) {
    if (r.a === newId && set.has(r.b)) {
      out.push({ from: r.a, to: r.b, type: r.type, reason: r.reason });
    } else if (r.b === newId && set.has(r.a)) {
      // for symmetric types we add both directions; for directed we keep order
      const symmetric = r.type === "similar_pattern" || r.type === "behaves_like";
      out.push({
        from: symmetric ? r.b : r.a,
        to: symmetric ? r.a : r.b,
        type: r.type,
        reason: r.reason,
      });
    }
  }

  for (const c of containmentEdges(newId, existingIds)) {
    out.push({ from: c.a, to: c.b, type: c.type, reason: c.reason });
  }

  // dedupe by from+to+type
  const seen = new Set<string>();
  return out.filter((s) => {
    const k = `${s.from}->${s.to}:${s.type}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
