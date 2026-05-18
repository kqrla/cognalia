// /whyregister - honest side-by-side of "no account" vs "signed in".
// linked from /account and /demo. the message is explicit: an account
// is purely a convenience, not a paywall.

import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

type Row = { feature: string; sub?: string; anon: boolean | "partial"; account: boolean };

const rows: Row[] = [
  { feature: "translate concepts", sub: "the entire core experience", anon: true, account: true },
  { feature: "browse history & tag translations", anon: true, account: true },
  { feature: "save personal references (presets)", anon: true, account: true },
  { feature: "share a translation by link", anon: true, account: true },
  { feature: "your data stays on this device", anon: true, account: true },
  { feature: "cross-device sync of history, presets, preferences", anon: false, account: true },
  { feature: "/dashboard — personal home", anon: false, account: true },
  { feature: "/topics — rename, merge, clean up tag clusters", anon: false, account: true },
  { feature: "opt-in insights panel", sub: "most-used systems, recurring topics, activity", anon: false, account: true },
  { feature: "one-click json export of everything", anon: false, account: true },
  { feature: "pick up where you left off on another device", anon: false, account: true },
];

const Cell = ({ value }: { value: boolean | "partial" }) => {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-foreground" />;
  return <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" />;
};

const WhyRegister = () => (
  <div className="min-h-screen">
    <SiteNav />
    <section className="container max-w-3xl py-14">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">why register</p>
      <h1 className="font-serif-display text-4xl tracking-tight">accounts are a convenience, not a gate.</h1>
      <p className="mt-4 max-w-xl text-sm text-foreground/70">
        analogize is fully usable without an account. the same translations, the same systems, the same history — all of it works in your browser on this device. an account just adds sync, a personal dashboard, and opt-in insights. here's the honest comparison.
      </p>

      <div className="mt-10 overflow-hidden surface-paper">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-secondary/40">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">capability</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">no account</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">signed in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.feature}>
                <td className="px-4 py-3">
                  <p className="font-medium">{r.feature}</p>
                  {r.sub && <p className="mt-0.5 text-xs text-muted-foreground">{r.sub}</p>}
                </td>
                <td className="px-4 py-3 text-center"><Cell value={r.anon} /></td>
                <td className="px-4 py-3 text-center"><Cell value={r.account} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <article className="surface-paper p-5">
          <p className="font-serif-display text-lg tracking-tight">if you're a casual visitor</p>
          <p className="mt-2 text-sm text-foreground/70">
            stay anonymous. translate things, tag a few, explore the systems library. nothing breaks without an account.
          </p>
          <Link to="/app" className="mt-4 inline-flex items-center gap-2 text-sm underline underline-offset-4">
            keep using it without one <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </article>
        <article className="surface-paper p-5">
          <p className="font-serif-display text-lg tracking-tight">if you'll come back across devices</p>
          <p className="mt-2 text-sm text-foreground/70">
            sign up. your history, tags, and references mirror to your account quietly in the background, and you unlock the dashboard plus opt-in insights.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/register" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">create an account</Link>
            <Link to="/demo/dashboard" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">see the demo first</Link>
          </div>
        </article>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        free in beta and will always have a free tier. no enterprise plan, ever — see <Link to="/pricing" className="underline underline-offset-4">pricing</Link>.
      </p>
    </section>
    <SiteFooter />
  </div>
);

export default WhyRegister;
