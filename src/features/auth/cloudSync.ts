// optional cloud sync. pulls the signed-in user's row on login and merges
// it into local storage (cloud rows win on conflict by id, otherwise we
// keep both). pushes local state up debounced after any change. signed-out
// users are never touched.

import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const RECENTS_KEY = "annealogy.recents.v1";
const PRESETS_KEY = "annealogy.presets.v1";
const PREF_KEY = "annealogy.preferences.v1";

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const mergeById = <T extends { id: string }>(local: T[], remote: T[]): T[] => {
  const map = new Map<string, T>();
  // local first so remote overrides on conflict (cloud is canonical once synced)
  local.forEach((i) => map.set(i.id, i));
  remote.forEach((i) => map.set(i.id, i));
  return Array.from(map.values());
};

export const exportLocalAsJson = () => {
  return {
    exportedAt: new Date().toISOString(),
    recents: readJSON(RECENTS_KEY, []),
    presets: readJSON(PRESETS_KEY, []),
    preferences: readJSON(PREF_KEY, {}),
  };
};

const notifyStores = () => {
  // nudge other tabs / hook listeners - they listen on `storage` and on
  // an internal listener set via writes. easiest portable signal:
  window.dispatchEvent(new StorageEvent("storage", { key: RECENTS_KEY }));
};

export const useCloudSync = () => {
  const { user, loading } = useAuth();
  const pulledFor = useRef<string | null>(null);
  const pushTimer = useRef<number | null>(null);

  // pull + merge once per session
  useEffect(() => {
    if (loading || !user) return;
    if (pulledFor.current === user.id) return;
    pulledFor.current = user.id;

    (async () => {
      const { data } = await supabase
        .from("user_cloud_data")
        .select("recents, presets, preferences")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        const localRecents = readJSON<{ id: string }[]>(RECENTS_KEY, []);
        const localPresets = readJSON<{ id: string }[]>(PRESETS_KEY, []);
        writeJSON(
          RECENTS_KEY,
          mergeById(localRecents, (data.recents as { id: string }[]) ?? []),
        );
        writeJSON(
          PRESETS_KEY,
          mergeById(localPresets, (data.presets as { id: string }[]) ?? []),
        );
        const remotePrefs = (data.preferences as Record<string, unknown>) ?? {};
        const localPrefs = readJSON<Record<string, unknown>>(PREF_KEY, {});
        writeJSON(PREF_KEY, { ...localPrefs, ...remotePrefs });
        notifyStores();
      }

      // immediate push of merged state so cloud is canonical
      schedulePush(user.id, 200);
    })();
  }, [user, loading]);

  // push on local changes
  useEffect(() => {
    if (!user) return;
    const onChange = () => schedulePush(user.id, 1500);
    window.addEventListener("storage", onChange);
    // also push on visibility change (best-effort flush)
    const onVis = () => {
      if (document.visibilityState === "hidden") schedulePush(user.id, 0);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("storage", onChange);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [user]);

  const schedulePush = (userId: string, delay: number) => {
    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(() => {
      void pushNow(userId);
    }, delay);
  };

  const pushNow = async (userId: string) => {
    await supabase.from("user_cloud_data").upsert(
      {
        user_id: userId,
        recents: readJSON(RECENTS_KEY, []),
        presets: readJSON(PRESETS_KEY, []),
        preferences: readJSON(PREF_KEY, {}),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
  };
};

// manual trigger for pages that mutate without going through the
// hook-based stores (we still nudge listeners on every write inside
// store.ts and presets.ts via the `storage` event below).
export const pingSync = () => notifyStores();
