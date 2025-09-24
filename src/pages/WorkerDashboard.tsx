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
import { User, Briefcase, Clock, Star, Edit, Search } from "lucide-react";

// Mock data
const mockUser = {
  name: "Alex Chen",
  role: 'worker' as const,
  avatar: "",
};

const mockRecommendedJobs = [
  {
    id: '3',
    title: 'E-commerce Store Development',
    description: 'Build a modern e-commerce website using React and Node.js. Must include payment integration and admin dashboard.',
    category: 'Web Development',
    location: 'Remote',
    budget: 5000,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-18T09:00:00Z',
    posterName: 'TechCorp Inc.',
  },
  {
    id: '4',
    title: 'Logo Design for Startup',
    description: 'Looking for a creative designer to create a memorable logo for our tech startup. Must be modern and scalable.',
    category: 'Design',
    location: 'San Francisco, CA',
    budget: 45,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-17T16:20:00Z',
    posterName: 'Innovation Labs',
  },
];

const mockAppliedJobs = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Looking for a skilled web designer to completely redesign our company website.',
    category: 'Web Design',
    location: 'Remote',
    budget: 2500,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Sarah Johnson',
    status: 'Under Review',
  },
];

export default function WorkerDashboard() {
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setIsProfileEditOpen(false);
  };

  const stats = [
    {
      title: "Applications Sent",
      value: "12",
      icon: <Briefcase className="h-5 w-5" />,
      description: "This month",
    },
    {
      title: "Active Proposals",
      value: "3",
      icon: <Clock className="h-5 w-5" />,
      description: "Awaiting response",
    },
    {
      title: "Profile Views",
      value: "87",
      icon: <User className="h-5 w-5" />,
      description: "Last 30 days",
    },
    {
      title: "Success Score",
      value: "4.8",
      icon: <Star className="h-5 w-5" />,
      description: "Average rating",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {mockUser.name}! Find your next opportunity.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Your Profile</DialogTitle>
                  <DialogDescription>
                    Update your professional information to attract better job opportunities.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        defaultValue="Alex"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        defaultValue="Chen"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Full Stack Developer"
                      defaultValue="Full Stack Developer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell potential employers about your experience and skills..."
                      rows={4}
                      defaultValue="Experienced developer with 5+ years in web technologies..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        defaultValue="Seattle, WA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                      <Input
                        id="hourly-rate"
                        type="number"
                        placeholder="50"
                        defaultValue="65"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      placeholder="JavaScript, React, Node.js, Python"
                      defaultValue="JavaScript, React, Node.js, Python, AWS"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Less than 1 year</SelectItem>
                        <SelectItem value="2">1-2 years</SelectItem>
                        <SelectItem value="3">3-5 years</SelectItem>
                        <SelectItem value="5">5-10 years</SelectItem>
                        <SelectItem value="10">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsProfileEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Update Profile
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button asChild>
              <Link to="/browse">
                <Search className="mr-2 h-4 w-4" />
                Browse Jobs
              </Link>
            </Button>
          </div>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Jobs */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  Jobs that match your skills and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {mockRecommendedJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      showApplyButton={true}
                    />
                  ))}
                  <div className="text-center pt-4">
                    <Button asChild variant="outline">
                      <Link to="/browse">View All Jobs</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applied Jobs */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Applications
                  <Badge variant="secondary">{mockAppliedJobs.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {mockAppliedJobs.map((job) => (
                    <div key={job.id} className="border border-card-border rounded-lg p-4 bg-muted/20">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{job.posterName}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{job.category}</span>
                            <span>{job.location}</span>
                            <span>${job.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge variant="outline">Under Review</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/jobs/${job.id}`}>View Job</Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Withdraw Application
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile Completion</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Professional photo added</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Skills listed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted rounded-full"></div>
                      <span>Portfolio examples needed</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setIsProfileEditOpen(true)}
                  >
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Application submitted</p>
                    <p className="text-xs text-muted-foreground">Website Redesign Project • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile viewed</p>
                    <p className="text-xs text-muted-foreground">By TechCorp Inc. • 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Skills updated</p>
                    <p className="text-xs text-muted-foreground">Added React & Node.js • 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            <Card className="bg-gradient-accent text-accent-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
                <p className="text-sm mb-4 opacity-90">
                  Workers with complete profiles get 3x more job invitations.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-accent">
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