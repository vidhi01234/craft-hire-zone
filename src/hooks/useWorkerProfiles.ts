import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface WorkerProfileData {
  id: string;
  user_id: string;
  categories: string[];
  hourly_rate: number | null;
  experience_years: number | null;
  rating_average: number | null;
  total_jobs_completed: number | null;
  verified: boolean | null;
  profiles: {
    full_name: string;
    avatar_url: string | null;
    location: string | null;
    bio: string | null;
    email: string | null;
    phone: string | null;
  };
}

export const useWorkerProfiles = () => {
  return useQuery({
    queryKey: ['worker-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('worker_profiles')
        .select(`
          *,
          profiles!inner(
            full_name,
            avatar_url,
            location,
            bio,
            email,
            phone
          )
        `)
        .order('rating_average', { ascending: false, nullsFirst: false });

      if (error) throw error;
      return data as WorkerProfileData[];
    },
  });
};
