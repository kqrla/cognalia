// the strict analogy system library. these are the only systems annealogy
// is allowed to use. defined once here so the ui chips, the system selector,
// and the edge function payload all stay in lock-step.
//
// adding a new system requires updating: this file, the system color tokens
// in index.css, and the allowedSystems array in the edge function.

import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Gamepad2,
  ChefHat,
  Blocks,
  BookOpen,
  Building2,
  TrafficCone,
  Sprout,
  Brain,
  Archive,
} from "lucide-react";

export type AnalogySystemId =
  | "relationship_dynamics"
  | "gaming_progression"
  | "cooking_recipe"
  | "building_lego"
  | "story_fandom"
  | "company_startup"
  | "traffic_flow"
  | "plant_growth"
  | "brain_habit_loops"
  | "storage_organization";

// thinking type controls the "explain again differently" logic.
// switching between contrasting types is what makes a re-explanation feel
// like a genuinely new mental model, not a paraphrase.
export type ThinkingType =
  | "social"
  | "interactive"
  | "process"
  | "structural"
  | "narrative"
  | "organizational"
  | "flow"
  | "organic"
  | "behavioral"
  | "categorical";

export type AnalogySystem = {
  id: AnalogySystemId;
  label: string;
  // short hint shown under the chip in onboarding and the picker
  hint: string;
  icon: LucideIcon;
  // tailwind class for the tinted background, defined in tailwind.config.ts
  tintClass: string;
  thinkingType: ThinkingType;
};

export const analogySystems: AnalogySystem[] = [
  {
    id: "relationship_dynamics",
    label: "relationship dynamics",
    hint: "people, intentions, push and pull",
    icon: Heart,
    tintClass: "bg-system-relationship",
    thinkingType: "social",
  },
  {
    id: "gaming_progression",
    label: "gaming and progression",
    hint: "levels, stats, unlocks, bosses",
    icon: Gamepad2,
    tintClass: "bg-system-gaming",
    thinkingType: "interactive",
  },
  {
    id: "cooking_recipe",
    label: "cooking and recipes",
    hint: "ingredients, steps, taste",
    icon: ChefHat,
    tintClass: "bg-system-cooking",
    thinkingType: "process",
  },
  {
    id: "building_lego",
    label: "building and lego",
    hint: "pieces, structure, assembly",
    icon: Blocks,
    tintClass: "bg-system-building",
    thinkingType: "structural",
  },
  {
    id: "story_fandom",
    label: "story and fandom",
    hint: "characters, arcs, lore",
    icon: BookOpen,
    tintClass: "bg-system-story",
    thinkingType: "narrative",
  },
  {
    id: "company_startup",
    label: "company and startup",
    hint: "roles, teams, decisions",
    icon: Building2,
    tintClass: "bg-system-company",
    thinkingType: "organizational",
  },
  {
    id: "traffic_flow",
    label: "traffic and flow",
    hint: "lanes, signals, congestion",
    icon: TrafficCone,
    tintClass: "bg-system-traffic",
    thinkingType: "flow",
  },
  {
    id: "plant_growth",
    label: "plant and growth",
    hint: "seeds, roots, conditions",
    icon: Sprout,
    tintClass: "bg-system-plant",
    thinkingType: "organic",
  },
  {
    id: "brain_habit_loops",
    label: "brain and habit loops",
    hint: "trigger, action, reward",
    icon: Brain,
    tintClass: "bg-system-brain",
    thinkingType: "behavioral",
  },
  {
    id: "storage_organization",
    label: "storage and organization",
    hint: "boxes, shelves, indexes",
    icon: Archive,
    tintClass: "bg-system-storage",
    thinkingType: "categorical",
  },
];

// pairs of thinking types that feel similar. when reframing we avoid
// jumping between adjacent types so the new analogy lands as a real shift.
const adjacentTypes: Record<ThinkingType, ThinkingType[]> = {
  narrative: ["social"],
  social: ["narrative"],
  process: ["flow"],
  flow: ["process"],
  structural: ["categorical"],
  categorical: ["structural"],
  organizational: ["social"],
  organic: ["behavioral"],
  behavioral: ["organic"],
  interactive: [],
};

// pick the next analogy system for "explain again differently".
// rules:
//  1. never reuse a system already used for this concept
//  2. prefer a thinking type that contrasts with the current one
//  3. if everything has been used, reset and exclude only the current
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
    // last resort: anything but the current
    return analogySystems.find((s) => s.id !== current) ?? analogySystems[0];
  }

  const adjacent = new Set(adjacentTypes[currentSystem.thinkingType] ?? []);
  adjacent.add(currentSystem.thinkingType);

  const contrasting = available.filter((s) => !adjacent.has(s.thinkingType));
  const pool = contrasting.length > 0 ? contrasting : available;

  // randomize so repeated clicks do not produce the same path every time
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getSystem = (id: AnalogySystemId): AnalogySystem =>
  analogySystems.find((s) => s.id === id) ?? analogySystems[0];

// thinking-style options shown in onboarding. each maps to a default
// analogy system, but the user can always override per explanation.
export type ThinkingStyle = {
  id: string;
  label: string;
  defaultSystem: AnalogySystemId;
};

export const thinkingStyles: ThinkingStyle[] = [
  { id: "stories", label: "i think in stories", defaultSystem: "story_fandom" },
  {
    id: "systems",
    label: "i think in systems",
    defaultSystem: "company_startup",
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
    defaultSystem: "gaming_progression",
  },
  {
    id: "step_by_step",
    label: "i think in step-by-step processes",
    defaultSystem: "cooking_recipe",
  },
];
