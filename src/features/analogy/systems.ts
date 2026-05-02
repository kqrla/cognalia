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

export type AnalogySystem = {
  id: AnalogySystemId;
  label: string;
  // short hint shown under the chip in onboarding and the picker
  hint: string;
  icon: LucideIcon;
  // tailwind class for the tinted background, defined in tailwind.config.ts
  tintClass: string;
};

export const analogySystems: AnalogySystem[] = [
  {
    id: "relationship_dynamics",
    label: "relationship dynamics",
    hint: "people, intentions, push and pull",
    icon: Heart,
    tintClass: "bg-system-relationship",
  },
  {
    id: "gaming_progression",
    label: "gaming and progression",
    hint: "levels, stats, unlocks, bosses",
    icon: Gamepad2,
    tintClass: "bg-system-gaming",
  },
  {
    id: "cooking_recipe",
    label: "cooking and recipes",
    hint: "ingredients, steps, taste",
    icon: ChefHat,
    tintClass: "bg-system-cooking",
  },
  {
    id: "building_lego",
    label: "building and lego",
    hint: "pieces, structure, assembly",
    icon: Blocks,
    tintClass: "bg-system-building",
  },
  {
    id: "story_fandom",
    label: "story and fandom",
    hint: "characters, arcs, lore",
    icon: BookOpen,
    tintClass: "bg-system-story",
  },
  {
    id: "company_startup",
    label: "company and startup",
    hint: "roles, teams, decisions",
    icon: Building2,
    tintClass: "bg-system-company",
  },
  {
    id: "traffic_flow",
    label: "traffic and flow",
    hint: "lanes, signals, congestion",
    icon: TrafficCone,
    tintClass: "bg-system-traffic",
  },
  {
    id: "plant_growth",
    label: "plant and growth",
    hint: "seeds, roots, conditions",
    icon: Sprout,
    tintClass: "bg-system-plant",
  },
  {
    id: "brain_habit_loops",
    label: "brain and habit loops",
    hint: "trigger, action, reward",
    icon: Brain,
    tintClass: "bg-system-brain",
  },
  {
    id: "storage_organization",
    label: "storage and organization",
    hint: "boxes, shelves, indexes",
    icon: Archive,
    tintClass: "bg-system-storage",
  },
];

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
