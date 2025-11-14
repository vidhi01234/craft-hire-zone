import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UpdateProfileData {
  full_name?: string;
  bio?: string;
  location?: string;
  phone?: string;
  avatar_url?: string;
}

interface UpdateWorkerProfileData {
  categories?: string[];
  hourly_rate?: number;
  experience_years?: number;
  availability_status?: 'available' | 'busy' | 'inactive';
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      profileData,
      workerProfileData,
    }: {
      profileData?: UpdateProfileData;
      workerProfileData?: UpdateWorkerProfileData;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Update profile if data provided
      if (profileData) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userData.user.id);

        if (profileError) throw profileError;
      }

      // Update worker profile if data provided
      if (workerProfileData) {
        const { error: workerError } = await supabase
          .from('worker_profiles')
          .update(workerProfileData)
          .eq('user_id', userData.user.id);

        if (workerError) throw workerError;
      }

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-profile'] });
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update profile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
