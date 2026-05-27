// /account - shows the current account, sync status, and the json export
// button. signed-out users see a quick pitch + links to /login or /register.

import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Cloud,
  Download,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/useAuth";
import { exportLocalAsJson, useCloudSync } from "@/features/auth/cloudSync";
import { AnalyticsToggle } from "@/features/analogy/AnalyticsToggle";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  useCloudSync();

  const onSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("signed out. local data is untouched.");
    navigate("/app");
  };

  const onExport = () => {
    const data = exportLocalAsJson();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analogize-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-2xl py-16">
        <Link to="/app" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> back to app
        </Link>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">account</p>
        <h1 className="font-serif-display text-4xl tracking-tight">
          {user ? "you're synced." : "accounts are optional."}
        </h1>

        {loading ? (
          <p className="mt-6 text-sm text-muted-foreground">checking…</p>
        ) : user ? (
          <div className="mt-8 space-y-6">
            <div className="surface-paper p-5 border-l-2 border-primary/40">
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-system-storage">
                  <Cloud className="h-3.5 w-3.5 text-foreground/80" />
                </span>
                <span className="text-muted-foreground">signed in as</span>
                <span className="font-medium">{user.email ?? user.id}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                your history, presets, and preferences sync to this account in the background. you can sign out anytime — local data on this device stays put.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onExport}
                className="surface-paper flex items-center gap-3 p-4 text-left hover:bg-secondary/40"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-system-building">
                  <Download className="h-3.5 w-3.5 text-foreground/80" />
                </span>
                <div>
                  <p className="text-sm font-medium">export everything as json</p>
                  <p className="text-xs text-muted-foreground">history, presets, preferences</p>
                </div>
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="surface-paper flex items-center gap-3 p-4 text-left hover:bg-secondary/40"
              >
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
              to="/dashboard"
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

            <AnalyticsToggle />

            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                to="/whyregister"
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"
              >
                why register <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"
              >
                explore the demo
              </Link>
            </div>

          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <p className="text-sm text-foreground/75">
              analogize works fully without an account. an account just unlocks a few conveniences:
            </p>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-system-storage">
                  <Cloud className="h-3 w-3 text-foreground/80" />
                </span>
                <span>cloud sync for your history, presets, and preferences across devices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <BarChart3 className="h-3 w-3 text-primary" />
                </span>
                <span>a personal dashboard with opt-in insights into your searches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-system-traffic">
                  <Sparkles className="h-3 w-3 text-foreground/80" />
                </span>
                <span>topic management — rename or merge your tags across all translations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-system-building">
                  <Download className="h-3 w-3 text-foreground/80" />
                </span>
                <span>one-click json export of everything you've saved</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <UserPlus className="h-4 w-4" /> create an account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                sign in
              </Link>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                <Download className="h-4 w-4" /> export local data
              </button>
            </div>

            <div className="surface-paper mt-2 border-l-2 border-system-cooking p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-system-cooking">
                  <ShieldCheck className="h-3.5 w-3.5 text-foreground/80" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">not sure yet?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    see exactly what changes when you sign in, or try the signed-in side as a sandbox — no account required.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Link
                      to="/whyregister"
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:bg-secondary"
                    >
                      compare signed-in vs not <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      to="/demo/dashboard"
                      className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-background hover:bg-foreground/90"
                    >
                      try the demo dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default Account;
