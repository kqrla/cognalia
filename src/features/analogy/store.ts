// localStorage-backed store for thinking style and recent concepts.
// we deliberately keep this simple and synchronous. portsb.md describes
// how to migrate this to lovable cloud tables when the user is ready
// for cross-device sync.

import { useEffect, useState } from "react";
import type { AnalogySystemId } from "./systems";
import type { Explanation, RecentConcept } from "./types";

const PREF_KEY = "annealogy.preferences.v1";
const RECENTS_KEY = "annealogy.recents.v1";
const MAX_RECENTS = 40;

export type Preferences = {
  thinkingStyleId: string | null;
  defaultSystem: AnalogySystemId | null;
  onboarded: boolean;
};

const defaultPreferences: Preferences = {
  thinkingStyleId: null,
  defaultSystem: null,
  onboarded: false,
};

const readPreferences = (): Preferences => {
  if (typeof window === "undefined") return defaultPreferences;
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
};

const readRecents = (): RecentConcept[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentConcept[];
  } catch {
    return [];
  }
};

// hooks. we use a tiny manual subscription so multiple components
// stay in sync without pulling in a state library for two slices.
type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => {
  listeners.forEach((l) => l());
  // ping cloud sync (and any other tab listeners)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new StorageEvent("storage", { key: RECENTS_KEY }));
  }
};

export const usePreferences = () => {
  const [prefs, setPrefs] = useState<Preferences>(readPreferences);

  useEffect(() => {
    const listener = () => setPrefs(readPreferences());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const update = (patch: Partial<Preferences>) => {
    const next = { ...readPreferences(), ...patch };
    window.localStorage.setItem(PREF_KEY, JSON.stringify(next));
    notify();
  };

  return { preferences: prefs, updatePreferences: update };
};

export const useRecents = () => {
  const [recents, setRecents] = useState<RecentConcept[]>(readRecents);

  useEffect(() => {
    const listener = () => setRecents(readRecents());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addRecent = (entry: {
    concept: string;
    system: AnalogySystemId;
    explanation: Explanation;
    source: "ai" | "curated";
    domain?: string | null;
  }): RecentConcept => {
    const item: RecentConcept = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      tags: [],
      ...entry,
    };
    const current = readRecents();
    // dedupe only when the analogy text is identical (same exact version).
    // otherwise keep every variation so the user can browse version history.
    const filtered = current.filter(
      (r) =>
        !(
          r.concept.toLowerCase() === entry.concept.toLowerCase() &&
          r.system === entry.system &&
          r.explanation.analogy === entry.explanation.analogy
        ),
    );
    const next = [item, ...filtered].slice(0, MAX_RECENTS);
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    notify();
    return item;
  };

  const getRecent = (id: string): RecentConcept | undefined =>
    readRecents().find((r) => r.id === id);

  const updateRecentTags = (id: string, tags: string[]) => {
    const current = readRecents();
    const next = current.map((r) =>
      r.id === id ? { ...r, tags: Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean))) } : r,
    );
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    notify();
  };

  const updateRecentNote = (id: string, note: string) => {
    const current = readRecents();
    const trimmed = note.trim().slice(0, 140);
    const next = current.map((r) =>
      r.id === id ? { ...r, note: trimmed || undefined } : r,
    );
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    notify();
  };

  const clearRecents = () => {
    window.localStorage.removeItem(RECENTS_KEY);
    notify();
  };

  return { recents, addRecent, getRecent, updateRecentTags, updateRecentNote, clearRecents };
};
