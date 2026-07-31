// /anthropomorphize/features - what the planned mode would actually do.

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  ToggleLeft,
  Recycle,
  Timer,
  Network,
  ShieldCheck,
  PencilLine,
  Shuffle,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import AnthroNav from "./AnthroNav";

const features = [
  {
    icon: Users,
    title: "cast sheet",
    body:
      "a short roster generated before the explanation: who the players are, what each wants, and who they are in conflict with. editable, because your cast beats ours.",
  },
  {
    icon: ToggleLeft,
    title: "decompress toggle",
    body:
      "one switch rewrites the whole page from character voice into exam voice. same content, formal vocabulary, so you can check yourself against canon without leaving the concept.",
  },
  {
    icon: Recycle,
    title: "persistent characters",
    body:
      "if the overworked power plant landed once, it returns when a related concept needs the same role. characters live in your library instead of being reinvented per session.",
  },
  {
    icon: Timer,
    title: "learning vs retrieval mode",
    body:
      "learning mode hides timers, counters and progress bars. retrieval mode brings them back. the interface stops nudging you to interrupt yourself mid-flow.",
  },
  {
    icon: Network,
    title: "cast in the graph",
    body:
      "characters become nodes. when the same archetype shows up in another subject, the graph draws the edge and you get the crossover episode for free.",
  },
  {
    icon: ShieldCheck,
    title: "canon guardrail",
    body:
      "every character claim carries the literal mechanism behind it. hover, and the fiction resolves into the fact it stands in for. no orphaned metaphors.",
  },
  {
    icon: PencilLine,
    title: "write your own decompression",
    body:
      "you type the formal version yourself, then compare against ours. that self-explanation step is where the actual encoding happens.",
  },
  {
    icon: Shuffle,
    title: "recast",
    body:
      "one tap to reroll the cast in a different register: office politics, sitcom, courtroom, sports team. if a framing stops earning its keep, replace it.",
  },
];

const flow = [
  ["1", "you enter a concept", "same input as any explanation on analogize."],
  ["2", "we cast it", "a short roster of agents with motives and conflicts."],
  ["3", "you read the drama", "the mechanism arrives as a story with stakes and sequence."],
  ["4", "you decompress", "write the canon version, then compare against the formal rewrite."],
  ["5", "it enters your graph", "characters and concept both persist and connect outward."],
];

const nots = [
  "not a roleplay chatbot you talk to for an hour",
  "not a replacement for the formal definition",
  "not a mandatory mode, it is one lens among several",
  "not applied to topics where personification distorts cause",
];

const AnthroFeatures = () => (
  <div className="min-h-screen">
    <SiteNav />
    <article className="container max-w-3xl py-16 sm:py-24">
      <AnthroNav />
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">anthropomorphize / features</p>
      <h1 className="mt-4 mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        what the mode would do
      </h1>
      <p className="text-lg text-foreground/75 leading-relaxed">
        none of this is shipped. this is the spec we are working from, written plainly so you can argue with it before
        we build the wrong thing.
      </p>

      <div className="mt-14 space-y-16 text-foreground/85 leading-relaxed">
        <section>
          <h2 className="font-serif-display text-3xl tracking-tight">the pieces</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <f.icon className="h-4 w-4 text-foreground/70" />
                </span>
                <p className="mt-3 font-medium">{f.title}</p>
                <p className="mt-2 text-sm text-foreground/75">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif-display text-3xl tracking-tight">the flow, end to end</h2>
          <div className="mt-6 space-y-3">
            {flow.map(([n, title, body]) => (
              <div key={n} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">
                  {n}
                </span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="mt-1.5 text-sm text-foreground/75">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif-display text-3xl tracking-tight">what it is not</h2>
          <ul className="mt-6 space-y-2">
            {nots.map((n) => (
              <li key={n} className="rounded-2xl border border-dashed border-border p-4 text-sm text-foreground/75">
                {n}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border/70 bg-secondary/50 p-6">
          <p className="font-serif-display text-2xl leading-snug">the cast is the draft. canon is the final copy.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link
              to="/anthropomorphize/faq"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              read the faq
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:bg-background"
            >
              see the roadmap
            </Link>
          </div>
        </section>
      </div>
    </article>
    <SiteFooter />
  </div>
);

export default AnthroFeatures;
