// follow-up clarification for an existing analogize explanation.
// returns a SHORT extension of the same analogy answering the user's
// confusion. not a chatbot — single-shot, no history, no chit-chat.

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
    const { concept, system, analogy, question } = await req.json();
    if (!concept || !analogy || !question) {
      return new Response(JSON.stringify({ error: "missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const sys = `you are analogize. the user already received an analogy and is
asking a single clarifying follow-up. answer ONLY that follow-up.

rules:
- stay INSIDE the analogy world (${String(system).replace(/_/g, " ")}). do not switch metaphors.
- 2 to 4 short sentences. lowercase. no emojis, no em dashes, no headings, no lists.
- if the question reveals a misunderstanding, gently correct it within the analogy.
- end with one short bridge sentence in plain terms (no "in other words" preamble).
- this is not a conversation. do not ask a question back. do not greet.`;

    const user = `concept: ${concept}
analogy system: ${String(system).replace(/_/g, " ")}

original analogy:
${analogy}

user's follow-up:
${question}`;

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
      console.error("clarify gateway error", r.status, text);
      return new Response(JSON.stringify({ error: "ai gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await r.json();
    const answer = data?.choices?.[0]?.message?.content?.trim?.() ?? "";
    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("clarify error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
