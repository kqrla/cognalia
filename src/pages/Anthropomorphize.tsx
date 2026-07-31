// /anthropomorphize - upcoming feature page. give a concept a personality
// first, then decompress back into canon. conversational, sectioned.

import { Link } from "react-router-dom";
import { ArrowRight, Users, Sparkles, Timer, Repeat, Network, TriangleAlert } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AnthroNav from "./anthropomorphize/AnthroNav";


const subjects = [
  {
    subject: "history",
    line: "countries are people with grudges",
    body:
      "alliances are dating. strategic economic partnerships are friends with benefits. diplomatic relations are we are civil enough to attend the same wedding. a war is a messy public breakup, and the year sticks because you remember the drama, not the date.",
  },
  {
    subject: "chemistry",
    line: "elements are classmates",
    body:
      "a displacement reaction is a stronger metal bullying a weaker one out of its friendship group. sodium is the kid who starts fights and then explodes the second water gets involved. reactivity series becomes a social hierarchy you already know how to read.",
  },
  {
    subject: "biology",
    line: "the cell is a small city",
    body:
      "mitochondria are the overworked power plant. ribosomes are factory workers on shift. the nucleus is middle management that signs off on everything and takes credit. organelles stop being a vocabulary list and start being staff.",
  },
  {
    subject: "mathematics",
    line: "variables are actors",
    body:
      "x is not x. x is pretending to be a number until the plot twist. solving is just working out who it was the whole time. functions are characters with consistent behaviour, and a proof is the alibi.",
  },
  {
    subject: "economics",
    line: "markets are group chats",
    body:
      "supply and demand is who is currently pretending not to care. inflation is everyone slowly agreeing that the vibes are worse. a central bank is the one friend who keeps trying to calm the group down.",
  },
  {
    subject: "computing",
    line: "systems are workplaces",
    body:
      "a queue is a waiting room with a receptionist. a cache is the coworker who remembers everything so you stop asking the archive. a deadlock is two people standing in a doorway both insisting the other goes first.",
  },
];

const mechanisms = [
  {
    title: "abstract concepts are expensive, people are free",
    body:
      "your brain has spent its whole life running social simulations. motives, grudges, hierarchies, who owes who. attaching a concept to that machinery costs almost nothing, because the machinery is already warm.",
  },
  {
    title: "stories encode better than facts",
    body:
      "isolated facts have no hooks. a story has causality, sequence and stakes, which means recall has a path to walk down. you are not memorising information, you are remembering gossip.",
  },
  {
    title: "motives create structure",
    body:
      "the moment something wants something, it has relationships to everything else. giving a concept a motive automatically generates the mapping you would otherwise have to build by hand.",
  },
  {
    title: "it is an old memory technique in a new outfit",
    body:
      "personification and the method of loci have been in the rhetorical toolkit for two thousand years. this is that, minus the ceremony, plus the sense of humour.",
  },
];

const modes = [
  {
    icon: Sparkles,
    label: "learning mode",
    rule: "no timers",
    body:
      "learning is exploration. if an alarm interrupts you exactly when you finally got interested, you throw away the momentum you spent an hour building. momentum is expensive. during discovery, the only rule is keep going while it is fun.",
  },
  {
    icon: Timer,
    label: "retrieval mode",
    rule: "timers on",
    body:
      "revision, practice, homework and exams are execution, not discovery. that is where task breaking, timeboxing and pomodoros earn their keep. they are for proving you already know something, not for finding it out.",
  },
];

const risks = [
  {
    title: "canon drift",
    body:
      "if the character becomes more memorable than the mechanism, you will confidently write fiction in an exam. the antidote is the decompression step, done deliberately, in writing.",
  },
  {
    title: "false symmetry",
    body:
      "people have feelings, molecules do not. anthropomorphising imports intentions that are not in the real system. useful as scaffolding, dangerous as an explanation of cause.",
  },
  {
    title: "overfitting the cast",
    body:
      "once france is dramatic, every french policy gets read as drama. characters harden into stereotypes and stop tracking the evidence. rotate the cast when it stops earning its keep.",
  },
];

const walkthrough = [
  {
    step: "cast",
    body:
      "osmosis. water is a crowd trying to get into the less busy room. the membrane is a bouncer who only lets water through and turns solutes away at the door.",
  },
  {
    step: "play it out",
    body:
      "one room is packed with solutes, the other is not. water keeps shuffling toward the packed room because that is where there is space for it, until both rooms feel equally crowded and the shuffling evens out.",
  },
  {
    step: "decompress",
    body:
      "water moves across a selectively permeable membrane from a region of higher water potential to lower water potential, until water potential equalises. no intent, no crowd, same shape.",
  },
  {
    step: "check",
    body:
      "if you can only write the bouncer version, you are not finished. if you can write both and say which parts of the story do not exist in the real system, you are.",
  },
];

const castingRules = [
  {
    title: "give it one want, not three",
    body:
      "a character with a single clear motive maps cleanly onto a single mechanism. give it three and you have written a personality, not a model.",
  },
  {
    title: "conflict before description",
    body:
      "who is pushing against whom matters more than what anyone looks like. the tension is the mechanism; the costume is decoration.",
  },
  {
    title: "keep the cast small",
    body:
      "four or five agents maximum. if you need twelve, you are trying to compress a whole chapter instead of one concept.",
  },
  {
    title: "label the fiction as you go",
    body:
      "every time you say something wants something, note what the real driver is. one line. that note is your decompression draft.",
  },
];

const antiExamples = [
  {
    concept: "standard deviation",
    why: "there is no cast. it is a single number describing spread, and inventing agents adds fiction without adding structure.",
  },
  {
    concept: "the definition of a limit",
    why: "the whole point is precision about quantifiers. a character blurs exactly the thing you are meant to sharpen.",
  },
  {
    concept: "natural selection",
    why: "usable, but dangerous. motive language quietly smuggles in purpose, which is the single most common misconception in the topic.",
  },
];

const Anthropomorphize = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <AnthroNav />
        <div className="mb-4 flex items-center gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">upcoming feature</p>
          <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            in design
          </span>
        </div>
        <h1 className="mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          anthropomorphize everything
        </h1>
        <p className="max-w-[92%] text-lg text-foreground/75 leading-relaxed">
          a planned mode for the first stage of understanding: before you learn what a concept is, you decide who it
          would be. give it a personality, motives and a social life, and the structure falls out for free. then, and
          this is the part everyone skips, you translate it back into canon.
        </p>


        <div className="mt-14 space-y-16 text-foreground/85 leading-relaxed">
          {/* the pitch */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">the one line version</h2>
            <blockquote className="mt-5 border-l-2 border-primary/50 pl-5 font-serif-display text-2xl leading-snug text-foreground/90">
              anthropomorphizing is the compression algorithm. the test wants the decompressed file.
            </blockquote>
            <p className="mt-5">
              most study advice optimises the wrong stage. pomodoro, chunking and distraction blocking are all
              performance tooling. none of them help you with the actual bottleneck, which is that a brand new abstract
              concept has nothing in your head to hold on to. characters fix that immediately.
            </p>
          </section>

          {/* worked examples */}
          <section>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-serif-display text-3xl tracking-tight">what it looks like per subject</h2>
            </div>
            <p className="mt-3">
              the same move, applied across domains. notice that none of these are explanations yet. they are casting
              decisions.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {subjects.map((s) => (
                <div
                  key={s.subject}
                  className="rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.subject}</p>
                  <p className="mt-2 font-serif-display text-xl leading-snug">{s.line}</p>
                  <p className="mt-3 text-sm text-foreground/75">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* full walkthrough */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">one concept, all the way through</h2>
            <p className="mt-3">
              casting is only half of it. here is the full loop on a single idea, including the part where the story
              gets taken apart again.
            </p>
            <div className="mt-6 space-y-3">
              {walkthrough.map((w, i) => (
                <div key={w.step} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{w.step}</p>
                    <p className="mt-1.5 text-sm text-foreground/80">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* casting rules */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">rules for good casting</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {castingRules.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/70 bg-card p-5">
                  <p className="font-medium">{c.title}</p>
                  <p className="mt-2 text-sm text-foreground/75">{c.body}</p>
                </div>
              ))}
            </div>
          </section>


          {/* why it works */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">why this actually works</h2>
            <div className="mt-6 space-y-3">
              {mechanisms.map((m, i) => (
                <div key={m.title} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="mt-1.5 text-sm text-foreground/75">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* two modes */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">two modes, two toolkits</h2>
            <p className="mt-3">
              the biggest confusion in study advice is treating learning and revision as the same job. they are not, and
              the tools do not transfer.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {modes.map((m) => (
                <div key={m.label} className="rounded-2xl border border-border/70 bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <m.icon className="h-4 w-4 text-foreground/70" />
                    </span>
                    <p className="font-medium">{m.label}</p>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.rule}</p>
                  <p className="mt-2 text-sm text-foreground/75">{m.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* decompression */}
          <section>
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-serif-display text-3xl tracking-tight">transferring back to canon</h2>
            </div>
            <p className="mt-3">
              this is the non negotiable half. the character is scaffolding, and scaffolding comes down before anyone
              moves in. you do not write "france got jealous and started drama". you write the actual geopolitical
              event, with the actual mechanism, in the actual vocabulary.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/70">
              <div className="grid grid-cols-2 border-b border-border/70 bg-secondary/60 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <p className="p-3">compressed</p>
                <p className="border-l border-border/70 p-3">canon</p>
              </div>
              {[
                ["her ex did what", "the alliance collapsed after a territorial dispute"],
                ["sodium starts fights", "group 1 metals lose their outer electron readily"],
                ["the nucleus signs off", "transcription is regulated in the nucleus"],
                ["x is pretending", "x is an unknown constrained by the equation"],
              ].map(([a, b]) => (
                <div key={a} className="grid grid-cols-2 border-b border-border/70 text-sm last:border-b-0">
                  <p className="p-3 text-foreground/70">{a}</p>
                  <p className="border-l border-border/70 p-3">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* intertwingularity */}
          <section>
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-serif-display text-3xl tracking-tight">it travels across subjects</h2>
            </div>
            <p className="mt-3">
              your brain does not care about university departments. it cares whether something connects to something
              else. a hierarchy learned in chemistry is the same shape as one in economics, and once you have the cast,
              the crossover episode writes itself. steal patterns from anywhere, just map them back correctly.
            </p>
            <p className="mt-3">
              this is the same intertwingularity idea the rest of analogize is built on. see{" "}
              <Link to="/philosophy" className="underline underline-offset-4 hover:text-foreground">
                philosophy
              </Link>{" "}
              and{" "}
              <Link to="/mechanisms" className="underline underline-offset-4 hover:text-foreground">
                mechanisms
              </Link>{" "}
              for the longer version.
            </p>
          </section>

          {/* risks */}
          <section>
            <div className="flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-serif-display text-3xl tracking-tight">where it breaks</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {risks.map((r) => (
                <div key={r.title} className="rounded-2xl border border-dashed border-border p-5">
                  <p className="font-medium">{r.title}</p>
                  <p className="mt-2 text-sm text-foreground/75">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* where not to use it */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">concepts we would not cast</h2>
            <p className="mt-3">
              a mode that claims to work everywhere is lying. these are the shapes where a character actively costs you
              accuracy.
            </p>
            <div className="mt-6 space-y-3">
              {antiExamples.map((a) => (
                <div key={a.concept} className="rounded-2xl border border-border/70 bg-card p-5">
                  <p className="font-medium">{a.concept}</p>
                  <p className="mt-1.5 text-sm text-foreground/75">{a.why}</p>
                </div>
              ))}
            </div>
          </section>


          {/* what we'd build */}
          <section>
            <h2 className="font-serif-display text-3xl tracking-tight">what we would actually build</h2>
            <p className="mt-3">
              nothing here exists yet. this is the shape we think it should take if it earns a place in the product.
            </p>
            <div className="mt-6 space-y-3">
              {[
                {
                  q: "a cast sheet per concept",
                  a: "before the five part explanation, a short roster: who the players are, what each one wants, and who they are in conflict with. small, editable, and yours.",
                },
                {
                  q: "a decompress toggle",
                  a: "one switch that rewrites the whole explanation from character voice into exam voice, so you can check your own understanding against canon without leaving the page.",
                },
                {
                  q: "reusable characters",
                  a: "if the overworked power plant worked for you once, it should come back when a related concept needs the same role. characters persist across your library rather than being invented from scratch each time.",
                },
                {
                  q: "a mode switch, not a setting",
                  a: "learning mode hides timers, counts and progress bars entirely. retrieval mode brings them back. the interface should stop encouraging you to interrupt yourself.",
                },
              ].map((item) => (
                <Collapsible key={item.q}>
                  <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 text-left">
                    <span className="font-medium">{item.q}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="px-5 pb-5 pt-3 text-sm text-foreground/75">{item.a}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-secondary/50 p-6">
            <p className="font-serif-display text-2xl leading-snug">
              she did not optimise studying. she optimised the lore.
            </p>
            <p className="mt-3 text-sm text-foreground/75">
              this page is a proposal, not a shipped feature. if you want it, or want it built differently, tell us.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
              >
                tell us what you think
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
};

export default Anthropomorphize;
