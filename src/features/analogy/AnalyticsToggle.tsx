// inline toggle for the "insights into your searches" preference.
// the FIRST time a user flips it on, we show an explicit consent
// modal explaining what gets computed, where, and that nothing is
// transmitted. once consented, subsequent toggles flip silently.

import { useState } from "react";
import { BarChart3, ShieldCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePreferences } from "@/features/analogy/store";

const CONSENT_KEY = "annealogy.analyticsConsent.v1";

const hasConsented = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    return false;
  }
};
const recordConsent = () => {
  try {
    window.localStorage.setItem(CONSENT_KEY, "1");
  } catch {
    /* noop */
  }
};

export const AnalyticsToggle = ({ variant = "card" }: { variant?: "card" | "inline" }) => {
  const { preferences, updatePreferences } = usePreferences();
  const [pendingOpen, setPendingOpen] = useState(false);

  const on = !!preferences.analyticsOptIn;

  const onChange = (next: boolean) => {
    if (next && !hasConsented()) {
      setPendingOpen(true);
      return;
    }
    updatePreferences({ analyticsOptIn: next });
  };

  const accept = () => {
    recordConsent();
    updatePreferences({ analyticsOptIn: true });
    setPendingOpen(false);
  };

  const toggleEl = (
    <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-xs">
      <span className="text-muted-foreground">{on ? "on" : "off"}</span>
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
    </label>
  );

  return (
    <>
      {variant === "card" ? (
        <div className="surface-paper border-l-2 border-system-building p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-system-building">
                <BarChart3 className="h-3.5 w-3.5 text-foreground/80" />
              </span>
              <div>
                <p className="text-sm font-medium">insights into your searches</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  opt in to derive patterns from your history (most-used systems, recurring topics, activity). computed locally — nothing is sent anywhere.
                </p>
              </div>
            </div>
            {toggleEl}
          </div>
        </div>
      ) : (
        toggleEl
      )}

      <AlertDialog open={pendingOpen} onOpenChange={setPendingOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif-display text-2xl tracking-tight">
              before we compute anything…
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-sm text-foreground/80">
                <p>
                  enabling insights computes a small set of patterns from your translation history:
                </p>
                <ul className="ml-5 list-disc space-y-1 text-foreground/70">
                  <li>your most-used analogy systems</li>
                  <li>recurring topics (from tags you've added)</li>
                  <li>activity counts over the last two weeks</li>
                </ul>
                <p className="flex items-start gap-2 rounded-md border border-border/60 bg-secondary/30 p-3 text-xs">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    all of this runs in your browser. nothing about what you search, tag, or read is sent off-device for analysis. you can switch it off any time.
                  </span>
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>not now</AlertDialogCancel>
            <AlertDialogAction onClick={accept}>i understand — turn it on</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
