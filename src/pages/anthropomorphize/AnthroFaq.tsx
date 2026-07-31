// /anthropomorphize/faq - objections, especially "is this harmful".

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnthroNav from "./AnthroNav";

const faqs = [
  {
    q: "is anthropomorphizing harmful to real understanding?",
    a: "no, not when it is done the way this mode does it. the harm people worry about comes from accidental anthropomorphizing: quietly believing an object has intentions, and never noticing you believed it. that is conflation. what happens here is deliberate and time-boxed. you know you are casting a character, you know it is a stand-in, and there is an explicit step where you translate it back into the real mechanism. a scaffold you built on purpose and take down on purpose is not the same thing as a misconception you never knew you had.",
  },
  {
    q: "so what is the actual difference between the two?",
    a: "intent and exit. accidental anthropomorphizing has no end state: the electron 'wants' to leave and that is where your model stops. intentional anthropomorphizing has a decompression step baked in, so the character is always labelled as fiction and always cashed out into the literal process. the fiction is a handle, not a claim.",
  },
  {
    q: "will i write the character version in an exam by mistake?",
    a: "that is the real failure mode, and it is why decompression is not optional here. you practice the formal wording during the session, not the night before. if you can only produce the story, you have not finished learning the concept yet, and the mode should tell you that rather than let you feel done.",
  },
  {
    q: "does it work for every subject?",
    a: "no. it is strongest where there are multiple interacting parts with something like competing tendencies: reactions, ecosystems, geopolitics, markets, protocols, algorithms with contention. it is weakest for pure definitions, precise numeric relationships, and anything where implying intent would actively mislead you about the cause.",
  },
  {
    q: "isn't this just dumbing things down?",
    a: "the opposite, if you finish the loop. a character forces you to specify relationships you would otherwise skim: who acts on whom, in what order, with what constraint. a vague summary lets you hide. a cast does not, because a character with no motive is obviously missing something.",
  },
  {
    q: "what about false symmetry, like molecules having feelings?",
    a: "that risk is real and named openly in the overview. the guardrail is that every character claim carries its literal mechanism alongside it, so the intention language never travels alone. when a mapping starts importing motives that are not in the system, that is the signal to recast rather than stretch it further.",
  },
  {
    q: "how is this different from a normal analogy?",
    a: "a normal analogy maps a concept onto another system. this maps it specifically onto people, because your social reasoning is the most over-trained machinery you own. it is the narrowest, cheapest analogy target available, which is why it works fast at first contact.",
  },
  {
    q: "does it change how the ai generates my explanations?",
    a: "it would be a mode, not a rewrite of the default. the standard five part explanation stays exactly as it is. anthropomorphize sits in front of it as an optional first pass for concepts that feel like they have nothing to grab onto yet.",
  },
  {
    q: "can i keep my own characters?",
    a: "that is the plan. characters would persist in your library and reappear when a related concept needs the same role, and they show up in your graph like any other node so crossovers between subjects become visible.",
  },
  {
    q: "why no timers in learning mode?",
    a: "because discovery and retrieval are different jobs. interrupting exploration at the exact moment it got interesting throws away momentum that took an hour to build. timers, task breaking and pomodoros belong to revision and practice, where you are proving what you already know.",
  },
  {
    q: "when does it ship?",
    a: "no date. it is in design, and it only ships if it holds up against these objections in practice. if you want it sooner, or want it built differently, say so on the contact page and that feedback goes straight into the shape of it.",
  },
];

const AnthroFaq = () => (
  <div className="min-h-screen">
    <SiteNav />
    <article className="container max-w-3xl py-16 sm:py-24">
      <AnthroNav />
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">anthropomorphize / faq</p>
      <h1 className="mt-4 mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        the honest objections
      </h1>
      <p className="text-lg text-foreground/75 leading-relaxed">
        mostly one question in different outfits: does turning a concept into a character break your understanding of
        it? short answer, not if you meant to and you translate it back.
      </p>

      <Accordion type="single" collapsible className="mt-12">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-foreground/75 leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <section className="mt-14 rounded-2xl border border-border/70 bg-secondary/50 p-6">
        <p className="font-serif-display text-2xl leading-snug">
          deliberate fiction with an exit is a method. accidental fiction with no exit is a misconception.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
          >
            ask something we missed
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/anthropomorphize"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:bg-background"
          >
            back to the overview
          </Link>
        </div>
      </section>
    </article>
    <SiteFooter />
  </div>
);

export default AnthroFaq;
