// the strict analogy system library (v2). these are the only systems
// analogize is allowed to use. defined once here so the ui chips, the
// system selector, the edge function payload, and the reframe picker
// all stay in lock-step.
//
// systems are tiered:
//   core      → default pool, picked first
//   secondary → used when a clearly better fit
//   extended  → niche; only when nothing else matches well
//
// each system has a thinking type. "explain again differently" must
// switch to a different system AND a different thinking type.

import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Gamepad2,
  ChefHat,
  Blocks,
  BookOpen,
  Building2,
  TrafficCone,
  Archive,
  Users,
  Clapperboard,
  Share2,
  Music,
} from "lucide-react";

export type AnalogySystemId =
  // core
  | "building_lego"
  | "cooking_recipe"
  | "storage_organization"
  | "traffic_flow"
  | "relationship_dynamics"
  // secondary
  | "gaming_progression"
  | "story_narrative"
  | "company_startup"
  // extended
  | "sports_team_strategy"
  | "film_production"
  | "social_media"
  | "music_playlist";

export type ThinkingType =
  | "structural"
  | "process"
  | "categorical"
  | "flow"
  | "social"
  | "interactive"
  | "narrative"
  | "organizational"
  | "dynamic"
  | "orchestration"
  | "feedback"
  | "sequencing";

export type SystemTier = "core" | "secondary" | "extended";

export type AnalogySystem = {
  id: AnalogySystemId;
  label: string;
  // short hint shown under the chip in onboarding and the picker
  hint: string;
  icon: LucideIcon;
  // tailwind class for the tinted background, defined in tailwind.config.ts
  tintClass: string;
  thinkingType: ThinkingType;
  tier: SystemTier;
  // a short "use for" tag shown in the selector to guide intentional choice
  useFor: string;
};

export const analogySystems: AnalogySystem[] = [
  // ---------- core ----------
  {
    id: "building_lego",
    label: "building and lego",
    hint: "pieces, structure, assembly",
    icon: Blocks,
    tintClass: "bg-system-building",
    thinkingType: "structural",
    tier: "core",
    useFor: "architecture, systems, dependencies",
  },
  {
    id: "cooking_recipe",
    label: "cooking and recipes",
    hint: "ingredients, steps, sequence",
    icon: ChefHat,
    tintClass: "bg-system-cooking",
    thinkingType: "process",
    tier: "core",
    useFor: "algorithms, step-by-step flows",
  },
  {
    id: "storage_organization",
    label: "storage and organization",
    hint: "boxes, shelves, indexes",
    icon: Archive,
    tintClass: "bg-system-storage",
    thinkingType: "categorical",
    tier: "core",
    useFor: "databases, memory, indexing",
  },
  {
    id: "traffic_flow",
    label: "traffic and flow",
    hint: "lanes, signals, congestion",
    icon: TrafficCone,
    tintClass: "bg-system-traffic",
    thinkingType: "flow",
    tier: "core",
    useFor: "networks, throughput, bottlenecks",
  },
  {
    id: "relationship_dynamics",
    label: "relationship dynamics",
    hint: "people, intentions, push and pull",
    icon: Heart,
    tintClass: "bg-system-relationship",
    thinkingType: "social",
    tier: "core",
    useFor: "economics, geopolitics, interactions",
  },
  // ---------- secondary ----------
  {
    id: "gaming_progression",
    label: "gaming and progression",
    hint: "levels, stats, unlocks, bosses",
    icon: Gamepad2,
    tintClass: "bg-system-gaming",
    thinkingType: "interactive",
    tier: "secondary",
    useFor: "learning, optimization, feedback loops",
  },
  {
    id: "story_narrative",
    label: "story and narrative",
    hint: "canon, arcs, alternate timelines",
    icon: BookOpen,
    tintClass: "bg-system-story",
    thinkingType: "narrative",
    tier: "secondary",
    useFor: "versioning, timelines, iteration",
  },
  {
    id: "company_startup",
    label: "company and startup",
    hint: "roles, teams, decisions",
    icon: Building2,
    tintClass: "bg-system-company",
    thinkingType: "organizational",
    tier: "secondary",
    useFor: "roles, scaling, incentives",
  },
  // ---------- extended ----------
  {
    id: "sports_team_strategy",
    label: "sports and team strategy",
    hint: "players, plays, coordination",
    icon: Users,
    tintClass: "bg-system-sports",
    thinkingType: "dynamic",
    tier: "extended",
    useFor: "coordination, distributed systems",
  },
  {
    id: "film_production",
    label: "film production",
    hint: "crew, stages, final cut",
    icon: Clapperboard,
    tintClass: "bg-system-film",
    thinkingType: "orchestration",
    tier: "extended",
    useFor: "pipelines, staged processes",
  },
  {
    id: "social_media",
    label: "social media",
    hint: "posts, feed, signals",
    icon: Share2,
    tintClass: "bg-system-social",
    thinkingType: "feedback",
    tier: "extended",
    useFor: "algorithms, virality, feedback loops",
  },
  {
    id: "music_playlist",
    label: "music and playlist",
    hint: "tracks, order, remix",
    icon: Music,
    tintClass: "bg-system-music",
    thinkingType: "sequencing",
    tier: "extended",
    useFor: "ordering, composition",
  },
];

export const getSystem = (id: AnalogySystemId): AnalogySystem =>
  analogySystems.find((s) => s.id === id) ?? analogySystems[0];

// pairs of thinking types that feel similar. when reframing we avoid
// jumping between adjacent types so the new analogy lands as a real shift.
const adjacentTypes: Record<ThinkingType, ThinkingType[]> = {
  narrative: ["social", "sequencing"],
  social: ["narrative", "organizational"],
  organizational: ["social"],
  process: ["flow", "orchestration", "sequencing"],
  flow: ["process", "feedback"],
  orchestration: ["process"],
  sequencing: ["process", "narrative"],
  structural: ["categorical"],
  categorical: ["structural"],
  feedback: ["flow", "interactive"],
  interactive: ["feedback"],
  dynamic: ["organizational"],
};

// pick the next analogy system for "explain again differently".
// rules (in order):
//  1. never reuse a system already used for this concept
//  2. switch to a different thinking type than the current one
//  3. prefer core systems, then secondary, then extended
//  4. if everything has been used, reset and exclude only the current
export const pickContrastingSystem = (
  current: AnalogySystemId,
  used: AnalogySystemId[],
): AnalogySystem => {
  const currentSystem = getSystem(current);
  const exhausted = used.length >= analogySystems.length;
  const blocklist = new Set<AnalogySystemId>(exhausted ? [current] : used);
  blocklist.add(current);

  const available = analogySystems.filter((s) => !blocklist.has(s.id));
  if (available.length === 0) {
    return analogySystems.find((s) => s.id !== current) ?? analogySystems[0];
  }

  const adjacent = new Set(adjacentTypes[currentSystem.thinkingType] ?? []);
  adjacent.add(currentSystem.thinkingType);

  const contrasting = available.filter((s) => !adjacent.has(s.thinkingType));
  const typePool = contrasting.length > 0 ? contrasting : available;

  // tier preference: core > secondary > extended
  const byTier = (tier: SystemTier) => typePool.filter((s) => s.tier === tier);
  const pool =
    byTier("core").length > 0
      ? byTier("core")
      : byTier("secondary").length > 0
        ? byTier("secondary")
        : byTier("extended");

  // randomize within the chosen tier so repeated clicks vary
  return pool[Math.floor(Math.random() * pool.length)];
};

// thinking-style options shown in onboarding. each maps to a default
// analogy system, but the user can always override per explanation.
export type ThinkingStyle = {
  id: string;
  label: string;
  defaultSystem: AnalogySystemId;
};

export const thinkingStyles: ThinkingStyle[] = [
  { id: "stories", label: "i think in stories", defaultSystem: "story_narrative" },
  {
    id: "systems",
    label: "i think in systems",
    defaultSystem: "building_lego",
  },
  {
    id: "real_life",
    label: "i think in real-life examples",
    defaultSystem: "relationship_dynamics",
  },
  {
    id: "visuals",
    label: "i think in visuals",
    defaultSystem: "building_lego",
  },
  {
    id: "internet_culture",
    label: "i think in internet culture",
    defaultSystem: "social_media",
  },
  {
    id: "step_by_step",
    label: "i think in step-by-step processes",
    defaultSystem: "cooking_recipe",
  },
];
