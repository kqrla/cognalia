// /team (also /studio/team) - full team page with sortable department chips,
// extended contributors, inspirations, special mentions, emotional support.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, ArrowLeft, Heart, Sparkles, BookOpen, Users, Palette, Link as LinkIcon, ExternalLink, Instagram, Star, Brain, Coffee } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

type Contributor = {
  name: string;
  role: string;
  note: string;
  contacts: { kind: "email" | "github" | "linkedin"; href: string }[];
};

const contributors: Contributor[] = [
  { name: "kira lindqvist", role: "icon set", note: "designed the first pass of the system-chip icons. left the studio with better taste than she found it.", contacts: [{ kind: "email", href: "mailto:kira@analogize.studio" }, { kind: "github", href: "https://github.com" }] },
  { name: "tomas alvarado", role: "perf pass", note: "shaved 400ms off the graph render and didn't tell anyone for a week.", contacts: [{ kind: "github", href: "https://github.com" }, { kind: "linkedin", href: "https://linkedin.com" }] },
  { name: "yuki tanabe", role: "i18n scaffolding", note: "set up the translation pipeline so the six-layer template survives japanese, arabic, and turkish.", contacts: [{ kind: "email", href: "mailto:yuki@analogize.studio" }, { kind: "github", href: "https://github.com" }] },
  { name: "priya raman", role: "accessibility audit", note: "ran the whole site through a screen reader and filed the bugs we should've caught ourselves.", contacts: [{ kind: "email", href: "mailto:priya@analogize.studio" }, { kind: "linkedin", href: "https://linkedin.com" }] },
  { name: "marcus dell'aria", role: "copy editor", note: "made the philosophy pages 30% shorter and 100% sharper.", contacts: [{ kind: "email", href: "mailto:marcus@analogize.studio" }] },
  { name: "elena rossi", role: "illustration", note: "drew the little sketchnote diagrams that show up on /roadmap.", contacts: [{ kind: "email", href: "mailto:elena@analogize.studio" }, { kind: "linkedin", href: "https://linkedin.com" }] },
  { name: "kofi mensah", role: "data viz", note: "rewrote the legend on the graph view so non-physicists could read it.", contacts: [{ kind: "github", href: "https://github.com" }, { kind: "linkedin", href: "https://linkedin.com" }] },
  { name: "hana svoboda", role: "qa / test harness", note: "wrote the regression suite that catches us every time we touch the explanation pipeline.", contacts: [{ kind: "email", href: "mailto:hana@analogize.studio" }, { kind: "github", href: "https://github.com" }] },
  { name: "dmitri volkov", role: "edge functions", note: "ported the explain endpoint to the edge and made it cheaper than the coffee budget.", contacts: [{ kind: "github", href: "https://github.com" }] },
  { name: "fatima zahra", role: "user research", note: "ran twelve interviews and produced one slide that changed the onboarding entirely.", contacts: [{ kind: "email", href: "mailto:fatima@analogize.studio" }, { kind: "linkedin", href: "https://linkedin.com" }] },
  { name: "owen blackwood", role: "docs", note: "wrote the first version of /faq when nobody else wanted to.", contacts: [{ kind: "email", href: "mailto:owen@analogize.studio" }, { kind: "github", href: "https://github.com" }] },
  { name: "lina park", role: "motion design", note: "tuned the easing curves on every dialog and dropdown until they felt 'right'.", contacts: [{ kind: "email", href: "mailto:lina@analogize.studio" }, { kind: "linkedin", href: "https://linkedin.com" }] },
];


type Popup = {
  title: string;
  eyebrow?: string;
  tags?: string[];
  body: string[];
  links?: InspoLink[];
};

type Inspiration = { name: string; note: string; popup?: Popup };

const inspirations: Inspiration[] = [
  {
    name: "richard feynman",
    note: "for the discipline of explaining it to a freshman.",
    popup: {
      title: "richard feynman",
      eyebrow: "patron saint of explanation",
      tags: ["pedagogy", "first principles", "curiosity"],
      body: [
        "the feynman technique is basically the whole product brief in one sentence: if you can't explain it to a freshman, you don't understand it yet.",
        "every time we argued about whether an analogy was 'too simple', someone quoted the lectures and the argument was over.",
      ],
      links: [
        { label: "the lectures", href: "https://www.feynmanlectures.caltech.edu", kind: "site" },
        { label: "wikipedia", href: "https://en.wikipedia.org/wiki/Richard_Feynman", kind: "site" },
      ],
    },
  },
  { name: "douglas hofstadter", note: "for insisting analogy is the core of cognition." },
  { name: "edward tufte", note: "for showing that small multiples and restraint outperform decoration." },
  { name: "bret victor", note: "for the conviction that medium shapes thought." },
  {
    name: "ted nelson",
    note: "for 'everything is deeply intertwingled'.",
    popup: {
      title: "ted nelson",
      eyebrow: "intertwingled forever",
      tags: ["hypertext", "xanadu", "intertwingularity"],
      body: [
        "ted nelson coined 'hypertext' before most of the web existed and then spent decades insisting we got it wrong.",
        "'everything is deeply intertwingled' is the line we put on the wall when we started drawing the graph view. concepts don't sit in folders; they tangle.",
      ],
      links: [
        { label: "project xanadu", href: "https://www.xanadu.net", kind: "site" },
        { label: "wikipedia", href: "https://en.wikipedia.org/wiki/Ted_Nelson", kind: "site" },
      ],
    },
  },
  { name: "iain mcgilchrist", note: "for the right-hemisphere argument: meaning before mechanism." },
];

const specialMentions = [
  { name: "the early testers", note: "who used the app when it broke every other tuesday." },
  { name: "ms. ahuja's 11th-grade class", note: "for the brutal, useful feedback on the first six-layer draft." },
  { name: "the obsidian community", note: "for proving local-first knowledge tools have an audience." },
  { name: "every librarian who explained dewey decimals patiently", note: "you taught us what a system feels like from the inside." },
];

type EmotionalItem = { name: string; note: string; popup?: Popup };

const emotionalSupport: EmotionalItem[] = [
  { name: "miso", note: "studio cat. attended every standup. contributed zero code." },
  { name: "the espresso machine in the corner", note: "non-negotiable infrastructure." },
  { name: "long walks at 3pm", note: "where most of the format decisions actually happened." },
  { name: "every friend who said 'wait, explain that again'", note: "you were the first user." },
  {
    name: "adhd diagnosis",
    note: "explained the last fifteen years and also why the codebase has seven half-finished feature flags.",
    popup: {
      title: "adhd diagnosis",
      eyebrow: "plot twist of the decade",
      tags: ["hyperfocus", "object permanence (lack of)", "novelty engine"],
      body: [
        "turns out 'wait, why is everyone else fine doing one thing at a time?' was, in fact, a clue.",
        "the diagnosis didn't fix anything but it did rename a lot of it. 'lazy' became 'task-initiation latency'. 'chaotic' became 'parallel exploration'. 'forgot to eat again' became, well, still that.",
        "honestly a lot of the format obsession on this site is just an adhd brain trying to build the scaffolding it never had. you're welcome to use it.",
      ],
      links: [
        { label: "how to adhd", href: "https://howtoadhd.com", kind: "site" },
        { label: "additude mag", href: "https://www.additudemag.com", kind: "site" },
      ],
    },
  },
];

type InspoLink = { label: string; href: string; kind?: "site" | "instagram" | "email" };
type Inspo = {
  name: string;
  category: string;
  usedFor: string;
  description: string;
  links: InspoLink[];
};

const designInspo: Inspo[] = [
  {
    name: "goodnotes beige aesthetic",
    category: "surfaces",
    usedFor: "the paper-cream background tone and the soft card surfaces across the marketing pages.",
    description: "warm off-white with a faint texture. it's what makes the site feel like a notebook instead of a dashboard.",
    links: [{ label: "goodnotes", href: "https://www.goodnotes.com", kind: "site" }],
  },
  {
    name: "swiss editorial grids",
    category: "layout",
    usedFor: "the strict max-width, the generous gutters, and the column rhythm on /philosophy and /goals.",
    description: "müller-brockmann via every design school ever. restraint as a feature.",
    links: [{ label: "the designer's reference", href: "https://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann", kind: "site" }],
  },
  {
    name: "linear.app micro-motion",
    category: "motion",
    usedFor: "the easing curves on hover states and the subtle slide-in on dialogs.",
    description: "fast, short, never bouncy. motion that gets out of the way.",
    links: [{ label: "linear.app", href: "https://linear.app", kind: "site" }],
  },
  {
    name: "are.na collections",
    category: "information",
    usedFor: "how the graph view organizes nodes by 'kinship' instead of folders.",
    description: "the original chill knowledge graph. taught us that adjacency is its own kind of meaning.",
    links: [{ label: "are.na", href: "https://www.are.na", kind: "site" }],
  },
  {
    name: "rauno's blog transitions",
    category: "motion",
    usedFor: "page transitions and the easing on the explanation reveal.",
    description: "rauno freiberg's writing on transitions made us redo our easing curves three times. worth it.",
    links: [{ label: "rauno.me", href: "https://rauno.me", kind: "site" }],
  },
  {
    name: "tufte's small multiples",
    category: "data",
    usedFor: "the graph legend and the system-comparison view on /compare.",
    description: "tiny, repeatable, comparable units beat one big chart every time.",
    links: [{ label: "edward tufte", href: "https://www.edwardtufte.com", kind: "site" }],
  },
  {
    name: "field notes covers",
    category: "typography",
    usedFor: "the all-lowercase eyebrows, the wide letter-spacing on uppercase labels.",
    description: "americana stationery. quiet confidence in the small type.",
    links: [{ label: "field notes", href: "https://fieldnotesbrand.com", kind: "site" }],
  },
  {
    name: "studio ghibli colour palettes",
    category: "color",
    usedFor: "the accent rosé, sage, and dusty amber in the chip system.",
    description: "yes really. the chip palette started as a screen-grab from totoro and never left.",
    links: [{ label: "ghibli", href: "https://www.ghibli.jp", kind: "site" }],
  },
  {
    name: "obsidian graph view",
    category: "graph",
    usedFor: "the force-directed layout on /graphical and the node-sizing rules.",
    description: "we owe them the visual grammar of 'concept nodes pulled together by analogy strength'.",
    links: [{ label: "obsidian", href: "https://obsidian.md", kind: "site" }],
  },
  {
    name: "instagram saved folders",
    category: "casual",
    usedFor: "honestly just the way 'collections' feel personal and slightly chaotic.",
    description: "silly but true. the 'feels-like-yours' vibe of saved posts shaped the personalize page.",
    links: [{ label: "instagram", href: "https://www.instagram.com", kind: "instagram" }],
  },
  {
    name: "pinterest moodboards (the chaotic kind)",
    category: "casual",
    usedFor: "the loose grid on the inspirations section itself. yes, recursive.",
    description: "the unstructured pile of references that somehow forms a taste. mood: secondary school art folder.",
    links: [{ label: "pinterest", href: "https://www.pinterest.com", kind: "site" }],
  },
  {
    name: "framer motion easing",
    category: "motion",
    usedFor: "every spring on the dialog, popover, and chip-hover lifts.",
    description: "the default spring is too bouncy. we tuned ours down to 'polite'.",
    links: [{ label: "motion.dev", href: "https://motion.dev", kind: "site" }],
  },
];

const inspoCategoryClasses: Record<string, string> = {
  surfaces: "bg-amber-100 text-amber-900 border-amber-200",
  layout: "bg-sky-100 text-sky-900 border-sky-200",
  motion: "bg-violet-100 text-violet-900 border-violet-200",
  information: "bg-emerald-100 text-emerald-900 border-emerald-200",
  data: "bg-teal-100 text-teal-900 border-teal-200",
  typography: "bg-rose-100 text-rose-900 border-rose-200",
  color: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200",
  graph: "bg-orange-100 text-orange-900 border-orange-200",
  casual: "bg-lime-100 text-lime-900 border-lime-200",
};


const deptChipClasses = [
  "bg-amber-100 text-amber-900 border-amber-200",
  "bg-sky-100 text-sky-900 border-sky-200",
  "bg-emerald-100 text-emerald-900 border-emerald-200",
  "bg-rose-100 text-rose-900 border-rose-200",
  "bg-violet-100 text-violet-900 border-violet-200",
  "bg-orange-100 text-orange-900 border-orange-200",
  "bg-teal-100 text-teal-900 border-teal-200",
  "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200",
  "bg-lime-100 text-lime-900 border-lime-200",
];

const chipForDept = (dept: string) => {
  let h = 0;
  for (let i = 0; i < dept.length; i++) h = (h * 31 + dept.charCodeAt(i)) >>> 0;
  return deptChipClasses[h % deptChipClasses.length];
};

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

const Team = () => {
  const [active, setActive] = useState<Member | null>(null);
  const [activeInspo, setActiveInspo] = useState<Inspo | null>(null);
  const [activeContrib, setActiveContrib] = useState<Contributor | null>(null);
  const [activePopup, setActivePopup] = useState<Popup | null>(null);
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);

  const allDepts = useMemo(() => {
    const set = new Set<string>();
    team.forEach((m) => m.departments.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    if (selectedDepts.length === 0) return team;
    return team.filter((m) => selectedDepts.some((d) => m.departments.includes(d)));
  }, [selectedDepts]);

  const toggleDept = (d: string) =>
    setSelectedDepts((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-4xl py-16 sm:py-20">
        <Link
          to="/studio"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> back to the studio
        </Link>
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">the team</p>
        <h1 className="font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          the people behind analogize.
        </h1>
        <p className="mt-6 max-w-[80ch] text-lg leading-relaxed text-foreground/75">
          a small core team, a wider ring of contributors, and a much wider ring of people whose ideas, patience, and
          occasional snacks made this possible.
        </p>
      </section>

      <section className="container max-w-4xl pb-16">
        <div className="mb-6 flex items-center gap-2">
          <Users className="h-4 w-4 text-foreground/60" />
          <h2 className="font-serif-display text-2xl tracking-tight">core team</h2>
        </div>

        <div className="surface-paper mb-6 p-4">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">filter by department</p>
          <div className="flex flex-wrap gap-1.5">
            {allDepts.map((d) => {
              const on = selectedDepts.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDept(d)}
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                    on ? chipForDept(d) + " ring-2 ring-foreground/30" : "border-border bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {d}
                </button>
              );
            })}
            {selectedDepts.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedDepts([])}
                className="ml-1 text-[11px] text-muted-foreground underline-offset-2 hover:underline"
              >
                clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setActive(m)}
              className="surface-paper flex flex-col items-start p-5 text-left transition-colors hover:bg-secondary/40"
            >
              <Avatar className="h-16 w-16 border border-border">
                <AvatarImage src={teamPlaceholder} alt={m.name} className="object-cover" />
                <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="mt-3 text-sm font-semibold text-foreground">{m.name}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.title}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {m.departments.map((d) => (
                  <span
                    key={d}
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${chipForDept(d)}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">no one matches that filter. try clearing it.</p>
        )}
      </section>

      <section className="container max-w-4xl pb-16">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-foreground/60" />
          <h2 className="font-serif-display text-2xl tracking-tight">contributors</h2>
        </div>
        <div className="surface-paper p-5">
          <p className="mb-3 text-sm text-foreground/80">
            people who landed pull requests, designed icons, debugged a regression at 2am, or wrote a sentence we couldn't.
          </p>
          <div className="flex flex-wrap gap-2">
            {contributors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setActiveContrib(c)}
                className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/85 transition-all hover:-translate-y-0.5 hover:bg-secondary"
              >
                {c.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      <section className="container max-w-4xl pb-16">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-foreground/60" />
          <h2 className="font-serif-display text-2xl tracking-tight">inspiration</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {inspirations.map((i) => (
            <article key={i.name} className="surface-paper p-4">
              <p className="text-sm font-semibold text-foreground">{i.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/75">{i.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container max-w-4xl pb-16">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-foreground/60" />
          <h2 className="font-serif-display text-2xl tracking-tight">special mentions</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {specialMentions.map((s) => (
            <article key={s.name} className="surface-paper p-4">
              <p className="text-sm font-semibold text-foreground">{s.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/75">{s.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container max-w-4xl pb-16">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-4 w-4 text-foreground/60" />
          <h2 className="font-serif-display text-2xl tracking-tight">design inspo</h2>
        </div>
        <div className="surface-paper p-5">
          <p className="mb-4 text-sm text-foreground/80">
            the references — sophisticated, silly, and everything in between — that shaped how this thing looks and moves.
            click any chip to see where it lives in the product.
          </p>
          <div className="flex flex-wrap gap-2">
            {designInspo.map((i) => (
              <button
                key={i.name}
                type="button"
                onClick={() => setActiveInspo(i)}
                className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/85 transition-all hover:-translate-y-0.5 hover:bg-secondary"
              >
                {i.name}
              </button>
            ))}
          </div>

        </div>
      </section>



      <section className="container max-w-4xl pb-24">
        <div className="mb-4 flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-500" />
          <h2 className="font-serif-display text-2xl tracking-tight">emotional support</h2>
        </div>
        <div className="surface-paper p-5">
          <p className="mb-4 text-sm text-foreground/80">
            not on the org chart. arguably more important than the org chart.
          </p>
          <ul className="space-y-3">
            {emotionalSupport.map((e) => (
              <li key={e.name} className="flex items-start gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
                <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-sm font-medium text-foreground">{e.name}</p>
                  <p className="text-sm text-foreground/70">{e.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border border-border">
                    <AvatarImage src={teamPlaceholder} alt={active.name} className="object-cover" />
                    <AvatarFallback>{active.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <DialogTitle className="font-serif-display text-2xl tracking-tight">{active.name}</DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-wider">{active.title}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-1.5">
                {active.departments.map((d) => (
                  <span
                    key={d}
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${chipForDept(d)}`}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-foreground/85">{active.bio}</p>

              <div className="flex items-center gap-2 border-t border-border pt-4">
                {active.contacts.map((c) => (
                  <ContactIcon key={c.kind} kind={c.kind} href={c.href} />
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeInspo} onOpenChange={(o) => !o && setActiveInspo(null)}>
        <DialogContent className="max-w-md">
          {activeInspo && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
                    <Palette className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="text-left">
                    <DialogTitle className="font-serif-display text-2xl tracking-tight">{activeInspo.name}</DialogTitle>
                    <DialogDescription className="sr-only">design inspiration: {activeInspo.name}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    inspoCategoryClasses[activeInspo.category] ?? "bg-secondary text-foreground border-border"
                  }`}
                >
                  {activeInspo.category}
                </span>
              </div>


              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">where it's used</p>
                <p className="text-sm leading-relaxed text-foreground/85">{activeInspo.usedFor}</p>
              </div>

              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">about it</p>
                <p className="text-sm leading-relaxed text-foreground/75">{activeInspo.description}</p>
              </div>

              <div className="flex items-center gap-2 border-t border-border pt-4">
                {activeInspo.links.map((l) => {
                  const Icon = l.kind === "instagram" ? Instagram : l.kind === "email" ? Mail : LinkIcon;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.kind === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {l.label}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeContrib} onOpenChange={(o) => !o && setActiveContrib(null)}>
        <DialogContent className="max-w-md">
          {activeContrib && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
                    <Users className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="text-left">
                    <DialogTitle className="font-serif-display text-2xl tracking-tight">{activeContrib.name}</DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-wider">{activeContrib.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-foreground/85">{activeContrib.note}</p>

              {activeContrib.contacts.length > 0 && (
                <div className="flex items-center gap-2 border-t border-border pt-4">
                  {activeContrib.contacts.map((c) => (
                    <ContactIcon key={c.kind} kind={c.kind} href={c.href} />
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />


    </div>
  );
};

export default Team;
