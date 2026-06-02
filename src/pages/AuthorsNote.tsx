// author's note. a long-form, personal page about why analogize exists,
// neurodivergence, and the cognitive mechanisms that make analogies work.
// content lives in folded cards that expand inline when clicked.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { MermaidDiagram } from "@/features/analogy/components/MermaidDiagram";
import { cn } from "@/lib/utils";

type Fold = {
  id: string;
  title: string;
  tag: string;
  body: React.ReactNode;
};

const FoldCard = ({ fold, open, onToggle }: { fold: Fold; open: boolean; onToggle: () => void }) => (
  <div className="rounded-2xl border border-border/60 bg-card/60 transition-colors hover:bg-card">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
      aria-expanded={open}
    >
      <div className="flex flex-1 items-baseline gap-3 sm:gap-4">
        <span className="hidden text-xs uppercase tracking-[0.22em] text-muted-foreground sm:inline">
          {fold.tag}
        </span>
        <h3 className="font-serif-display text-xl tracking-tight sm:text-2xl">{fold.title}</h3>
      </div>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
    <div
      className={cn(
        "grid overflow-hidden transition-all duration-300 ease-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0">
        <div className="space-y-4 px-5 pb-6 pt-1 text-foreground/85 leading-relaxed sm:px-6">
          {fold.body}
        </div>
      </div>
    </div>
  </div>
);

const Section = ({
  eyebrow,
  title,
  intro,
  folds,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  folds: Fold[];
}) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section className="mt-16 sm:mt-20">
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mb-4 font-serif-display text-3xl tracking-tight sm:text-4xl">{title}</h2>
      {intro && <div className="mb-6 max-w-2xl text-foreground/80 leading-relaxed">{intro}</div>}
      <div className="space-y-3">
        {folds.map((f) => (
          <FoldCard
            key={f.id}
            fold={f}
            open={openId === f.id}
            onToggle={() => setOpenId(openId === f.id ? null : f.id)}
          />
        ))}
      </div>
    </section>
  );
};

const ownExperience: Fold[] = [
  {
    id: "own-1",
    tag: "01",
    title: "the kid with 37 open tabs",
    body: (
      <>
        <p>
          i was the kid who couldn't read the textbook but could explain the entire plot of a video game's lore to you
          in unprompted detail. school treated that as a defect. i treated it as the only setting my brain had.
        </p>
        <p>
          adhd, for me, is not "can't focus". it is "can't focus on what is asked, but can hyperfocus for six hours on
          something adjacent that feels alive". analogize is, in a real sense, what happens when you build a learning
          tool around that second setting instead of the first.
        </p>
      </>
    ),
  },
  {
    id: "own-2",
    tag: "02",
    title: "the friend explanation problem",
    body: (
      <>
        <p>
          every concept i ever actually learned, i learned because a friend re-told it to me wrong-on-purpose. "okay so
          imagine the mitochondria is the bouncer." it was always sloppy, always a little incorrect, and always the
          thing that made it click.
        </p>
        <p>
          analogize is an attempt to bottle that. not a tutor, not a textbook. the friend who says "wait, it's kind of
          like..." and suddenly the whole shape of the idea is in your hand.
        </p>
      </>
    ),
  },
  {
    id: "own-3",
    tag: "03",
    title: "why i stopped trusting definitions",
    body: (
      <p>
        a definition is a compressed summary written by someone who already understands. it is the worst possible
        starting point for someone who doesn't. it tells you what the idea is called, not what it is. i wanted a tool
        that started where i already was, not where the textbook decided i should be.
      </p>
    ),
  },
];

const mechanisms: Fold[] = [
  {
    id: "m-narrative",
    tag: "mechanism",
    title: "narrativization",
    body: (
      <>
        <p>
          a story is a memory format. it has characters, stakes, and a sequence. drop a fact inside a story and your
          brain files it under "things that happened", not "things i need to memorize". retrieval gets a thousand times
          easier because the surrounding scene comes back with it.
        </p>
        <p>
          analogize leans on this hard. every analogy is, secretly, the opening scene of a tiny story you already know
          how to follow.
        </p>
      </>
    ),
  },
  {
    id: "m-metaphor",
    tag: "mechanism",
    title: "metaphor translation",
    body: (
      <p>
        metaphor is not decoration. it is the actual operation your brain uses to reason about anything abstract.
        "time is money", "argument is war", "ideas are buildings" — these aren't pretty phrasings, they are the
        scaffolds you think inside of. analogize makes that operation explicit and lets you pick the scaffold.
      </p>
    ),
  },
  {
    id: "m-emotional",
    tag: "mechanism",
    title: "emotional anchoring",
    body: (
      <p>
        you remember what you felt. neutral information slides off; charged information sticks. when a concept is
        delivered through something you already love — a game, a relationship dynamic, a recipe you've cooked a
        hundred times — it inherits that emotional weight and your brain treats it as worth keeping.
      </p>
    ),
  },
  {
    id: "m-scaffold",
    tag: "mechanism",
    title: "analogical scaffolding",
    body: (
      <p>
        a scaffold is a temporary structure that lets you build a permanent one. the analogy is the scaffold; the real
        concept is the permanent structure. you don't keep the scaffold forever — but you couldn't have built the
        thing without it. the "where it breaks" section is the moment you take the scaffold down.
      </p>
    ),
  },
  {
    id: "m-compression",
    tag: "mechanism",
    title: "cognitive compression",
    body: (
      <p>
        an unfamiliar concept is a thousand small unknowns at once. compression collapses those thousand into one
        familiar shape you can hold in working memory. "it's a kitchen", "it's a city", "it's a courtroom" — one
        token, fully unpacked on demand.
      </p>
    ),
  },
  {
    id: "m-mapping",
    tag: "mechanism",
    title: "conceptual mapping",
    body: (
      <p>
        mapping is the part most explanations skip. "x is like y" is not enough — your brain needs to know which part
        of x is which part of y, explicitly. analogize forces a mapping table for exactly this reason. the click only
        happens when the parts line up.
      </p>
    ),
  },
  {
    id: "m-simulation",
    tag: "mechanism",
    title: "experiential simulation",
    body: (
      <p>
        understanding feels like simulation. you mentally "run" the idea forward and watch what happens. you can't
        simulate a definition. you can simulate a kitchen, a relationship, a traffic jam. once a concept is wrapped
        in something simulatable, you can poke at it, push on it, and find its edges yourself.
      </p>
    ),
  },
  {
    id: "m-relational",
    tag: "mechanism",
    title: "relational understanding",
    body: (
      <p>
        an idea in isolation is fragile. an idea with neighbors is robust. relational understanding means knowing what
        the concept is like, unlike, made of, used for, derived from. analogies are dense with relations by default,
        which is why a single good one can replace a whole chapter.
      </p>
    ),
  },
  {
    id: "m-bridge",
    tag: "mechanism",
    title: "cognitive bridges",
    body: (
      <p>
        a bridge is the single sentence that connects "the world of the analogy" to "the world of the real concept".
        every explanation in analogize has one, marked with "in other words". it sounds trivial. it is the load-bearing
        beam of the entire format.
      </p>
    ),
  },
  {
    id: "m-anecdote",
    tag: "mechanism",
    title: "personal anecdotes",
    body: (
      <p>
        anecdote is the highest-bandwidth teaching format humans have. it carries fact, context, emotion, and stakes
        in one package. the right anecdote at the right moment will outlast any lecture. i collect them obsessively
        and steal them shamelessly.
      </p>
    ),
  },
  {
    id: "m-mnemonics",
    tag: "mechanism",
    title: "mnemonics",
    body: (
      <p>
        mnemonics are silly on purpose. silliness is sticky. the absurdity of "every good boy deserves fudge" is
        exactly what makes it survive a decade. analogize doesn't formally generate mnemonics, but the analogies
        themselves often act as one — a vivid hook your brain refuses to let go of.
      </p>
    ),
  },
  {
    id: "m-visual",
    tag: "mechanism",
    title: "visual representation",
    body: (
      <p>
        a diagram is a parallel channel. text loads serially; an image loads all at once. the visual step in every
        explanation isn't a flourish — it is a second pass at the same idea through a different sense, and it is
        often the one that actually lands.
      </p>
    ),
  },
];

const educational: Fold[] = [
  {
    id: "edu-1",
    tag: "diagnosis",
    title: "definitions before intuition",
    body: (
      <p>
        almost every curriculum opens with the formal definition. for the small group that already half-knows the
        idea, this is efficient. for everyone else, it is a wall. intuition has to come first; the definition is what
        you write down after you already understand, not before.
      </p>
    ),
  },
  {
    id: "edu-2",
    tag: "diagnosis",
    title: "one shape of brain, graded",
    body: (
      <p>
        school grades a very narrow band of cognition: sit still, read linearly, recall on demand, regurgitate in
        prose. anything outside that band — associative thinkers, visual thinkers, story-first thinkers, hyperfocus
        thinkers — gets labeled as a problem with the student instead of a mismatch with the format.
      </p>
    ),
  },
  {
    id: "edu-3",
    tag: "diagnosis",
    title: "coverage over click",
    body: (
      <p>
        curricula optimize for coverage: "we got through chapter 12". they rarely optimize for the moment a student
        actually understands. the result is years of nominal exposure to ideas no one ever truly internalized — known
        in name, unknown in substance.
      </p>
    ),
  },
  {
    id: "edu-4",
    tag: "diagnosis",
    title: "no honest 'where it breaks'",
    body: (
      <p>
        analogies are used constantly in classrooms and almost never bounded. students walk away believing the
        analogy is the thing. atoms are not little solar systems, electricity is not water, the brain is not a
        computer. the honest "this is where the analogy stops working" is the missing half of every good explanation.
      </p>
    ),
  },
  {
    id: "edu-5",
    tag: "diagnosis",
    title: "shame as a teaching tool",
    body: (
      <p>
        "you should already know this" is the default failure mode of formal education. it teaches people that not
        understanding is embarrassing, which teaches them to fake understanding, which teaches them to never go back
        and actually learn it. analogize is meant to be the opposite of a room you can be embarrassed in.
      </p>
    ),
  },
];

const neurodivergence: Fold[] = [
  {
    id: "nd-1",
    tag: "adhd",
    title: "interest, not discipline",
    body: (
      <p>
        the adhd brain runs on interest, not willpower. you don't focus harder; you make the thing more interesting
        and then the focus shows up for free. analogies are an interest-injection device. they smuggle dry concepts
        into shapes the brain already wants to engage with.
      </p>
    ),
  },
  {
    id: "nd-2",
    tag: "autism",
    title: "pattern-first cognition",
    body: (
      <p>
        a lot of autistic thinkers describe understanding as snapping a new piece into an existing pattern. analogize
        is built around exactly that move: pick the system you already have the pattern for, then translate the new
        idea into it. nothing is wasted; the pattern library is the whole point.
      </p>
    ),
  },
  {
    id: "nd-3",
    tag: "dyslexia",
    title: "story over text",
    body: (
      <p>
        for dyslexic readers, dense paragraphs are friction. story, image, and structured visuals are not. the
        five-part format isn't accidental — it is a deliberate set of footholds that don't require you to read a wall
        of prose to find the idea inside it.
      </p>
    ),
  },
  {
    id: "nd-4",
    tag: "general",
    title: "not a deficit, a different index",
    body: (
      <p>
        neurodivergent brains are not broken neurotypical brains. they are differently indexed — retrieval works by
        association, emotion, story, structure, rather than by date or chapter. a tool that respects that index
        doesn't have to "accommodate" anyone. it just works the way the brain already works.
      </p>
    ),
  },
];

const anecdotes: Fold[] = [
  {
    id: "a-1",
    tag: "anecdote",
    title: "the recursion that finally clicked",
    body: (
      <p>
        i didn't understand recursion until a friend said "it's a russian doll opening itself". i had been staring at
        factorial code for weeks. one sentence, one image, and the whole thing reorganized itself in my head in about
        four seconds. i never had to look it up again.
      </p>
    ),
  },
  {
    id: "a-2",
    tag: "anecdote",
    title: "the dns waiter",
    body: (
      <p>
        someone once explained dns to me as "you ask the waiter for a table, the waiter asks the host, the host
        checks the book, the book has a number, the number is your table". i have never needed another dns
        explanation. it's a restaurant. that's it. that's the whole protocol.
      </p>
    ),
  },
  {
    id: "a-3",
    tag: "anecdote",
    title: "the closure as a backpack",
    body: (
      <p>
        a closure is a function that took a backpack with it when it left the room. the backpack still has all the
        variables it grew up with. years of mdn pages, one sentence to actually understand it. analogize is, in a
        sense, an attempt to make that sentence happen on demand for any concept.
      </p>
    ),
  },
];

const diagrams: Fold[] = [
  {
    id: "d-1",
    tag: "diagram",
    title: "how a definition-first explanation fails",
    body: (
      <>
        <p>
          you arrive at a new concept with no foothold. the definition hands you more abstract words. each unknown
          word becomes a new unknown concept. the loop never grounds.
        </p>
        <MermaidDiagram
          cacheKey="d-1"
          source={`flowchart TD
  A[new concept] --> B[formal definition]
  B --> C[unfamiliar term 1]
  B --> D[unfamiliar term 2]
  B --> E[unfamiliar term 3]
  C --> F[look up]
  D --> F
  E --> F
  F --> B
  F --> G[give up / fake it]`}
        />
      </>
    ),
  },
  {
    id: "d-2",
    tag: "diagram",
    title: "how an analogy-first explanation lands",
    body: (
      <>
        <p>
          the analogy gives your brain something to stand on. the mapping makes the parts explicit. the bridge sentence
          flips you across into the real concept. the "where it breaks" line stops you from over-trusting the analogy.
        </p>
        <MermaidDiagram
          cacheKey="d-2"
          source={`flowchart LR
  A[familiar system] --> B[analogy]
  B --> C[mapping table]
  C --> D[visual]
  D --> E[bridge: 'in other words']
  E --> F[real concept]
  F --> G[where it breaks]
  G --> H[honest understanding]`}
        />
      </>
    ),
  },
  {
    id: "d-3",
    tag: "diagram",
    title: "the knowledge graph in my head",
    body: (
      <>
        <p>
          this is how i actually retrieve. concepts aren't stored by name; they hang off clusters of feeling, story,
          and structure. a good analogy attaches a new node to the right cluster, and from then on it's just there.
        </p>
        <MermaidDiagram
          cacheKey="d-3"
          source={`graph TD
  ROOT(("self")) --> games[games]
  ROOT --> cooking[cooking]
  ROOT --> stories[stories]
  ROOT --> systems[systems]
  games --> rpg[rpg mechanics]
  games --> speedrun[speedrunning]
  cooking --> mise[mise en place]
  stories --> arc[character arcs]
  systems --> feedback[feedback loops]
  rpg -.->|new node| concept1((recursion))
  mise -.->|new node| concept2((dependency injection))
  feedback -.->|new node| concept3((monetary policy))`}
        />
      </>
    ),
  },
  {
    id: "d-4",
    tag: "diagram",
    title: "the five-part explanation, as a pipeline",
    body: (
      <>
        <p>
          the format isn't a template. it's a sequence of operations. each step does a different cognitive job, and
          skipping any one of them noticeably weakens the click.
        </p>
        <MermaidDiagram
          cacheKey="d-4"
          source={`sequenceDiagram
  participant U as you
  participant A as analogize
  U->>A: a concept i don't get
  A->>U: 1. analogy (hook)
  A->>U: 2. mapping (pairs)
  A->>U: 3. visual (parallel channel)
  A->>U: 4. bridge ('in other words')
  A->>U: 5. real explanation
  A->>U: 6. where it breaks
  U-->>A: click.`}
        />
      </>
    ),
  },
  {
    id: "d-5",
    tag: "diagram",
    title: "interest, attention, retention (adhd version)",
    body: (
      <>
        <p>
          the loop most curricula assume: discipline → attention → retention. the loop my brain actually runs:
          interest → attention → retention. analogies sit at the start of the second loop on purpose.
        </p>
        <MermaidDiagram
          cacheKey="d-5"
          source={`flowchart LR
  subgraph assumed[what school assumes]
    direction LR
    D[discipline] --> AT1[attention] --> R1[retention]
  end
  subgraph actual[what actually happens]
    direction LR
    I[interest] --> AT2[attention] --> R2[retention] --> I
  end
  AN[analogy] --> I`}
        />
      </>
    ),
  },
];



const AuthorsNote = () => {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <article className="container max-w-3xl py-16 sm:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">author's note</p>
        <h1 className="mb-6 font-serif-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          a long letter about why this exists.
        </h1>
        <p className="max-w-2xl text-lg text-foreground/80 leading-relaxed">
          analogize is not a neutral product. it is a tool built by a specific brain, for brains that work the same
          way it does. this page is the long version of why. tap any card to unfold it.
        </p>

        <Section
          eyebrow="part one"
          title="my own experience"
          intro={
            <p>
              context first. why a tool like this had to come out of a brain like mine, and what i was reaching for
              when i started building it.
            </p>
          }
          folds={ownExperience}
        />

        <Section
          eyebrow="part two"
          title="analogize and neurodivergence"
          intro={
            <p>
              this is not a product "for" neurodivergent people in a tokenistic way. it is just a product designed
              around how associative, pattern-first, story-first brains actually retrieve and store information —
              which turns out to help almost everyone.
            </p>
          }
          folds={neurodivergence}
        />

        <Section
          eyebrow="part three"
          title="the mechanisms that actually work"
          intro={
            <p>
              twelve cognitive moves the brain already makes, every day, to understand new things. analogize is, more
              or less, a tool that just gets out of their way.
            </p>
          }
          folds={mechanisms}
        />

        <Section
          eyebrow="part four"
          title="what's broken in the current educational environment"
          intro={
            <p>
              none of this would matter if school were already doing it. it isn't. here is the honest diagnosis,
              without the polite hedging.
            </p>
          }
          folds={educational}
        />

        <Section
          eyebrow="part five"
          title="personal anecdotes"
          intro={
            <p>
              a few moments where one sentence from a friend did what a year of formal study couldn't. these are the
              shape of explanation analogize is trying to make routine.
            </p>
          }
          folds={anecdotes}
        />

        <Section
          eyebrow="part six"
          title="the same idea, drawn"
          intro={
            <p>
              some of this is easier to see than to read. each card unfolds into a small diagram. nothing fancy —
              just the same arguments above, in shapes.
            </p>
          }
          folds={diagrams}
        />



        <aside className="mt-20 rounded-2xl border border-border/60 bg-secondary/30 p-7 sm:p-9">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">closing</p>
          <h2 className="mb-4 font-serif-display text-3xl tracking-tight">if any of this resonated.</h2>
          <p className="text-foreground/85 leading-relaxed">
            you are probably someone analogize was built for. don't take my word for it — open the app, type a
            concept you've bounced off of for years, and pick a system you already trust. if it clicks, that's the
            whole product working as intended.
          </p>
        </aside>

        <Link
          to="/app"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          try analogize
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>

      <SiteFooter />
    </div>
  );
};

export default AuthorsNote;
