// /demo/account - read-only preview of the signed-in account surface.
// no real session, no real export. shows the layout, sync status,
// and analytics opt-in as inert UI.

import { Cloud, Download, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";

const DemoAccount = () => {
  const inert = () => toast("demo only — sign up to manage a real account.");

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <section className="container max-w-2xl py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">account</p>
        <h1 className="font-serif-display text-4xl tracking-tight">you're synced.</h1>

        <div className="mt-8 space-y-6">
          <div className="surface-paper p-5 border-l-2 border-primary/40">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-system-storage">
                <Cloud className="h-3.5 w-3.5 text-foreground/80" />
              </span>
              <span className="text-muted-foreground">signed in as</span>
              <span className="font-medium">demo@analogize.app</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              in the real app, your history, presets, and preferences sync to your account in the background. sign out anytime — local data on this device stays put.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button onClick={inert} className="surface-paper flex items-center gap-3 p-4 text-left hover:bg-secondary/40">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-system-building">
                <Download className="h-3.5 w-3.5 text-foreground/80" />
              </span>
              <div>
                <p className="text-sm font-medium">export everything as json</p>
                <p className="text-xs text-muted-foreground">history, presets, preferences</p>
              </div>
            </button>
            <button onClick={inert} className="surface-paper flex items-center gap-3 p-4 text-left hover:bg-secondary/40">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-system-relationship">
                <LogOut className="h-3.5 w-3.5 text-foreground/80" />
              </span>
              <div>
                <p className="text-sm font-medium">sign out</p>
                <p className="text-xs text-muted-foreground">local data stays on this device</p>
              </div>
            </button>
          </div>

          <Link
            to="/demo/dashboard"
            className="surface-paper flex items-center gap-3 p-4 text-left hover:bg-secondary/40 border-l-2 border-primary/30"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
            </span>
            <div>
              <p className="text-sm font-medium">open your dashboard</p>
              <p className="text-xs text-muted-foreground">recents, topics, and opt-in insights</p>
            </div>
          </Link>

          <div className="surface-paper p-5 border-l-2 border-primary/30">
            <p className="text-sm font-medium">like what you see?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              everything in this demo works against your own data the moment you create an account.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <Link to="/register" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90">
                create an account
              </Link>
              <Link to="/whyregister" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary">
                compare signed-in vs not
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default DemoAccount;
