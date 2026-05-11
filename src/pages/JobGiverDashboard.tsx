import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/Navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Briefcase, Users, Eye, TrendingUp, Star, MapPin } from "lucide-react";
import { useMyJobs, useCreateJob } from "@/hooks/useJobs";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { useAuth } from "@/hooks/useAuth";
import { ApplicationsList } from "@/components/applications/ApplicationsList";
import { useMyJobApplications } from "@/hooks/useApplications";

export default function JobGiverDashboard() {
  const navigate = useNavigate();
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { user } = useAuth();
  const { data: jobs = [], isLoading } = useMyJobs();
  const { data: applications = [] } = useMyJobApplications();
  const createJob = useCreateJob();

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createJob.mutateAsync({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      budget: parseFloat(formData.budget),
      imageUrls,
    });

    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      budget: "",
    });
    setImageUrls([]);
    setIsPostJobOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const activeJobs = jobs.filter(job => job.status === 'open').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const acceptedApplications = applications.filter(app => app.status === 'accepted').length;

  const stats = [
    {
      title: "Active Jobs",
      value: activeJobs.toString(),
      icon: <Briefcase className="h-5 w-5" />,
      description: "Currently posted",
    },
    {
      title: "Total Applications",
      value: totalApplications.toString(),
      icon: <Users className="h-5 w-5" />,
      description: "Across all jobs",
    },
    {
      title: "Pending Review",
      value: pendingApplications.toString(),
      icon: <Eye className="h-5 w-5" />,
      description: "Awaiting response",
    },
    {
      title: "Accepted",
      value: acceptedApplications.toString(),
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Applications approved",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Manage your job postings and applications.
            </p>
          </div>
          
          <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-brand-md">
                <Plus className="mr-2 h-5 w-5" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post a New Job</DialogTitle>
                <DialogDescription>
                  Create a detailed job posting to attract the best candidates.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handlePostJob} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input
                      id="job-title"
                      placeholder="e.g. House Cleaning"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Handyman">Handyman</SelectItem>
                        <SelectItem value="Gardening">Gardening</SelectItem>
                        <SelectItem value="Tutoring">Tutoring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description">Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the job requirements, skills needed, and project details..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-location">Location</Label>
                    <Input
                      id="job-location"
                      placeholder="e.g. Bangalore, India"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-budget">Budget (₹)</Label>
                    <Input
                      id="job-budget"
                      type="number"
                      placeholder="Enter amount"
                      min="1"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Project Image (Optional)</Label>
                  <ImageUpload
                    bucket="job-images"
                    onUploadComplete={(url) => setImageUrls([...imageUrls, url])}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsPostJobOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Post Job
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>


        {/* Applications */}
        <div className="mb-8">
          <ApplicationsList />
        </div>

        {/* My Jobs */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass border-card-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Posted Jobs
                  <Badge variant="secondary">{jobs.length} Active</Badge>
                </CardTitle>
                <CardDescription>
                  Manage your job postings and view applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {isLoading ? (
                    <p className="text-center text-muted-foreground">Loading jobs...</p>
                  ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        showManageButton={true}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No jobs posted yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create your first job posting to start hiring talented workers.
                      </p>
                      <Button onClick={() => setIsPostJobOpen(true)}>
                        Post Your First Job
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Boost Your Jobs</h3>
                <p className="text-sm mb-4 opacity-90">
                  Increase visibility and get more qualified applications.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-secondary">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}