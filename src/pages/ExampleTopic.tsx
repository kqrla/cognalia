// individual example topic page. renders a curated explanation read-only.
// route: /examples/:topic

import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ExplanationView } from "@/features/analogy/components/ExplanationView";
import { curatedConcepts } from "@/features/analogy/curated";
import { getSystem } from "@/features/analogy/systems";

const ExampleTopic = () => {
  const { topic } = useParams<{ topic: string }>();

  const concept = useMemo(() => {
    return curatedConcepts.find((c) => c.id === topic);
  }, [topic]);

  const currentIndex = useMemo(() => {
    return curatedConcepts.findIndex((c) => c.id === topic);
  }, [topic]);

  const prevConcept = currentIndex > 0 ? curatedConcepts[currentIndex - 1] : null;
  const nextConcept =
    currentIndex < curatedConcepts.length - 1 ? curatedConcepts[currentIndex + 1] : null;

  if (!concept) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <section className="container max-w-4xl pt-24 pb-20">
          <h1 className="font-serif-display text-3xl tracking-tight">
            example not found
          </h1>
          <p className="mt-4 text-foreground/70">
            that topic doesn't exist in the example library.
          </p>
          <Link
            to="/examples"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            back to examples
          </Link>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const meta = getSystem(concept.system);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-3xl pt-12 pb-8">
        <Link
          to="/examples"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          all examples
        </Link>

        <div className="mb-2 flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.tintClass}`}
          >
            <meta.icon className="h-3.5 w-3.5 text-foreground/70" />
            {meta.label}
          </span>
        </div>
        <h1 className="font-serif-display text-4xl tracking-tight sm:text-5xl">
          {concept.concept}
        </h1>
        <p className="mt-2 text-foreground/70">{concept.teaser}</p>
      </section>

      <section className="container max-w-3xl pb-16">
        <ExplanationView
          concept={concept.concept}
          system={concept.system}
          explanation={concept.explanation}
        />
      </section>

      {/* prev / next footer */}
      <section className="container max-w-3xl pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          {prevConcept ? (
            <Link
              to={`/examples/${prevConcept.id}`}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="max-w-[12rem] truncate">{prevConcept.concept}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextConcept ? (
            <Link
              to={`/examples/${nextConcept.id}`}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="max-w-[12rem] truncate">{nextConcept.concept}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ExampleTopic;
