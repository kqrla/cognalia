// /demo - quick tour landing. lists what an account unlocks and links
// out to /demo/dashboard for the sandbox preview. requires no auth.

import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Cloud, Download, LayoutDashboard, Tag } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

const items = [
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "a personal dashboard",
    body: "a quiet home base showing your recent translations, saved references, and a quick way back into the app.",
  },
  {
    icon: <Tag className="h-4 w-4" />,
    title: "topics management",
    body: "the freeform tags you attach to translations cluster into topics. rename one and it propagates everywhere.",
  },
  {
    icon: <BarChart3 className="h-4 w-4" />,
    title: "opt-in insights",
    body: "off by default. when enabled, a small panel computes your most-used systems, recurring topics, and recent activity — entirely in your browser.",
  },
  {
    icon: <Cloud className="h-4 w-4" />,
    title: "cross-device sync",
    body: "history, presets, and preferences quietly mirror to your account so you can pick up on another device.",
  },
  {
    icon: <Download className="h-4 w-4" />,
    title: "one-click export",
    body: "everything you've saved as a single json file, whenever you want it.",
  },
];

const Demo = () => (
  <div className="min-h-screen">
    <SiteNav />
    <section className="container max-w-3xl py-14">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">demo</p>
      <h1 className="font-serif-display text-4xl tracking-tight">see the account, without making one.</h1>
      <p className="mt-4 max-w-xl text-sm text-foreground/70">
        analogize works fully without an account. but if you're curious what the signed-in side feels like — recents, topics, insights — this is a sandbox tour with mock data. nothing is created, nothing is saved.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/demo/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          open the demo dashboard <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/whyregister"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          compare signed-in vs not
        </Link>
      </div>

      <section className="mt-14">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">what an account adds</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.title} className="surface-paper p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {it.icon} {it.title}
              </div>
              <p className="mt-2 text-sm text-foreground/80">{it.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 surface-paper p-6">
        <p className="font-serif-display text-xl tracking-tight">ready to make it yours?</p>
        <p className="mt-2 text-sm text-foreground/70">
          accounts stay free in beta. signing out always leaves local data intact.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/register" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">create an account</Link>
          <Link to="/login" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">sign in</Link>
          <Link to="/app" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">keep using it without one</Link>
        </div>
      </section>
    </section>
    <SiteFooter />
  </div>
);

export default Demo;
