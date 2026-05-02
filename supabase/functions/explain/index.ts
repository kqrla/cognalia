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

const allowedSystems = [
  "relationship_dynamics",
  "gaming_progression",
  "cooking_recipe",
  "building_lego",
  "story_fandom",
  "company_startup",
  "traffic_flow",
  "plant_growth",
  "brain_habit_loops",
  "storage_organization",
] as const;

const systemPrompt = `you are analogize, a cognitive translation tool.

you do not teach. you translate complex concepts into the analogy system the user already thinks in.

write everything in lowercase. no emojis. no em dashes. no academic or corporate phrasing. write like a smart human, not a textbook. slightly conversational, never slang-heavy.

ANALOGY (strict)
- start with a one-line hook that makes the reader feel "oh, i get this".
  example good: "git is like writing alternate versions of a story without touching the original".
  example bad: "git is a system that manages versions of code".
- use specific, relatable scenarios, not abstract phrasing.
- stay INSIDE the analogy world. do not mix technical terms into the analogy section.
- 2 to 4 sentences MAX. do not over-explain.

MAPPING (strict)
- direct translation, not explanation.
- each pair is short. format: "analogy concept" = "real concept".
- no long sentences, no filler words.
- 4 to 7 pairs.

VISUAL (strict)
- valid mermaid syntax (graph TD, flowchart LR, or mindmap).
- use ANALOGY-SPECIFIC wording for nodes, never generic ("canon timeline" not "main branch").
- 5 to 8 nodes max. choose tree, flow, or map based on the concept's real shape.

BRIDGE (mandatory)
- exactly 1 to 2 sentences.
- must start with "in other words,".
- plainly connect the analogy to the real concept. this is the missing link before the real explanation.

REAL EXPLANATION
- the actual concept in proper terms. clear, grounded, not textbook.
- 3 to 5 sentences.

LIMITS (strict)
- must start with "unlike [analogy world],".
- explain what does NOT map cleanly.
- 2 to 4 sentences.

you are a thinking tool, not a learning platform.
the user should feel "this finally makes sense in my head", not "this is dumbed down".`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { concept, system, thinkingStyle } = await req.json();

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

    const userPrompt = `concept to translate: ${concept}

analogy system to use: ${system.replace(/_/g, " ")}
${thinkingStyle ? `user thinks in: ${thinkingStyle}` : ""}

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
                        "valid mermaid syntax. node labels MUST use analogy-specific wording, not generic technical terms. 5 to 8 nodes.",
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
