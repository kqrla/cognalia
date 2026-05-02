// onboarding screen. asked once, on first visit, and never again unless
// the user explicitly resets preferences. the answer chooses a default
// analogy system but the user can always switch per explanation.

import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { thinkingStyles } from "@/features/analogy/systems";
import { usePreferences } from "@/features/analogy/store";
import { cn } from "@/lib/utils";

const Onboarding = () => {
  const navigate = useNavigate();
  const { updatePreferences } = usePreferences();

  const choose = (id: string) => {
    const style = thinkingStyles.find((s) => s.id === id);
    if (!style) return;
    updatePreferences({
      thinkingStyleId: style.id,
      defaultSystem: style.defaultSystem,
      onboarded: true,
    });
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl py-16 sm:py-24">
        <header className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-foreground/70">
            <Sparkles className="h-3.5 w-3.5" />
            <span>welcome to annealogy</span>
          </div>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            how does your brain naturally understand things?
          </h1>
          <p className="text-muted-foreground">
            pick the closest one. you can switch the system on every explanation later.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {thinkingStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => choose(style.id)}
              className={cn(
                "surface-card group flex items-center justify-between p-5 text-left",
                "transition-all hover:-translate-y-0.5 hover:shadow-lift",
              )}
            >
              <span className="text-base font-medium">{style.label}</span>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
                choose
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          your preference is stored locally on this device. nothing is uploaded.
        </p>
      </div>
    </main>
  );
};

export default Onboarding;
