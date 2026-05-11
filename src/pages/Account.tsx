// /account — shows the current account, sync status, and the json export
// button. signed-out users see a quick pitch + links to /login or /register.

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Cloud, Download, LogOut, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/useAuth";
import { exportLocalAsJson, useCloudSync } from "@/features/auth/cloudSync";
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
            <div className="surface-paper p-5">
              <div className="flex items-center gap-2 text-sm">
                <Cloud className="h-4 w-4 text-muted-foreground" />
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
                <Download className="h-4 w-4" />
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
                <LogOut className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">sign out</p>
                  <p className="text-xs text-muted-foreground">local data stays on this device</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <p className="text-sm text-foreground/75">
              analogize works fully without an account. an account just unlocks two conveniences:
            </p>
            <ul className="ml-5 list-disc space-y-1 text-sm text-foreground/80">
              <li>cloud sync for your history, presets, and preferences across devices</li>
              <li>one-click json export of everything you've saved</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
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
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default Account;
