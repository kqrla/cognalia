// peripheral analogy. extends an EXISTING analogy ecosystem with a new
// concept the user wants explained, using the same metaphor world the
// original analogy already established. refuses gracefully when the
// peripheral concept does not fit naturally inside that world.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      rootConcept,
      system,
      rootAnalogy,
      rootMapping,
      peripheralConcept,
      domain,
    } = await req.json();

    if (!rootConcept || !system || !rootAnalogy || !peripheralConcept) {
      return new Response(JSON.stringify({ error: "missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const worldName = String(system).replace(/_/g, " ");
    const mappingText = Array.isArray(rootMapping)
      ? rootMapping
          .map(
            (p: { analogy_part: string; real_part: string }) =>
              `- "${p.analogy_part}" = ${p.real_part}`,
          )
          .join("\n")
      : "";

    const sys = `you are analogize, extending an EXISTING analogy ecosystem.

the user already understands a root concept through a specific metaphor world.
they now want to understand a related peripheral concept, and they want it
to live INSIDE the same world so the two click together.

your job is twofold:
1) decide if the peripheral concept can be explained naturally as a part,
   role, event, or neighbor of the same world. do NOT force it.
2) if and only if it fits, produce a short peripheral analogy that treats
   the root analogy as the central truth.

rules when it fits:
- treat the root analogy as canon. reuse its props, characters, locations.
- do not re-explain the root. position the new concept relative to it.
- analogy: 1-3 short sentences, lowercase, no emojis or em dashes.
- mapping: 3-5 short pairs.
- bridge: one short plain-language sentence connecting it to the real concept.
- limits: one short sentence on where the analogy strains.${
      domain
        ? `\n- the root concept is pinned to the field "${domain}". interpret the peripheral concept inside that same field.`
        : ""
    }

rules when it does NOT fit:
- be honest. set fits=false and give a one-sentence reason in plain terms.
- still include the other fields as empty strings or empty arrays.
- never fabricate a forced metaphor just to satisfy the schema.`;

    const user = `root concept: ${rootConcept}
analogy world: ${worldName}

root analogy (canon):
${rootAnalogy}

${mappingText ? `root mapping:\n${mappingText}\n` : ""}peripheral concept the user now wants to understand: ${peripheralConcept}

decide if it fits inside this same world. if yes, produce the peripheral analogy. if no, refuse cleanly.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "render_peripheral",
              description:
                "return either a peripheral analogy inside the same ecosystem, or a clean refusal when it does not fit.",
              parameters: {
                type: "object",
                properties: {
                  fits: {
                    type: "boolean",
                    description:
                      "true only if the peripheral concept fits naturally inside the root analogy world.",
                  },
                  reason: {
                    type: "string",
                    description:
                      "when fits=false, one short sentence explaining why a forced analogy would mislead.",
                  },
                  analogy: {
                    type: "string",
                    description:
                      "when fits=true, 1-3 sentences positioning the peripheral concept inside the existing world.",
                  },
                  mapping: {
                    type: "array",
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
                  bridge: { type: "string" },
                  limits: { type: "string" },
                },
                required: ["fits", "reason", "analogy", "mapping", "bridge", "limits"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: "render_peripheral" },
        },
      }),
    });

    if (!r.ok) {
      if (r.status === 429) {
        return new Response(JSON.stringify({ error: "rate limit reached." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (r.status === 402) {
        return new Response(JSON.stringify({ error: "ai credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await r.text();
      console.error("peripheral gateway error", r.status, text);
      return new Response(JSON.stringify({ error: "ai gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await r.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(
        JSON.stringify({ error: "model did not return structured output" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    const result = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("peripheral error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
