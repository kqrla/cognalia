// /studio - hidden page about the studio/creators behind analogize.
// not linked from anywhere; only reachable by typing the URL directly.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Compass, Feather, Hammer, Sparkles, Mail, Github, Linkedin } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import teamPlaceholder from "@/assets/team-placeholder.png";

type Member = {
  name: string;
  title: string;
  departments: string[];
  bio: string;
  contacts: { kind: "email" | "github" | "linkedin"; href: string }[];
};

const team: Member[] = [
  {
    name: "ren ito",
    title: "founder / format",
    departments: ["product", "format design"],
    bio: "obsessed with the six-layer template. keeps the format strict so the meaning can breathe. used to teach physics to non-physicists.",
    contacts: [
      { kind: "email", href: "mailto:ren@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "mira okafor",
    title: "design lead",
    departments: ["design", "typography"],
    bio: "draws the line between editorial and software. picks the fonts, sets the spacing, fights for whitespace.",
    contacts: [
      { kind: "email", href: "mailto:mira@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "leo vasquez",
    title: "backend / infra",
    departments: ["backend", "devops"],
    bio: "managed the backend and devops. believes local-first should be the default and the cloud should be a polite optional guest.",
    contacts: [
      { kind: "email", href: "mailto:leo@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "ada chen",
    title: "ai / models",
    departments: ["ai", "evaluation"],
    bio: "wrangles the model layer. writes the eval harness that decides whether an analogy actually lands or just sounds clever.",
    contacts: [
      { kind: "email", href: "mailto:ada@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "noor patel",
    title: "frontend engineer",
    departments: ["frontend", "interaction"],
    bio: "builds the surfaces you actually touch. cares about a button feeling exactly right before it ships.",
    contacts: [
      { kind: "email", href: "mailto:noor@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "sam holloway",
    title: "research / curation",
    departments: ["research", "library"],
    bio: "reads everything. curates the built-in systems and writes the bridge lines that connect metaphor to formal explanation.",
    contacts: [
      { kind: "email", href: "mailto:sam@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
  {
    name: "jules moreau",
    title: "community / writing",
    departments: ["writing", "community"],
    bio: "talks to the people using analogize in the wild. turns their notes into the changelog and the philosophy pages.",
    contacts: [
      { kind: "email", href: "mailto:jules@analogize.studio" },
      { kind: "github", href: "https://github.com" },
      { kind: "linkedin", href: "https://linkedin.com" },
    ],
  },
];

const ContactIcon = ({ kind, href }: { kind: Member["contacts"][number]["kind"]; href: string }) => {
  const Icon = kind === "email" ? Mail : kind === "github" ? Github : Linkedin;
  return (
    <a
      href={href}
      target={kind === "email" ? undefined : "_blank"}
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
      aria-label={kind}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
};

const principles = [
  {
    icon: Feather,
    label: "small on purpose",
    body: "a tiny studio. one focused product at a time. no roadmap inflation, no investor theater.",
  },
  {
    icon: Compass,
    label: "tools for thinking",
    body: "we build things that change how a single person reasons, not platforms that demand a community before they work.",
  },
  {
    icon: Hammer,
    label: "format is the product",
    body: "we'd rather ship one strict, opinionated format than a dozen vague ones. constraints carry the meaning.",
  },
  {
    icon: Sparkles,
    label: "ai as a quiet layer",
    body: "models do the translation. the interface stays human. you should never feel like you're talking to a chatbot.",
  },
];

const Studio = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">the studio</p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          a small studio building tools for thinking.
        </h1>
        <p className="mt-6 max-w-[92%] text-lg leading-relaxed text-foreground/75">
          analogize is made by a tiny independent studio that cares about one thing: how an individual person comes to
          actually understand an idea. not how it's stored, not how it's shared, not how it's monetized. how it lands.
        </p>
      </section>

      <section className="container max-w-3xl pb-20">
        <h2 className="mb-6 font-serif-display text-3xl tracking-tight">why this exists</h2>
        <div className="surface-paper space-y-4 p-6 text-sm leading-relaxed text-foreground/85">
          <p>
            most learning tools assume the bottleneck is access to information. we think the bottleneck is translation:
            the gap between a formal explanation and the messy, embodied way a person already thinks.
          </p>
          <p>
            analogize started as a private notebook of analogies. the kind you scribble at the back of a textbook so the
            page stops feeling foreign. it became a product when we realized the same six-layer structure worked across
            almost every subject we tried.
          </p>
          <p>
            we kept the surface boring on purpose. the work is happening in the format, the system choice, and the small
            behind-the-scenes layer that tells you which parts of the analogy are load-bearing and which are decoration.
          </p>
        </div>
      </section>

      <section className="container max-w-3xl pb-20">
        <h2 className="mb-6 font-serif-display text-3xl tracking-tight">how we work</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.label} className="surface-paper p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-foreground/70" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight">{p.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{p.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container max-w-3xl pb-24">
        <h2 className="mb-4 font-serif-display text-3xl tracking-tight">who's behind it</h2>
        <div className="surface-paper p-6 text-sm leading-relaxed text-foreground/85">
          <p>
            a designer-engineer pair plus a rotating cast of friends who read drafts, break the app, and argue about
            whether a metaphor actually lands. we ship from notebooks, terminals, and long walks.
          </p>
          <p className="mt-3 text-muted-foreground">
            if you'd like to reach the studio directly, the contact page is the fastest way in.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            get in touch <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/philosophy"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            read the philosophy
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          you found this page by typing the url directly. that's intentional. it's not in the nav.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Studio;
