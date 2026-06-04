// floating "face with thought bubble" chatbot — landingclone only.
// the face gently bobs/jumps. clicking opens a tiny chat where users type
// a question; we keyword-match against known routes and redirect. no AI —
// just string parsing. if nothing matches, we offer /contact as fallback.

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import stickAsset from "@/assets/stick.png.asset.json";

const idleThoughts = [
  "ask me anything!",
  "need help?",
  "where to?",
  "what's up?",
];

type Msg = {
  from: "bot" | "user";
  text: string;
  to?: string;
  toLabel?: string;
};

// route → trigger keywords. order matters (first match wins).
const routes: { to: string; label: string; keywords: string[] }[] = [
  { to: "/faq", label: "the faq", keywords: ["faq", "question", "help", "support"] },
  { to: "/pricing", label: "pricing", keywords: ["price", "pricing", "cost", "pay", "subscription", "plan", "free"] },
  { to: "/features", label: "features", keywords: ["feature", "what can", "does it do", "capability", "capabilities"] },
  { to: "/philosophy", label: "the philosophy", keywords: ["philosophy", "why", "belief", "principle", "vision"] },
  { to: "/goals", label: "the goals", keywords: ["goal", "mission", "aim"] },
  { to: "/mechanisms", label: "the mechanisms", keywords: ["mechanism", "how does", "how it works", "internals", "under the hood"] },
  { to: "/roadmap", label: "the roadmap", keywords: ["roadmap", "upcoming", "future", "soon", "coming"] },
  { to: "/compare", label: "the comparison", keywords: ["compare", "vs", "versus", "difference", "alternative"] },
  { to: "/examples", label: "examples", keywords: ["example", "sample", "demo example", "show me"] },
  { to: "/browseall", label: "everything", keywords: ["browse", "all", "everything", "library", "catalog"] },
  { to: "/graphical", label: "the graphical view", keywords: ["graph", "graphical", "visual", "diagram", "map"] },
  { to: "/about", label: "the about page", keywords: ["about", "who", "team", "maker", "founder"] },
  { to: "/authorsnote", label: "the author's note", keywords: ["author", "note", "personal", "story"] },
  { to: "/annotations-guide", label: "the annotations guide", keywords: ["annotation", "annotate", "highlight", "markup"] },
  { to: "/register", label: "register", keywords: ["register", "sign up", "signup", "create account", "join"] },
  { to: "/login", label: "login", keywords: ["login", "log in", "sign in", "signin"] },
  { to: "/whyregister", label: "why register", keywords: ["why register", "why sign up", "benefit"] },
  { to: "/account", label: "your account", keywords: ["account", "profile", "settings"] },
  { to: "/demo", label: "the demo", keywords: ["demo", "try", "preview"] },
  { to: "/app", label: "the app", keywords: ["app", "open", "start", "use it", "launch", "try it"] },
  { to: "/contact", label: "contact", keywords: ["contact", "email", "reach", "talk", "say hi", "hello"] },
];

const suggestions = ["pricing?", "how does it work?", "see examples", "just open the app"];

function matchRoute(input: string) {
  const q = input.toLowerCase().trim();
  if (!q) return null;
  for (const r of routes) {
    if (r.keywords.some((k) => q.includes(k))) return r;
  }
  return null;
}

export const ThoughtBubbleNav = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "hi! ask me anything — i'll point you to the right page." },
  ]);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // rotate idle thought when closed
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => setThoughtIdx((i) => (i + 1) % idleThoughts.length), 3200);
    return () => clearInterval(id);
  }, [open]);

  // click outside to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // autoscroll chat
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    const userMsg: Msg = { from: "user", text };
    const hit = matchRoute(text);
    const botMsg: Msg = hit
      ? {
          from: "bot",
          text: `sounds like you want ${hit.label}.`,
          to: hit.to,
          toLabel: `go to ${hit.label} →`,
        }
      : {
          from: "bot",
          text: "i couldn't match that to a page. want to reach a human?",
          to: "/contact",
          toLabel: "go to contact →",
        };
    setMsgs((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = useMemo(() => msgs.filter((m) => m.from === "user").length === 0, [msgs]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50 flex items-end gap-2">
      {/* chat panel */}
      <div
        className={`mb-2 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="relative w-[300px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              ask the sticker
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              not ai
            </span>
          </div>

          <div ref={scrollRef} className="max-h-[280px] space-y-2 overflow-y-auto px-3 py-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-sm leading-snug ${
                    m.from === "user"
                      ? "bg-secondary text-foreground/90"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.to && (
                    <Link
                      to={m.to}
                      onClick={() => setOpen(false)}
                      className="mt-1 inline-block text-xs font-medium underline underline-offset-2 hover:opacity-80"
                    >
                      {m.toLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-foreground/75 hover:bg-secondary hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-border/70 px-2 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="type a question…"
              className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => send()}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
              aria-label="send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* thought bubble + jumpy face */}
      <div className="relative flex items-end">
        {/* thought bubble when closed */}
        {!open && (
          <div className="thought-bubble absolute bottom-[70px] right-1/2 translate-x-1/2 whitespace-nowrap rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 shadow-soft">
            {idleThoughts[thoughtIdx]}
            <span className="thought-tail absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "close chat" : "open chat"}
          className={`relative h-16 w-16 shrink-0 transition-transform hover:scale-110 active:scale-95 ${
            open ? "" : "animate-bounce-soft"
          }`}
        >
          <img
            src={stickAsset.url}
            alt=""
            className="h-full w-full select-none object-contain drop-shadow"
            draggable={false}
          />
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-foreground" />
            </span>
          )}
        </button>
      </div>

      {/* keyframes for the soft jumpy idle */}
      <style>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        .animate-bounce-soft { animation: bounce-soft 1.6s ease-in-out infinite; transform-origin: bottom center; }
      `}</style>
    </div>
  );
};

export default ThoughtBubbleNav;
