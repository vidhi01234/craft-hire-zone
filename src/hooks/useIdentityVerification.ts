import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type DocumentType = 'passport' | 'drivers_license' | 'national_id';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface IdentityVerification {
  id: string;
  user_id: string;
  document_type: DocumentType;
  document_url: string;
  status: VerificationStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewer_notes: string | null;
}

export const useIdentityVerification = () => {
  return useQuery({
    queryKey: ['identity-verification'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('identity_verifications')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as IdentityVerification | null;
    },
  });
};

export const useSubmitVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      documentType,
      file,
    }: {
      documentType: DocumentType;
      file: File;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userData.user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('identity-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the file URL
      const { data: urlData } = supabase.storage
        .from('identity-documents')
        .getPublicUrl(fileName);

      // Create verification record
      const { error: verificationError } = await supabase
        .from('identity_verifications')
        .insert({
          user_id: userData.user.id,
          document_type: documentType,
          document_url: urlData.publicUrl,
          status: 'pending',
        });

      if (verificationError) throw verificationError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['identity-verification'] });
      queryClient.invalidateQueries({ queryKey: ['worker-profile'] });
      toast({
        title: 'Verification submitted',
        description: 'Your identity document has been submitted for review.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to submit verification',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
