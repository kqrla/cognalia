// /subject/:subject/:sub - the deepest leaf in the subjects tree.
// dedicated page for one subsubject so users can bookmark, share, and
// see the full ground we'll cover under that angle. ctas back to /app
// with the hook prefilled.

import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { findSub } from "@/features/subjects/data";

const SubSubject = () => {
  const { subject: subjectSlug, sub: subSlug } = useParams<{ subject: string; sub: string }>();
  const found = subjectSlug && subSlug ? findSub(subjectSlug, subSlug) : null;
  if (!found) return <Navigate to="/subjects" replace />;
  const { subject, sub } = found;

  const siblings = subject.subs.filter((s) => s.slug !== sub.slug);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-3xl py-16">
        <nav className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/subjects" className="hover:text-foreground">
            subjects
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={`/subject/${subject.slug}`} className="hover:text-foreground">
            {subject.name}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{sub.name}</span>
        </nav>

        <h1 className="mt-4 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          {sub.name}.
        </h1>
        <p className="mt-4 text-foreground/80 leading-relaxed">{sub.blurb}</p>

        <section className={`surface-paper mt-10 rounded-2xl border p-6 ${subject.accent}`}>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">hooks we'll happily chase</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {sub.hooks.map((h) => (
              <li key={h}>
                <Link
                  to={`/app?q=${encodeURIComponent(h)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm text-foreground/85 hover:border-foreground hover:text-foreground"
                >
                  {h}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> the angles we tend to take
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {sub.angles.map((a) => (
              <li
                key={a}
                className="surface-paper rounded-xl border border-border/60 px-4 py-3 text-sm text-foreground/85"
              >
                {a}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to={`/app?q=${encodeURIComponent(sub.name)}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:opacity-90"
          >
            translate something in {sub.name} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to={`/subject/${subject.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-2 text-sm text-foreground/85 hover:border-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to {subject.name}
          </Link>
        </div>

        {siblings.length > 0 && (
          <section className="mt-16">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              other corners of {subject.name}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/subject/${subject.slug}/${s.slug}`}
                    className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm text-foreground/80 hover:border-foreground hover:text-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default SubSubject;
