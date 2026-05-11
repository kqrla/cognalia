// faq page. comprehensive, plain-language answers to the questions
// people actually ask about a tool like this.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const faqs = [
  {
    q: "how is this different from chatgpt or a regular ai tutor?",
    a: "a regular ai tutor will give you a definition first, then maybe an analogy if you ask. analogize inverts that. every explanation starts inside a mental model you already use, then maps each piece to the real concept, and only then states the concept in proper terms. the structure is enforced, not optional. you also always see where the analogy breaks, so you do not end up with a confident wrong model.",
  },
  {
    q: "what are the ten thinking systems?",
    a: "relationships and dynamics, gaming and progression, cooking and recipes, building and lego, story and fandom, company and startup, traffic flow, plant and growth, brain and habit loops, and storage and organization. you pick a default during onboarding, but you can switch the system on every explanation, and you can ask for the same concept again through a different system to see it from another angle.",
  },
  {
    q: "why does it always show 'where the analogy breaks'?",
    a: "because every analogy lies a little. if you only see the parts that map cleanly, you walk away with a model that feels right but quietly misleads you. by always naming the parts that do not map, the tool keeps your understanding honest. it also teaches you something subtle: the difference between an analogy and the thing itself.",
  },
  {
    q: "what is the 'bridge' line for?",
    a: "the bridge is the missing link between the analogy and the formal explanation. it always starts with 'in other words' and gives you one plain sentence that takes you from the metaphor into reality. without it, the jump from analogy to definition can feel jarring. with it, the formal explanation lands as obvious instead of new.",
  },
  {
    q: "is anything saved to a server?",
    a: "by default, no. analogize is local-browser-first. your preferences, recent translations, tags, private notes, and custom presets all live on your device. when you ask for a fresh explanation, the concept is sent to the ai gateway to be translated, and the result is cached locally. if you choose to create an optional account on /account, your history and presets sync to the cloud so they follow you across devices — but signing in is never required to use any feature.",
  },
  {
    q: "do i need an account?",
    a: "no. nothing in analogize is locked behind sign-in. an account is purely a convenience toggle: it gives you cross-device sync of your history and presets, and lets you export everything you've saved as a json file. you can sign up at /register or sign in at /login from the /account page, or just keep using the app exactly as you are.",
  },
  {
    q: "what kinds of concepts work best?",
    a: "anything abstract or technical that usually gets explained with definitions: programming concepts, machine learning ideas, finance terms, biology, physics, systems thinking, philosophy. very narrow facts (a single date, a single name) are not a great fit, because there is nothing structural to translate.",
  },
  {
    q: "can i use it to study?",
    a: "yes, but think of it as a thinking tool, not a learning platform. it will not quiz you, gamify your progress, or chase streaks. it will give you the moment of 'oh, i actually get this', which is usually the part the rest of studying is built on top of.",
  },
  {
    q: "what does 'explain again differently' do?",
    a: "it regenerates the explanation, ideally through a different analogy system, with no reuse of the previous wording. switching systems is the whole point: a concept seen through both 'cooking' and 'company structure' becomes much harder to misunderstand.",
  },
  {
    q: "what happens if i type a term that means different things in different fields?",
    a: "as you type, analogize quietly checks for ambiguity. if the term spans multiple fields (say 'transformer' in deep learning vs. electrical engineering), tiny pills appear under the input. tap one to pin the meaning. the analogy, the diagram, and any follow-ups you ask all stay inside that subdomain.",
  },
  {
    q: "can i ask a follow-up if the analogy didn't fully click?",
    a: "yes. at the bottom of every explanation there's a single follow-up box. ask one clarifying question and you get a short answer that stays inside the same analogy world and the same domain you pinned. it's deliberately not a chat — each question is single-shot, so the explanation stays the source of truth.",
  },
  {
    q: "how do tags and the /history page work?",
    a: "every translation you generate is saved locally and listed on /history. you can add your own semantic tags to any past translation (think 'work', 'thesis', 'quantum stuff') and filter the page by tag. tags are freeform, plural, and never sent anywhere — they live in your browser.",
  },
  {
    q: "why is there a hint asking me to be more specific?",
    a: "the more precisely you describe a topic, the better analogize can pick the right metaphor and the right subdomain. 'transformer architecture in deep learning' produces a far sharper analogy than just 'transformer'. think of the input as a question you'd ask an expert: detail helps.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-3xl py-16 sm:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          faq
        </p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          questions, answered.
        </h1>
        <p className="mt-6 max-w-2xl text-foreground/75">
          the short version: analogize is the feynman technique with a sharper structure. here is the longer one.
        </p>
      </section>

      <section className="container max-w-3xl pb-20">
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="surface-paper overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-display text-lg tracking-tight text-foreground">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-foreground/85">{f.a}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          try analogize
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Faq;
