// renders a mermaid diagram from the explanation. mermaid is dynamically
// initialized once and re-rendered on diagram change. we generate a stable
// id per instance so multiple diagrams on the same page do not collide.

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;
const ensureInitialized = () => {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "strict",
    fontFamily: "Inter, system-ui, sans-serif",
    themeVariables: {
      // pull from our design tokens by reading the resolved css color
      // would be ideal, but mermaid needs concrete values. these match
      // the warm-paper palette closely enough to feel native.
      primaryColor: "#fdf3f4",
      primaryTextColor: "#1a1d2b",
      primaryBorderColor: "#c9536b",
      lineColor: "#7a7470",
      secondaryColor: "#eef3f6",
      tertiaryColor: "#f6efe5",
    },
  });
  initialized = true;
};

type Props = {
  source: string;
  // re-render when the underlying explanation changes, even if source is the same string
  cacheKey?: string;
};

export const MermaidDiagram = ({ source, cacheKey }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`);

  useEffect(() => {
    ensureInitialized();
    let cancelled = false;
    setError(null);

    const render = async () => {
      try {
        const { svg } = await mermaid.render(idRef.current, source);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) {
          // mermaid sometimes leaves an error node in the dom; clean it up
          const stray = document.getElementById(idRef.current);
          if (stray) stray.remove();
          setError(e instanceof Error ? e.message : "could not render diagram");
        }
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [source, cacheKey]);

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        could not render the diagram. raw source:
        <pre className="mt-2 overflow-x-auto text-xs">{source}</pre>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex w-full items-center justify-center overflow-x-auto py-2 [&_svg]:max-w-full [&_svg]:h-auto"
    />
  );
};
