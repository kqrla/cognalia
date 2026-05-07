// publish or fetch a shared explanation snapshot.
// POST { concept, system, explanation, domain? } -> { id }
// GET  ?id=...                                   -> { concept, system, explanation, domain, created_at }
// public: no auth required. unlisted by virtue of unguessable uuid.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );

  try {
    if (req.method === "GET") {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "missing id" }, 400);
      const { data, error } = await supabase
        .from("shared_explanations")
        .select("id, concept, system, explanation, domain, created_at")
        .eq("id", id)
        .maybeSingle();
      if (error) return json({ error: error.message }, 500);
      if (!data) return json({ error: "not found" }, 404);
      return json(data);
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => null);
      if (!body || typeof body !== "object")
        return json({ error: "invalid body" }, 400);
      const { concept, system, explanation, domain } = body as Record<
        string,
        unknown
      >;
      if (
        typeof concept !== "string" ||
        !concept.trim() ||
        concept.length > 300 ||
        typeof system !== "string" ||
        !system.trim() ||
        system.length > 80 ||
        !explanation ||
        typeof explanation !== "object"
      ) {
        return json({ error: "invalid payload" }, 400);
      }
      const { data, error } = await supabase
        .from("shared_explanations")
        .insert({
          concept: concept.trim(),
          system,
          explanation,
          domain: typeof domain === "string" && domain ? domain : null,
        })
        .select("id")
        .single();
      if (error) return json({ error: error.message }, 500);
      return json({ id: data.id });
    }

    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
