// localStorage-backed store for user-added analogy "presets" — references
// or mental models the user thinks in that aren't part of the built-in
// systems library. these are passed as soft guidance to the explain edge
// function so the model can reach for them when (and only when) they
// land naturally for the concept being translated.

import { useEffect, useState } from "react";

const KEY = "annealogy.presets.v1";
const MAX = 12;

export type AnalogyPreset = {
  id: string;
  label: string;
  // a one-or-two-line description of what this reference is about and
  // what kind of thinking it captures. used verbatim in the prompt.
  description: string;
  createdAt: number;
  // when the user publishes this preset to a shareable /preset/:slug
  // link, we remember the slug locally so the share button can keep
  // returning the same url instead of re-publishing.
  publishedSlug?: string;
};

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((l) => l());

const read = (): AnalogyPreset[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalogyPreset[];
  } catch {
    return [];
  }
};

const write = (next: AnalogyPreset[]) => {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  notify();
};

export const getPresets = (): AnalogyPreset[] => read();

export const addPreset = (label: string, description: string): AnalogyPreset | null => {
  const trimmedLabel = label.trim().slice(0, 60);
  const trimmedDesc = description.trim().slice(0, 280);
  if (!trimmedLabel || !trimmedDesc) return null;
  const current = read();
  if (current.some((p) => p.label.toLowerCase() === trimmedLabel.toLowerCase())) {
    return null;
  }
  const item: AnalogyPreset = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    label: trimmedLabel,
    description: trimmedDesc,
    createdAt: Date.now(),
  };
  write([item, ...current].slice(0, MAX));
  return item;
};

export const removePreset = (id: string) => {
  write(read().filter((p) => p.id !== id));
};

export const setPresetPublishedSlug = (id: string, slug: string) => {
  write(
    read().map((p) => (p.id === id ? { ...p, publishedSlug: slug } : p)),
  );
};

export const usePresets = () => {
  const [presets, setPresets] = useState<AnalogyPreset[]>(read);
  useEffect(() => {
    const l = () => setPresets(read());
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return presets;
};
