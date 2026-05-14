// about page. a longer-form, comprehensive explanation of the product
// philosophy. serif headings, plain language, no marketing fluff.

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const About = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">about</p>
        <h1 className="mb-8 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          the feynman technique, taken further.
        </h1>

        <div className="space-y-6 text-foreground/85 leading-relaxed">
          <p>
            the feynman technique says: if you cannot explain something simply, you do not really understand it. it is a
            brilliant test, but it skips a step. before you can explain something simply, your brain needs a foothold -
            a place inside what you already know to put the new idea down.
          </p>
          <p>
            analogize is built around that foothold. instead of starting with definitions, every explanation starts
            inside a mental model you already use: relationships, gaming, cooking, building, story and fandom,
            companies, traffic, plants, brains, or storage and organization. the new concept is translated into that
            world first, then carefully mapped, layer by layer, to its real meaning.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">how the format works</h2>
          <p>
            every explanation has the same six layers, in the same order. that order is not decoration. it is the path
            your understanding actually takes.
          </p>
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              <strong className="font-serif-display not-italic">analogy</strong> - a vivid, one-line hook in a world you
              already know.
            </li>
            <li>
              <strong className="font-serif-display not-italic">mapping</strong> - clean pairs that show what stands for
              what.
            </li>
            <li>
              <strong className="font-serif-display not-italic">visual</strong> - a small diagram with analogy-specific
              labels, not generic ones.
            </li>
            <li>
              <strong className="font-serif-display not-italic">bridge</strong> - a single line that starts with "in
              other words", connecting the analogy to reality.
            </li>
            <li>
              <strong className="font-serif-display not-italic">real explanation</strong> - the actual concept, in
              proper terms, no longer abstract because the ground is already laid.
            </li>
            <li>
              <strong className="font-serif-display not-italic">where it breaks</strong> - exactly where the analogy
              stops mapping, so you never end up with a confident wrong model.
            </li>
          </ol>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">why this matters</h2>
          <p>
            analogize is a thinking tool translating abstract reasoning into emotionally simulatable mental models that
            is built around:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>metaphor translation</li>
            <li>narrativization</li>
            <li>analogical scaffolding</li>
          </ul>
          <p>
            instead of treating understanding as information retrieval, it treats understanding as cognitive mapping:
            attaching unfamiliar ideas to emotionally tangible, already-familiar mental models.
          </p>
          <p>
            the platform does not provide study material, flashcards, or quizzes nor unearth secret facts about the
            topic. instead, it purely focuses on:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>conceptual compression</li>
            <li>experiential simulation</li>
            <li>emotional anchoring</li>
            <li>relational reasoning</li>
            <li>abstraction to concrete translation</li>
            <li>semantic to episodic understanding</li>
          </ul>
          <p>
            because people rarely think in isolated definitions or textbook jargon. they think in stories, visuals,
            memories, situations, and metaphor structures.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">what makes this different</h2>
          <p>
            most explanation tools do one of two things. they either dumb a concept down until it is no longer the
            concept, or they pile on definitions worded slightly differently until the reader pretends to follow.
            analogize does neither. it keeps the full concept intact and gives you a path into it through the way your
            brain already organizes the world.
          </p>
          <p>
            the goal is not "knowing" something. the goal is remapping complexity into a cognitively native format, in a
            way to invoke that moment when an idea stops feeling abstract and starts feeling obvious, because it
            suddenly belongs to a mental model you already trust.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">accounts are optional</h2>
          <p>
            analogize is local-browser-first. your history, your tags, your private notes, your custom presets - all of
            it lives on your device by default, with no account required. nothing in the app is locked behind sign-in.
          </p>
          <p>
            if you want to carry your work across devices, you can create a free account on{" "}
            <Link to="/account" className="underline underline-offset-4">
              /account
            </Link>
            . signing in adds two things and only two things: cloud sync of your history and presets, and a one-click
            json export of everything you've saved. that's it. no plans, no walls, no nudges.
          </p>
        </div>

        <aside className="mt-14 rounded-2xl border border-border/60 bg-secondary/30 p-7 sm:p-9">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">author's note</p>
          <h2 className="mb-5 font-serif-display text-3xl tracking-tight">why this exists.</h2>
          <div className="space-y-4 text-foreground/85 leading-relaxed">
            <p>
              i built analogize because of how my own brain works. i'm neurodivergent, with adhd, and the way i actually
              retain anything is associative. i narrativize, gamify, systemize and emotionally charge a concept until
              curiosity drags me towards it. once it has a story, a shape and a stake, it sticks.
            </p>
            <p>
              the way i think about my own memory is less like a filing cabinet and more like a complex, infinitely
              nested, clustered, color coded and weighted knowledge graph with semantic tagging. concepts are indexed by
              their structure, not their labels. retrieval feels like running a query against that graph: a cue lights
              up a cluster, the cluster lights up the answer. analogies are the most reliable way i know to insert
              something new into that graph in a way that can be queried later.
            </p>
            <p>
              every time i've explained something to a friend this way, i've been told the same thing: it suddenly
              clicked. people who had bounced off a concept for years would get it in a single conversation, because the
              analogy gave their own knowledge graph somewhere to attach the new node. analogize is an attempt to share
              that, without me having to be in the room.
            </p>
          </div>
        </aside>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          try analogize
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <SiteFooter />
    </div>
  );
};

export default About;
