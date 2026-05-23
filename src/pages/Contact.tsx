// /contact — standalone contact page with subject + purpose chips,
// plus a "suggest something for us to build" popup that writes to
// build_suggestions. not linked from the main nav yet.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle, Lightbulb, X } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PURPOSE_OPTIONS = [
  { id: "feedback", label: "feedback" },
  { id: "bug", label: "bug report" },
  { id: "feature", label: "feature request" },
  { id: "partnership", label: "partnership" },
  { id: "press", label: "press" },
  { id: "support", label: "support" },
  { id: "other", label: "other" },
] as const;

const PURPOSE_COLORS: Record<string, string> = {
  feedback: "bg-system-story",
  bug: "bg-system-traffic",
  feature: "bg-system-building",
  partnership: "bg-system-company",
  press: "bg-system-relationship",
  support: "bg-system-cooking",
  other: "bg-system-storage",
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [purposes, setPurposes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  // suggestion dialog state
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [sTitle, setSTitle] = useState("");
  const [sDesc, setSDesc] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sBusy, setSBusy] = useState(false);

  const togglePurpose = (id: string) =>
    setPurposes((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("please fill in all fields");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      subject: subject.trim().slice(0, 140) || null,
      purposes,
      message: message.trim().slice(0, 2000),
    });
    setBusy(false);
    if (error) {
      toast.error("could not send. try again later?");
      return;
    }
    setSent(true);
    toast.success("message sent");
  };

  const submitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle.trim() || !sDesc.trim()) {
      toast.error("give it a title and a short description");
      return;
    }
    setSBusy(true);
    const { error } = await supabase.from("build_suggestions").insert({
      title: sTitle.trim().slice(0, 120),
      description: sDesc.trim().slice(0, 2000),
      email: sEmail.trim() ? sEmail.trim().slice(0, 255) : null,
    });
    setSBusy(false);
    if (error) {
      toast.error("could not send suggestion. try again?");
      return;
    }
    toast.success("thanks — we read every one of these");
    setSuggestOpen(false);
    setSTitle("");
    setSDesc("");
    setSEmail("");
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

        {/* suggestion card */}
        <button
          type="button"
          onClick={() => setSuggestOpen(true)}
          className="surface-paper mt-8 flex w-full items-start gap-4 p-5 text-left border-l-2 border-system-building hover:bg-secondary/40 transition-colors"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-system-building">
            <Lightbulb className="h-4 w-4 text-foreground/80" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">suggest something for us to build / try</p>
            <p className="mt-1 text-xs text-muted-foreground">
              a feature, an analogy system, a new lens — write it up in 30 seconds. opens a popup.
            </p>
          </div>
        </button>

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
                setSubject("");
                setPurposes([]);
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
                maxLength={100}
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
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="a short headline for your message"
                maxLength={140}
              />
            </div>

            <div className="space-y-2">
              <Label>purpose</Label>
              <p className="text-[11px] text-muted-foreground">pick any that apply — helps us route your message.</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PURPOSE_OPTIONS.map((p) => {
                  const sel = purposes.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePurpose(p.id)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        sel
                          ? `border-foreground/30 ${PURPOSE_COLORS[p.id]} text-foreground`
                          : "border-border bg-background text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">message</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="what is on your mind?"
                rows={5}
                maxLength={2000}
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

      <Dialog open={suggestOpen} onOpenChange={setSuggestOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl tracking-tight">
              suggest something to build
            </DialogTitle>
            <DialogDescription>
              tell us what's missing. concrete ideas welcome — and weird ones too.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitSuggestion} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="s-title">idea title</Label>
              <Input
                id="s-title"
                value={sTitle}
                onChange={(e) => setSTitle(e.target.value)}
                placeholder="e.g. let me pin favorite analogies"
                maxLength={120}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-desc">describe it</Label>
              <textarea
                id="s-desc"
                value={sDesc}
                onChange={(e) => setSDesc(e.target.value)}
                placeholder="what would it do? when would you use it?"
                rows={5}
                maxLength={2000}
                required
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">email (optional)</Label>
              <Input
                id="s-email"
                type="email"
                value={sEmail}
                onChange={(e) => setSEmail(e.target.value)}
                placeholder="only if you want a reply"
                maxLength={255}
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSuggestOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={sBusy}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
              >
                {sBusy ? "sending..." : "send suggestion"}
                <Lightbulb className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
