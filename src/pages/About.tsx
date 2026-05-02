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
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          about
        </p>
        <h1 className="mb-8 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          the feynman technique, taken further.
        </h1>

        <div className="space-y-6 text-foreground/85 leading-relaxed">
          <p>
            the feynman technique says: if you cannot explain something simply, you do not really understand it. it is a brilliant test, but it skips a step. before you can explain something simply, your brain needs a foothold — a place inside what you already know to put the new idea down.
          </p>
          <p>
            analogize is built around that foothold. instead of starting with definitions, every explanation starts inside a mental model you already use: relationships, gaming, cooking, building, story and fandom, companies, traffic, plants, brains, or storage and organization. the new concept is translated into that world first, then carefully mapped, layer by layer, to its real meaning.
          </p>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">how the format works</h2>
          <p>
            every explanation has the same six layers, in the same order. that order is not decoration. it is the path your understanding actually takes.
          </p>
          <ol className="ml-5 list-decimal space-y-2">
            <li><strong className="font-serif-display not-italic">analogy</strong> — a vivid, one-line hook in a world you already know.</li>
            <li><strong className="font-serif-display not-italic">mapping</strong> — clean pairs that show what stands for what.</li>
            <li><strong className="font-serif-display not-italic">visual</strong> — a small diagram with analogy-specific labels, not generic ones.</li>
            <li><strong className="font-serif-display not-italic">bridge</strong> — a single line that starts with "in other words", connecting the analogy to reality.</li>
            <li><strong className="font-serif-display not-italic">real explanation</strong> — the actual concept, in proper terms, no longer abstract because the ground is already laid.</li>
            <li><strong className="font-serif-display not-italic">where it breaks</strong> — exactly where the analogy stops mapping, so you never end up with a confident wrong model.</li>
          </ol>

          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">why this matters</h2>
          <p>
            most explanation tools do one of two things. they either dumb a concept down until it is no longer the concept, or they pile on definitions until the reader pretends to follow. analogize does neither. it keeps the full concept intact and gives you a path into it through the way your brain already organizes the world.
          </p>
          <p>
            the goal is not knowing something. the goal is the moment when an idea stops feeling abstract and starts feeling obvious, because it suddenly belongs to a mental model you already trust.
          </p>
        </div>

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
