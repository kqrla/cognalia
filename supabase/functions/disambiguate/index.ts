// disambiguation: a concept can mean different things in different fields.
// returns up to 4 short subdomain "pills" (e.g. for "transformer" → electrical
// engineering, deep learning, toy franchise). frontend shows them as quick
// selectors so the analogy is about the right thing.

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
    const { concept } = await req.json();
    if (!concept || typeof concept !== "string" || concept.trim().length < 2) {
      return new Response(JSON.stringify({ domains: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "you identify the distinct fields/subdomains a term can refer to. lowercase. concise. only return real, meaningfully-different meanings.",
          },
          {
            role: "user",
            content: `term: "${concept}". list the distinct fields where this term has clearly different meanings. if the term has only one common meaning, return an empty list.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "render_domains",
              description: "return distinct subdomain meanings of the term",
              parameters: {
                type: "object",
                properties: {
                  domains: {
                    type: "array",
                    description:
                      "0 to 4 entries. omit entirely if the term is unambiguous.",
                    items: {
                      type: "object",
                      properties: {
                        field: {
                          type: "string",
                          description:
                            "1-3 words naming the field (e.g. 'machine learning', 'electrical engineering', 'finance', 'biology').",
                        },
                        sense: {
                          type: "string",
                          description:
                            "≤6 words describing what the term means in that field.",
                        },
                      },
                      required: ["field", "sense"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["domains"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: "render_domains" },
        },
      }),
    });

    if (!r.ok) {
      console.error("disambiguate gateway error", r.status);
      return new Response(JSON.stringify({ domains: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await r.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = args ? JSON.parse(args) : { domains: [] };
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("disambiguate error", e);
    return new Response(JSON.stringify({ domains: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
