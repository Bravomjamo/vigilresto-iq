CREATE TABLE public.company_whitelist (
    email TEXT PRIMARY KEY LOWER,
    full_name TEXT NOT NULL,
    rank TEXT NOT NULL CHECK (rank IN ('CEO', 'HR', 'Manager', 'Secretary', 'Cashier')),
    branch_id TEXT NOT NULL DEFAULT 'ALL' -
);

ALTER TABLE public.company_whitelist ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by TEXT NOT NULL,
    target_branch_id TEXT NOT NULL,
    meeting_time TIMESTAMP WITH TIME ZONE NOT NULL,
    agenda TEXT NOT NULL
);

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION supabase_realtime ADD TABLE public.meetings;

CREATE POLICY "CEO and HR can manage whitelist" 
ON public.company_whitelist
AS DEFINER
USING (
  auth.jwt() -> 'app_metadata' ->> 'rank' IN ('CEO', 'HR')
);

CREATE POLICY "CEO and HR can create meetings" 
ON public.meetings 
FOR INSERT 
WITH CHECK (
  auth.jwt() -> 'app_metadata' ->> 'rank' IN ('CEO', 'HR')
);

CREATE POLICY "Users can only read meetings for their branch" 
ON public.meetings 
FOR SELECT 
USING (
  auth.jwt() -> 'app_metadata' ->> 'rank' IN ('CEO', 'HR')
  OR 
  target_branch_id = auth.jwt() -> 'app_metadata' ->> 'branch_id'
);


CREATE OR REPLACE FUNCTION public.handle_user_metadata_sync()
RETURNS trigger AS $$
DECLARE
    user_rank TEXT;
    user_branch TEXT;
BEGIN
    SELECT rank, branch_id INTO user_rank, user_branch
    FROM public.company_whitelist
    WHERE email = NEW.email;

    IF user_rank IS NOT NULL THEN
        NEW.raw_app_meta_data := jsonb_build_object(
            'rank', user_rank,
            'branch_id', user_branch
        );

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_or_updated
    BEFORE INSERT OR UPDATE OF email ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_user_metadata_sync();