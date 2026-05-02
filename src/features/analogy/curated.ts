// curated demo library. these ship with the app so the home screen has
// real, well-crafted examples even before the user requests anything.
// they also serve as a reference for what a "good annealogy explanation"
// looks like, both for the user and for the prompt.

import type { Explanation } from "./types";
import type { AnalogySystemId } from "./systems";

export type CuratedConcept = {
  id: string;
  concept: string;
  system: AnalogySystemId;
  // one-line teaser for the home card
  teaser: string;
  explanation: Explanation;
};

export const curatedConcepts: CuratedConcept[] = [
  {
    id: "recursion",
    concept: "recursion",
    system: "story_fandom",
    teaser: "a story that keeps telling itself a smaller version of itself",
    explanation: {
      analogy:
        "imagine a character in a novel who, halfway through the chapter, picks up the same novel and starts reading it. inside that book, the same character does it again. each version is a smaller, simpler copy of the same story, and the whole thing only ends when one of the inner books is short enough to finish on its own.",
      mapping: [
        { analogy_part: "the character reading the book", real_part: "a function calling itself" },
        { analogy_part: "the smaller book inside", real_part: "the recursive call with a smaller input" },
        { analogy_part: "the moment a book is short enough to finish", real_part: "the base case" },
        { analogy_part: "stacking books on the desk", real_part: "the call stack" },
        { analogy_part: "closing books one by one", real_part: "returning values back up the chain" },
      ],
      visual_mermaid:
        "graph TD\n  A[outer call] --> B[smaller call]\n  B --> C[smaller call]\n  C --> D[base case]\n  D --> C\n  C --> B\n  B --> A",
      visual_kind: "tree",
      real_explanation:
        "recursion is when a function solves a problem by calling itself on a smaller version of the same problem. each call adds a frame to the call stack, and the recursion terminates when it hits a base case that returns a value without recursing. as each call returns, the stack unwinds and partial results combine into the final answer.",
      limits:
        "the analogy suggests every recursion is neatly nested, but real code can recurse in branches, like a tree, not just a single chain. it also hides cost: a deep stack of books is fine, a deep call stack can overflow. and unlike books, recursive calls can share state through closures or accumulators.",
    },
  },
  {
    id: "apis",
    concept: "apis",
    system: "cooking_recipe",
    teaser: "ordering from a kitchen you cannot see",
    explanation: {
      analogy:
        "an api is the menu and the waiter at a restaurant. you do not walk into the kitchen. you read the menu, place a structured order, and the waiter brings back exactly what was promised. the kitchen can change cooks, swap ovens, even move buildings, and your experience stays the same as long as the menu does not change.",
      mapping: [
        { analogy_part: "the menu", real_part: "the api documentation and contract" },
        { analogy_part: "the order you place", real_part: "the request" },
        { analogy_part: "the waiter", real_part: "the network and protocol" },
        { analogy_part: "the dish that comes back", real_part: "the response" },
        { analogy_part: "the kitchen", real_part: "the server and its internal logic" },
      ],
      visual_mermaid:
        "flowchart LR\n  C[client] -->|request| W[api]\n  W -->|query| K[server logic]\n  K -->|data| W\n  W -->|response| C",
      visual_kind: "flow",
      real_explanation:
        "an api is a defined interface that lets one piece of software request services or data from another, without needing to know how the other side is implemented. it specifies the shape of requests, the shape of responses, and the rules for both. this contract decouples consumers from internals, which is what makes large systems composable.",
      limits:
        "menus pretend every dish is always available. real apis have rate limits, outages, auth, versioning, and breaking changes. the waiter analogy also flattens the network: latency, retries, and partial failures are real concerns that no restaurant has to handle.",
    },
  },
  {
    id: "neural_networks",
    concept: "neural networks",
    system: "company_startup",
    teaser: "a company learning to make better decisions over time",
    explanation: {
      analogy:
        "picture a startup with many small teams stacked in layers. raw information lands on the front desk, gets passed up through each team, and every team adds its own opinion. at the top, leadership makes a call. when the call turns out wrong, every team gets a tiny memo telling them how much to adjust their judgment. over thousands of decisions, the whole company gets sharper.",
      mapping: [
        { analogy_part: "front desk", real_part: "input layer" },
        { analogy_part: "each team", real_part: "a hidden layer of neurons" },
        { analogy_part: "team opinions and weighting", real_part: "weights and activations" },
        { analogy_part: "leadership decision", real_part: "output layer" },
        { analogy_part: "the memo after a wrong call", real_part: "backpropagation" },
        { analogy_part: "getting sharper over time", real_part: "training via gradient descent" },
      ],
      visual_mermaid:
        "graph LR\n  I[input] --> H1[layer 1]\n  H1 --> H2[layer 2]\n  H2 --> H3[layer 3]\n  H3 --> O[output]\n  O -. correction .-> H3\n  H3 -. correction .-> H2\n  H2 -. correction .-> H1",
      visual_kind: "flow",
      real_explanation:
        "a neural network is a function made of stacked layers of small linear operations followed by nonlinearities. it maps inputs to outputs through learned weights. training adjusts those weights using gradient descent on a loss function, with backpropagation efficiently computing how each weight contributed to the error.",
      limits:
        "real teams have intent and context; neurons only do math on numbers. companies coordinate consciously; networks just minimize loss. the analogy also misses scale and architecture: attention, convolutions, and residual connections are not really like office hierarchies.",
    },
  },
  {
    id: "databases_indexes",
    concept: "database indexes",
    system: "storage_organization",
    teaser: "the table of contents your data wishes it had",
    explanation: {
      analogy:
        "a database without an index is a thick book with no table of contents. to find one chapter, you flip every page. an index is a small, sorted card catalog: it does not contain the chapters, but it tells you exactly which page to open. you pay a little to maintain the catalog every time the book changes, in exchange for not having to read the whole book to find anything.",
      mapping: [
        { analogy_part: "the book", real_part: "the table" },
        { analogy_part: "every page", real_part: "every row" },
        { analogy_part: "the card catalog", real_part: "the index structure, often a b-tree" },
        { analogy_part: "the page number on a card", real_part: "the row pointer" },
        { analogy_part: "updating cards when the book changes", real_part: "index maintenance on writes" },
      ],
      visual_mermaid:
        "graph TD\n  Q[query] --> I[index lookup]\n  I --> P[row pointer]\n  P --> R[row data]\n  W[write] --> T[table]\n  W --> M[update index]",
      visual_kind: "tree",
      real_explanation:
        "an index is a secondary data structure, usually a b-tree or hash map, that lets the database locate rows matching a query without scanning the entire table. it trades extra storage and slower writes for dramatically faster reads on indexed columns. the query planner decides when an index is actually worth using.",
      limits:
        "card catalogs sit still; real indexes have to stay consistent across concurrent writes, transactions, and crashes. the analogy also hides selectivity: an index on a column where every value is the same is useless. and composite indexes have ordering rules a card catalog does not capture.",
    },
  },
  {
    id: "git_branches",
    concept: "git branches",
    system: "story_fandom",
    teaser: "alternate timelines for your codebase",
    explanation: {
      analogy:
        "think of your project as a story with one main timeline. a branch is an alternate timeline where a different version of events plays out. characters, plot points, and decisions can diverge from the main story. when an alternate timeline turns out to be a good idea, you merge it back into canon. when it does not, you let it fade.",
      mapping: [
        { analogy_part: "main timeline", real_part: "the main branch" },
        { analogy_part: "alternate timeline", real_part: "a feature branch" },
        { analogy_part: "events and decisions", real_part: "commits" },
        { analogy_part: "merging back into canon", real_part: "merge or rebase" },
        { analogy_part: "two timelines disagreeing on the same event", real_part: "merge conflict" },
      ],
      visual_mermaid:
        "graph LR\n  M1[main] --> M2[main]\n  M2 --> M3[main]\n  M2 --> F1[feature]\n  F1 --> F2[feature]\n  F2 --> M3",
      visual_kind: "flow",
      real_explanation:
        "a git branch is a movable pointer to a specific commit. creating a branch is cheap because git only stores a reference. work on a branch produces new commits that diverge from the original tip. merging combines histories; rebasing rewrites them onto a new base. conflicts happen when the same lines were changed in incompatible ways across branches.",
      limits:
        "stories are linear in memory; git history is a directed acyclic graph and can have many parents per commit. the analogy also undersells how literally branches share history: they are not parallel universes, they are pointers into the same commit graph.",
    },
  },
  {
    id: "rate_limiting",
    concept: "rate limiting",
    system: "traffic_flow",
    teaser: "traffic lights for your servers",
    explanation: {
      analogy:
        "imagine a busy intersection with no signals. cars pile up, tempers rise, and eventually nothing moves. a rate limit is a traffic light: it lets a controlled number of cars through per minute, and politely tells the rest to wait. the road throughput might feel slower for any one driver, but the whole intersection keeps flowing instead of seizing up.",
      mapping: [
        { analogy_part: "cars", real_part: "incoming requests" },
        { analogy_part: "the intersection", real_part: "the server or endpoint" },
        { analogy_part: "the traffic light", real_part: "the rate limiter" },
        { analogy_part: "drivers told to wait", real_part: "throttled or 429 responses" },
        { analogy_part: "the city traffic plan", real_part: "the rate limit policy" },
      ],
      visual_mermaid:
        "flowchart LR\n  U[users] --> L[rate limiter]\n  L -->|allowed| S[server]\n  L -->|denied| R[429 response]",
      visual_kind: "flow",
      real_explanation:
        "rate limiting controls how often a client can perform an action within a time window. common algorithms include fixed window, sliding window, token bucket, and leaky bucket. limits protect resources from abuse and overload, smooth out bursty traffic, and create fair access. exceeding a limit usually returns 429 with a retry hint.",
      limits:
        "real traffic lights treat every car the same; rate limiters often need per-user, per-tier, or per-endpoint policies. the analogy also misses distributed coordination: when limits live across many servers, agreeing on the count is its own hard problem.",
    },
  },
];
