import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface WorkerApplication {
  id: string;
  job_id: string;
  worker_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  cover_message?: string;
  proposed_rate?: number;
  applied_at: string;
  jobs: {
    id: string;
    title: string;
    budget: number;
    category: string;
    location: string;
    posted_by: string;
    profiles: {
      full_name: string;
      avatar_url?: string;
    };
  };
}

export const useWorkerApplications = () => {
  return useQuery({
    queryKey: ['worker-applications'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            id,
            title,
            budget,
            category,
            location,
            posted_by,
            profiles:posted_by (full_name, avatar_url)
          )
        `)
        .eq('worker_id', userData.user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data as WorkerApplication[];
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationId: string) => {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-applications'] });
      toast({
        title: 'Application withdrawn',
        description: 'Your application has been withdrawn successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to withdraw application',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, coverMessage, proposedRate }: { 
      jobId: string; 
      coverMessage: string; 
      proposedRate?: number;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          worker_id: userData.user.id,
          cover_message: coverMessage,
          proposed_rate: proposedRate,
          status: 'pending',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-applications'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Application submitted',
        description: 'Your application has been submitted successfully. The job poster will review it soon.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to submit application',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
