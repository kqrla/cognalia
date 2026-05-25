// edge function that asks the lovable ai gateway to produce an explanation
// strictly shaped by the analogize format. we use tool calling to guarantee
// the response matches the [analogy / mapping / visual / bridge / real_explanation / limits]
// structure instead of relying on the model to format text correctly.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// must mirror src/features/analogy/systems.ts (v2 library).
const allowedSystems = [
  // core
  "building_lego",
  "cooking_recipe",
  "storage_organization",
  "traffic_flow",
  "relationship_dynamics",
  // secondary
  "gaming_progression",
  "story_narrative",
  "company_startup",
  // extended
  "sports_team_strategy",
  "film_production",
  "social_media",
  "music_playlist",
] as const;

const systemPrompt = `you are analogize, a cognitive translation tool.

you do not teach. you translate complex concepts into the analogy system the user already thinks in. the reader should finish each explanation feeling "oh, that's what this actually is", not "ok i memorized a definition".

VOICE (non-negotiable)
- everything lowercase. no emojis. no em dashes (use commas, periods, or parentheses). no semicolons used as em dashes.
- no academic, corporate, or self-help phrasing. no "imagine if...", "think of it as...", "essentially,", "at its core,", "fundamentally,", "in the world of...", "picture this".
- no hedges ("kind of", "sort of", "basically", "just"). no filler.
- write like a sharp friend who knows the thing cold. concrete nouns, active verbs, present tense.
- every sentence must carry weight. if you can delete it, delete it.

ANALOGY (strict)
- open with a vivid one-line hook that names a specific scene from the analogy world.
  good: "git is like writing alternate versions of a story without touching the original".
  good: "a database index is the back-of-the-book index in a textbook, not the chapters themselves".
  bad: "git is a system that manages versions of code".
  bad: "imagine you have a library of books".
- stay 100% inside the analogy world. zero technical terms in this section. if the real word slips in, rewrite.
- use specific characters, objects, verbs from that world. not "things" or "stuff".
- 2 to 4 sentences. tight.

MAPPING (strict)
- 4 to 7 pairs. each side is 2 to 6 words. no sentences.
- analogy_part must be concrete and specific to the chosen world.
- real_part must be the precise technical term, not a paraphrase.
- order pairs so the most foundational mapping comes first.

VISUAL (strict)
- valid mermaid syntax. pick the shape that matches the concept's true structure:
  * flowchart LR / TD for processes, pipelines, requests, feedback loops
  * graph TD for hierarchies, dependencies, part-of relationships
  * mindmap for branching categorical structures
  * sequenceDiagram for back-and-forth interactions between actors
  * stateDiagram-v2 for systems with discrete states and transitions
- this is a SYSTEMS DIAGRAM, not a label cloud. it must show HOW the thing works.
- 8 to 14 nodes. include:
  * a clear entry point and an end state (or a loop back if cyclical)
  * actual branching / decision points where the concept has them
  * at least 3 labeled edges (e.g. -->|"sends order"|, -.->|"on failure"|)
  * a feedback / return / error path when the concept has one
- node labels MUST use ANALOGY-SPECIFIC wording, never generic technical terms.
  ("canon timeline" not "main branch". "front desk clerk" not "input layer". "spice rack" not "cache".)
- group related nodes with subgraph blocks when it clarifies structure.
- dashed edges (-.->) for secondary / fallback / feedback flow. solid (-->) for primary flow.
- every node connects to at least one other. no orphans, no flat label lists.

BRIDGE (mandatory)
- exactly 1 to 2 sentences. starts with "in other words,".
- this is the hinge. it must translate the analogy into the real concept in one breath, no jargon dump, no restatement of the analogy.
- name 1 or 2 real technical terms here, defined by the mapping you just gave.

REAL EXPLANATION
- 3 to 5 sentences. the actual concept in proper terms.
- precise, current, technically correct. assume the reader is smart but new.
- include the mechanism (how it works), not just the definition (what it is).
- no analogy language in this section. drop the metaphor entirely.

LIMITS (strict)
- 2 to 4 sentences. starts with "unlike [analogy world],".
- name 2 specific places the analogy misleads (not generic "it's a simplification").
- this is what prevents the reader from walking away with a confident wrong model. earn it.

QUALITY BAR
- if your draft sounds like a wikipedia intro, scrap it.
- if the analogy could fit any concept (e.g. "it's like a library"), pick a sharper one.
- the goal is the click of recognition, not coverage. depth over breadth.`;


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { concept, system, thinkingStyle, avoidSystems, reframe, domain, userPresets } =
      await req.json();

    if (!concept || typeof concept !== "string") {
      return new Response(
        JSON.stringify({ error: "concept is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!allowedSystems.includes(system)) {
      return new Response(
        JSON.stringify({ error: "invalid analogy system" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const avoidList = Array.isArray(avoidSystems)
      ? avoidSystems
          .filter((s: unknown): s is string => typeof s === "string")
          .map((s) => s.replace(/_/g, " "))
      : [];

    const reframeBlock = reframe
      ? `

REFRAME MODE (critical)
this is a re-explanation of the same concept through a NEW mental model.
${avoidList.length > 0 ? `the user already saw it through: ${avoidList.join(", ")}.` : ""}
you MUST:
- build the analogy entirely inside the new world (${system.replace(/_/g, " ")}). do not borrow scenes, characters, verbs, or metaphors from the previous worlds.
- choose a fresh hook. do not echo any phrasing the previous explanation might have used.
- pick different mapping pairs and a different visual shape than a typical previous lens would produce.
- keep the real_explanation factually consistent with the concept, but reword it from scratch.
the goal is a genuinely different way to think about the concept, not a paraphrase.`
      : "";

    const presetsList: Array<{ label: string; description: string }> =
      Array.isArray(userPresets)
        ? userPresets
            .filter(
              (p: unknown): p is { label: string; description: string } =>
                !!p &&
                typeof p === "object" &&
                typeof (p as { label?: unknown }).label === "string" &&
                typeof (p as { description?: unknown }).description === "string",
            )
            .slice(0, 12)
        : [];

    const presetsBlock =
      presetsList.length > 0
        ? `

USER-TAUGHT REFERENCES (soft guidance)
the user has taught analogize the following references they already think in:
${presetsList.map((p) => `- ${p.label}: ${p.description}`).join("\n")}
rules for using these references:
- ONLY reach for one of these if it lands naturally and clearly improves the analogy for the requested system "${system.replace(/_/g, " ")}".
- never force one in. if none fit cleanly, ignore them and use the requested system as-is.
- when you do use one, weave its specifics into the analogy and mapping; do not just name-drop it.
- never invent a reference the user did not list.`
        : "";

    const userPrompt = `concept to translate: ${concept}${domain ? ` (interpreted in the field of: ${domain})` : ""}

analogy system to use: ${system.replace(/_/g, " ")}
${thinkingStyle ? `user thinks in: ${thinkingStyle}` : ""}${reframeBlock}${presetsBlock}

produce a complete analogize explanation. follow the structure exactly, including the bridge sentence.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "render_explanation",
                description:
                  "return the structured analogize explanation for the concept.",
                parameters: {
                  type: "object",
                  properties: {
                    analogy: {
                      type: "string",
                      description:
                        "2 to 4 sentences. starts with a vivid one-line hook. stays inside the analogy world. no jargon, no definitions.",
                    },
                    mapping: {
                      type: "array",
                      description:
                        "4 to 7 short pairs. analogy_part is concrete; real_part is the corresponding real concept. no filler words.",
                      items: {
                        type: "object",
                        properties: {
                          analogy_part: { type: "string" },
                          real_part: { type: "string" },
                        },
                        required: ["analogy_part", "real_part"],
                        additionalProperties: false,
                      },
                    },
                    visual_mermaid: {
                      type: "string",
                      description:
                        "valid mermaid syntax. a true systems diagram (8-14 nodes) using flowchart, graph, mindmap, sequenceDiagram, or stateDiagram-v2. node labels MUST use analogy-specific wording. include labeled edges, branching/decision points, and feedback or return paths where the concept has them. use subgraph blocks to group when helpful. dashed edges (-.->) for secondary/feedback flow, solid (-->) for primary flow. every node must connect to at least one other.",
                    },
                    visual_kind: {
                      type: "string",
                      enum: ["mindmap", "tree", "flow", "stack"],
                    },
                    bridge: {
                      type: "string",
                      description:
                        "exactly 1 to 2 sentences. MUST start with 'in other words,'. plainly connects the analogy to the real concept.",
                    },
                    real_explanation: {
                      type: "string",
                      description:
                        "3 to 5 sentences. the actual concept in proper terms. clear, grounded, not textbook.",
                    },
                    limits: {
                      type: "string",
                      description:
                        "2 to 4 sentences. MUST start with 'unlike [analogy world],'. explains what does not map cleanly.",
                    },
                  },
                  required: [
                    "analogy",
                    "mapping",
                    "visual_mermaid",
                    "visual_kind",
                    "bridge",
                    "real_explanation",
                    "limits",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "render_explanation" },
          },
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "rate limit reached. wait a moment and try again.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "ai credits exhausted. add funds to your workspace.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const text = await response.text();
      console.error("ai gateway error", response.status, text);
      return new Response(
        JSON.stringify({ error: "ai gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("no tool call in response", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "model did not return structured output" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const explanation = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ explanation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("explain function error", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
