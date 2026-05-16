// substrate: a tiny visual cognition / pattern-mapping store.
// nodes are interests/projects/concepts. edges are soft associations.
// kept deliberately separate from the analogize understanding graph -
// substrate is about the user's *own* intellectual structure, not
// individual explanations.

import { useEffect, useState } from "react";

export type SubstrateKind =
  | "interest"
  | "project"
  | "concept"
  | "field"
  | "skill"
  | "question";

export type SubstrateNode = {
  id: string;
  label: string;
  kind: SubstrateKind;
  note?: string;
  x: number;
  y: number;
  createdAt: number;
};

export type SubstrateEdge = {
  id: string;
  from: string;
  to: string;
  reason?: string;
  createdAt: number;
};

export type SubstrateState = {
  nodes: SubstrateNode[];
  edges: SubstrateEdge[];
};

const STORAGE_KEY = "analogize.substrate.v1";
const empty: SubstrateState = { nodes: [], edges: [] };

const read = (): SubstrateState => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as SubstrateState;
    return { nodes: parsed.nodes ?? [], edges: parsed.edges ?? [] };
  } catch {
    return empty;
  }
};

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((l) => l());

const write = (s: SubstrateState) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  notify();
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 48) || `n_${Math.random().toString(36).slice(2, 7)}`;

export const addNode = (input: {
  label: string;
  kind: SubstrateKind;
  note?: string;
}) => {
  const s = read();
  let id = slug(input.label);
  if (s.nodes.some((n) => n.id === id)) id = `${id}_${Math.random().toString(36).slice(2, 5)}`;
  // place new nodes on a soft ring around origin
  const angle = Math.random() * Math.PI * 2;
  const radius = 90 + Math.random() * 120;
  const node: SubstrateNode = {
    id,
    label: input.label.trim(),
    kind: input.kind,
    note: input.note?.trim() || undefined,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    createdAt: Date.now(),
  };
  write({ ...s, nodes: [...s.nodes, node] });
  return node;
};

export const updateNodePosition = (id: string, x: number, y: number) => {
  const s = read();
  // direct write without notify to avoid render storm during drag
  s.nodes = s.nodes.map((n) => (n.id === id ? { ...n, x, y } : n));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
};

export const removeNode = (id: string) => {
  const s = read();
  write({
    nodes: s.nodes.filter((n) => n.id !== id),
    edges: s.edges.filter((e) => e.from !== id && e.to !== id),
  });
};

export const addEdge = (from: string, to: string, reason?: string) => {
  if (from === to) return;
  const s = read();
  const id = `${from}__${to}`;
  const reverse = `${to}__${from}`;
  if (s.edges.some((e) => e.id === id || e.id === reverse)) return;
  write({
    ...s,
    edges: [
      ...s.edges,
      { id, from, to, reason: reason?.trim() || undefined, createdAt: Date.now() },
    ],
  });
};

export const removeEdge = (id: string) => {
  const s = read();
  write({ ...s, edges: s.edges.filter((e) => e.id !== id) });
};

export const clearAll = () => write(empty);

export const useSubstrate = () => {
  const [state, setState] = useState<SubstrateState>(read);
  useEffect(() => {
    const l = () => setState(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
};

// -------- pattern detection --------

// connected components → "threads"
export const computeThreads = (s: SubstrateState): SubstrateNode[][] => {
  const adj = new Map<string, Set<string>>();
  s.nodes.forEach((n) => adj.set(n.id, new Set()));
  s.edges.forEach((e) => {
    adj.get(e.from)?.add(e.to);
    adj.get(e.to)?.add(e.from);
  });
  const seen = new Set<string>();
  const threads: SubstrateNode[][] = [];
  s.nodes.forEach((n) => {
    if (seen.has(n.id)) return;
    const stack = [n.id];
    const ids: string[] = [];
    while (stack.length) {
      const x = stack.pop()!;
      if (seen.has(x)) continue;
      seen.add(x);
      ids.push(x);
      adj.get(x)?.forEach((y) => stack.push(y));
    }
    if (ids.length > 1) {
      threads.push(ids.map((i) => s.nodes.find((nn) => nn.id === i)!));
    }
  });
  return threads.sort((a, b) => b.length - a.length);
};

export const nodeDegree = (id: string, edges: SubstrateEdge[]) =>
  edges.filter((e) => e.from === id || e.to === id).length;
