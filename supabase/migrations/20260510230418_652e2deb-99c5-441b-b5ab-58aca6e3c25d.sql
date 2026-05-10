CREATE TABLE public.published_presets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.published_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read published presets"
ON public.published_presets FOR SELECT
USING (true);

CREATE POLICY "anyone can publish a preset"
ON public.published_presets FOR INSERT
WITH CHECK (
  length(slug) BETWEEN 4 AND 40
  AND slug ~ '^[a-z0-9-]+$'
  AND length(label) BETWEEN 1 AND 60
  AND length(description) BETWEEN 1 AND 280
);

CREATE INDEX idx_published_presets_slug ON public.published_presets(slug);