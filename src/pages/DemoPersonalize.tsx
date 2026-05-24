// /demo/personalize - read-only preview of the topics management
// surface. shows the tag clusters derived from demo recents. rename/
// remove buttons are inert.

import { useMemo, useState } from "react";
import { Pencil, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { demoRecents } from "@/features/analogy/demoData";
import { SubjectsManager } from "@/features/analogy/SubjectsManager";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";

const DemoPersonalize = () => {
  const [subjects, setSubjects] = useState<string[]>(["machine learning", "design", "biology"]);
  const topics = useMemo(() => {
    const map = new Map<string, { count: number; concepts: string[] }>();
    demoRecents.forEach((r) => {
      r.tags?.forEach((t) => {
        const e = map.get(t) ?? { count: 0, concepts: [] };
        e.count += 1;
        if (e.concepts.length < 3) e.concepts.push(r.concept);
        map.set(t, e);
      });
    });
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const inert = () => toast("demo only — sign up to actually edit your topics.");

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <section className="container max-w-3xl py-12">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">personalize · topics</p>
        <h1 className="font-serif-display text-4xl tracking-tight">your conceptual clusters.</h1>
        <p className="mt-3 max-w-xl text-sm text-foreground/70">
          topics are the freeform tags you've attached to translations. rename one and it propagates everywhere. merge two by renaming one into the other.
        </p>

        <SubjectsManager subjects={subjects} onChange={setSubjects} />

        <p className="mt-12 mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">topics</p>
        <ul className="divide-y divide-border/60 surface-paper">
          {topics.map((t) => (
            <li key={t.name} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    {t.name}
                    <span className="text-xs text-muted-foreground">· {t.count}</span>
                  </span>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{t.concepts.join(" · ")}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={inert} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="rename">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={inert} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="remove">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  );
};

export default DemoPersonalize;
