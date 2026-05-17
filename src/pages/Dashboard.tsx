// /dashboard - personal landing for signed-in users. shows quick stats,
// recent topics, saved presets, and (opt-in) a local analytics panel
// computed from the user's recents. signed-out users get redirected to
// /login. no insights or charts are rendered unless analyticsOptIn is true.

import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Clock,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { usePreferences, useRecents } from "@/features/analogy/store";
import { usePresets } from "@/features/analogy/presets";
import { getSystem } from "@/features/analogy/systems";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { recents } = useRecents();
  const { preferences, updatePreferences } = usePreferences();
  const presets = usePresets();

  const analytics = useMemo(() => {
    const systemCounts = new Map<string, number>();
    const tagCounts = new Map<string, number>();
    const byDay = new Map<string, number>();
    recents.forEach((r) => {
      systemCounts.set(r.system, (systemCounts.get(r.system) ?? 0) + 1);
      r.tags?.forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1));
      const d = new Date(r.createdAt).toISOString().slice(0, 10);
      byDay.set(d, (byDay.get(d) ?? 0) + 1);
    });
    const topSystems = Array.from(systemCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topTags = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const key = d.toISOString().slice(0, 10);
      return { key, count: byDay.get(key) ?? 0 };
    });
    const maxDay = Math.max(1, ...last14.map((d) => d.count));
    return { topSystems, topTags, last14, maxDay };
  }, [recents]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <section className="container max-w-3xl py-16 text-sm text-muted-foreground">checking…</section>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  const optedIn = !!preferences.analyticsOptIn;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-4xl py-12">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">dashboard</p>
        <h1 className="font-serif-display text-4xl tracking-tight">
          welcome back, <span className="italic">{user.email?.split("@")[0] ?? "thinker"}</span>.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-foreground/70">
          a quiet home base. your translations, references, and topics in one place. nothing is computed about your searches unless you opt in below.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat icon={<BookOpen className="h-4 w-4" />} label="translations" value={recents.length} />
          <Stat icon={<LayoutGrid className="h-4 w-4" />} label="saved references" value={presets.length} />
          <Stat
            icon={<Tag className="h-4 w-4" />}
            label="unique topics"
            value={new Set(recents.flatMap((r) => r.tags ?? [])).size}
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link to="/app" className="surface-paper p-5 hover:bg-secondary/40">
            <p className="font-serif-display text-lg">open the app</p>
            <p className="mt-1 text-xs text-muted-foreground">translate a new concept</p>
          </Link>
          <Link to="/history" className="surface-paper p-5 hover:bg-secondary/40">
            <p className="font-serif-display text-lg">history</p>
            <p className="mt-1 text-xs text-muted-foreground">browse and tag past translations</p>
          </Link>
          <Link to="/topics" className="surface-paper p-5 hover:bg-secondary/40">
            <p className="font-serif-display text-lg">topics</p>
            <p className="mt-1 text-xs text-muted-foreground">rename, merge, or clear tag clusters</p>
          </Link>
          <Link to="/account" className="surface-paper p-5 hover:bg-secondary/40">
            <p className="font-serif-display text-lg">account</p>
            <p className="mt-1 text-xs text-muted-foreground">sync, export, sign out</p>
          </Link>
        </div>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">recent</p>
              <h2 className="font-serif-display text-2xl tracking-tight">your last translations</h2>
            </div>
            <Link to="/history" className="text-xs text-muted-foreground hover:text-foreground">
              see all →
            </Link>
          </div>
          {recents.length === 0 ? (
            <p className="surface-paper p-6 text-sm text-muted-foreground">
              nothing yet. <Link to="/app" className="underline underline-offset-4">translate your first concept</Link>.
            </p>
          ) : (
            <ul className="divide-y divide-border/60 surface-paper">
              {recents.slice(0, 6).map((r) => {
                const sys = getSystem(r.system);
                return (
                  <li key={r.id}>
                    <Link to={`/explain?recent=${r.id}`} className="flex items-center justify-between gap-3 p-4 hover:bg-secondary/40">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{r.concept}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {sys?.label ?? r.system}
                          {r.tags && r.tags.length > 0 ? ` · ${r.tags.join(", ")}` : ""}
                        </p>
                      </div>
                      <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-14">
          <div className="surface-paper p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h2 className="font-serif-display text-xl tracking-tight">insights into your searches</h2>
                  <p className="mt-1 max-w-xl text-xs text-muted-foreground">
                    off by default. when enabled, we derive a few patterns from your history — most-used systems, recurring topics, activity over the last two weeks — entirely in your browser. nothing leaves this device.
                  </p>
                </div>
              </div>
              <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-xs">
                <span className="text-muted-foreground">{optedIn ? "on" : "off"}</span>
                <input
                  type="checkbox"
                  checked={optedIn}
                  onChange={(e) => updatePreferences({ analyticsOptIn: e.target.checked })}
                  className="h-4 w-4"
                />
              </label>
            </div>

            {!optedIn ? (
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" /> opt in to see your patterns.
              </p>
            ) : recents.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">no translations yet to analyze.</p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">most-used systems</p>
                  <ul className="space-y-1.5">
                    {analytics.topSystems.map(([sys, n]) => (
                      <li key={sys} className="flex items-center gap-2 text-sm">
                        <span className="min-w-32 truncate">{getSystem(sys as never)?.label ?? sys}</span>
                        <span className="h-1.5 flex-1 rounded-full bg-secondary">
                          <span
                            className="block h-full rounded-full bg-foreground/80"
                            style={{ width: `${(n / analytics.topSystems[0][1]) * 100}%` }}
                          />
                        </span>
                        <span className="w-6 text-right text-xs text-muted-foreground">{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">recurring topics</p>
                  {analytics.topTags.length === 0 ? (
                    <p className="text-xs text-muted-foreground">no tags yet — add them from /history.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {analytics.topTags.map(([t, n]) => (
                        <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs">
                          {t} <span className="text-muted-foreground">·{n}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">activity · last 14 days</p>
                  <div className="flex items-end gap-1 h-20">
                    {analytics.last14.map((d) => (
                      <div key={d.key} className="flex-1 flex flex-col items-center justify-end gap-1" title={`${d.key}: ${d.count}`}>
                        <div
                          className="w-full rounded-sm bg-foreground/70"
                          style={{ height: `${(d.count / analytics.maxDay) * 100}%`, minHeight: d.count ? 2 : 0 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 mb-4">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> everything here is computed locally — your account just keeps the underlying data in sync across devices.
          </p>
        </section>
      </section>
      <SiteFooter />
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="surface-paper p-5">
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {icon} {label}
    </div>
    <p className="mt-2 font-serif-display text-3xl tracking-tight">{value}</p>
  </div>
);

export default Dashboard;
