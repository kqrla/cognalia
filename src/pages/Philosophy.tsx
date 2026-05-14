// /philosophy - the bts page. how analogize was sculpted from a handful
// of borrowed ideas. conceptual, conversational, not academic.

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Philosophy = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">philosophy</p>
        <h1 className="mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          sculpting analogize into creation: bts
        </h1>
        <p className="max-w-[92%] text-lg text-foreground/75 leading-relaxed">
          this is the page that explains the thought process behind analogize: where the ideas came from, what we
          actually borrowed, and how they got blended together into the thing you see today.
        </p>

        <div className="mt-14 space-y-6 text-foreground/85 leading-relaxed">
          <h2 className="font-serif-display text-3xl tracking-tight">concepts we combined and borrowed from</h2>
          <p>
            analogize is not a brand new theory. it is a stitch job. we leaned on a handful of existing ideologies and
            theories that already understood pieces of how humans think, and weaved them together instead of trying to
            reinvent the wheel. the actual novelty is in the combination, not the components.
          </p>

          <div className="mt-6 space-y-7">
            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">the feynman technique</h3>
              <p className="mt-2">
                richard feynman's idea: if you cannot explain something in plain language, you do not really understand
                it. it is a brutal honesty test for understanding. analogize takes that test seriously, but adds the
                missing setup step - giving you a familiar place to stand before you try to simplify.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">intertwingularity</h3>
              <p className="mt-2">
                a word coined by ted nelson, the same person who coined "hypertext". the idea is simple: knowledge is
                deeply interconnected, and any attempt to flatten it into neat hierarchies loses the truth of how it
                actually lives in your head. ideas refer to other ideas; categories blur into each other; nothing is
                truly isolated. analogize leans into that messiness instead of pretending it isn't there.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">connectivism</h3>
              <p className="mt-2">
                a learning theory that says knowing is less about storing facts and more about forming connections
                between nodes - people, ideas, sources, contexts. understanding emerges from the network, not from any
                single node. each analogize explanation is essentially a bundle of new connections wired into your
                existing network.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">associationism</h3>
              <p className="mt-2">
                an old school of thought in psychology: complex ideas are built by linking simpler ones through
                similarity, contrast, contiguity. memory itself is associative - one cue calls up another. this is the
                ground floor of why analogies work at all. you remember the analogy, the analogy remembers the concept.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">empiricism</h3>
              <p className="mt-2">
                the view that knowledge starts with experience. if a concept never touches anything you have lived,
                seen, or felt, it stays abstract and slippery. analogize forces every concept to land inside experience
                - through systems you already navigate fluently, like cooking, gaming, or relationships.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">systems thinking</h3>
              <p className="mt-2">
                instead of looking at parts in isolation, systems thinking asks how things relate, feed back, and
                influence each other inside a whole. every analogize system - traffic, plants, companies, brains - is a
                little ecosystem of moving parts. mapping a concept onto one means inheriting its relationships, not
                just its vocabulary.
              </p>
            </section>
          </div>

          <blockquote className="my-10 border-l-2 border-foreground/40 pl-5 font-serif-display text-xl italic text-foreground/85">
            we took these store-bought theories, dumped them into a blender, and poured out our own special recipe. /j
          </blockquote>

          <h2 className="pt-2 font-serif-display text-3xl tracking-tight">the key implications</h2>
          <p>
            once you stitch those theories together, certain consequences fall out almost automatically. these are the
            three that shape almost every design decision inside analogize.
          </p>

          <div className="mt-6 space-y-7">
            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">contextual understanding</h3>
              <p className="mt-2">
                a concept does not really mean anything until it sits inside a context. the same word means different
                things in different fields. analogize explanations are always anchored inside a specific system, so the
                meaning lands with the right neighbors instead of floating free.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">association-based learning</h3>
              <p className="mt-2">
                you remember things by their connections, not their labels. every explanation is built to maximize the
                number of useful threads between the new idea and ideas you already trust, so retrieval later is easy
                from any direction.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">creating flat associative hierarchies</h3>
              <p className="mt-2">
                instead of forcing concepts into rigid trees of category and subcategory, analogize lets them sit beside
                each other on equal footing, connected by relationships rather than rank. the structure that emerges is
                wide and lateral, not deep and pointy - closer to how knowledge actually clusters in your head.
              </p>
            </section>
          </div>

          {/*
          <h2 className="pt-6 font-serif-display text-3xl tracking-tight">the key implications</h2>
          <p>
            edit this second copy of "the key implications" freely. it is intentionally duplicated as a multiline
            comment so the contents can be swapped without touching the first one above.
          </p>

          <div className="mt-6 space-y-7">
            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">contextual understanding</h3>
              <p className="mt-2">
                second copy. replace this body with whatever angle you want this version to take.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">association-based learning</h3>
              <p className="mt-2">
                second copy. replace this body with whatever angle you want this version to take.
              </p>
            </section>

            <section>
              <h3 className="font-serif-display text-2xl tracking-tight">creating flat associative hierarchies</h3>
              <p className="mt-2">
                second copy. replace this body with whatever angle you want this version to take.
              </p>
            </section>
          </div>
          */}
        </div>

        <aside className="mt-14 rounded-2xl border border-border/60 bg-secondary/30 p-7 sm:p-9">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">author's note</p>
          <h2 className="mb-5 font-serif-display text-3xl tracking-tight">why this exists.</h2>
          <div className="space-y-4 text-foreground/85 leading-relaxed">
            <p>
              i didn't create analogize to be yet another openai wrapper claiming to be the best ai tutor out there that
              will revolutionize your education, or an edtech service that will launch your productivity levels onto the
              stratosphere. it isn't claiming to be "the best ai tutor" because it is not an ai tutor at all, it never
              was and nor was it ever supposed to be.
            </p>
            <p>
              i started out wanting to recreate a very specific kind of friend. the one you run to near the end of the
              semester after months of pretending you understood what was happening, only to finally admit to yourself,
              a week before finals and fully panicking, that you really did not get it at all. and not for a lack of
              trying.
            </p>
            <p>
              analogize is there to be THAT friend who sits with you through the panic, holds your hand and tells you
              you’re not too dumb for this and that it is not too late, sits you down, and then quietly goes:{" "}
              <i>
                “okay. fresh slate. forget everything. forget that we're even here. forget about studying this subject.
                let’s look at it differently. let's start with something else entirely, something unrelated that we know
                for sure that you already understand...”
              </i>
              and from there, rebuilds the concept around things your brain already knows how to connect with.
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

export default Philosophy;
