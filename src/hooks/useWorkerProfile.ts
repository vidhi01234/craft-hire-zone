import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useWorkerProfile = (userId?: string) => {
  return useQuery({
    queryKey: ['worker-profile', userId],
    queryFn: async () => {
      // If no userId provided, get the current user
      let targetUserId = userId;
      if (!targetUserId) {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error('Not authenticated');
        targetUserId = userData.user.id;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (profileError) throw profileError;

      const { data: workerProfile, error: workerError } = await supabase
        .from('worker_profiles')
        .select('*')
        .eq('user_id', targetUserId)
        .maybeSingle();

      if (workerError) throw workerError;

      return {
        ...profile,
        workerProfile,
      };
    },
    enabled: true,
  });
};
