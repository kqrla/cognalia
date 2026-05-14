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

const encompass: { label: string; modal?: { title: string; body: string[] } }[] = [
  { label: "narrativization" },
  { label: "metaphor translation" },
  { label: "emotional anchoring" },
  {
    label: "analogical scaffolding",
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
  { label: "conceptual mapping" },
  { label: "experiential simulation" },
  { label: "relational understanding" },
  { label: "abstraction translation" },
  { label: "contextual embodied understanding" },
  { label: "low-load conceptual packets" },
  { label: "cognitive bridges" },
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
        <p className="mt-6 max-w-2xl text-foreground/75">
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
            {encompass.map((p) => (
              <span
                key={p.label}
                className="relative inline-flex items-center whitespace-nowrap rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-sm text-foreground/85"
              >
                {p.label}
                {p.modal && (
                  <button
                    type="button"
                    onClick={() => setOpenModal(p.label)}
                    aria-label={`learn more about ${p.label}`}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background text-foreground/70 shadow-sm transition-colors hover:text-foreground"
                  >
                    <Star className="h-2.5 w-2.5" fill="currentColor" />
                  </button>
                )}
              </span>
            ))}
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
            <DialogDescription className="text-foreground/80">{activeModal?.body[0]}</DialogDescription>
          </DialogHeader>
          <ul className="ml-5 list-disc space-y-1.5 text-sm text-foreground/85">
            {activeModal?.body.slice(1).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
};

export default Features;
