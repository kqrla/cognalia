// /login - optional sign-in. mirrors /register.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("signed in. syncing…");
    navigate("/account");
  };

  const onGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/account`,
    });
    if (result.error) {
      toast.error("could not start google sign-in");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="container max-w-md py-16">
        <Link to="/app" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> back
        </Link>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">sign in</p>
        <h1 className="font-serif-display text-4xl tracking-tight">welcome back.</h1>
        <p className="mt-3 text-sm text-foreground/70">
          your local history and presets stay where they are. signing in just pulls in anything you saved on another device.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50"
          >
            {busy ? "..." : "sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="w-full rounded-full border border-border py-2.5 text-sm font-medium hover:bg-secondary disabled:opacity-50"
        >
          continue with google
        </button>

        <p className="mt-8 text-xs text-muted-foreground">
          new here? <Link to="/register" className="underline underline-offset-4">create an account</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Login;
