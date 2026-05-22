// /examples landing page. showcases curated explanations as browsable cards.
// not linked from the main nav — discovered by word of mouth or direct link.

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { curatedConcepts } from "@/features/analogy/curated";
import { getSystem } from "@/features/analogy/systems";

const pastelClasses = [
  "bg-system-story",
  "bg-system-cooking",
  "bg-system-company",
  "bg-system-traffic",
  "bg-system-building",
  "bg-system-relationship",
];

const Examples = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          browse examples
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          see how it translates.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          a small library of concepts, each explained through the six-layer format.
          every example shows the analogy, the mapping, the visual, the bridge,
          the real explanation, and where the analogy breaks.
        </p>
      </section>

      <section className="container max-w-4xl pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {curatedConcepts.map((c, i) => {
            const meta = getSystem(c.system);
            const tint = pastelClasses[i % pastelClasses.length];
            return (
              <Link
                key={c.id}
                to={`/examples/${c.id}`}
                className="group surface-paper p-6 transition-shadow hover:shadow-lift"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${tint}`}
                  >
                    <BookOpen className="h-4 w-4 text-foreground/70" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {c.concept}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      via {meta.label}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {c.teaser}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  read explanation
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Examples;
