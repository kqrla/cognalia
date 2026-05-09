// localStorage-backed store of peripheral concepts per (root concept, system).
// lets the explain screen offer a single "share ecosystem" link that bundles
// the root explanation with every peripheral the user has explored so far.

import { useEffect, useState } from "react";
import type { AnalogySystemId } from "./systems";
import type { AnalogyMappingPair } from "./types";

export type PeripheralEntry = {
  id: string;
  question: string;
  createdAt: number;
  result: {
    fits: boolean;
    reason: string;
    analogy: string;
    mapping: AnalogyMappingPair[];
    bridge: string;
    limits: string;
  };
};

const KEY = "analogize.ecosystems.v1";

type EcosystemMap = Record<string, PeripheralEntry[]>;

const ecosystemKey = (concept: string, system: AnalogySystemId) =>
  `${concept.trim().toLowerCase()}::${system}`;

const read = (): EcosystemMap => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EcosystemMap) : {};
  } catch {
    return {};
  }
};

const write = (next: EcosystemMap) => {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
};

type Listener = () => void;
const listeners = new Set<Listener>();

export const addPeripheralToEcosystem = (
  concept: string,
  system: AnalogySystemId,
  entry: Omit<PeripheralEntry, "id" | "createdAt">,
): PeripheralEntry => {
  const map = read();
  const key = ecosystemKey(concept, system);
  const item: PeripheralEntry = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    ...entry,
  };
  // dedupe by question (same wording => replace, keep newest)
  const existing = (map[key] ?? []).filter(
    (p) => p.question.trim().toLowerCase() !== entry.question.trim().toLowerCase(),
  );
  map[key] = [item, ...existing].slice(0, 30);
  write(map);
  return item;
};

export const usePeripheralsFor = (
  concept: string,
  system: AnalogySystemId,
): PeripheralEntry[] => {
  const key = ecosystemKey(concept, system);
  const [list, setList] = useState<PeripheralEntry[]>(() => read()[key] ?? []);
  useEffect(() => {
    const update = () => setList(read()[key] ?? []);
    listeners.add(update);
    update();
    return () => {
      listeners.delete(update);
    };
  }, [key]);
  return list;
};
