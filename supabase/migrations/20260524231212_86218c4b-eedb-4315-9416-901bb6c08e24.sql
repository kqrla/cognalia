ALTER TABLE public.published_presets ADD COLUMN listed boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_published_presets_listed ON public.published_presets (listed, created_at DESC);
DROP POLICY IF EXISTS "anyone can publish a preset" ON public.published_presets;
CREATE POLICY "anyone can publish a preset"
ON public.published_presets
FOR INSERT
TO public
WITH CHECK (
  length(slug) >= 4 AND length(slug) <= 40
  AND slug ~ '^[a-z0-9-]+$'
  AND length(label) >= 1 AND length(label) <= 60
  AND length(description) >= 1 AND length(description) <= 280
);
CREATE POLICY "anyone can list their preset"
ON public.published_presets
FOR UPDATE
TO public
USING (true)
WITH CHECK (
  length(slug) >= 4 AND length(slug) <= 40
  AND slug ~ '^[a-z0-9-]+$'
  AND length(label) >= 1 AND length(label) <= 60
  AND length(description) >= 1 AND length(description) <= 280
);