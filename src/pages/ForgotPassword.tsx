// /forgot-password - sends a magic reset link via supabase auth. the
// link lands on /reset-password where the user picks a new password.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-md py-16">
        <Link to="/login" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> back to sign in
        </Link>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">forgot password</p>
        <h1 className="font-serif-display text-4xl tracking-tight">reset link.</h1>
        <p className="mt-3 text-sm text-foreground/70">
          enter the email you used to sign up. we'll send you a link to set a new password.
        </p>

        {sent ? (
          <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4" /> check your inbox
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              if an account exists for <span className="font-medium text-foreground">{email}</span>, a reset link is on its way. it may take a minute. check spam too.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50"
            >
              {busy ? "sending..." : "send reset link"}
            </button>
          </form>
        )}
      </section>
      <SiteFooter />
    </div>
  );
};

export default ForgotPassword;
