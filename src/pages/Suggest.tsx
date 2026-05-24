// /suggest - let the user teach analogize references they already think in.
// presets are saved per-browser and passed as soft guidance to the
// explain function. the model only uses them when they land naturally;
// otherwise it falls back to the built-in systems.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Sparkles, Share2, Copy, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  addPreset,
  removePreset,
  setPresetPublishedSlug,
  setPresetPubliclyListed,
  usePresets,
  type AnalogyPreset,
} from "@/features/analogy/presets";

const slugify = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32) || "preset";

const randomSuffix = () => Math.random().toString(36).slice(2, 8);

const Suggest = () => {
  const presets = usePresets();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const onAdd = () => {
    const created = addPreset(label, description);
    if (!created) {
      toast.error(
        label.trim()
          ? "preset already exists or description is empty"
          : "give your preset a name and a short description",
      );
      return;
    }
    setLabel("");
    setDescription("");
    toast.success(`saved "${created.label}" as a preset`);
  };

  const shareUrlFor = (slug: string) => `${window.location.origin}/preset/${slug}`;

  const onCopyLink = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(shareUrlFor(slug));
      toast.success("link copied");
    } catch {
      toast.error("could not copy. select the link manually.");
    }
  };

  const onPublish = async (p: AnalogyPreset) => {
    if (p.publishedSlug) {
      onCopyLink(p.publishedSlug);
      return;
    }
    setPublishingId(p.id);
    const base = slugify(p.label);
    const candidates = [base, `${base}-${randomSuffix()}`, `${base}-${randomSuffix()}`];
    let savedSlug: string | null = null;
    for (const slug of candidates) {
      const { error } = await supabase.from("published_presets").insert({
        slug,
        label: p.label,
        description: p.description,
      });
      if (!error) {
        savedSlug = slug;
        break;
      }
      if (!String(error.message).toLowerCase().includes("duplicate")) {
        toast.error("could not publish preset");
        setPublishingId(null);
        return;
      }
    }
    setPublishingId(null);
    if (!savedSlug) {
      toast.error("could not find a free slug. try renaming the preset.");
      return;
    }
    setPresetPublishedSlug(p.id, savedSlug);
    try {
      await navigator.clipboard.writeText(shareUrlFor(savedSlug));
      toast.success("published. link copied to clipboard.");
    } catch {
      toast.success("published");
    }
  };

  const onToggleListed = async (p: AnalogyPreset, next: boolean) => {
    if (!p.publishedSlug) return;
    const { error } = await supabase
      .from("published_presets")
      .update({ listed: next })
      .eq("slug", p.publishedSlug);
    if (error) {
      toast.error("could not update listing");
      return;
    }
    setPresetPubliclyListed(p.id, next);
    toast.success(next ? "listed in /browseall" : "removed from /browseall");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="container flex h-14 max-w-3xl items-center justify-between">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> back
          </Link>
          <span className="font-serif-display text-lg">suggest</span>
        </div>
      </header>

      <section className="container max-w-3xl py-10">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          your references
        </p>
        <h1 className="font-serif-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          teach analogize how you already think.
        </h1>
        <p className="mt-5 max-w-2xl text-foreground/75">
          add a reference, hobby, or mental model that isn't already in the
          app. next time you ask for an explanation in this browser,
          analogize will reach for it when (and only when) it lands
          naturally - never forced.
        </p>

        <div className="surface-card mt-8 space-y-3 p-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              name
            </label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={60}
              placeholder='e.g. "competitive chess", "kpop choreography", "f1 race strategy"'
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              what is it / how do you think about it
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={280}
              rows={3}
              placeholder="one or two lines describing the world: roles, parts, dynamics. the more concrete, the better the analogies."
              className="mt-1"
            />
            <p className="mt-1 text-right text-[11px] text-muted-foreground">
              {description.length}/280
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> save preset
            </button>
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            saved presets ({presets.length})
          </p>
          {presets.length === 0 ? (
            <div className="surface-card flex items-center gap-3 p-5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              nothing yet. add a reference above and it'll show up here.
            </div>
          ) : (
            <ul className="space-y-2">
              {presets.map((p) => (
                <li
                  key={p.id}
                  className="surface-card flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.description}
                    </p>
                    {p.publishedSlug && (
                      <p className="mt-2 truncate text-[11px] text-muted-foreground">
                        published at{" "}
                        <Link
                          to={`/preset/${p.publishedSlug}`}
                          className="underline underline-offset-2 hover:text-foreground"
                        >
                          /preset/{p.publishedSlug}
                        </Link>
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {p.publishedSlug ? (
                      <button
                        type="button"
                        onClick={() => onCopyLink(p.publishedSlug!)}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        copy link
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onPublish(p)}
                        disabled={publishingId === p.id}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                      >
                        {publishingId === p.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" />
                        )}
                        publish
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        removePreset(p.id);
                        toast(`removed "${p.label}"`);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="remove preset"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Suggest;
