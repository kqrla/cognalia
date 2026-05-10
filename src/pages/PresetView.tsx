// /preset/:slug — view a published analogy preset and import it into
// this browser. importing just calls addPreset locally so the imported
// reference behaves exactly like one the user added by hand.

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { addPreset, getPresets } from "@/features/analogy/presets";

type Published = {
  slug: string;
  label: string;
  description: string;
  created_at: string;
};

const PresetView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [preset, setPreset] = useState<Published | null>(null);
  const [loading, setLoading] = useState(true);
  const [imported, setImported] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("published_presets")
        .select("slug,label,description,created_at")
        .eq("slug", slug)
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        setPreset(null);
      } else {
        setPreset(data as Published);
        setImported(
          getPresets().some(
            (p) => p.label.toLowerCase() === data.label.toLowerCase(),
          ),
        );
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const onImport = () => {
    if (!preset) return;
    const created = addPreset(preset.label, preset.description);
    if (!created) {
      toast.error("you already have a preset with that name");
      return;
    }
    setImported(true);
    toast.success(`imported "${preset.label}" as a preset`);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="container flex h-14 max-w-3xl items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> analogize
          </Link>
          <span className="font-serif-display text-lg">shared preset</span>
        </div>
      </header>

      <section className="container max-w-2xl py-14">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            loading preset...
          </div>
        ) : !preset ? (
          <div className="surface-card p-6 text-center">
            <p className="font-serif-display text-2xl">preset not found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              this link may be wrong or the preset was never published.
            </p>
            <Link
              to="/suggest"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
            >
              create your own
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              someone shared a reference with you
            </p>
            <h1 className="font-serif-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              {preset.label}
            </h1>
            <p className="mt-5 text-foreground/80">{preset.description}</p>

            <div className="surface-card mt-8 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 h-4 w-4" />
                <p>
                  import this preset into your browser. analogize will
                  reach for it in future explanations only when it lands
                  naturally.
                </p>
              </div>
              <button
                type="button"
                onClick={onImport}
                disabled={imported}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Download className="h-3.5 w-3.5" />
                {imported ? "already imported" : "import preset"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/app"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                try analogize →
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PresetView;
