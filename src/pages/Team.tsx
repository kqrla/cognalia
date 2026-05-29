// /team (also /studio/team) - full team page with sortable department chips,
// extended contributors, inspirations, special mentions, emotional support.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, ArrowLeft, Heart, Sparkles, BookOpen, Users, Palette, Link as LinkIcon, ExternalLink, Instagram } from "lucide-react";
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

const contributors = [
  "kira lindqvist", "tomas alvarado", "yuki tanabe", "priya raman",
  "marcus dell'aria", "elena rossi", "kofi mensah", "hana svoboda",
  "dmitri volkov", "fatima zahra", "owen blackwood", "lina park",
];

const inspirations = [
  { name: "douglas hofstadter", note: "for insisting analogy is the core of cognition." },
  { name: "edward tufte", note: "for showing that small multiples and restraint outperform decoration." },
  { name: "bret victor", note: "for the conviction that medium shapes thought." },
  { name: "ted nelson", note: "for 'everything is deeply intertwingled'." },
  { name: "richard feynman", note: "for the discipline of explaining it to a freshman." },
  { name: "iain mcgilchrist", note: "for the right-hemisphere argument: meaning before mechanism." },
];

const specialMentions = [
  { name: "the early testers", note: "who used the app when it broke every other tuesday." },
  { name: "ms. ahuja's 11th-grade class", note: "for the brutal, useful feedback on the first six-layer draft." },
  { name: "the obsidian community", note: "for proving local-first knowledge tools have an audience." },
  { name: "every librarian who explained dewey decimals patiently", note: "you taught us what a system feels like from the inside." },
];

const emotionalSupport = [
  { name: "miso", note: "studio cat. attended every standup. contributed zero code." },
  { name: "the espresso machine in the corner", note: "non-negotiable infrastructure." },
  { name: "long walks at 3pm", note: "where most of the format decisions actually happened." },
  { name: "every friend who said 'wait, explain that again'", note: "you were the first user." },
];

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
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/85"
              >
                {c}
              </span>
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

      <SiteFooter />
    </div>
  );
};

export default Team;
