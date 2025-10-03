import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/layout/Navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, DollarSign, Clock, User, Star, ArrowLeft, Send } from "lucide-react";
import { useJobDetail } from "@/hooks/useJobs";
import { useSubmitApplication } from "@/hooks/useWorkerApplications";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [proposalText, setProposalText] = useState('');

  const { data: job, isLoading, error } = useJobDetail(id || '');
  const submitApplication = useSubmitApplication();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !proposalText.trim()) return;

    submitApplication.mutate(
      {
        jobId: id,
        coverMessage: proposalText,
      },
      {
        onSuccess: () => {
          setIsApplicationOpen(false);
          setProposalText('');
        },
      }
    );
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-destructive">Job not found</p>
        </div>
      </div>
    );
  }

  const primaryImage = job.job_images?.find(img => img.is_primary)?.image_url || job.job_images?.[0]?.image_url;
  const posterName = job.profiles?.full_name || 'Unknown';
  const posterAvatar = job.profiles?.avatar_url;
  const applicantCount = job.applications?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {timeAgo(job.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {applicantCount} applicants
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {job.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <div className="flex items-center gap-1 text-success font-semibold text-lg">
                    <DollarSign className="h-5 w-5" />
                    ₹{job.budget.toLocaleString()}
                  </div>
                  
                  <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="shadow-brand-md">
                        <Send className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Apply for this Job</DialogTitle>
                        <DialogDescription>
                          Write a compelling proposal to stand out from other applicants.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleApply} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="proposal">Your Proposal</Label>
                          <Textarea
                            id="proposal"
                            placeholder="Explain why you're the perfect fit for this job, your relevant experience, and your approach to the project..."
                            rows={8}
                            value={proposalText}
                            onChange={(e) => setProposalText(e.target.value)}
                            required
                          />
                        </div>
                        
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Application Summary</h4>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>Job: {job.title}</p>
                              <p>Budget: ₹{job.budget.toLocaleString()}</p>
                              <p>Your proposal will be sent to {posterName}</p>
                            </div>
                          </div>

                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsApplicationOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={submitApplication.isPending}>
                            {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Job Image */}
                {primaryImage && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Project Image</h3>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={primaryImage} 
                        alt={job.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={posterAvatar} />
                    <AvatarFallback>{posterName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{posterName}</p>
                    {job.profiles?.location && (
                      <p className="text-sm text-muted-foreground">{job.profiles.location}</p>
                    )}
                  </div>
                </div>
                
                {job.profiles?.bio && (
                  <p className="text-sm text-muted-foreground">{job.profiles.bio}</p>
                )}

                <Button asChild variant="outline" className="w-full">
                  <Link to={`/client/${job.posted_by}`}>
                    View Client Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Job Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Applications</span>
                  <span className="font-medium text-foreground">{applicantCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-foreground capitalize">{job.status}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border-b border-card-border pb-3">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      <Link to="/jobs/2" className="hover:text-primary transition-smooth">
                        Mobile App UI Design
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">Posted 2 days ago</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary" className="text-xs">Design</Badge>
                      <span className="text-success font-medium">$1,800</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-card-border pb-3">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      <Link to="/jobs/3" className="hover:text-primary transition-smooth">
                        E-commerce Website
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">Posted 4 days ago</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary" className="text-xs">Web Dev</Badge>
                      <span className="text-success font-medium">$5,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      <Link to="/jobs/4" className="hover:text-primary transition-smooth">
                        Brand Identity Design
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">Posted 1 week ago</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary" className="text-xs">Design</Badge>
                      <span className="text-success font-medium">$65/hr</span>
                    </div>
                  </div>
                </div>
                
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/browse">View More Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}