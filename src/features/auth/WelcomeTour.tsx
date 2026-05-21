// skippable welcome tour. shows on first visit to /app (after the
// thinking-style onboarding) as a multi-step dialog. each step is a
// single question with chip-style answers; users can skip at any time.
// answers are stored locally as preferences and used to personalize
// which feature surfaces we highlight (e.g. graph for "explore",
// history+notes for "remember").

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePreferences } from "@/features/analogy/store";
import { cn } from "@/lib/utils";

type Goal = NonNullable<ReturnType<typeof useGoalKeys>[number]>;

const useGoalKeys = () =>
  ["learn", "teach", "explore", "remember"] as const;

const goalOptions: Array<{
  id: "learn" | "teach" | "explore" | "remember";
  label: string;
  hint: string;
}> = [
  { id: "learn", label: "learn a new topic", hint: "you'll meet new ideas often" },
  { id: "teach", label: "explain to others", hint: "you need analogies others get" },
  { id: "explore", label: "explore connections", hint: "you like the graph view" },
  { id: "remember", label: "remember what i read", hint: "you'll use notes + tags" },
];

const paceOptions: Array<{
  id: "skim" | "balanced" | "deep";
  label: string;
  hint: string;
}> = [
  { id: "skim", label: "skim fast", hint: "short analogies, no extras" },
  { id: "balanced", label: "balanced", hint: "analogy + mapping + diagram" },
  { id: "deep", label: "go deep", hint: "include peripherals + bridge" },
];

const familiarityOptions: Array<{
  id: "new" | "some" | "fluent";
  label: string;
  hint: string;
}> = [
  { id: "new", label: "first time here", hint: "we'll point things out" },
  { id: "some", label: "poked around before", hint: "quick reminders only" },
  { id: "fluent", label: "i know the app", hint: "skip the tour" },
];

export const WelcomeTour = () => {
  const { preferences, updatePreferences } = usePreferences();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  // open once: when user has completed style onboarding but not the tour.
  useEffect(() => {
    if (preferences.onboarded && !preferences.tourCompleted) {
      const t = window.setTimeout(() => setOpen(true), 350);
      return () => window.clearTimeout(t);
    }
  }, [preferences.onboarded, preferences.tourCompleted]);

  const close = (markDone = true) => {
    setOpen(false);
    if (markDone) updatePreferences({ tourCompleted: true });
  };

  const tips = useMemo(() => buildTips(preferences.tourGoal ?? null), [
    preferences.tourGoal,
  ]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close(true)}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-5 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            quick tour - {step + 1}/4
          </div>
          <button
            type="button"
            onClick={() => close(true)}
            className="rounded-full p-1 text-muted-foreground hover:bg-background hover:text-foreground"
            aria-label="skip tour"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {step === 0 && (
            <Step
              title="why are you here today?"
              caption="we'll tune which features get nudged into view."
              options={goalOptions}
              value={preferences.tourGoal ?? null}
              onPick={(v) => {
                updatePreferences({ tourGoal: v as Goal });
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <Step
              title="how much do you want at once?"
              caption="affects default depth on /explain. you can override per concept."
              options={paceOptions}
              value={preferences.tourPace ?? null}
              onPick={(v) => {
                updatePreferences({
                  tourPace: v as NonNullable<typeof preferences.tourPace>,
                });
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <Step
              title="how familiar are you with analogize?"
              caption="we'll skip pointers if you're fluent."
              options={familiarityOptions}
              value={preferences.tourFamiliarity ?? null}
              onPick={(v) => {
                updatePreferences({
                  tourFamiliarity: v as NonNullable<typeof preferences.tourFamiliarity>,
                });
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                here's what to try first
              </p>
              <h2 className="mt-2 font-serif-display text-2xl tracking-tight">
                three places to start.
              </h2>
              <ul className="mt-5 space-y-3">
                {tips.map((t) => (
                  <li
                    key={t.title}
                    className="rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">{t.title}</p>
                      <Link
                        to={t.to}
                        onClick={() => close(true)}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-secondary"
                      >
                        open <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="hover:text-foreground"
                >
                  back
                </button>
                <button
                  type="button"
                  onClick={() => close(true)}
                  className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
                >
                  start using analogize
                </button>
              </div>
            </div>
          )}

          {step < 3 && (
            <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => close(true)}
                className="hover:text-foreground"
              >
                skip tour
              </button>
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="hover:text-foreground"
                  >
                    back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="hover:text-foreground"
                >
                  later
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Step = ({
  title,
  caption,
  options,
  value,
  onPick,
}: {
  title: string;
  caption: string;
  options: Array<{ id: string; label: string; hint: string }>;
  value: string | null;
  onPick: (id: string) => void;
}) => (
  <div>
    <h2 className="font-serif-display text-2xl tracking-tight">{title}</h2>
    <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={cn(
              "group rounded-lg border p-3 text-left transition-colors",
              active
                ? "border-foreground bg-secondary"
                : "border-border hover:border-foreground/50 hover:bg-secondary/60",
            )}
          >
            <p className="text-sm font-medium">{o.label}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{o.hint}</p>
          </button>
        );
      })}
    </div>
  </div>
);

const buildTips = (
  goal: "learn" | "teach" | "explore" | "remember" | null,
) => {
  const base = {
    explore: {
      title: "open the graph",
      body: "see your concepts as a force-directed map of bridges.",
      to: "/graph",
    },
    history: {
      title: "browse your history",
      body: "every analogy you generate is saved locally. add private notes + tags.",
      to: "/history",
    },
    suggest: {
      title: "add your own references",
      body: "feed analogize the books, hobbies or worlds you already think in.",
      to: "/suggest",
    },
    demo: {
      title: "tour the signed-in surface",
      body: "see dashboard, topics, and the cloud-synced version without signing up.",
      to: "/demo",
    },
    features: {
      title: "skim the feature map",
      body: "the short version of what's here and why each piece exists.",
      to: "/features",
    },
  };
  if (goal === "explore") return [base.explore, base.history, base.suggest];
  if (goal === "teach") return [base.suggest, base.features, base.explore];
  if (goal === "remember") return [base.history, base.explore, base.demo];
  return [base.features, base.history, base.explore];
};
