// /pricing - free in beta, free tier always. three placeholder tiers are
// dimmed out. no enterprise plan, ever.

import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

const placeholderTiers = [
  { name: "studio", note: "placeholder" },
  { name: "atelier", note: "placeholder" },
  { name: "enterprise", note: "never. on principle." },
];

const freeIncludes = [
  "every thinking system, every layer",
  "explain, regenerate, peripheral analogies",
  "your own custom presets",
  "history, tags, and version snapshots",
  "the full understanding graph",
  "optional cloud sync across devices",
  "json export of everything you own",
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl pt-16 pb-12 sm:pt-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">pricing</p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          <span className="a-hl a-hl-yellow">free</span> in beta. always a{" "}
          <span className="a-hl a-hl-sage">free tier</span>.
        </h1>
        <p className="mt-6 max-w-[92%] text-lg leading-relaxed text-foreground/75">
          analogize is a thinking tool, not a subscription trap. while we&apos;re in beta the whole
          thing is free. once we&apos;re out of beta, the core experience{" "}
          <span className="a-u a-u-wavy">stays free</span> — forever.
        </p>
      </section>

      {/* the free tier (active) */}
      <section className="container max-w-4xl pb-12">
        <article className="surface-paper relative p-8 sm:p-10">
          <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-background">
            <Sparkles className="h-3 w-3" />
            current
          </span>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-serif-display text-3xl tracking-tight">free, in beta</h2>
              <p className="mt-1 text-sm text-muted-foreground">everything, no card, no catch.</p>
            </div>
            <p className="font-serif-display text-5xl leading-none tracking-tight">$0</p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {freeIncludes.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/app"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            start translating
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>

      {/* dimmed placeholders */}
      <section className="container max-w-4xl pb-12">
        <h2 className="mb-2 font-serif-display text-2xl tracking-tight text-foreground/70">
          the rest, eventually
        </h2>
        <p className="mb-6 max-w-[92%] text-sm text-foreground/65">
          if and when paid tiers exist, they&apos;ll be for genuine extras — not for hiding the
          features that make the tool work. these are placeholders, not promises.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {placeholderTiers.map((t) => {
            const isEnterprise = t.name === "enterprise";
            return (
              <article
                key={t.name}
                className={cn(
                  "surface-paper relative p-6 opacity-50 grayscale",
                  "select-none pointer-events-none",
                )}
                aria-disabled="true"
              >
                <p className="font-serif-display text-2xl tracking-tight">{t.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.note}
                </p>
                <div className="mt-6 space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-foreground/20" />
                  <div className="h-2 w-2/3 rounded-full bg-foreground/15" />
                  <div className="h-2 w-1/2 rounded-full bg-foreground/15" />
                  <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
                </div>
                {isEnterprise && (
                  <p className="mt-6 text-xs leading-relaxed text-foreground/70">
                    this card is dimmed on purpose. an &quot;enterprise plan&quot; isn&apos;t in
                    the cards and won&apos;t be.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* the principle */}
      <section className="container max-w-4xl pb-24">
        <div className="surface-paper p-8 sm:p-10">
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">why no enterprise tier</h2>
          <p className="max-w-[92%] text-foreground/80 leading-relaxed">
            analogize is a tool for{" "}
            <span className="a-hl a-hl-blue">individual minds</span>, not procurement departments.
            the moment a product starts shaping itself around{" "}
            <span className="a-u a-u-dashed">enterprise contracts</span>, it stops being honest with
            the person actually using it. so we&apos;re not going there.{" "}
            <span className="a-bb">ever.</span>
          </p>
          <p className="mt-4 max-w-[92%] text-foreground/80 leading-relaxed">
            the free tier is the product. anything paid would be{" "}
            <span className="a-i">on top of</span> it, not gatekeeping it.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Pricing;
