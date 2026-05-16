// /substrate/app - the actual substrate tool. add nodes, soft-link
// them, watch threads emerge, get a structural summary.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Link2,
  Trash2,
  Sparkles,
  X,
  Eraser,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SubstrateCanvas } from "@/features/substrate/SubstrateCanvas";
import {
  addEdge,
  addNode,
  clearAll,
  computeThreads,
  nodeDegree,
  removeEdge,
  removeNode,
  useSubstrate,
  type SubstrateKind,
} from "@/features/substrate/store";

const kindOptions: { id: SubstrateKind; label: string }[] = [
  { id: "interest", label: "interest" },
  { id: "project", label: "project" },
  { id: "concept", label: "concept" },
  { id: "field", label: "field" },
  { id: "skill", label: "skill" },
  { id: "question", label: "question" },
];

const SubstrateApp = () => {
  const { nodes, edges } = useSubstrate();
  const [label, setLabel] = useState("");
  const [kind, setKind] = useState<SubstrateKind>("interest");
  const [note, setNote] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [linkingFrom, setLinkingFrom] = useState<string | null>(null);
  const [edgeReason, setEdgeReason] = useState("");

  const selected = nodes.find((n) => n.id === selectedId) ?? null;

  const threads = useMemo(() => computeThreads({ nodes, edges }), [nodes, edges]);

  const kindCounts = useMemo(() => {
    const c: Record<string, number> = {};
    nodes.forEach((n) => {
      c[n.kind] = (c[n.kind] ?? 0) + 1;
    });
    return c;
  }, [nodes]);

  const topNodes = useMemo(
    () =>
      [...nodes]
        .map((n) => ({ n, d: nodeDegree(n.id, edges) }))
        .sort((a, b) => b.d - a.d)
        .slice(0, 5)
        .filter((x) => x.d > 0),
    [nodes, edges],
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const created = addNode({ label, kind, note });
    setLabel("");
    setNote("");
    setSelectedId(created.id);
  };

  const handleLinkClick = (id: string) => {
    if (!linkingFrom) return;
    if (linkingFrom === id) {
      setLinkingFrom(null);
      return;
    }
    addEdge(linkingFrom, id, edgeReason || undefined);
    setLinkingFrom(null);
    setEdgeReason("");
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="container max-w-6xl py-8 sm:py-10">
        <Link
          to="/substrate"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          about substrate
        </Link>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              your substrate
            </p>
            <h1 className="font-serif-display text-3xl tracking-tight sm:text-4xl">
              map the structures underneath your interests
            </h1>
            <p className="mt-2 max-w-prose text-sm text-foreground/70">
              add interests, projects, concepts. soft-link them by association.
              threads emerge.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            {nodes.length} node{nodes.length === 1 ? "" : "s"} · {edges.length}{" "}
            link{edges.length === 1 ? "" : "s"} · {threads.length} thread
            {threads.length === 1 ? "" : "s"}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* left: canvas + add form */}
          <div className="space-y-4">
            <SubstrateCanvas
              nodes={nodes}
              edges={edges}
              selectedId={selectedId}
              linkingFrom={linkingFrom}
              onSelect={setSelectedId}
              onLinkClick={handleLinkClick}
            />

            <form
              onSubmit={handleAdd}
              className="surface-paper flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="add an interest, project, concept…"
                className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm outline-none focus:border-foreground/40"
              />
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as SubstrateKind)}
                className="rounded-full border border-border bg-background/60 px-3 py-2 text-sm outline-none"
              >
                {kindOptions.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                add
              </button>
            </form>

            {nodes.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[11px] text-muted-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  {kindOptions.map((k) => (
                    <span key={k.id} className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: {
                            interest: "#d9b67a",
                            project: "#7aa6d9",
                            concept: "#b39ddb",
                            field: "#a3b18a",
                            skill: "#e0a07a",
                            question: "#d98aa6",
                          }[k.id],
                        }}
                      />
                      {k.label} {kindCounts[k.id] ? `(${kindCounts[k.id]})` : ""}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("clear the whole substrate?")) clearAll();
                  }}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Eraser className="h-3 w-3" />
                  clear all
                </button>
              </div>
            )}
          </div>

          {/* right: side panel */}
          <aside className="space-y-4">
            {selected ? (
              <div className="surface-paper p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {selected.kind}
                    </p>
                    <p className="font-serif-display text-xl">{selected.label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {selected.note && (
                  <p className="mt-1 text-sm text-foreground/75">{selected.note}</p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  {nodeDegree(selected.id, edges)} connection
                  {nodeDegree(selected.id, edges) === 1 ? "" : "s"}
                </p>

                <div className="mt-4 space-y-2">
                  {linkingFrom === selected.id ? (
                    <>
                      <input
                        type="text"
                        value={edgeReason}
                        onChange={(e) => setEdgeReason(e.target.value)}
                        placeholder="reason for the link (optional)"
                        className="w-full rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs outline-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        click another node on the canvas to link.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setLinkingFrom(null);
                          setEdgeReason("");
                        }}
                        className="w-full rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary/60"
                      >
                        cancel link
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLinkingFrom(selected.id)}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary/60"
                    >
                      <Link2 className="h-3 w-3" />
                      link to another node
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`delete "${selected.label}"?`)) {
                        removeNode(selected.id);
                        setSelectedId(null);
                      }
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                    delete node
                  </button>
                </div>

                {/* links list */}
                {edges.filter((e) => e.from === selected.id || e.to === selected.id).length > 0 && (
                  <div className="mt-5 space-y-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      links
                    </p>
                    {edges
                      .filter((e) => e.from === selected.id || e.to === selected.id)
                      .map((e) => {
                        const otherId = e.from === selected.id ? e.to : e.from;
                        const other = nodes.find((n) => n.id === otherId);
                        if (!other) return null;
                        return (
                          <div
                            key={e.id}
                            className="flex items-start justify-between gap-2 rounded-lg border border-border/60 bg-secondary/40 p-2 text-xs"
                          >
                            <div>
                              <button
                                type="button"
                                onClick={() => setSelectedId(other.id)}
                                className="font-medium hover:underline"
                              >
                                {other.label}
                              </button>
                              {e.reason && (
                                <p className="mt-0.5 text-muted-foreground">{e.reason}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeEdge(e.id)}
                              className="text-muted-foreground hover:text-foreground"
                              aria-label="remove link"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                )}

                <textarea
                  value={selected.note ?? ""}
                  onChange={(e) => {
                    // re-add with same id is tricky; instead we let users
                    // re-create. for now this is read-only-ish - keep editing
                    // out of v1.
                  }}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="surface-paper p-5 text-sm text-foreground/75">
                <p className="font-serif-display text-base">getting started</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-foreground/70">
                  <li>add a few interests, projects or concepts.</li>
                  <li>click a node, then "link" to soft-connect it to another.</li>
                  <li>threads form as connections appear.</li>
                </ol>
              </div>
            )}

            {/* threads / pattern summary */}
            <div className="surface-paper p-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  threads detected
                </p>
              </div>
              {threads.length === 0 ? (
                <p className="text-xs text-foreground/70">
                  no threads yet. link two or more nodes and patterns will start
                  appearing here.
                </p>
              ) : (
                <ul className="space-y-2">
                  {threads.map((t, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border/60 bg-secondary/40 p-2 text-xs"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        thread {i + 1} · {t.length} nodes
                      </p>
                      <p className="mt-0.5 leading-relaxed text-foreground/85">
                        {t.map((n) => n.label).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* load-bearing nodes */}
            {topNodes.length > 0 && (
              <div className="surface-paper p-5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  load-bearing nodes
                </p>
                <p className="mt-0.5 text-xs text-foreground/65">
                  the most-connected anchors in your map.
                </p>
                <ul className="mt-2 space-y-1.5">
                  {topNodes.map(({ n, d }) => (
                    <li key={n.id} className="flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedId(n.id)}
                        className="font-medium hover:underline"
                      >
                        {n.label}
                      </button>
                      <span className="text-muted-foreground">{d} links</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SubstrateApp;
