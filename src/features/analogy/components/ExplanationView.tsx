// the explanation view. renders the five mandatory sections in the exact
// required order. each section is collapsible but defaults to expanded
// so the user gets the full structure first time.

import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  ArrowLeftRight,
  Workflow,
  FileText,
  AlertTriangle,
  CornerDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Explanation } from "../types";
import type { AnalogySystemId } from "../systems";
import { getSystem } from "../systems";
import { MermaidDiagram } from "./MermaidDiagram";

type Section = {
  id: "analogy" | "mapping" | "visual" | "explanation" | "limits";
  label: string;
  icon: typeof Sparkles;
};

const sections: Section[] = [
  { id: "analogy", label: "analogy", icon: Sparkles },
  { id: "mapping", label: "mapping", icon: ArrowLeftRight },
  { id: "visual", label: "visual", icon: Workflow },
  { id: "explanation", label: "real explanation", icon: FileText },
  { id: "limits", label: "where the analogy breaks", icon: AlertTriangle },
];

type Props = {
  concept: string;
  system: AnalogySystemId;
  explanation: Explanation;
  diagramKey?: string;
};

export const ExplanationView = ({
  concept,
  system,
  explanation,
  diagramKey,
}: Props) => {
  const meta = getSystem(system);
  const [open, setOpen] = useState<Record<Section["id"], boolean>>({
    analogy: true,
    mapping: true,
    visual: true,
    explanation: true,
    limits: true,
  });

  const toggle = (id: Section["id"]) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
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
                    {explanation.analogy}
                  </p>
                )}

                {section.id === "mapping" && (
                  <ul className="divide-y divide-border/60">
                    {explanation.mapping.map((pair, i) => (
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

                {section.id === "visual" && (
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                      {explanation.visual_kind}
                    </p>
                    <div className="rounded-xl bg-background/60 p-3">
                      <MermaidDiagram
                        source={explanation.visual_mermaid}
                        cacheKey={diagramKey ?? concept}
                      />
                    </div>
                  </div>
                )}

                {section.id === "explanation" && (
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {explanation.real_explanation}
                  </p>
                )}

                {section.id === "limits" && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {explanation.limits}
                  </p>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
