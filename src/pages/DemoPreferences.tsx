// /demo/preferences - inert preview of the signed-in preferences
// surface. shows thinking-style, default analogy system, and the
// analytics opt-in as togglable local state. nothing persists; the
// page exists so visitors can feel the shape of personalization
// before creating an account.

import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Brain, LayoutGrid, ShieldCheck, Tag } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";
import { analogySystems, thinkingStyles } from "@/features/analogy/systems";
import { cn } from "@/lib/utils";

const DemoPreferences = () => {
  const [style, setStyle] = useState<string | null>(thinkingStyles[0]?.id ?? null);
  const [system, setSystem] = useState<string>(analogySystems[0].id);
  const [analytics, setAnalytics] = useState(true);

  const note = () => toast("demo only — sign up to save these for real.");

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <section className="container max-w-3xl py-12">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">preferences</p>
        <h1 className="font-serif-display text-4xl tracking-tight">how analogize thinks for you.</h1>
        <p className="mt-3 max-w-xl text-sm text-foreground/70">
          tune the defaults that shape every explanation. in the real app these sync to your account; here, they reset when you reload.
        </p>

        <div className="mt-10 space-y-6">
          <Card icon={<Brain className="h-4 w-4 text-primary" />} title="thinking style" subtitle="hints at how to frame analogies for you by default.">
            <div className="grid gap-2 sm:grid-cols-2">
              {thinkingStyles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setStyle(s.id); note(); }}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-colors",
                    style === s.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/40",
                  )}
                >
                  <p className="text-sm font-medium">{s.label}</p>
                  {s.description && <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>}
                </button>
              ))}
            </div>
          </Card>

          <Card icon={<LayoutGrid className="h-4 w-4 text-primary" />} title="default analogy system" subtitle="the lens used first when you translate a new concept.">
            <div className="flex flex-wrap gap-1.5">
              {analogySystems.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSystem(s.id); note(); }}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    system === s.id ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Card>

          <Card icon={<BarChart3 className="h-4 w-4 text-primary" />} title="local analytics" subtitle="off by default. when on, we compute a few patterns from your history entirely in-browser. nothing leaves your device.">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={analytics} onChange={(e) => { setAnalytics(e.target.checked); note(); }} className="h-4 w-4" />
              <span>{analytics ? "on" : "off"}</span>
              <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3" /> local-only
              </span>
            </label>
          </Card>

          <Card icon={<Tag className="h-4 w-4 text-primary" />} title="topics" subtitle="manage the freeform tag clusters you've attached to past translations.">
            <Link to="/demo/personalize" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary">
              open topic manager →
            </Link>
          </Card>
        </div>

        <div className="mt-10 surface-paper p-5 border-l-2 border-primary/30">
          <p className="text-sm font-medium">like the shape of this?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            sign up and every toggle above syncs across your devices, with full json export anytime.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link to="/register" className="rounded-full bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90">create account</Link>
            <Link to="/whyregister" className="rounded-full border border-border px-3 py-1.5 hover:bg-secondary">compare signed-in vs not</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

const Card = ({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) => (
  <div className="surface-paper p-5 border-l-2 border-primary/20">
    <div className="mb-3 flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div>{children}</div>
  </div>
);

export default DemoPreferences;
