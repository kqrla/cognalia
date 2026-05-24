// SubjectsManager - higher-level "subjects" surface for the personalize
// pages. subjects describe the user's primary regions of curiosity
// (e.g. "biology", "macroeconomics", "design history"). they are
// distinct from per-translation topic tags and INTENTIONALLY do not
// flow into the analogy prompt - the model never sees them. they're a
// pure navigation/identity layer so the user can articulate "this is
// what i tend to come here for".

import { useState } from "react";
import { Compass, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const PASTELS = [
  "bg-system-1/40 border-system-1/50",
  "bg-system-2/40 border-system-2/50",
  "bg-system-3/40 border-system-3/50",
  "bg-system-4/40 border-system-4/50",
  "bg-system-5/40 border-system-5/50",
  "bg-system-6/40 border-system-6/50",
] as const;

const colorFor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PASTELS[h % PASTELS.length];
};

const SUGGESTIONS = [
  "biology",
  "macroeconomics",
  "design",
  "machine learning",
  "philosophy",
  "history",
  "linguistics",
  "physics",
  "music theory",
  "product strategy",
];

type Props = {
  subjects: string[];
  onChange: (next: string[]) => void;
  readOnly?: boolean;
  inertMessage?: string;
};

export const SubjectsManager = ({ subjects, onChange, readOnly, inertMessage }: Props) => {
  const [draft, setDraft] = useState("");

  const add = (value: string) => {
    if (readOnly) {
      if (inertMessage) toast(inertMessage);
      return;
    }
    const clean = value.trim().slice(0, 40);
    if (!clean) return;
    if (subjects.some((s) => s.toLowerCase() === clean.toLowerCase())) {
      toast("you already added that subject");
      return;
    }
    if (subjects.length >= 8) {
      toast("8 subjects is plenty - remove one to add another");
      return;
    }
    onChange([...subjects, clean]);
    setDraft("");
  };

  const remove = (name: string) => {
    if (readOnly) {
      if (inertMessage) toast(inertMessage);
      return;
    }
    onChange(subjects.filter((s) => s !== name));
  };

  const unused = SUGGESTIONS.filter(
    (s) => !subjects.some((x) => x.toLowerCase() === s.toLowerCase()),
  ).slice(0, 6);

  return (
    <section className="surface-paper mt-10 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Compass className="h-3.5 w-3.5" /> subjects
          </p>
          <h2 className="mt-2 font-serif-display text-2xl tracking-tight">your primary regions.</h2>
          <p className="mt-2 max-w-xl text-sm text-foreground/70">
            subjects describe the broad domains you tend to ask about. they're for you - we don't feed them into the model, so they never bias the analogies you get back. think of them as your personal index, not a filter.
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {subjects.length === 0 && (
          <li className="text-sm text-muted-foreground">no subjects yet. add a few below.</li>
        )}
        {subjects.map((s) => (
          <li
            key={s}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${colorFor(s)}`}
          >
            <span>{s}</span>
            <button
              type="button"
              onClick={() => remove(s)}
              className="rounded-full p-0.5 text-foreground/60 hover:text-foreground"
              aria-label={`remove ${s}`}
            >
              <X className="h-3 w-3" />
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          add(draft);
        }}
        className="mt-5 flex items-center gap-2"
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={40}
          placeholder='add a subject e.g. "neuroscience"'
          className="flex-1"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" /> add
        </button>
      </form>

      {unused.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">try one</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {unused.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => add(s)}
                className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-[11px] text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
