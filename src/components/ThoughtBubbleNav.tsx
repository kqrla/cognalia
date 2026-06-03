// floating "face with thought bubble" widget — landingclone only.
// click the sticker to expand a thought bubble that cycles short prompts
// linking to real pages already in the app.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import stickAsset from "@/assets/stick.png.asset.json";

type Thought = { label: string; to: string };

const thoughts: Thought[] = [
  { label: "have questions? ask here", to: "/faq" },
  { label: "wanna see how it works?", to: "/features" },
  { label: "curious about the philosophy?", to: "/philosophy" },
  { label: "see real examples →", to: "/examples" },
  { label: "peek the roadmap", to: "/roadmap" },
  { label: "who made this?", to: "/about" },
  { label: "say hi", to: "/contact" },
  { label: "just try it already", to: "/app" },
];

export const ThoughtBubbleNav = () => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // cycle the thought when closed (idle thinking)
  useEffect(() => {
    if (open) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % thoughts.length), 3200);
    return () => clearInterval(t);
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

  const current = thoughts[idx];

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50 flex items-end gap-2">
      {/* thought bubble panel */}
      <div
        className={`mb-8 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <div className="relative w-64 rounded-2xl border border-border bg-background p-3 shadow-xl">
          <p className="mb-2 px-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            thinking about…
          </p>
          <ul className="space-y-1">
            {thoughts.map((t) => (
              <li key={t.to}>
                <Link
                  to={t.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-1.5 text-sm text-foreground/85 hover:bg-secondary hover:text-foreground"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* little bubble trail dots toward the face */}
          <span className="absolute -bottom-3 right-6 h-2.5 w-2.5 rounded-full border border-border bg-background" />
          <span className="absolute -bottom-6 right-3 h-1.5 w-1.5 rounded-full border border-border bg-background" />
        </div>
      </div>

      {/* idle single thought cloud (only when closed) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-8 max-w-[180px] rounded-2xl border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground/85 shadow-md transition-opacity hover:opacity-100"
          aria-label={`open thought menu: ${current.label}`}
        >
          {current.label}
        </button>
      )}

      {/* the face */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="open thought bubble menu"
        className="relative h-16 w-16 shrink-0 transition-transform hover:scale-105 active:scale-95"
      >
        <img
          src={stickAsset.url}
          alt=""
          className="h-full w-full select-none object-contain"
          draggable={false}
        />
      </button>
    </div>
  );
};

export default ThoughtBubbleNav;
