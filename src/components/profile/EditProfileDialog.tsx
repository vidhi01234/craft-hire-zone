import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

const profileSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  hourly_rate: z.string().optional(),
  experience_years: z.string().optional(),
  availability_status: z.enum(['available', 'busy', 'inactive']).optional(),
  categories: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  profileData: {
    full_name: string;
    bio?: string;
    location?: string;
    phone?: string;
    workerProfile?: {
      hourly_rate?: number;
      experience_years?: number;
      availability_status?: string;
      categories?: string[];
    };
  };
}

export function EditProfileDialog({ profileData }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profileData.full_name,
      bio: profileData.bio || '',
      location: profileData.location || '',
      phone: profileData.phone || '',
      hourly_rate: profileData.workerProfile?.hourly_rate?.toString() || '',
      experience_years: profileData.workerProfile?.experience_years?.toString() || '',
      availability_status: profileData.workerProfile?.availability_status as any || 'available',
      categories: profileData.workerProfile?.categories?.join(', ') || '',
    },
  });

  const availabilityStatus = watch('availability_status');

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile.mutateAsync({
      profileData: {
        full_name: data.full_name,
        bio: data.bio || null,
        location: data.location || null,
        phone: data.phone || null,
      },
      workerProfileData: {
        hourly_rate: data.hourly_rate ? parseFloat(data.hourly_rate) : undefined,
        experience_years: data.experience_years ? parseInt(data.experience_years) : undefined,
        availability_status: data.availability_status,
        categories: data.categories
          ? data.categories.split(',').map((c) => c.trim()).filter(Boolean)
          : undefined,
      },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and worker details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              {...register('full_name')}
              placeholder="Your full name"
            />
            {errors.full_name && (
              <p className="text-sm text-destructive">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register('bio')}
              placeholder="Tell us about yourself..."
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-4">Worker Details</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categories">Categories (comma separated)</Label>
                <Input
                  id="categories"
                  {...register('categories')}
                  placeholder="Web Development, Design, Marketing"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    step="0.01"
                    {...register('hourly_rate')}
                    placeholder="50.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years">Years of Experience</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    {...register('experience_years')}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability_status">Availability Status</Label>
                <Select
                  value={availabilityStatus}
                  onValueChange={(value) =>
                    setValue('availability_status', value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
