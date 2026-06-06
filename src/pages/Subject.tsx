// /subject/:slug - one subject, listing its subsubjects with full
// blurbs, representative hooks, and the analogical angles we tend to
// reach for in that domain. each subsubject links to its dedicated
// page at /subject/:slug/:sub.

import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { findSubject } from "@/features/subjects/data";

const Subject = () => {
  const { subject: slug } = useParams<{ subject: string }>();
  const subject = slug ? findSubject(slug) : null;
  if (!subject) return <Navigate to="/subjects" replace />;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-4xl py-16">
        <Link
          to="/subjects"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> subjects
        </Link>
        <h1 className="mt-4 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          {subject.name}.
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{subject.tagline}</p>
        <p className="mt-5 max-w-2xl text-foreground/80 leading-relaxed">{subject.description}</p>

        <p className="mt-12 mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">subsubjects</p>
        <ul className="grid gap-4">
          {subject.subs.map((sub) => (
            <li key={sub.slug} className={`surface-paper rounded-2xl border p-6 ${subject.accent}`}>
              <Link to={`/subject/${subject.slug}/${sub.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif-display text-2xl tracking-tight">{sub.name}</h2>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{sub.blurb}</p>
              </Link>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">hooks</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {sub.hooks.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] text-foreground/75"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <Sparkles className="h-3 w-3" /> angles we like
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {sub.angles.map((a) => (
                      <li
                        key={a}
                        className="rounded-full border border-dashed border-border/70 px-2 py-0.5 text-[11px] text-foreground/75"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Subject;
