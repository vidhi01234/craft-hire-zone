-- Create identity_verifications table
CREATE TABLE public.identity_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'drivers_license', 'national_id')),
  document_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.identity_verifications ENABLE ROW LEVEL SECURITY;

-- Workers can view their own verification requests
CREATE POLICY "Workers can view their own verifications"
ON public.identity_verifications
FOR SELECT
USING (auth.uid() = user_id);

-- Workers can create their own verification requests
CREATE POLICY "Workers can create verifications"
ON public.identity_verifications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for identity documents (private)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('identity-documents', 'identity-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for identity documents
CREATE POLICY "Users can upload their own identity documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'identity-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own identity documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'identity-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add trigger for updated_at
CREATE TRIGGER update_identity_verifications_updated_at
BEFORE UPDATE ON public.identity_verifications
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();