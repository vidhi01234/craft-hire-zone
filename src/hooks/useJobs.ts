import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  posted_by: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
  job_images?: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
  }>;
  applications?: Array<{ id: string }>;
}

export const useJobs = (filters?: {
  category?: string;
  location?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          profiles:posted_by (full_name, avatar_url),
          job_images (id, image_url, is_primary),
          applications (id)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (filters?.category && filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }

      if (filters?.location && filters.location !== 'All') {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Job[];
    },
  });
};

export const useJobDetail = (jobId: string) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          profiles:posted_by (full_name, avatar_url, bio, location),
          job_images (id, image_url, is_primary),
          applications (
            id,
            status,
            worker_id,
            profiles:worker_id (full_name, avatar_url)
          )
        `)
        .eq('id', jobId)
        .single();

      if (error) throw error;
      return data as Job;
    },
    enabled: !!jobId,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData: {
      title: string;
      description: string;
      category: string;
      location: string;
      budget: number;
      imageUrls: string[];
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      // Create job
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .insert({
          title: jobData.title,
          description: jobData.description,
          category: jobData.category,
          location: jobData.location,
          budget: jobData.budget,
          posted_by: userData.user.id,
        })
        .select()
        .single();

      if (jobError) throw jobError;

      // Create job images
      if (jobData.imageUrls.length > 0) {
        const imageInserts = jobData.imageUrls.map((url, index) => ({
          job_id: job.id,
          image_url: url,
          is_primary: index === 0,
        }));

        const { error: imagesError } = await supabase
          .from('job_images')
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      return job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job posted!',
        description: 'Your job has been posted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to post job',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useMyJobs = () => {
  return useQuery({
    queryKey: ['my-jobs'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          job_images (id, image_url, is_primary),
          applications (id, status)
        `)
        .eq('posted_by', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });
};
