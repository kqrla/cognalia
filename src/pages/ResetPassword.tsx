// /reset-password - lands here from the email link. supabase has
// already exchanged the recovery token for a session by the time we
// mount, so we just need to call updateUser with the new password.

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  // wait for supabase to consume the recovery token from the url hash.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("passwords don't match");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("password updated");
    navigate("/account");
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-md py-16">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">reset password</p>
        <h1 className="font-serif-display text-4xl tracking-tight">set a new password.</h1>
        <p className="mt-3 text-sm text-foreground/70">
          {ready
            ? "pick something memorable but not reused from elsewhere."
            : "verifying your reset link…"}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="new password (min 6 chars)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? "hide password" : "show password"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <input
            type={show ? "text" : "password"}
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="confirm new password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={busy || !ready}
            className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50"
          >
            {busy ? "updating..." : "update password"}
          </button>
        </form>

        <p className="mt-8 text-xs text-muted-foreground">
          remembered it? <Link to="/login" className="underline underline-offset-4">sign in instead</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
};

export default ResetPassword;
