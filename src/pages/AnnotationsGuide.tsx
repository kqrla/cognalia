// annotations-guide page. living reference for the editorial annotation
// classes defined in src/styles/annotation.css. shows every highlight,
// underline, text style, and external link variant with a live example
// and the exact html snippet to copy.

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

type Row = {
  className: string;
  feel: string;
  use: string;
  sample: React.ReactNode;
};

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-[0.78em] text-foreground/90">
    {children}
  </code>
);

const Block = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-xl border border-border/60 bg-secondary/30 p-4 text-xs leading-relaxed text-foreground/85">
    <code className="font-mono">{children}</code>
  </pre>
);

const Table = ({ rows }: { rows: Row[] }) => (
  <div className="overflow-hidden rounded-2xl border border-border/60">
    <table className="w-full text-sm">
      <thead className="bg-secondary/40 text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <tr>
          <th className="px-4 py-3 font-normal">class</th>
          <th className="px-4 py-3 font-normal">feel</th>
          <th className="px-4 py-3 font-normal">use for</th>
          <th className="px-4 py-3 font-normal">sample</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.className} className={i % 2 ? "bg-card/40" : ""}>
            <td className="px-4 py-3 align-top"><Code>{r.className}</Code></td>
            <td className="px-4 py-3 align-top text-foreground/80">{r.feel}</td>
            <td className="px-4 py-3 align-top text-foreground/80">{r.use}</td>
            <td className="px-4 py-3 align-top">{r.sample}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const highlights: Row[] = [
  { className: "a-hl a-hl-yellow", feel: "warm, attentional", use: "primary emphasis, main ideas", sample: <span className="a-hl a-hl-yellow">main idea</span> },
  { className: "a-hl a-hl-sage", feel: "ecological, grounded", use: "systems, nature, process", sample: <span className="a-hl a-hl-sage">a feedback loop</span> },
  { className: "a-hl a-hl-blue", feel: "coolly analytical", use: "definitions, key terms", sample: <span className="a-hl a-hl-blue">a closure</span> },
  { className: "a-hl a-hl-pink", feel: "tender, uncertain", use: "speculation, soft hypotheses", sample: <span className="a-hl a-hl-pink">possibly</span> },
  { className: "a-hl a-hl-orange", feel: "urgent, not aggressive", use: "warnings, time-sensitive notes", sample: <span className="a-hl a-hl-orange">deprecated soon</span> },
  { className: "a-hl a-hl-gray", feel: "the quietest highlight", use: "asides, caveats", sample: <span className="a-hl a-hl-gray">side note</span> },
];

const underlines: Row[] = [
  { className: "a-u a-u-solid", feel: "firm editorial mark", use: "no ambiguity, this is the point", sample: <span className="a-u a-u-solid">solid claim</span> },
  { className: "a-u a-u-wavy", feel: "uncertainty", use: "flag this, might be wrong", sample: <span className="a-u a-u-wavy">might be wrong</span> },
  { className: "a-u a-u-dashed", feel: "defer", use: "come back to this later", sample: <span className="a-u a-u-dashed">come back later</span> },
  { className: "a-u a-u-dotted", feel: "a whisper", use: "the quietest signal", sample: <span className="a-u a-u-dotted">faintest note</span> },
];

const weights: Row[] = [
  { className: "a-u-w1", feel: "hairline", use: "barely there", sample: <span className="a-u a-u-solid a-u-w1">w1</span> },
  { className: "a-u-w2", feel: "default", use: "everyday underline", sample: <span className="a-u a-u-solid a-u-w2">w2</span> },
  { className: "a-u-w3", feel: "firmer", use: "harder emphasis", sample: <span className="a-u a-u-solid a-u-w3">w3</span> },
  { className: "a-u-w4", feel: "marker stroke", use: "shouldering real weight", sample: <span className="a-u a-u-solid a-u-w4">w4</span> },
];

const styles: Row[] = [
  { className: "a-b", feel: "semibold", use: "in-line emphasis", sample: <span className="a-b">semibold</span> },
  { className: "a-bb", feel: "heavier bold", use: "stronger in-line stress", sample: <span className="a-bb">heavier</span> },
  { className: "a-i", feel: "italic", use: "titles, foreign terms, voice", sample: <span className="a-i">italic</span> },
];

const AnnotationsGuide = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">reference</p>
        <h1 className="mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          the annotations guide.
        </h1>
        <p className="max-w-2xl text-lg text-foreground/80 leading-relaxed">
          every editorial mark available on the marketing and content pages. these are plain css classes you can{" "}
          <span className="a-hl a-hl-yellow">stack inline</span> to make text look like it has been{" "}
          <span className="a-u a-u-wavy">marked up by hand</span> on cream paper. nothing here is a component — just
          spans with classes.
        </p>

        <section className="mt-14">
          <h2 className="mb-3 font-serif-display text-3xl tracking-tight">how to use</h2>
          <p className="mb-4 text-foreground/85 leading-relaxed">
            wrap any inline content in a <Code>{`<span>`}</Code> and apply the classes. classes are composable —
            highlight + underline + bold can all live on the same element.
          </p>
          <Block>{`<p>
  before you can explain something simply,
  <span class="a-hl a-hl-yellow a-b">you need a simple place to stand</span>.
  the rest of the path
  <span class="a-u a-u-wavy">might be wrong</span>,
  but this part is
  <span class="a-u a-u-solid a-u-w3">solid</span>.
</p>`}</Block>
          <div className="mt-4 rounded-2xl border border-border/60 bg-card/60 p-5 text-foreground/85 leading-relaxed">
            <p>
              before you can explain something simply,{" "}
              <span className="a-hl a-hl-yellow a-b">you need a simple place to stand</span>. the rest of the path{" "}
              <span className="a-u a-u-wavy">might be wrong</span>, but this part is{" "}
              <span className="a-u a-u-solid a-u-w3">solid</span>.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">01</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">highlights</h2>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            soft marker strokes. base class is <Code>a-hl</Code>, then add a color modifier. they wrap cleanly across
            line breaks and feel like a real highlighter on paper rather than a flat block of color.
          </p>
          <Table rows={highlights} />
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">02</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">underlines</h2>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            base class <Code>a-u</Code>, then pick a style and optionally a weight. styles encode meaning, weights
            encode loudness.
          </p>
          <Table rows={underlines} />

          <h3 className="mb-3 mt-8 font-serif-display text-xl tracking-tight">underline weights</h3>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            weight is independent of style — apply any weight to any style.
          </p>
          <Table rows={weights} />
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">03</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">text styles</h2>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            small in-line voice modifiers. use them sparingly; they read loudest when they are rare.
          </p>
          <Table rows={styles} />
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">04</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">external links</h2>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            use <Code>a-ext</Code> on an anchor. it adds a wavy underline and a small superscript arrow to signal a
            departure from the page.
          </p>
          <Block>{`<a class="a-ext" href="https://en.wikipedia.org/wiki/Hypertext" target="_blank" rel="noreferrer">
  ted nelson on hypertext
</a>`}</Block>
          <div className="mt-4 rounded-2xl border border-border/60 bg-card/60 p-5 text-foreground/85 leading-relaxed">
            see also{" "}
            <a
              className="a-ext"
              href="https://en.wikipedia.org/wiki/Hypertext"
              target="_blank"
              rel="noreferrer"
            >
              ted nelson on hypertext
            </a>{" "}
            for the original framing.
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">05</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">composition recipes</h2>
          <p className="mb-5 max-w-2xl text-foreground/80 leading-relaxed">
            classes stack. these are the combinations that earn their keep on the marketing pages.
          </p>

          <div className="space-y-5">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">primary claim</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                this is{" "}
                <span className="a-hl a-hl-yellow a-b">the actual point of the paragraph</span>, and you should not
                miss it.
              </p>
              <Code>{`a-hl a-hl-yellow a-b`}</Code>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">soft hypothesis</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                <span className="a-hl a-hl-pink a-i">this might be the real reason</span>, but i wouldn't bet a
                career on it.
              </p>
              <Code>{`a-hl a-hl-pink a-i`}</Code>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">flagged uncertainty</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                the data says one thing, but{" "}
                <span className="a-u a-u-wavy">the methodology is suspect</span>.
              </p>
              <Code>{`a-u a-u-wavy`}</Code>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">key term</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                a <span className="a-hl a-hl-blue a-b">closure</span> is a function that took a backpack with it
                when it left the room.
              </p>
              <Code>{`a-hl a-hl-blue a-b`}</Code>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">quiet aside</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                most readers can skip this, but{" "}
                <span className="a-hl a-hl-gray a-i">there is a small caveat worth knowing</span>.
              </p>
              <Code>{`a-hl a-hl-gray a-i`}</Code>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">load-bearing</p>
              <p className="mb-3 text-foreground/85 leading-relaxed">
                everything else in this section{" "}
                <span className="a-u a-u-solid a-u-w4 a-bb">depends on this one sentence</span>.
              </p>
              <Code>{`a-u a-u-solid a-u-w4 a-bb`}</Code>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">06</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">scope &amp; rules</h2>
          <ul className="ml-5 list-disc space-y-2 text-foreground/85 leading-relaxed">
            <li>
              <span className="a-b">where to use:</span> <Code>/</Code>, <Code>/about</Code>, <Code>/features</Code>,{" "}
              <Code>/faq</Code>, <Code>/goals</Code>, <Code>/mechanisms</Code>, <Code>/philosophy</Code>,{" "}
              <Code>/roadmap</Code> — anything in the editorial / marketing surface.
            </li>
            <li>
              <span className="a-b">where not to use:</span> anything inside <Code>/app</Code>,{" "}
              <Code>/explain</Code>, <Code>/graph</Code>, <Code>/history</Code>. the app shell has its own visual
              language and these marks would clash.
            </li>
            <li>
              <span className="a-b">don't duplicate the css.</span> the file{" "}
              <Code>src/styles/annotation.css</Code> is loaded globally from <Code>src/main.tsx</Code>. just use the
              classes.
            </li>
            <li>
              <span className="a-b">to add a new color or style:</span> extend the css file with a new modifier.
              keep the naming convention — <Code>a-hl-&lt;name&gt;</Code> for highlights,{" "}
              <Code>a-u-&lt;name&gt;</Code> for underline variants. always use hsl tokens, never raw hex.
            </li>
            <li>
              <span className="a-b">restraint.</span> a page covered in highlights reads like none of it matters.
              the marks earn their weight by being rare.
            </li>
          </ul>
        </section>

        <Link
          to="/app"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          try analogize
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <SiteFooter />
    </div>
  );
};

export default AnnotationsGuide;
