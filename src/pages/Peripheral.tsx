// peripheral explanation screen. mirrors the regular /explain layout
// but is scoped to a peripheral concept living inside an existing
// analogy ecosystem. we deliberately reuse the same section grammar
// (analogy / mapping / bridge / limits) so the experience feels
// familiar - only the framing chrome changes to make clear this is a
// satellite of a root explanation, not a fresh translation.

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Orbit,
  ChevronDown,
  Sparkles,
  ArrowLeftRight,
  CornerDownRight,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSystem, type AnalogySystemId } from "@/features/analogy/systems";
import type { AnalogyMappingPair } from "@/features/analogy/types";
import { ShareButton } from "@/features/analogy/components/ShareButton";

export type PeripheralPayload = {
  rootConcept: string;
  system: AnalogySystemId;
  domain?: string | null;
  question: string;
  result: {
    fits: boolean;
    reason: string;
    analogy: string;
    mapping: AnalogyMappingPair[];
    bridge: string;
    limits: string;
  };
};

type SectionId = "analogy" | "mapping" | "bridge" | "limits";

const sections: { id: SectionId; label: string; icon: typeof Sparkles }[] = [
  { id: "analogy", label: "analogy", icon: Sparkles },
  { id: "mapping", label: "mapping", icon: ArrowLeftRight },
  { id: "bridge", label: "bridge", icon: CornerDownRight },
  { id: "limits", label: "where the analogy breaks", icon: AlertTriangle },
];

const Peripheral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payload = (location.state as PeripheralPayload | null) ?? null;

  const [open, setOpen] = useState<Record<SectionId, boolean>>({
    analogy: true,
    mapping: true,
    bridge: true,
    limits: true,
  });

  useEffect(() => {
    if (!payload) navigate("/app", { replace: true });
  }, [payload, navigate]);

  if (!payload) return null;

  const meta = getSystem(payload.system);
  const { result, rootConcept, question } = payload;
  const toggle = (id: SectionId) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="min-h-screen">
      <div className="container max-w-3xl py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back to root explanation
          </button>
          {result.fits && (
            <ShareButton
              kind="peripheral"
              concept={rootConcept}
              system={payload.system}
              domain={payload.domain ?? null}
              question={question}
              result={result}
            />
          )}
        </div>

        <header className="mb-8">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Orbit className="h-3 w-3" />
            peripheral of <span className="text-foreground/80">{rootConcept}</span>
          </p>
          <h1 className="mb-4 font-serif-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {question}
          </h1>
          <div
            className={cn(
              "surface-card flex items-center gap-3 px-5 py-3",
              meta.tintClass,
            )}
          >
            <meta.icon className="h-4 w-4 text-foreground/70" />
            <p className="text-sm">
              <span className="text-muted-foreground">extending: </span>
              <span className="font-medium text-foreground">{meta.label}</span>
            </p>
          </div>
        </header>

        {!result.fits ? (
          <section className="surface-card animate-fade-up p-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              doesn't fit this world cleanly
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {result.reason}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              try translating it on its own from the home screen instead.
            </p>
          </section>
        ) : (
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isOpen = open[section.id];
              return (
                <section
                  key={section.id}
                  className={cn(
                    "surface-card overflow-hidden animate-fade-up",
                    section.id === "analogy" && meta.tintClass,
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(section.id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/70">
                        <Icon className="h-4 w-4 text-foreground/70" />
                      </span>
                      <span className="text-sm font-semibold tracking-tight">
                        {section.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-1">
                      {section.id === "analogy" && (
                        <p className="text-base leading-relaxed text-foreground/90">
                          {result.analogy}
                        </p>
                      )}

                      {section.id === "mapping" && (
                        <ul className="divide-y divide-border/60">
                          {result.mapping.map((pair, i) => (
                            <li
                              key={i}
                              className="grid grid-cols-1 gap-1 py-3 text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3"
                            >
                              <span className="text-foreground/85">
                                {pair.analogy_part}
                              </span>
                              <ArrowLeftRight className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
                              <span className="text-foreground/70">
                                {pair.real_part}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.id === "bridge" && (
                        <p className="text-sm leading-relaxed text-foreground/85">
                          {result.bridge}
                        </p>
                      )}

                      {section.id === "limits" && (
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {result.limits}
                        </p>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Peripheral;
