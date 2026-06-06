// /subjects - index of all the subject areas analogize covers, with a
// quick look at the subsubjects under each. clicking a subject opens
// /subject/:slug; clicking a subsubject jumps straight to its detail
// page.

import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { subjects } from "@/features/subjects/data";

const Subjects = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-5xl py-16">
        <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Compass className="h-3.5 w-3.5" /> subjects we cover
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          the territory.
        </h1>
        <p className="mt-5 max-w-2xl text-foreground/75 leading-relaxed">
          analogize isn't picky about domain - if there's a concept you want translated into a world you already live in,
          we'll try. that said, these are the areas we lean into hardest. each one breaks out into subsubjects so you can
          tell us (and yourself) what you're actually here for.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {subjects.map((s) => (
            <li key={s.slug} className={`surface-paper rounded-2xl border p-6 ${s.accent}`}>
              <Link to={`/subject/${s.slug}`} className="group">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif-display text-2xl tracking-tight">{s.name}</h2>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.tagline}</p>
                <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{s.description}</p>
              </Link>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.subs.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      to={`/subject/${s.slug}/${sub.slug}`}
                      className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-xs text-foreground/80 hover:border-foreground hover:text-foreground"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-16 surface-paper rounded-2xl border border-border/60 p-6 text-sm text-foreground/75">
          don't see what you're after?{" "}
          <Link to="/app" className="underline underline-offset-4">just ask in /app</Link> - we'll meet you where you are,
          and you can{" "}
          <Link to="/suggest" className="underline underline-offset-4">suggest</Link> a new subject too.
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Subjects;
