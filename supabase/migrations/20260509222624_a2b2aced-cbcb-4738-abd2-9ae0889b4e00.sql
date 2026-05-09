
ALTER TABLE public.shared_explanations
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'single',
  ADD COLUMN IF NOT EXISTS question text,
  ADD COLUMN IF NOT EXISTS peripherals jsonb;

ALTER TABLE public.shared_explanations
  DROP CONSTRAINT IF EXISTS shared_explanations_kind_check;
ALTER TABLE public.shared_explanations
  ADD CONSTRAINT shared_explanations_kind_check
  CHECK (kind IN ('single', 'peripheral', 'ecosystem'));

DROP POLICY IF EXISTS "anyone can publish a shared explanation" ON public.shared_explanations;
CREATE POLICY "anyone can publish a shared explanation"
ON public.shared_explanations
FOR INSERT
TO public
WITH CHECK (
  length(concept) BETWEEN 1 AND 300
  AND length(system) BETWEEN 1 AND 80
  AND length((explanation)::text) <= 200000
  AND (peripherals IS NULL OR length((peripherals)::text) <= 800000)
  AND (question IS NULL OR length(question) <= 500)
);
