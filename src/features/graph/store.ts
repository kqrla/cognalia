// localStorage-backed graph store. simple, synchronous, and shared
// across components via a tiny subscription. the graph is meant to
// feel personal and offline-first; sync to lovable cloud is a
// separate, optional layer documented in portsb.md.

import { useEffect, useState } from "react";
import type { AnalogySystemId } from "@/features/analogy/systems";
import type { Explanation } from "@/features/analogy/types";
import {
  type EdgeType,
  type GraphEdge,
  type GraphNode,
  type GraphState,
  type UnderstandingState,
} from "./types";
import { suggestEdgesFor } from "./relations";

const STORAGE_KEY = "annealogy.graph.v1";

const empty: GraphState = { nodes: [], edges: [] };

const read = (): GraphState => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as GraphState;
    return {
      nodes: parsed.nodes ?? [],
      edges: parsed.edges ?? [],
    };
  } catch {
    return empty;
  }
};

const write = (state: GraphState) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notify();
};

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((l) => l());

export const slugify = (concept: string) =>
  concept
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 64);

export const upsertNode = (input: {
  concept: string;
  system: AnalogySystemId;
  state?: UnderstandingState;
  explanation?: Explanation;
}): { node: GraphNode; suggestions: GraphEdge[] } => {
  const state = read();
  const id = slugify(input.concept);
  const now = Date.now();
  const existing = state.nodes.find((n) => n.id === id);

  const node: GraphNode = existing
    ? {
        ...existing,
        concept: input.concept,
        system: input.system,
        systemsUsed: existing.systemsUsed.includes(input.system)
          ? existing.systemsUsed
          : [...existing.systemsUsed, input.system],
        updatedAt: now,
        lastExplanation: input.explanation ?? existing.lastExplanation,
        state: input.state ?? existing.state,
      }
    : {
        id,
        concept: input.concept,
        system: input.system,
        systemsUsed: [input.system],
        state: input.state ?? "kinda",
        createdAt: now,
        updatedAt: now,
        lastExplanation: input.explanation,
      };

  // initialise / bump shown counter for the current system
  const signals = { ...(existing?.systemSignals ?? {}) };
  const sysKey = input.system;
  signals[sysKey] = {
    shown: (signals[sysKey]?.shown ?? 0) + 1,
    regen: signals[sysKey]?.regen ?? 0,
  };
  node.systemSignals = signals;

  const nodes = existing
    ? state.nodes.map((n) => (n.id === id ? node : n))
    : [...state.nodes, node];

  // suggestion engine: only meaningful, hand-curated relationships.
  // suggestions land as `pending` so the user has to accept them.
  const otherIds = nodes.filter((n) => n.id !== id).map((n) => n.id);
  const suggested = suggestEdgesFor(node.id, otherIds).filter(
    (s) =>
      !state.edges.some(
        (e) => e.from === s.from && e.to === s.to && e.type === s.type,
      ),
  );
  const newEdges: GraphEdge[] = suggested.map((s) => ({
    id: `${s.from}->${s.to}:${s.type}`,
    from: s.from,
    to: s.to,
    type: s.type,
    reason: s.reason,
    createdAt: now,
    status: "pending",
  }));

  write({ nodes, edges: [...state.edges, ...newEdges] });
  return { node, suggestions: newEdges };
};

export const setNodeState = (id: string, next: UnderstandingState) => {
  const state = read();
  write({
    ...state,
    nodes: state.nodes.map((n) =>
      n.id === id ? { ...n, state: next, updatedAt: Date.now() } : n,
    ),
  });
};

export const acceptEdge = (id: string) => {
  const state = read();
  write({
    ...state,
    edges: state.edges.map((e) =>
      e.id === id ? { ...e, status: "active" } : e,
    ),
  });
};

export const dismissEdge = (id: string) => {
  const state = read();
  write({ ...state, edges: state.edges.filter((e) => e.id !== id) });
};

// record that the user regenerated away from a system for this concept.
// this is the strongest "didn't click" signal we have.
export const recordRegen = (concept: string, system: AnalogySystemId) => {
  const id = slugify(concept);
  const state = read();
  const node = state.nodes.find((n) => n.id === id);
  if (!node) return;
  const signals = { ...(node.systemSignals ?? {}) };
  signals[system] = {
    shown: signals[system]?.shown ?? 1,
    regen: (signals[system]?.regen ?? 0) + 1,
  };
  write({
    ...state,
    nodes: state.nodes.map((n) =>
      n.id === id ? { ...n, systemSignals: signals, updatedAt: Date.now() } : n,
    ),
  });
};

// systems where regen/shown ratio is high — used as `avoidSystems` hints
// when reframing so we stop pushing analogies that don't land for the user.
export const lowClickSystems = (
  concept: string,
  threshold = 0.5,
): AnalogySystemId[] => {
  const id = slugify(concept);
  const node = read().nodes.find((n) => n.id === id);
  if (!node?.systemSignals) return [];
  return Object.entries(node.systemSignals)
    .filter(([, s]) => s.shown > 0 && s.regen / s.shown >= threshold)
    .map(([sys]) => sys as AnalogySystemId);
};

export const addManualEdge = (input: {
  from: string;
  to: string;
  type: EdgeType;
  reason?: string;
}) => {
  const state = read();
  const id = `${input.from}->${input.to}:${input.type}`;
  if (state.edges.some((e) => e.id === id)) return;
  write({
    ...state,
    edges: [
      ...state.edges,
      {
        id,
        from: input.from,
        to: input.to,
        type: input.type,
        reason: input.reason,
        createdAt: Date.now(),
        status: "active",
      },
    ],
  });
};

export const removeNode = (id: string) => {
  const state = read();
  write({
    nodes: state.nodes.filter((n) => n.id !== id),
    edges: state.edges.filter((e) => e.from !== id && e.to !== id),
  });
};

export const clearGraph = () => write(empty);

export const useGraph = () => {
  const [state, setState] = useState<GraphState>(read);
  useEffect(() => {
    const l = () => setState(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
};
