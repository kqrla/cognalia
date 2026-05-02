// curated demo library. these ship with the app so the home screen has
// real, well-crafted examples even before the user requests anything.
// they also serve as a reference for what a "good analogize explanation"
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
    system: "story_narrative",
    teaser: "a story that keeps telling itself a smaller version of itself",
    explanation: {
      analogy:
        "recursion is like a character in a novel who picks up the same novel and starts reading it. inside that smaller book, the same character does it again. each version is a shorter copy of the same story, and the whole thing only ends when one of the inner books is short enough to finish on its own.",
      mapping: [
        { analogy_part: "character reading the book", real_part: "function calling itself" },
        { analogy_part: "smaller book inside", real_part: "recursive call with smaller input" },
        { analogy_part: "shortest finishable book", real_part: "base case" },
        { analogy_part: "stack of opened books", real_part: "call stack" },
        { analogy_part: "closing the books in order", real_part: "returning values back up" },
      ],
      visual_mermaid:
        "graph TD\n  A[outer story] --> B[smaller story]\n  B --> C[smaller story]\n  C --> D[shortest book finishes]\n  D --> C\n  C --> B\n  B --> A",
      visual_kind: "tree",
      bridge:
        "in other words, a function solves a big problem by handing a smaller version of the same problem back to itself, until the smallest version can answer directly.",
      real_explanation:
        "recursion is when a function calls itself on a smaller input. each call adds a frame to the call stack and pauses, waiting on the inner call. the recursion ends at a base case that returns without recursing, and as each call returns, the stack unwinds and partial results combine into the final answer.",
      limits:
        "unlike nested books, real recursion can branch in many directions at once, like a tree, not a single chain. and a deep stack of books is harmless, but a deep call stack can overflow memory.",
    },
  },
  {
    id: "apis",
    concept: "apis",
    system: "cooking_recipe",
    teaser: "ordering from a kitchen you cannot see",
    explanation: {
      analogy:
        "an api is like ordering at a restaurant where you never see the kitchen. you read the menu, place a structured order, and the waiter brings back exactly what was promised. the kitchen can swap cooks, change ovens, even move buildings, and your meal stays the same as long as the menu does not change.",
      mapping: [
        { analogy_part: "menu", real_part: "api contract" },
        { analogy_part: "order ticket", real_part: "request" },
        { analogy_part: "waiter", real_part: "network protocol" },
        { analogy_part: "dish that arrives", real_part: "response" },
        { analogy_part: "hidden kitchen", real_part: "server logic" },
      ],
      visual_mermaid:
        "flowchart LR\n  C[client] -->|order| W[api]\n  W -->|ticket| K[server]\n  K -->|dish| W\n  W -->|response| C",
      visual_kind: "flow",
      bridge:
        "in other words, an api is a fixed agreement that lets one program ask another for something without knowing how the other one works inside.",
      real_explanation:
        "an api is a defined interface that lets one piece of software request services or data from another. it specifies the shape of requests, the shape of responses, and the rules for both. this contract decouples consumers from internals, which is what makes large systems composable.",
      limits:
        "unlike a menu, real apis come with rate limits, outages, auth, versioning, and breaking changes. the network adds latency, retries, and partial failures that no restaurant ever has to handle.",
    },
  },
  {
    id: "neural_networks",
    concept: "neural networks",
    system: "company_startup",
    teaser: "a company learning to make better decisions over time",
    explanation: {
      analogy:
        "a neural network is like a startup with many small teams stacked in layers. raw information lands at the front desk, gets passed up through each team, and every team adds its own opinion. at the top, leadership makes a call. when the call turns out wrong, every team gets a tiny memo telling them how much to adjust their judgment next time.",
      mapping: [
        { analogy_part: "front desk", real_part: "input layer" },
        { analogy_part: "each team", real_part: "hidden layer" },
        { analogy_part: "team opinions", real_part: "weights and activations" },
        { analogy_part: "leadership decision", real_part: "output layer" },
        { analogy_part: "memo after a wrong call", real_part: "backpropagation" },
        { analogy_part: "getting sharper over time", real_part: "gradient descent" },
      ],
      visual_mermaid:
        "graph LR\n  I[front desk] --> H1[team 1]\n  H1 --> H2[team 2]\n  H2 --> H3[team 3]\n  H3 --> O[leadership]\n  O -. memo .-> H3\n  H3 -. memo .-> H2\n  H2 -. memo .-> H1",
      visual_kind: "flow",
      bridge:
        "in other words, a neural network is stacked layers of math that turn an input into an output, and training nudges every layer based on how wrong the output was.",
      real_explanation:
        "a neural network is a function made of stacked layers of linear operations followed by nonlinearities. it maps inputs to outputs through learned weights. training adjusts those weights using gradient descent on a loss function, with backpropagation efficiently computing how each weight contributed to the error.",
      limits:
        "unlike a company, neurons have no intent or context, only numbers. teams coordinate consciously; networks just minimize loss. and architectures like attention or convolution do not really look like office hierarchies.",
    },
  },
  {
    id: "databases_indexes",
    concept: "database indexes",
    system: "storage_organization",
    teaser: "the table of contents your data wishes it had",
    explanation: {
      analogy:
        "a database index is like a card catalog for a thick book with no table of contents. without it, finding one chapter means flipping every page. the catalog does not contain the chapters, it just tells you which page to open. you pay a small cost to keep the catalog in sync every time the book changes, in exchange for never reading the whole book to find anything.",
      mapping: [
        { analogy_part: "thick book", real_part: "table" },
        { analogy_part: "every page", real_part: "every row" },
        { analogy_part: "card catalog", real_part: "index (often a b-tree)" },
        { analogy_part: "page number on a card", real_part: "row pointer" },
        { analogy_part: "updating cards on edits", real_part: "index maintenance on writes" },
      ],
      visual_mermaid:
        "graph TD\n  Q[query] --> I[card catalog]\n  I --> P[page number]\n  P --> R[row]\n  W[edit] --> T[book]\n  W --> M[update cards]",
      visual_kind: "tree",
      bridge:
        "in other words, an index is a small extra structure the database keeps so it can jump straight to matching rows instead of scanning the whole table.",
      real_explanation:
        "an index is a secondary data structure, usually a b-tree or hash map, that lets the database locate matching rows without scanning the entire table. it trades extra storage and slower writes for dramatically faster reads on indexed columns. the query planner decides when an index is actually worth using.",
      limits:
        "unlike a card catalog, real indexes have to stay consistent across concurrent writes, transactions, and crashes. they are also useless on columns where every value is the same, and composite indexes have ordering rules paper cards never deal with.",
    },
  },
  {
    id: "git_branches",
    concept: "git branches",
    system: "story_narrative",
    teaser: "writing 'what if this happened instead' for your code",
    explanation: {
      analogy:
        "git branches are like writing alternate versions of a story without touching the original. each 'what if this happened instead' becomes its own timeline. you can keep editing it, share it, or throw it away. when an alternate timeline turns out to be the better story, you fold it back into canon.",
      mapping: [
        { analogy_part: "canon timeline", real_part: "main branch" },
        { analogy_part: "alternate storyline", real_part: "feature branch" },
        { analogy_part: "saving progress on a chapter", real_part: "commit" },
        { analogy_part: "folding a storyline into canon", real_part: "merge" },
        { analogy_part: "two storylines disagreeing on the same scene", real_part: "merge conflict" },
      ],
      visual_mermaid:
        "graph LR\n  M1[canon] --> M2[canon]\n  M2 --> M3[canon]\n  M2 --> F1[au: alt ending]\n  F1 --> F2[au: alt ending]\n  F2 --> M3",
      visual_kind: "flow",
      bridge:
        "in other words, a branch is a movable pointer to a commit, so you can build new history in parallel and merge it back when you want.",
      real_explanation:
        "a git branch is a movable pointer to a specific commit. creating one is cheap because git only stores a reference. work on a branch produces new commits that diverge from the original tip. merging combines histories; rebasing rewrites them onto a new base. conflicts happen when the same lines were changed in incompatible ways.",
      limits:
        "unlike fanfiction, git tracks exact line-by-line changes and does not interpret meaning. branches are not parallel universes either; they are pointers into the same shared commit graph.",
    },
  },
  {
    id: "rate_limiting",
    concept: "rate limiting",
    system: "traffic_flow",
    teaser: "traffic lights for your servers",
    explanation: {
      analogy:
        "rate limiting is like a traffic light at a busy intersection. without it, cars pile up, tempers rise, and eventually nothing moves. the light lets a controlled number of cars through per minute and politely tells the rest to wait. any one driver feels slowed down, but the whole intersection keeps flowing instead of seizing up.",
      mapping: [
        { analogy_part: "cars", real_part: "incoming requests" },
        { analogy_part: "intersection", real_part: "server endpoint" },
        { analogy_part: "traffic light", real_part: "rate limiter" },
        { analogy_part: "drivers told to wait", real_part: "throttled / 429 responses" },
        { analogy_part: "city traffic plan", real_part: "rate limit policy" },
      ],
      visual_mermaid:
        "flowchart LR\n  U[users] --> L[traffic light]\n  L -->|green| S[server]\n  L -->|red| R[wait / 429]",
      visual_kind: "flow",
      bridge:
        "in other words, rate limiting caps how often a client can hit a service in a given window, so bursts cannot crush it.",
      real_explanation:
        "rate limiting controls how often a client can perform an action within a time window. common algorithms include fixed window, sliding window, token bucket, and leaky bucket. limits protect resources from abuse, smooth out bursty traffic, and create fair access. exceeding a limit usually returns 429 with a retry hint.",
      limits:
        "unlike a single traffic light, real limiters often need per-user, per-tier, and per-endpoint policies. and when limits live across many servers, agreeing on the count becomes its own hard problem.",
    },
  },
];
