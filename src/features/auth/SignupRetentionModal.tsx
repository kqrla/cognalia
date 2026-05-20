// shown right after a successful signup when the user already had
// local data on this device (recents/presets). gives them an explicit
// choice: keep it (it'll sync up via cloudSync naturally), discard
// it from this device, or download a json copy first. without this
// the merge behaviour is invisible and people get nervous about what
// "syncing" actually means.

import { useEffect, useMemo, useState } from "react";
import { Download, Sparkles, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { exportLocalAsJson } from "@/features/auth/cloudSync";
import { toast } from "sonner";

const RECENTS_KEY = "annealogy.recents.v1";
const PRESETS_KEY = "annealogy.presets.v1";

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
};

const readCounts = () => {
  const safe = (k: string) => {
    try {
      const v = JSON.parse(localStorage.getItem(k) ?? "[]");
      return Array.isArray(v) ? v.length : 0;
    } catch {
      return 0;
    }
  };
  return { recents: safe(RECENTS_KEY), presets: safe(PRESETS_KEY) };
};

export const SignupRetentionModal = ({ open, onClose, onContinue }: Props) => {
  const counts = useMemo(readCounts, [open]);
  const [busy, setBusy] = useState(false);

  // close automatically if there's nothing to decide about
  useEffect(() => {
    if (open && counts.recents === 0 && counts.presets === 0) {
      onContinue();
    }
  }, [open, counts, onContinue]);

  const downloadJson = () => {
    const data = exportLocalAsJson();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analogize-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const keepAndContinue = () => {
    setBusy(true);
    // do nothing - cloudSync will pick up local data on its next push
    toast.success("keeping your local data. it'll sync to this account.");
    onContinue();
  };

  const discardAndContinue = () => {
    if (!confirm("discard local history and presets from this device? this can't be undone unless you exported first.")) return;
    setBusy(true);
    localStorage.removeItem(RECENTS_KEY);
    localStorage.removeItem(PRESETS_KEY);
    // nudge listeners
    window.dispatchEvent(new StorageEvent("storage", { key: RECENTS_KEY }));
    toast("local data cleared. your account starts fresh.");
    onContinue();
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif-display text-2xl tracking-tight">
            we found {counts.recents} translation{counts.recents === 1 ? "" : "s"} on this device.
          </AlertDialogTitle>
          <AlertDialogDescription>
            you've been using analogize without an account. before we sync, decide what to do with the {counts.recents} translation{counts.recents === 1 ? "" : "s"}
            {counts.presets > 0 ? ` and ${counts.presets} saved reference${counts.presets === 1 ? "" : "s"}` : ""} already saved here.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-2 space-y-2 text-sm">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
            <p className="flex items-center gap-2 font-medium"><Sparkles className="h-3.5 w-3.5 text-primary" /> keep and sync</p>
            <p className="mt-1 text-xs text-muted-foreground">everything on this device becomes part of your account and syncs to other devices you sign into.</p>
          </div>
          <div className="rounded-xl border border-border p-3">
            <p className="flex items-center gap-2 font-medium"><Trash2 className="h-3.5 w-3.5 text-muted-foreground" /> discard local data</p>
            <p className="mt-1 text-xs text-muted-foreground">your new account starts empty. local data on this device is wiped.</p>
          </div>
          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="h-3 w-3" /> download a json copy first
          </button>
        </div>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel onClick={discardAndContinue} disabled={busy}>discard local</AlertDialogCancel>
          <AlertDialogAction onClick={keepAndContinue} disabled={busy}>keep and sync</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
