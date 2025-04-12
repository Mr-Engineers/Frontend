-- Create profiles table to store additional user information
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create business_profiles table to store business information
CREATE TABLE public.business_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    industry TEXT NOT NULL,
    business_type TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create content_goals table to store user's content goals
CREATE TABLE public.content_goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    goal_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_business_profiles_user_id ON public.business_profiles(user_id);
CREATE INDEX idx_content_goals_user_id ON public.content_goals(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_goals ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies
-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Business profiles policies
CREATE POLICY "Users can view their own business profile"
    ON public.business_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own business profile"
    ON public.business_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own business profile"
    ON public.business_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Content goals policies
CREATE POLICY "Users can view their own content goals"
    ON public.content_goals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content goals"
    ON public.content_goals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content goals"
    ON public.content_goals FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle final onboarding submission
CREATE OR REPLACE FUNCTION public.handle_onboarding_completion(
    p_user_id UUID,
    p_industry TEXT,
    p_business_type TEXT,
    p_business_name TEXT,
    p_business_description TEXT,
    p_content_goals TEXT[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert business profile
    INSERT INTO public.business_profiles (
        user_id,
        industry,
        business_type,
        business_name,
        business_description
    ) VALUES (
        p_user_id,
        p_industry,
        p_business_type,
        p_business_name,
        p_business_description
    );

    -- Insert content goals
    INSERT INTO public.content_goals (user_id, goal_id)
    SELECT p_user_id, unnest(p_content_goals);
END;
$$; 