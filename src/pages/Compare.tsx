// /compare - honest positioning vs apps people may assume are the same thing.
// no trash-talking. just where analogize fits and where it doesn't.

import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, Sparkles } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

type Tri = true | false | "partial";

type Capability = {
  feature: string;
  sub?: string;
  values: Tri[]; // analogize, chatgpt, perplexity, wikipedia, anki
};

const tools = [
  { name: "analogize", note: "this app" },
  { name: "chatgpt", note: "general chat assistant" },
  { name: "perplexity", note: "answer engine" },
  { name: "wikipedia", note: "reference encyclopedia" },
  { name: "anki", note: "spaced-repetition flashcards" },
];

const capabilities: Capability[] = [
  { feature: "explains by mapping to a system you already understand", values: [true, "partial", false, false, false] },
  { feature: "answer is structured: analogy + mapping + visual", values: [true, false, false, false, false] },
  { feature: "remembers your personal reference points across topics", sub: "your presets carry from one explanation to the next", values: [true, false, false, false, false] },
  { feature: "graph view of how concepts connect", values: [true, false, false, "partial", false] },
  { feature: "general factual q&a with citations", values: [false, "partial", true, true, false] },
  { feature: "long-form open conversation", values: [false, true, "partial", false, false] },
  { feature: "spaced-repetition retention practice", values: [false, false, false, false, true] },
  { feature: "browsable, opt-in library of public templates", values: [true, false, false, true, true] },
  { feature: "works fully without an account", values: [true, false, "partial", true, "partial"] },
  { feature: "your data stays on your device by default", values: [true, false, false, true, true] },
];

const positions = [
  {
    name: "vs chatgpt",
    body: "chatgpt is an open conversation. you can ask it for an analogy and it will write one, but it doesn't remember your reference points, doesn't structure the answer the same way twice, and won't show you the mapping or the graph. analogize does one thing: translate the unfamiliar into something you already know, in a predictable shape.",
    when: "use chatgpt when you want a conversation. use analogize when you want a translation.",
  },
  {
    name: "vs perplexity",
    body: "perplexity is an answer engine with citations. it tells you what is true. analogize doesn't compete on facts, it competes on intuition. you reach for perplexity when you need a source, you reach for analogize when the source is correct but the idea still hasn't clicked.",
    when: "use perplexity to find the answer. use analogize to feel the answer.",
  },
  {
    name: "vs wikipedia",
    body: "wikipedia is the canonical reference, exhaustive, neutral, and slow to read. analogize is the opposite shape: short, opinionated about which analogy fits you, and reusable across topics through your saved references.",
    when: "use wikipedia to look it up. use analogize to actually learn it.",
  },
  {
    name: "vs anki / flashcards",
    body: "anki is for retention, you already understand the thing and you want to keep it. analogize is for the step before that, the moment a concept first lands. one is a memory tool, the other is a comprehension tool. they sit next to each other, not against each other.",
    when: "use anki to remember. use analogize to first understand.",
  },
];

const Cell = ({ v }: { v: Tri }) => {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-foreground" />;
  if (v === "partial") return <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-foreground/40" />;
  return <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />;
};

const Compare = () => (
  <div className="min-h-screen">
    <SiteNav />
    <section className="container max-w-5xl py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">compare</p>
      <h1 className="font-serif-display text-4xl tracking-tight md:text-5xl">
        analogize vs the apps it looks like.
      </h1>
      <p className="mt-5 max-w-2xl text-base text-foreground/70">
        a lot of tools brush against the same surface: explain something, answer something, help you learn something. they aren't actually the same thing. here is where analogize fits, and where it honestly doesn't.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">try analogize</Link>
        <Link to="/whyregister" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">why register</Link>
        <Link to="/examples" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">see examples</Link>
      </div>

      <div className="mt-12 overflow-x-auto surface-paper">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-border/60 bg-secondary/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">capability</th>
              {tools.map((t, i) => (
                <th key={t.name} className={`px-3 py-3 text-center text-xs uppercase tracking-[0.16em] ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  <div>{t.name}</div>
                  <div className="mt-0.5 text-[10px] normal-case tracking-normal text-muted-foreground/80">{t.note}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {capabilities.map((c) => (
              <tr key={c.feature}>
                <td className="px-4 py-3">
                  <p className="font-medium">{c.feature}</p>
                  {c.sub && <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>}
                </td>
                {c.values.map((v, i) => (
                  <td key={i} className={`px-3 py-3 text-center ${i === 0 ? "bg-secondary/30" : ""}`}>
                    <Cell v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">dot = partial / depends on usage.</p>
      </div>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        {positions.map((p) => (
          <article key={p.name} className="surface-paper p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.name}</p>
            <p className="mt-3 text-sm text-foreground/80">{p.body}</p>
            <p className="mt-4 border-t border-border/60 pt-3 font-serif-display text-base tracking-tight">{p.when}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 surface-paper p-7">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 text-foreground/70" />
          <div>
            <p className="font-serif-display text-xl tracking-tight">the one-line summary.</p>
            <p className="mt-2 max-w-2xl text-sm text-foreground/70">
              other tools tell you what something is. analogize tells you what something is like, anchored to things you already understand, so the idea actually lands.
            </p>
            <Link to="/app" className="mt-5 inline-flex items-center gap-2 text-sm underline underline-offset-4">
              translate your first concept <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        notice a comparison missing? <Link to="/contact" className="underline underline-offset-4">tell us</Link>.
      </p>
    </section>
    <SiteFooter />
  </div>
);

export default Compare;
