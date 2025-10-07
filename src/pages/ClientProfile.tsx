import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/layout/Navigation";
import { MapPin, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { DeleteProfileDialog } from "@/components/profile/DeleteProfileDialog";

export default function ClientProfile() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['client-profile', id || user?.id],
    queryFn: async () => {
      const targetUserId = id || user?.id;
      if (!targetUserId) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id || !!user?.id,
  });

  const isOwnProfile = !id || id === user?.id;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-card border-card-border">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={profileData.avatar_url || ''} />
                <AvatarFallback className="text-2xl">{profileData.full_name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-4">{profileData.full_name}</h1>
                
                <div className="space-y-3 mb-6">
                  {profileData.location && (
                    <div className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                      <MapPin className="h-5 w-5 flex-shrink-0" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                  {profileData.email && (
                    <div className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <a href={`mailto:${profileData.email}`} className="hover:text-primary transition-colors">
                        {profileData.email}
                      </a>
                    </div>
                  )}
                  {profileData.phone && (
                    <div className="flex items-center gap-3 text-muted-foreground justify-center md:justify-start">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <a href={`tel:${profileData.phone}`} className="hover:text-primary transition-colors">
                        {profileData.phone}
                      </a>
                    </div>
                  )}
                </div>

                {isOwnProfile && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <EditProfileDialog profileData={profileData} />
                    <DeleteProfileDialog />
                  </div>
                )}
              </div>
            </div>

            {profileData.bio && (
              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {profileData.bio}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}