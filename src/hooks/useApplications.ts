import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Application {
  id: string;
  job_id: string;
  worker_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  cover_message?: string;
  proposed_rate?: number;
  applied_at: string;
  jobs: {
    title: string;
    budget: number;
    category: string;
  };
  profiles: {
    full_name: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    email?: string;
    phone?: string;
  };
  worker_profiles?: {
    verified: boolean | null;
  };
}

export const useMyJobApplications = () => {
  return useQuery({
    queryKey: ['my-job-applications'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // First get all jobs posted by the user
      const { data: myJobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id')
        .eq('posted_by', userData.user.id);

      if (jobsError) throw jobsError;
      if (!myJobs || myJobs.length === 0) return [];

      const jobIds = myJobs.map(job => job.id);

      // Then get all applications for those jobs
      const { data: applicationsData, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (title, budget, category),
          profiles:worker_id (full_name, avatar_url, bio, location, email, phone)
        `)
        .in('job_id', jobIds)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      if (!applicationsData) return [];

      // Get unique worker IDs
      const workerIds = [...new Set(applicationsData.map(app => app.worker_id))];

      // Fetch worker profiles for all workers
      const { data: workerProfiles } = await supabase
        .from('worker_profiles')
        .select('user_id, verified')
        .in('user_id', workerIds);

      // Map worker profiles to applications
      const applicationsWithProfiles = applicationsData.map(app => ({
        ...app,
        worker_profiles: workerProfiles?.find(wp => wp.user_id === app.worker_id) || null,
      }));

      return applicationsWithProfiles as Application[];
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: 'accepted' | 'rejected' }) => {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-job-applications'] });
      queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
      toast({
        title: variables.status === 'accepted' ? 'Application accepted' : 'Application rejected',
        description: `You have ${variables.status} this application.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update application',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
