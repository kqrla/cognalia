// edge function that asks the lovable ai gateway to produce an explanation
// strictly shaped by the annealogy format. we use tool calling to guarantee
// the response matches the [analogy / mapping / visual / explanation / limits] structure
// instead of relying on the model to format text correctly.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// the only analogy systems we accept. matches the strict library on the client.
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

const systemPrompt = `you are annealogy, a cognitive translation tool.

you do not teach. you translate complex concepts into the analogy system the user already thinks in.

absolute rules:
- never write definitions first. always start with the analogy.
- never invent new analogy systems. only use the one the user picked.
- never overload with paragraphs. be tight, intentional, human.
- always include the mapping. always include where the analogy breaks.
- write everything in lowercase. no emojis. no em dashes.
- the visual must be valid mermaid syntax (graph TD, mindmap, or flowchart).
  keep it simple: 5 to 9 nodes max, clean labels, no styling.
- the analogy section is 2 to 4 sentences max.
- the limits section is 2 to 4 sentences explaining where the analogy stops working.

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

produce a complete annealogy explanation. follow the structure exactly.`;

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
                  "return the structured annealogy explanation for the concept.",
                parameters: {
                  type: "object",
                  properties: {
                    analogy: {
                      type: "string",
                      description:
                        "2 to 4 sentences in the chosen system. no jargon. no definition.",
                    },
                    mapping: {
                      type: "array",
                      description:
                        "explicit mapping between analogy elements and real concept components.",
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
                        "valid mermaid syntax. prefer graph TD or mindmap. 5 to 9 nodes.",
                    },
                    visual_kind: {
                      type: "string",
                      enum: ["mindmap", "tree", "flow", "stack"],
                    },
                    real_explanation: {
                      type: "string",
                      description:
                        "the actual concept in proper terms. clear, grounded, not textbook.",
                    },
                    limits: {
                      type: "string",
                      description:
                        "2 to 4 sentences on where the analogy breaks down.",
                    },
                  },
                  required: [
                    "analogy",
                    "mapping",
                    "visual_mermaid",
                    "visual_kind",
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
      // surface the two rate-limit-shaped errors so the client can show a useful toast
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
