
-- Cloud sync table for optional accounts
CREATE TABLE public.user_cloud_data (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  recents JSONB NOT NULL DEFAULT '[]'::jsonb,
  presets JSONB NOT NULL DEFAULT '[]'::jsonb,
  preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_cloud_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own cloud data"
ON public.user_cloud_data FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "users insert own cloud data"
ON public.user_cloud_data FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users update own cloud data"
ON public.user_cloud_data FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "users delete own cloud data"
ON public.user_cloud_data FOR DELETE
USING (auth.uid() = user_id);
