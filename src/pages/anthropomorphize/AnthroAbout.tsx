// /anthropomorphize/about - the longer story behind the idea.

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, History as HistoryIcon } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import AnthroNav from "./AnthroNav";

const origins = [
  {
    era: "ancient rhetoric",
    body:
      "personification and the method of loci were standard kit for orators who had to hold an hour of argument in their head with no notes. characters and places were the storage medium.",
  },
  {
    era: "fables and folk teaching",
    body:
      "before literacy was common, moral and practical knowledge travelled as animals with opinions. the lesson survived because the character did.",
  },
  {
    era: "modern cognitive science",
    body:
      "structure mapping, elaborative encoding and the self reference effect all point the same way: information attached to agents and stories is easier to encode and retrieve than isolated propositions.",
  },
  {
    era: "how students actually study",
    body:
      "nobody remembers the definition of a displacement reaction. everybody remembers that sodium is unhinged. we are formalising a thing learners already do in secret.",
  },
];

const beliefs = [
  {
    title: "understanding has stages",
    body:
      "first contact, working grip, then formal fluency. most tools only serve the third stage and then wonder why beginners bounce off.",
  },
  {
    title: "scaffolding is not the building",
    body:
      "a character is temporary structure. it exists to let you build something you could not have built directly, and it comes down when the walls hold.",
  },
  {
    title: "seriousness is not rigour",
    body:
      "a silly framing that survives an exam beats a solemn one you forgot by tuesday. rigour lives in the decompression step, not in the tone.",
  },
  {
    title: "you already own the hardware",
    body:
      "social reasoning is the most over-trained module you have. routing new abstractions through it is free performance.",
  },
];

const AnthroAbout = () => (
  <div className="min-h-screen">
    <SiteNav />
    <article className="container max-w-3xl py-16 sm:py-24">
      <AnthroNav />
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">anthropomorphize / about</p>
      <h1 className="mt-4 mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        where this idea came from
      </h1>
      <p className="text-lg text-foreground/75 leading-relaxed">
        anthropomorphizing is not a trick we invented. it is one of the oldest memory technologies there is, and it has
        been quietly doing the heavy lifting in every classroom where a teacher said "imagine the electron really wants
        to leave".
      </p>

      <div className="mt-14 space-y-16 text-foreground/85 leading-relaxed">
        <section>
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-serif-display text-3xl tracking-tight">a short lineage</h2>
          </div>
          <div className="mt-6 space-y-3">
            {origins.map((o) => (
              <div key={o.era} className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{o.era}</p>
                <p className="mt-2 text-sm text-foreground/80">{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-serif-display text-3xl tracking-tight">what we believe about it</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {beliefs.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="font-medium">{b.title}</p>
                <p className="mt-2 text-sm text-foreground/75">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif-display text-3xl tracking-tight">how it fits the rest of analogize</h2>
          <p className="mt-3">
            analogize already translates a concept into a system you know. anthropomorphizing is the narrowest, most
            aggressive version of that move: the target system is people. it sits at the front of the pipeline, before
            the five part explanation, and it feeds the graph the same way any other analogy does.
          </p>
          <p className="mt-3">
            read{" "}
            <Link to="/philosophy" className="underline underline-offset-4 hover:text-foreground">
              philosophy
            </Link>{" "}
            for the worldview,{" "}
            <Link to="/mechanisms" className="underline underline-offset-4 hover:text-foreground">
              mechanisms
            </Link>{" "}
            for the feature to cognition mapping, and{" "}
            <Link to="/authorsnote" className="underline underline-offset-4 hover:text-foreground">
              the author's note
            </Link>{" "}
            for why any of this exists at all.
          </p>
        </section>

        <section className="rounded-2xl border border-border/70 bg-secondary/50 p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">status</p>
          </div>
          <p className="mt-3 font-serif-display text-2xl leading-snug">
            in design. not shipped. shaped in public on purpose.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
          >
            tell us how you'd use it
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </article>
    <SiteFooter />
  </div>
);

export default AnthroAbout;
