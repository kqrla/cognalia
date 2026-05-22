// /contact — a standalone contact page. not linked from the main nav yet.
// submissions go straight into the contact_submissions table.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("please fill in all fields");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error("could not send. try again later?");
      return;
    }
    setSent(true);
    toast.success("message sent");
  };

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="container max-w-xl pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          back to home
        </Link>

        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          get in touch
        </p>
        <h1 className="font-serif-display text-4xl tracking-tight sm:text-5xl">
          contact.
        </h1>
        <p className="mt-4 text-foreground/70">
          questions, feedback, or just want to say hello? drop a message and we will read every word.
        </p>

        {sent ? (
          <div className="mt-10 surface-paper p-8 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-foreground/70" />
            <h2 className="mt-4 font-serif-display text-2xl tracking-tight">
              message sent.
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              thanks for reaching out. we will get back to you as soon as we can.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              send another
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">message</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="what is on your mind?"
                rows={5}
                required
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "sending..." : "send message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
