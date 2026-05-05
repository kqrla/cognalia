// single-shot follow-up card. NOT a chatbot. user types one clarifying
// question about the analogy they just read; we return a short answer
// that stays inside the same analogy. previous answer is replaced when
// they ask another.

import { useState } from "react";
import { Loader2, MessageCircleQuestion, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AnalogySystemId } from "../systems";
import { cn } from "@/lib/utils";

type Props = {
  concept: string;
  system: AnalogySystemId;
  analogy: string;
};

export const FollowUpCard = ({ concept, system, analogy }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("clarify", {
        body: { concept, system, analogy, question: q },
      });
      if (error) throw error;
      setAnswer(data?.answer ?? "no answer returned.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "could not clarify");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="surface-card mt-6 p-5 animate-fade-up">
      <div className="mb-3 flex items-center gap-2">
        <MessageCircleQuestion className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-semibold tracking-tight">
          didn't quite click?
        </p>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        ask one quick follow-up. stays inside the same analogy. not a chat.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="e.g. so are the lego bricks the data or the layers?"
          className={cn(
            "flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground/70",
            "focus:outline-none focus:ring-2 focus:ring-primary/40",
          )}
        />
        <button
          type="button"
          onClick={ask}
          disabled={!question.trim() || loading}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm",
            "bg-primary text-primary-foreground transition-all hover:opacity-90",
            "disabled:opacity-40",
          )}
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          ask
        </button>
      </div>
      {answer && (
        <div className="mt-4 rounded-xl bg-background/60 p-4 text-sm leading-relaxed text-foreground/85">
          {answer}
        </div>
      )}
    </section>
  );
};
