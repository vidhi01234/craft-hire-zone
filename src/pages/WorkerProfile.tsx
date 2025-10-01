import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/layout/Navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MapPin, Briefcase, Clock, Mail, Award, TrendingUp } from "lucide-react";
import { useWorkerProfile } from "@/hooks/useWorkerProfile";
import { useAuth } from "@/hooks/useAuth";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";

export default function WorkerProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Use id from URL params if provided, otherwise use current user's id
  const { data: profileData, isLoading } = useWorkerProfile(id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement message sending logic
    setIsContactOpen(false);
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = !id || id === user?.id;
  const workerProfile = profileData.workerProfile;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-card-border mb-8">
              <CardContent className="p-8">
                 <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0">
                    <AvatarImage src={profileData.avatar_url || ''} />
                    <AvatarFallback className="text-2xl">{profileData.full_name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{profileData.full_name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">
                      {workerProfile?.categories?.[0] || 'Worker'}
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                      {profileData.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profileData.location}
                        </div>
                      )}
                      {workerProfile && (
                        <>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {workerProfile.rating_average || 0} rating
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {workerProfile.total_jobs_completed || 0} jobs completed
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      {isOwnProfile ? (
                        <EditProfileDialog profileData={profileData} />
                      ) : (
                        <>
                          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                            <DialogTrigger asChild>
                              <Button size="lg">
                                <Mail className="mr-2 h-4 w-4" />
                                Contact {profileData.full_name}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Message to {profileData.full_name}</DialogTitle>
                                <DialogDescription>
                                  Send a direct message to discuss your project requirements.
                                </DialogDescription>
                              </DialogHeader>
                              
                              <form onSubmit={handleSendMessage} className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="message">Your Message</Label>
                                  <Textarea
                                    id="message"
                                    placeholder={`Hi ${profileData.full_name}, I have a project that might be a good fit for your skills...`}
                                    rows={6}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                  />
                                </div>
                                
                                <div className="flex justify-end gap-3">
                                  <Button type="button" variant="outline" onClick={() => setIsContactOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit">
                                    Send Message
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="outline" size="lg">
                            Invite to Job
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                {profileData.bio && (
                  <Card className="bg-gradient-card border-card-border">
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {profileData.bio}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {workerProfile?.categories && workerProfile.categories.length > 0 && (
                  <Card className="bg-gradient-card border-card-border">
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {workerProfile.categories.map((category, index) => (
                          <Badge key={index} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card className="bg-gradient-card border-card-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center">Portfolio items coming soon</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="bg-gradient-card border-card-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center">No reviews yet</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {workerProfile?.experience_years ? (
                      <div className="border-l-2 border-primary pl-4">
                        <p className="text-muted-foreground">
                          {workerProfile.experience_years} years of experience
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center">No experience information available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Professional Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workerProfile?.hourly_rate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Hourly Rate</span>
                    <span className="font-semibold text-success">${workerProfile.hourly_rate}/hr</span>
                  </div>
                )}
                {workerProfile && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Jobs Completed</span>
                      <span className="font-semibold text-foreground">{workerProfile.total_jobs_completed || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-semibold text-success">{workerProfile.rating_average || 0}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={workerProfile.availability_status === 'available' ? 'default' : 'secondary'}>
                        {workerProfile.availability_status || 'available'}
                      </Badge>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold text-foreground">
                    {new Date(profileData.created_at).getFullYear()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            {workerProfile?.verified && (
              <Card className="bg-gradient-secondary text-secondary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6" />
                    <h3 className="font-semibold">Verified Worker</h3>
                  </div>
                  <p className="text-sm opacity-90">
                    This worker has been verified by Local Connect.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  Invite to Project
                </Button>
                <Button variant="ghost" className="w-full">
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}