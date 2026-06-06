// subjects + subsubjects catalog. used by /subjects and
// /subject/:subject(/:sub) routes to advertise the domains analogize
// covers and the angles within each one. content is intentionally
// declarative so the routes stay thin.

export type SubSubject = {
  slug: string;
  name: string;
  blurb: string;
  hooks: string[]; // representative concepts/questions
  angles: string[]; // analogy angles we like to take here
};

export type Subject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string; // tailwind class fragment
  subs: SubSubject[];
};

export const subjects: Subject[] = [
  {
    slug: "math",
    name: "mathematics",
    tagline: "structure, pattern, proof.",
    description:
      "math is where analogy actually earns its keep - the same shape recurs across geometry, algebra, and analysis, and naming that shape is half the insight.",
    accent: "bg-system-1/30 border-system-1/50",
    subs: [
      {
        slug: "algebra",
        name: "algebra",
        blurb: "symbols standing in for quantities, then for structures, then for whole systems.",
        hooks: ["groups", "rings", "linear maps", "polynomial factoring", "modular arithmetic"],
        angles: ["machines with knobs", "trades between currencies", "rules of a board game"],
      },
      {
        slug: "calculus",
        name: "calculus",
        blurb: "the language of change, accumulation, and limits.",
        hooks: ["derivatives", "integrals", "series", "vector fields", "epsilon-delta"],
        angles: ["zooming in on a curve", "filling a bathtub", "instantaneous speed"],
      },
      {
        slug: "statistics",
        name: "statistics",
        blurb: "reasoning under uncertainty without pretending it's gone.",
        hooks: ["bayes", "p-values", "regression", "bootstrapping", "power"],
        angles: ["weather forecasts", "courtroom evidence", "tasting a soup"],
      },
      {
        slug: "geometry",
        name: "geometry",
        blurb: "shape, distance, and how spaces bend.",
        hooks: ["manifolds", "curvature", "topology", "isometries", "non-euclidean"],
        angles: ["rubber sheets", "folding paper", "walking on a globe"],
      },
      {
        slug: "number-theory",
        name: "number theory",
        blurb: "the surprisingly strange behavior of the integers.",
        hooks: ["primes", "modular arithmetic", "diophantine equations", "rsa"],
        angles: ["clocks", "lockboxes", "atoms of multiplication"],
      },
    ],
  },
  {
    slug: "chemistry",
    name: "chemistry",
    tagline: "matter, and what it does when nobody's looking.",
    description:
      "chemistry is where intuition fights scale - we want to feel what a molecule does, but molecules don't have feelings. analogies bridge the gap.",
    accent: "bg-system-2/30 border-system-2/50",
    subs: [
      {
        slug: "organic",
        name: "organic chemistry",
        blurb: "carbon, and the games it plays.",
        hooks: ["functional groups", "stereochemistry", "reaction mechanisms", "aromaticity"],
        angles: ["lego connectors", "left vs right hands", "dance choreography"],
      },
      {
        slug: "toxicology",
        name: "toxicology",
        blurb: "dose, exposure, mechanism, and why everything is poisonous at some level.",
        hooks: ["LD50", "bioaccumulation", "receptor binding", "metabolism pathways"],
        angles: ["keys in locks", "traffic at a bridge", "saturation of a sponge"],
      },
      {
        slug: "biochemistry",
        name: "biochemistry",
        blurb: "the wet machinery of being alive.",
        hooks: ["enzymes", "atp", "krebs cycle", "protein folding"],
        angles: ["factory assembly lines", "currency exchange", "origami"],
      },
      {
        slug: "physical",
        name: "physical chemistry",
        blurb: "thermodynamics and kinetics, applied to atoms.",
        hooks: ["entropy", "free energy", "rate laws", "phase diagrams"],
        angles: ["shuffled decks", "downhill paths", "traffic flow"],
      },
    ],
  },
  {
    slug: "biology",
    name: "biology",
    tagline: "systems that maintain themselves.",
    description:
      "every level - molecules, cells, organisms, ecosystems - is a system holding itself together against entropy. analogies move between the levels.",
    accent: "bg-system-3/30 border-system-3/50",
    subs: [
      {
        slug: "genetics",
        name: "genetics",
        blurb: "inheritance, expression, and how a string of letters becomes a body.",
        hooks: ["alleles", "transcription", "epigenetics", "linkage", "crispr"],
        angles: ["recipe cards", "library indexes", "find-and-replace"],
      },
      {
        slug: "neuroscience",
        name: "neuroscience",
        blurb: "the brain as wet computation - and what that metaphor gets wrong.",
        hooks: ["action potentials", "neuroplasticity", "default mode network", "synaptic pruning"],
        angles: ["wiring diagrams", "footpaths through a forest", "orchestra rehearsals"],
      },
      {
        slug: "ecology",
        name: "ecology",
        blurb: "who eats whom, and what the budget looks like.",
        hooks: ["trophic levels", "keystone species", "succession", "carrying capacity"],
        angles: ["economies", "supply chains", "small towns"],
      },
      {
        slug: "evolution",
        name: "evolution",
        blurb: "iterated selection, no designer required.",
        hooks: ["selection pressure", "drift", "fitness landscapes", "speciation"],
        angles: ["a/b testing", "hill climbing", "remix culture"],
      },
    ],
  },
  {
    slug: "physics",
    name: "physics",
    tagline: "the rules underneath the rules.",
    description:
      "physics rewards intuition pumps - feynman built half his career on them. these are the angles we reach for most often.",
    accent: "bg-system-4/30 border-system-4/50",
    subs: [
      {
        slug: "mechanics",
        name: "classical mechanics",
        blurb: "forces, motion, and the things newton could have explained at a dinner party.",
        hooks: ["momentum", "energy", "rotation", "oscillation"],
        angles: ["pushing carts", "playground swings", "billiards"],
      },
      {
        slug: "quantum",
        name: "quantum mechanics",
        blurb: "where intuition breaks and analogy has to do the heavy lifting.",
        hooks: ["superposition", "entanglement", "wavefunction collapse", "tunneling"],
        angles: ["coin spinning mid-air", "two-slit at the beach", "borrowing money"],
      },
      {
        slug: "thermodynamics",
        name: "thermodynamics",
        blurb: "heat, work, and the arrow of time.",
        hooks: ["entropy", "carnot cycles", "free energy", "phase transitions"],
        angles: ["shuffled cards", "ice cubes melting", "engines as middlemen"],
      },
      {
        slug: "relativity",
        name: "relativity",
        blurb: "space and time as one stretchy fabric.",
        hooks: ["time dilation", "spacetime curvature", "light cones", "frames of reference"],
        angles: ["trains and platforms", "rubber sheets", "swimming in syrup"],
      },
    ],
  },
  {
    slug: "computer-science",
    name: "computer science",
    tagline: "thinking about thinking, but mechanically.",
    description:
      "cs has the rare property that the analogies (stacks, trees, queues, gardens) became the literal vocabulary. we love it for that.",
    accent: "bg-system-5/30 border-system-5/50",
    subs: [
      {
        slug: "algorithms",
        name: "algorithms",
        blurb: "recipes with cost.",
        hooks: ["big-o", "recursion", "graph search", "dynamic programming"],
        angles: ["sorting laundry", "phone book search", "remembering the answer"],
      },
      {
        slug: "machine-learning",
        name: "machine learning",
        blurb: "fitting curves to data, then pretending the curve understands the data.",
        hooks: ["gradient descent", "overfitting", "transformers", "regularization"],
        angles: ["hill descent in fog", "memorizing vs studying", "attention as spotlight"],
      },
      {
        slug: "systems",
        name: "systems",
        blurb: "how the parts of a computer keep their promises to each other.",
        hooks: ["concurrency", "caches", "memory hierarchy", "distributed consensus"],
        angles: ["kitchen brigades", "library hold shelves", "voting at the office"],
      },
      {
        slug: "cryptography",
        name: "cryptography",
        blurb: "math that lets strangers share secrets.",
        hooks: ["public key", "hashing", "zero knowledge", "elliptic curves"],
        angles: ["padlocked mailboxes", "fingerprints", "showing without telling"],
      },
    ],
  },
  {
    slug: "economics",
    name: "economics",
    tagline: "how groups of people allocate things they can't all have.",
    description:
      "economics is a soft science with hard math bolted on - the trick is keeping the analogies honest about which is which.",
    accent: "bg-system-6/30 border-system-6/50",
    subs: [
      {
        slug: "micro",
        name: "microeconomics",
        blurb: "individuals, firms, prices.",
        hooks: ["supply and demand", "elasticity", "marginal cost", "externalities"],
        angles: ["farmers' market haggling", "tipping points", "sharing a pizza"],
      },
      {
        slug: "macro",
        name: "macroeconomics",
        blurb: "the whole economy as one weird machine.",
        hooks: ["inflation", "monetary policy", "gdp", "business cycles"],
        angles: ["plumbing systems", "thermostats", "tides"],
      },
      {
        slug: "behavioral",
        name: "behavioral economics",
        blurb: "what happens when you put real humans in the model.",
        hooks: ["loss aversion", "anchoring", "nudges", "hyperbolic discounting"],
        angles: ["default options as gravity", "mental accounting", "future-self as stranger"],
      },
      {
        slug: "game-theory",
        name: "game theory",
        blurb: "strategy when other strategists are watching.",
        hooks: ["nash equilibrium", "prisoner's dilemma", "signaling", "mechanism design"],
        angles: ["awkward elevator silences", "auctions", "playing chicken"],
      },
    ],
  },
  {
    slug: "philosophy",
    name: "philosophy",
    tagline: "asking the questions before they have departments.",
    description:
      "philosophy invented analogy as a tool of inquiry (the cave, the ship, the violinist). we use it the same way.",
    accent: "bg-system-1/30 border-system-1/50",
    subs: [
      {
        slug: "epistemology",
        name: "epistemology",
        blurb: "what counts as knowing, and how do you know that.",
        hooks: ["justified true belief", "gettier cases", "skepticism", "bayesianism"],
        angles: ["stopped clocks", "courtroom standards", "calibrated forecasters"],
      },
      {
        slug: "ethics",
        name: "ethics",
        blurb: "how to act when nobody's grading.",
        hooks: ["utilitarianism", "deontology", "virtue ethics", "trolley problems"],
        angles: ["spreadsheets vs constitutions", "habits as character", "second-order rules"],
      },
      {
        slug: "logic",
        name: "logic",
        blurb: "the plumbing under every other discipline.",
        hooks: ["validity", "soundness", "modal logic", "godel"],
        angles: ["board games with strict rules", "machines that can't lie", "rooms with no exit"],
      },
      {
        slug: "mind",
        name: "philosophy of mind",
        blurb: "what is it like to be anything.",
        hooks: ["qualia", "functionalism", "hard problem", "extended mind"],
        angles: ["thermostats with feelings", "the chinese room", "notebooks as memory"],
      },
    ],
  },
  {
    slug: "linguistics",
    name: "linguistics",
    tagline: "the structure of the only thing you use every day.",
    description:
      "linguistics is reassuringly recursive - the tools are made of the thing they study.",
    accent: "bg-system-2/30 border-system-2/50",
    subs: [
      {
        slug: "syntax",
        name: "syntax",
        blurb: "how words latch together legally.",
        hooks: ["phrase structure", "movement", "minimalism", "x-bar"],
        angles: ["lego instructions", "nesting dolls", "subway maps"],
      },
      {
        slug: "semantics",
        name: "semantics",
        blurb: "how meaning hitches a ride on form.",
        hooks: ["truth conditions", "compositionality", "lambda calculus", "frames"],
        angles: ["recipes", "address lookups", "function composition"],
      },
      {
        slug: "pragmatics",
        name: "pragmatics",
        blurb: "what you mean vs what you literally said.",
        hooks: ["implicature", "speech acts", "deixis", "politeness"],
        angles: ["passing notes in class", "subtitles", "office small talk"],
      },
    ],
  },
  {
    slug: "history",
    name: "history",
    tagline: "the past has shape, and the shape rhymes.",
    description:
      "we don't repeat history but we do reuse its plots. analogy is how we notice the reuse without forcing the rhyme.",
    accent: "bg-system-3/30 border-system-3/50",
    subs: [
      {
        slug: "ancient",
        name: "ancient",
        blurb: "first cities, first empires, first writing.",
        hooks: ["bronze age collapse", "roman republic", "axial age", "early trade networks"],
        angles: ["startups vs incumbents", "supply chains", "first principles"],
      },
      {
        slug: "modern",
        name: "modern",
        blurb: "industrial revolutions and their echoes.",
        hooks: ["enclosures", "industrialization", "world wars", "decolonization"],
        angles: ["platform shifts", "network effects", "regime changes"],
      },
      {
        slug: "intellectual",
        name: "intellectual history",
        blurb: "ideas as characters with arcs.",
        hooks: ["enlightenment", "romanticism", "positivism", "structuralism"],
        angles: ["franchises and reboots", "pendulum swings", "open-source forks"],
      },
    ],
  },
  {
    slug: "design",
    name: "design",
    tagline: "decisions made visible.",
    description:
      "design is one of those rare fields where the artifact and the explanation are the same thing.",
    accent: "bg-system-4/30 border-system-4/50",
    subs: [
      {
        slug: "typography",
        name: "typography",
        blurb: "letters as voices.",
        hooks: ["x-height", "leading", "kerning", "type pairing"],
        angles: ["tone of voice", "posture", "music tempo"],
      },
      {
        slug: "ux",
        name: "ux",
        blurb: "how someone moves through a built thing.",
        hooks: ["affordances", "wayfinding", "feedback loops", "progressive disclosure"],
        angles: ["airports", "store layouts", "well-trodden paths"],
      },
      {
        slug: "color",
        name: "color",
        blurb: "the perception you can't quite measure.",
        hooks: ["complementary", "saturation", "hue rotation", "color theory"],
        angles: ["spice mixes", "instruments in a chord", "mood lighting"],
      },
    ],
  },
];

export const findSubject = (slug: string) =>
  subjects.find((s) => s.slug === slug.toLowerCase());

export const findSub = (subjectSlug: string, subSlug: string) => {
  const subject = findSubject(subjectSlug);
  if (!subject) return null;
  const sub = subject.subs.find((s) => s.slug === subSlug.toLowerCase());
  if (!sub) return null;
  return { subject, sub };
};
