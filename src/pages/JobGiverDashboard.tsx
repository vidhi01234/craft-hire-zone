import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Plus, Briefcase, Users, Eye, TrendingUp } from "lucide-react";

// Mock data
const mockUser = {
  name: "Priya Sharma",
  role: 'job_giver' as const,
  avatar: "",
};

const mockJobs = [
  {
    id: '1',
    title: 'House Deep Cleaning Service',
    description: 'Looking for professional house cleaning service for 3BHK apartment in Koramangala. Need thorough cleaning including kitchen, bathrooms, and all rooms.',
    category: 'Cleaning',
    location: 'Koramangala, Bangalore',
    budget: 2500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Priya Sharma',
    applicantCount: 12,
  },
  {
    id: '2',
    title: 'Electrical Wiring Repair',
    description: 'Need experienced electrician to fix electrical wiring issues in bedroom and install new ceiling fan. Safety and quality work required.',
    category: 'Electrical',
    location: 'Gurgaon, Delhi NCR',
    budget: 3500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-10T14:30:00Z',
    posterName: 'Priya Sharma',
    applicantCount: 8,
  },
];

export default function JobGiverDashboard() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement job posting logic
    setIsPostJobOpen(false);
  };

  const stats = [
    {
      title: "Active Jobs",
      value: "2",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Currently posted",
    },
    {
      title: "Total Applications",
      value: "20",
      icon: <Users className="h-5 w-5" />,
      description: "Across all jobs",
    },
    {
      title: "Profile Views",
      value: "124",
      icon: <Eye className="h-5 w-5" />,
      description: "This month",
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Completed projects",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {mockUser.name}! Manage your job postings and applications.
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
                      placeholder="e.g. Web Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-category">Category</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-location">Location</Label>
                    <Input
                      id="job-location"
                      placeholder="e.g. Remote, New York, NY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-budget-type">Budget Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-budget">Budget ($)</Label>
                  <Input
                    id="job-budget"
                    type="number"
                    placeholder="Enter amount"
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-image">Project Image (Optional)</Label>
                  <Input
                    id="job-image"
                    type="file"
                    accept="image/*"
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-card-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Jobs */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Posted Jobs
                  <Badge variant="secondary">{mockJobs.length} Active</Badge>
                </CardTitle>
                <CardDescription>
                  Manage your job postings and view applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {mockJobs.length > 0 ? (
                    mockJobs.map((job) => (
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
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New application received</p>
                    <p className="text-xs text-muted-foreground">Website Redesign Project • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Job posted successfully</p>
                    <p className="text-xs text-muted-foreground">Mobile App Development • 5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile viewed</p>
                    <p className="text-xs text-muted-foreground">By 3 potential candidates • 1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

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