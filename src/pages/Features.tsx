// features page. lists what the product actually does, grouped by intent.

import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowRight,
  Sparkles,
  ArrowLeftRight,
  Workflow,
  CornerDownRight,
  FileText,
  AlertTriangle,
  RefreshCcw,
  Layers,
  Clock,
  BookOpen,
  Tag,
  MessageCircleQuestion,
  Filter,
  Orbit,
  Lightbulb,
  Cloud,
  Download,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const sixLayers = [
  {
    icon: Sparkles,
    label: "analogy",
    body: "starts with a vivid one-line hook in the system you chose. no jargon, no definition.",
  },
  {
    icon: ArrowLeftRight,
    label: "mapping",
    body: "explicit pairs translate every part of the analogy to the real concept.",
  },
  {
    icon: Workflow,
    label: "visual",
    body: "a small mermaid diagram with analogy-specific labels, not generic technical ones.",
  },
  {
    icon: CornerDownRight,
    label: "bridge",
    body: "one line that starts with 'in other words', connecting analogy to reality.",
  },
  {
    icon: FileText,
    label: "real explanation",
    body: "the actual concept in proper terms, now grounded in something familiar.",
  },
  {
    icon: AlertTriangle,
    label: "where it breaks",
    body: "the analogy's limits, so you never end up with a confident wrong model.",
  },
];

const capabilities = [
  {
    icon: Layers,
    label: "ten thinking systems",
    body: "relationships, gaming, cooking, building, story, company, traffic, plants, brains, storage. pick the one that matches how you naturally think.",
  },
  {
    icon: RefreshCcw,
    label: "explain again differently",
    body: "regenerate using a different system to look at the same concept from another angle. no two explanations repeat.",
  },
  {
    icon: Filter,
    label: "domain disambiguation",
    body: "as you type, tiny pills appear when a term spans fields. pin the one you mean so the analogy lands in the right subdomain.",
  },
  {
    icon: MessageCircleQuestion,
    label: "domain-aware follow-ups",
    body: "ask one quick clarifying question without leaving the explanation. the answer stays inside the same analogy and the same domain you pinned.",
  },
  {
    icon: Orbit,
    label: "peripheral analogies",
    body: "ask about a related concept and we'll place it inside the same world as the original explanation, on its own screen. if it doesn't land naturally, we say so instead of forcing a bad metaphor.",
  },
  {
    icon: Lightbulb,
    label: "suggest your own references",
    body: "teach analogize a hobby or mental model that isn't built in. it's saved as a preset on this device and used in future explanations only when it lands naturally.",
  },
  {
    icon: Tag,
    label: "custom tags on history",
    body: "add your own semantic tags to past translations and filter by them on the /history page. tags live on this device.",
  },
  {
    icon: Clock,
    label: "version history per concept",
    body: "every reframe of the same concept is kept as its own version, so you can revisit how you understood it through different lenses.",
  },
  {
    icon: BookOpen,
    label: "curated library",
    body: "hand-crafted examples ship with the app so you can see the format at its best before generating your own.",
  },
  {
    icon: Cloud,
    label: "optional cloud sync",
    body: "the app is local-browser-first and nothing requires an account. create one on /account if you want your history, presets and preferences to follow you across devices.",
  },
  {
    icon: Download,
    label: "json export",
    body: "with an account, export everything you've saved - history, presets, preferences - as a single json file you fully own.",
  },
];

// each chip has an optional modal. set `starred: true` to show the gold star.
// to temporarily disable a chip's popup without losing its content, comment
// out the `body` line - clicking the chip becomes a no-op until you re-enable.
const encompass: {
  label: string;
  starred?: boolean;
  href?: string;
  modal?: { title: string; body?: string[] };
}[] = [
  { label: "narrativization", modal: { title: "narrativization", /* body: ["edit me"] */ } },
  { label: "metaphor translation", modal: { title: "metaphor translation", /* body: ["edit me"] */ } },
  { label: "emotional anchoring", modal: { title: "emotional anchoring", /* body: ["edit me"] */ } },
  {
    label: "analogical scaffolding",
    starred: true,
    modal: {
      title: "analogical scaffolding",
      body: [
        "analogize makes sure the explanations aren't random metaphors and trains our models to make sure they're:",
        "structurally aligned mappings",
        "scaffolded conceptual transfers",
        "familiar-schema borrowing",
      ],
    },
  },
  {
    label: "cognitive compression",
    starred: true,
    modal: {
      title: "cognitive compression",
      body: [
        "this is exactly what the analogize system is doing:",
        "compressing large conceptual systems",
        "into emotionally legible packets",
        "with low cognitive load",
        "while preserving relational structure",
      ],
    },
  },
  { label: "conceptual mapping", modal: { title: "conceptual mapping", /* body: ["edit me"] */ } },
  { label: "experiential simulation", modal: { title: "experiential simulation", /* body: ["edit me"] */ } },
  { label: "relational understanding", modal: { title: "relational understanding", /* body: ["edit me"] */ } },
  { label: "abstraction translation", modal: { title: "abstraction translation", /* body: ["edit me"] */ } },
  { label: "contextual embodied understanding", modal: { title: "contextual embodied understanding", /* body: ["edit me"] */ } },
  { label: "low-load conceptual packets", modal: { title: "low-load conceptual packets", /* body: ["edit me"] */ } },
  { label: "cognitive bridges", modal: { title: "cognitive bridges", /* body: ["edit me"] */ } },
  { label: "graphical representation", href: "/graphical" },
];

const Features = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const activeModal = encompass.find((p) => p.label === openModal)?.modal;
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl py-16 sm:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">features</p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          a strict format that quietly does the work.
        </h1>
        <p className="mt-6 max-w-[92%] text-lg text-foreground/75 leading-relaxed">
          analogize is opinionated on purpose. every explanation follows the same six layers, in the same order. the
          structure is the product.
        </p>
      </section>

      <section className="container max-w-4xl pb-20">
        <h2 className="mb-6 font-serif-display text-3xl tracking-tight">the six layers</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sixLayers.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.label} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{s.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container max-w-4xl pb-24">
        <h2 className="mb-6 font-serif-display text-3xl tracking-tight">what you can do with it</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <article key={c.label} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight">{c.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{c.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-16">
          <h2 className="mb-2 font-serif-display text-3xl tracking-tight">what does this encompass</h2>
          <p className="mb-6 text-foreground/75">
            designed around how humans internally process meaning, approaches understanding less as information
            retrieval and more as conceptual translation, restructuring abstract ideas into forms that are easier to
            mentally simulate, connect, and reason through. many of the platform’s systems and interactions are built
            around the following understanding mechanisms:
          </p>
          <div className="flex flex-wrap gap-2">
            {encompass.map((p) => {
              const hasBody = !!p.modal?.body && p.modal.body.length > 0;
              const chipClass =
                "surface-paper relative inline-flex max-w-[50vw] items-center rounded-full px-4 py-1.5 text-sm text-foreground/85 transition-colors hover:bg-accent/30 disabled:cursor-default disabled:opacity-90";
              if (p.href) {
                return (
                  <Link key={p.label} to={p.href} className={chipClass}>
                    <span className="break-words text-left">{p.label}</span>
                    {p.starred && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background text-amber-500 shadow-sm"
                      >
                        <Star className="h-2.5 w-2.5" fill="currentColor" />
                      </span>
                    )}
                  </Link>
                );
              }
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => hasBody && setOpenModal(p.label)}
                  aria-label={hasBody ? `learn more about ${p.label}` : p.label}
                  className={chipClass}
                  disabled={!hasBody}
                >
                  <span className="break-words text-left">{p.label}</span>
                  {p.starred && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background text-amber-500 shadow-sm"
                    >
                      <Star className="h-2.5 w-2.5" fill="currentColor" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          open the app
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <Dialog open={!!openModal} onOpenChange={(o) => !o && setOpenModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl tracking-tight">{activeModal?.title}</DialogTitle>
            {activeModal?.body && activeModal.body.length > 0 && (
              <DialogDescription className="text-foreground/80">{activeModal.body[0]}</DialogDescription>
            )}
          </DialogHeader>
          {activeModal?.body && activeModal.body.length > 1 && (
            <ul className="ml-5 list-disc space-y-1.5 text-sm text-foreground/85">
              {activeModal.body.slice(1).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
};

export default Features;
