
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS purposes text[] NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS public.build_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  email text,
  reviewed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.build_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit build suggestions"
  ON public.build_suggestions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(title) BETWEEN 1 AND 120
    AND length(description) BETWEEN 1 AND 2000
    AND (email IS NULL OR length(email) <= 255)
  );

CREATE POLICY "Only authenticated users can view build suggestions"
  ON public.build_suggestions FOR SELECT
  TO authenticated
  USING (true);
