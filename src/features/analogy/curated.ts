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
  {
    id: "load_balancing",
    concept: "load balancing",
    system: "sports_team_strategy",
    teaser: "a coach who rotates players so no one collapses",
    explanation: {
      analogy:
        "load balancing is like a coach who watches every player on the field and pulls someone off before they collapse from exhaustion. when a star forward is gasping, the coach sends in a fresh substitute for the same position. the game keeps running at full speed because no single player is carrying more than they can handle.",
      mapping: [
        { analogy_part: "players on the field", real_part: "backend servers" },
        { analogy_part: "coach observing stamina", real_part: "health monitor / load tracker" },
        { analogy_part: "gasps and slowing down", real_part: "high cpu, latency, or error rate" },
        { analogy_part: "fresh substitute", real_part: "routing traffic to a healthy server" },
        { analogy_part: "same position", real_part: "identical service replica" },
        { analogy_part: "bench full of subs", real_part: "server pool / auto-scaling group" },
      ],
      visual_mermaid:
        "flowchart LR\n  U[users] --> LB[coach / load balancer]\n  LB -->|fresh| S1[player 1]\n  LB -->|tired| S2[player 2]\n  LB -->|rest| S3[player 3]",
      visual_kind: "flow",
      bridge:
        "in other words, load balancing spreads incoming work across many identical machines so no one machine becomes the bottleneck.",
      real_explanation:
        "load balancing distributes incoming network traffic across a group of backend servers. algorithms range from simple round-robin to least-connections, ip-hash, and adaptive health-based routing. a load balancer sits at the edge, terminating tls, checking health, and rerouting around failures so users never see a downed node.",
      limits:
        "unlike a sports team, servers do not get tired gradually — they can go from healthy to crashed in milliseconds. and sticky sessions, cross-server state, and database consistency make 'identical replicas' much harder than identical positions on a field.",
    },
  },
  {
    id: "public_key_cryptography",
    concept: "public key cryptography",
    system: "relationship_dynamics",
    teaser: "a mailbox anyone can drop letters into, but only you can open",
    explanation: {
      analogy:
        "public key cryptography is like having a mailbox with a slot on the front that anyone in the world can drop a letter through, but only you have the key that opens the back. you publish the address of the slot widely, and anyone can send you a private message. the letter is safe because no one else can open the box.",
      mapping: [
        { analogy_part: "mailbox slot", real_part: "public key" },
        { analogy_part: "box-opening key", real_part: "private key" },
        { analogy_part: "published address", real_part: "public key shared openly" },
        { analogy_part: "letter dropped through slot", real_part: "message encrypted with public key" },
        { analogy_part: "only owner opens back", real_part: "only private key holder can decrypt" },
      ],
      visual_mermaid:
        "flowchart LR\n  A[sender] -->|encrypt with slot| M[locked letter]\n  M -->|drop| B[mailbox / recipient]\n  B -->|unlock with key| C[readable message]",
      visual_kind: "flow",
      bridge:
        "in other words, you encrypt a secret using a public key so that only the matching private key can ever unlock it.",
      real_explanation:
        "public key cryptography uses a mathematically linked pair of keys. the public key can encrypt but not decrypt; the private key can decrypt what its public partner encrypted. rsa and elliptic-curve cryptography rely on trapdoor functions — easy one way, practically impossible the other without the private key. this enables secure messaging, digital signatures, and tls.",
      limits:
        "unlike a physical mailbox, public keys can be impersonated if not verified. if an attacker replaces your published slot with their own, they can read messages meant for you. that is why certificate authorities and web-of-trust models exist — to prove the slot really belongs to you.",
    },
  },
  {
    id: "event_driven_architecture",
    concept: "event-driven architecture",
    system: "cooking_recipe",
    teaser: "a kitchen where dishes start cooking the moment an order ticket lands",
    explanation: {
      analogy:
        "event-driven architecture is like a kitchen where nothing happens until a ticket lands on the rail. the moment it arrives, every station that cares about that kind of order wakes up and starts. the fryer starts the fries when it sees a burger ticket; the barista only makes a coffee when a brunch ticket arrives. no one polls the front desk asking 'any orders yet?' they just listen for their name on the ticket.",
      mapping: [
        { analogy_part: "ticket landing on the rail", real_part: "event published to a bus or queue" },
        { analogy_part: "fryer waking up", real_part: "subscriber / event handler triggered" },
        { analogy_part: "stations listening for specific items", real_part: "services subscribing to event types" },
        { analogy_part: "no one polls the front desk", real_part: "push-based, not polling" },
        { analogy_part: "kitchen keeps serving while orders fly", real_part: "asynchronous decoupled processing" },
      ],
      visual_mermaid:
        "flowchart LR\n  O[order ticket] --> R[rail / event bus]\n  R --> F[fryer handler]\n  R --> B[barista handler]\n  R --> G[grill handler]",
      visual_kind: "flow",
      bridge:
        "in other words, services react to events instead of asking each other constantly if something happened. they stay asleep until the right signal wakes them.",
      real_explanation:
        "event-driven architecture decouples services by having them communicate through events rather than direct calls. a producer publishes events to a broker or bus; consumers subscribe to the types they care about and process them asynchronously. this enables loose coupling, horizontal scaling, and resilience — if a consumer is down, events can queue until it recovers.",
      limits:
        "unlike a real kitchen, events can arrive out of order, duplicate, or get lost entirely without careful broker configuration. exactly-once delivery and event ordering are hard distributed systems problems that a ticket rail never has to solve.",
    },
  },
  {
    id: "blockchain",
    concept: "blockchain",
    system: "building_lego",
    teaser: "a tower of transparent blocks where each new piece locks the ones below it",
    explanation: {
      analogy:
        "a blockchain is like building a tower of transparent lego blocks where each new block contains a photograph of the block below it. if someone tries to secretly swap out an older block, the next block's photograph no longer matches, and everyone building the tower immediately notices. the tower only grows upward, and every builder has their own copy so no single person controls it.",
      mapping: [
        { analogy_part: "transparent lego block", real_part: "block of transactions" },
        { analogy_part: "photograph of the block below", real_part: "cryptographic hash of previous block" },
        { analogy_part: "swapping a block", real_part: "tampering with historical data" },
        { analogy_part: "photograph mismatch", real_part: "hash verification fails" },
        { analogy_part: "every builder has a copy", real_part: "distributed ledger / consensus" },
        { analogy_part: "tower only grows upward", real_part: "append-only, immutable chain" },
      ],
      visual_mermaid:
        "graph LR\n  B1[block 1] --> B2[block 2]\n  B2 --> B3[block 3]\n  B3 --> B4[block 4]\n  B1 -. copy .-> N1[node A]\n  B2 -. copy .-> N2[node B]\n  B3 -. copy .-> N3[node C]",
      visual_kind: "flow",
      bridge:
        "in other words, a blockchain is a shared, tamper-evident record where each entry references the one before it, making historical changes impossible to hide.",
      real_explanation:
        "a blockchain is a distributed ledger of blocks, each containing transactions and the cryptographic hash of the previous block. changing any historical block would invalidate every subsequent hash, requiring the attacker to redo all following proof-of-work or proof-of-stake faster than the honest network. consensus protocols like proof-of-work or byzantine fault tolerance ensure agreement without a central authority.",
      limits:
        "unlike lego, real blockchains are slow, energy-intensive, and cannot store large data efficiently. they are also not inherently private — everyone sees every transaction. and the 'photograph' only proves the chain of hashes; it does not mean the original transactions were true or legal.",
    },
  },
];
