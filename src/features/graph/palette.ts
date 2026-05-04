// fixed pastel palette for cluster recoloring. users can pick any of
// these to override the default color of a cluster (= analogy system).
// stored in localStorage so it persists across sessions.

import { useEffect, useState } from "react";

export type PaletteId =
  | "default"
  | "blush"
  | "peach"
  | "butter"
  | "sage"
  | "mint"
  | "sky"
  | "lilac"
  | "rose";

export const palette: { id: PaletteId; label: string; hex: string }[] = [
  { id: "default", label: "default", hex: "" },
  { id: "blush", label: "blush", hex: "#f4b8c2" },
  { id: "peach", label: "peach", hex: "#f6c6a3" },
  { id: "butter", label: "butter", hex: "#f0dfa0" },
  { id: "sage", label: "sage", hex: "#bcd0a8" },
  { id: "mint", label: "mint", hex: "#a8d6c4" },
  { id: "sky", label: "sky", hex: "#a9c8e8" },
  { id: "lilac", label: "lilac", hex: "#c5b0e0" },
  { id: "rose", label: "rose", hex: "#e0a8c0" },
];

const KEY = "annealogy.cluster-colors.v1";

type Store = Record<string, PaletteId>;

const read = (): Store => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export const setClusterColor = (cluster: string, color: PaletteId) => {
  const next = { ...read() };
  if (color === "default") delete next[cluster];
  else next[cluster] = color;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  notify();
};

export const useClusterColors = () => {
  const [state, setState] = useState<Store>(read);
  useEffect(() => {
    const l = () => setState(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
};

export const colorForCluster = (
  cluster: string,
  overrides: Store,
  fallback: string,
): string => {
  const id = overrides[cluster];
  if (!id) return fallback;
  return palette.find((p) => p.id === id)?.hex || fallback;
};
