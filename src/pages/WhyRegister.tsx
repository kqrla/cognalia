// /whyregister - honest side-by-side of "no account" vs "signed in".
// linked from /account and /demo. an account is a convenience, not a paywall.

import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, Cloud, LayoutDashboard, Sparkles, Download, Lock, Smartphone } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

type Row = { feature: string; sub?: string; anon: boolean | "partial"; account: boolean };

const rows: Row[] = [
  { feature: "translate concepts", sub: "the entire core experience", anon: true, account: true },
  { feature: "browse history & tag translations", anon: true, account: true },
  { feature: "save personal references (presets)", anon: true, account: true },
  { feature: "share a translation by link", anon: true, account: true },
  { feature: "your data stays on this device", anon: true, account: true },
  { feature: "cross-device sync of history, presets, preferences", anon: false, account: true },
  { feature: "/dashboard, your personal home", anon: false, account: true },
  { feature: "/topics, rename, merge, clean up tag clusters", anon: false, account: true },
  { feature: "opt-in insights panel", sub: "most-used systems, recurring topics, activity", anon: false, account: true },
  { feature: "one-click json export of everything", anon: false, account: true },
  { feature: "pick up where you left off on another device", anon: false, account: true },
  { feature: "publish a preset to /browseall", anon: false, account: true },
];

const perks = [
  { icon: Cloud, title: "quiet sync", body: "history, tags, presets, and preferences mirror to your account in the background. no manual export, no lost work when you switch laptops." },
  { icon: LayoutDashboard, title: "a personal home", body: "/dashboard surfaces recent translations, pinned references, and a way back into anything you started." },
  { icon: Sparkles, title: "opt-in insights", body: "see which systems you reach for most, what subjects keep recurring, when you tend to learn. off by default." },
  { icon: Download, title: "portable, always", body: "one click pulls everything out as json. nothing is locked behind the account, including your data." },
  { icon: Smartphone, title: "device-agnostic", body: "phone in the morning, laptop at night, work machine tomorrow. same library, no copy-paste." },
  { icon: Lock, title: "no upsell", body: "free in beta, free tier forever, no enterprise plan. the account does not unlock paid features because there aren't any." },
];

const faqs = [
  { q: "do i lose my anonymous work if i sign up later?", a: "no. when you create an account, the things saved on this device get pulled up to your account in the background." },
  { q: "can i delete my account and all data?", a: "yes, from /account. it wipes the server copy and leaves the local copy alone, or removes both, your choice." },
  { q: "do you sell or train on my translations?", a: "no. the data exists to make your experience better and that's it. exports are one click away." },
];

const Cell = ({ value }: { value: boolean | "partial" }) => {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-foreground" />;
  return <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />;
};

const WhyRegister = () => (
  <div className="min-h-screen">
    <SiteNav />
    <section className="container max-w-4xl py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">why register</p>
      <h1 className="font-serif-display text-4xl tracking-tight md:text-5xl">accounts are a convenience, not a gate.</h1>
      <p className="mt-5 max-w-2xl text-base text-foreground/70">
        analogize is fully usable without an account. the same translations, the same systems, the same history, all of it works in your browser on this device. an account just adds sync, a personal dashboard, and opt-in insights. here is the honest comparison.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/app" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">try it without an account</Link>
        <Link to="/register" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">create a free account</Link>
        <Link to="/compare" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">compare to similar apps</Link>
      </div>

      <div className="mt-12 overflow-hidden surface-paper">
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

      <section className="mt-16">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">what an account actually adds</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <article key={p.title} className="surface-paper p-5">
              <p.icon className="h-4 w-4 text-foreground/70" />
              <p className="mt-3 font-serif-display text-lg tracking-tight">{p.title}</p>
              <p className="mt-2 text-sm text-foreground/70">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2">
        <article className="surface-paper p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">casual visitor</p>
          <p className="mt-2 font-serif-display text-xl tracking-tight">stay anonymous.</p>
          <p className="mt-3 text-sm text-foreground/70">
            translate things, tag a few, explore the systems library. nothing breaks without an account, and you can sign up later without losing what's on this device.
          </p>
          <Link to="/app" className="mt-4 inline-flex items-center gap-2 text-sm underline underline-offset-4">
            keep using it without one <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </article>
        <article className="surface-paper p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">across devices</p>
          <p className="mt-2 font-serif-display text-xl tracking-tight">sign in once, find it everywhere.</p>
          <p className="mt-3 text-sm text-foreground/70">
            your history, tags, and references mirror to your account quietly in the background. you also unlock the dashboard and opt-in insights.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/register" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">create an account</Link>
            <Link to="/demo/dashboard" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">see the demo first</Link>
          </div>
        </article>
      </section>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">the usual worries</p>
        <div className="mt-5 divide-y divide-border/60 surface-paper">
          {faqs.map((f) => (
            <div key={f.q} className="p-5">
              <p className="font-medium">{f.q}</p>
              <p className="mt-1.5 text-sm text-foreground/70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        free in beta and will always have a free tier. no enterprise plan, ever. see <Link to="/pricing" className="underline underline-offset-4">pricing</Link>.
      </p>
    </section>
    <SiteFooter />
  </div>
);

export default WhyRegister;
