// features page. lists what the product actually does, grouped by intent.

import { Link } from "react-router-dom";
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
  { icon: Sparkles, label: "analogy", body: "starts with a vivid one-line hook in the system you chose. no jargon, no definition." },
  { icon: ArrowLeftRight, label: "mapping", body: "explicit pairs translate every part of the analogy to the real concept." },
  { icon: Workflow, label: "visual", body: "a small mermaid diagram with analogy-specific labels, not generic technical ones." },
  { icon: CornerDownRight, label: "bridge", body: "one line that starts with 'in other words', connecting analogy to reality." },
  { icon: FileText, label: "real explanation", body: "the actual concept in proper terms, now grounded in something familiar." },
  { icon: AlertTriangle, label: "where it breaks", body: "the analogy's limits, so you never end up with a confident wrong model." },
];

const capabilities = [
  { icon: Layers, label: "ten thinking systems", body: "relationships, gaming, cooking, building, story, company, traffic, plants, brains, storage. pick the one that matches how you naturally think." },
  { icon: RefreshCcw, label: "explain again differently", body: "regenerate using a different system to look at the same concept from another angle. no two explanations repeat." },
  { icon: Filter, label: "domain disambiguation", body: "as you type, tiny pills appear when a term spans fields. pin the one you mean so the analogy lands in the right subdomain." },
  { icon: MessageCircleQuestion, label: "domain-aware follow-ups", body: "ask one quick clarifying question without leaving the explanation. the answer stays inside the same analogy and the same domain you pinned." },
  { icon: Orbit, label: "peripheral analogies", body: "ask about a related concept and we'll place it inside the same world as the original explanation, on its own screen. if it doesn't land naturally, we say so instead of forcing a bad metaphor." },
  { icon: Lightbulb, label: "suggest your own references", body: "teach analogize a hobby or mental model that isn't built in. it's saved as a preset on this device and used in future explanations only when it lands naturally." },
  { icon: Tag, label: "custom tags on history", body: "add your own semantic tags to past translations and filter by them on the /history page. tags live on this device." },
  { icon: Clock, label: "version history per concept", body: "every reframe of the same concept is kept as its own version, so you can revisit how you understood it through different lenses." },
  { icon: BookOpen, label: "curated library", body: "hand-crafted examples ship with the app so you can see the format at its best before generating your own." },
  { icon: Cloud, label: "optional cloud sync", body: "the app is local-browser-first and nothing requires an account. create one on /account if you want your history, presets and preferences to follow you across devices." },
  { icon: Download, label: "json export", body: "with an account, export everything you've saved — history, presets, preferences — as a single json file you fully own." },
];

const Features = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl py-16 sm:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          features
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          a strict format that quietly does the work.
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/75">
          analogize is opinionated on purpose. every explanation follows the same six layers, in the same order. the structure is the product.
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

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          open the app
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Features;
