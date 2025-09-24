import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/layout/Navigation";
import { JobCard } from "@/components/jobs/JobCard";
import { Star, MapPin, Briefcase, Clock, Building, TrendingUp, Users } from "lucide-react";

// Mock data
const mockClient = {
  id: '1',
  name: 'Sarah Johnson',
  company: 'Creative Solutions Inc.',
  avatar: '',
  location: 'San Francisco, CA',
  industry: 'Digital Marketing',
  memberSince: '2020-01-15',
  jobsPosted: 15,
  totalSpent: 87500,
  hireRate: 92,
  rating: 4.8,
  reviewCount: 12,
  bio: `Creative Solutions Inc. is a leading digital marketing agency helping businesses grow their online presence. We specialize in comprehensive digital strategies that drive results for our clients.

We believe in working with talented freelancers and contractors who share our passion for excellence. Our projects range from website development and design to content creation and digital marketing campaigns.

We value clear communication, timely delivery, and high-quality work. We provide detailed project requirements and are always available to answer questions throughout the project lifecycle.`,
  activeJobs: [
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
      applicantCount: 12,
    },
    {
      id: '2',
      title: 'Content Marketing Strategy',
      description: 'Need an experienced content strategist to develop a comprehensive content marketing plan.',
      category: 'Marketing',
      location: 'Remote',
      budget: 65,
      budgetType: 'hourly' as const,
      postedAt: '2024-01-18T14:00:00Z',
      posterName: 'Sarah Johnson',
      applicantCount: 8,
    }
  ],
  completedJobs: [
    {
      id: '3',
      title: 'E-commerce Platform Development',
      description: 'Built a complete e-commerce solution with payment integration.',
      category: 'Web Development',
      budget: 8500,
      budgetType: 'fixed' as const,
      completedAt: '2023-12-20',
      workerName: 'Alex Chen',
      rating: 5
    },
    {
      id: '4',
      title: 'Brand Identity Design',
      description: 'Created comprehensive brand identity including logo and guidelines.',
      category: 'Design',
      budget: 3200,
      budgetType: 'fixed' as const,
      completedAt: '2023-11-15',
      workerName: 'Maria Rodriguez',
      rating: 5
    }
  ],
  reviews: [
    {
      id: '1',
      workerName: 'Alex Chen',
      rating: 5,
      comment: 'Excellent client! Clear requirements, prompt communication, and fair payment. Would definitely work with Sarah again.',
      projectTitle: 'E-commerce Platform',
      date: '2023-12-22'
    },
    {
      id: '2',
      workerName: 'Maria Rodriguez',
      rating: 5,
      comment: 'Great experience working with Creative Solutions. Professional, organized, and respectful throughout the project.',
      projectTitle: 'Brand Identity Design',
      date: '2023-11-18'
    }
  ]
};

export default function ClientProfile() {
  const { id } = useParams();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

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
                    <AvatarImage src={mockClient.avatar} />
                    <AvatarFallback className="text-2xl">{mockClient.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{mockClient.name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{mockClient.company}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {mockClient.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {mockClient.industry}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {mockClient.rating} ({mockClient.reviewCount} reviews)
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {mockClient.jobsPosted} jobs posted
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="active">Active Jobs</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>About {mockClient.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {mockClient.bio}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <div className="space-y-6">
                  {mockClient.activeJobs.map((job) => (
                    <JobCard key={job.id} job={job} showApplyButton={true} />
                  ))}
                  {mockClient.activeJobs.length === 0 && (
                    <Card className="bg-gradient-card border-card-border text-center py-12">
                      <CardContent>
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          No active jobs
                        </h3>
                        <p className="text-muted-foreground">
                          This client doesn't have any active job postings at the moment.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <div className="space-y-6">
                  {mockClient.completedJobs.map((job) => (
                    <Card key={job.id} className="bg-gradient-card border-card-border">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{job.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="secondary">{job.category}</Badge>
                              <span className="text-success font-medium">
                                ${job.budget.toLocaleString()} {job.budgetType}
                              </span>
                              <span>Completed {new Date(job.completedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-1 mb-1">
                              {renderStars(job.rating)}
                            </div>
                            <p className="text-sm text-muted-foreground">by {job.workerName}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {mockClient.reviews.map((review) => (
                  <Card key={review.id} className="bg-gradient-card border-card-border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{review.workerName}</h4>
                          <p className="text-sm text-muted-foreground">{review.projectTitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-1 mb-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        "{review.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Client Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Jobs Posted</span>
                  <span className="font-semibold text-foreground">{mockClient.jobsPosted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-semibold text-success">${mockClient.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hire Rate</span>
                  <span className="font-semibold text-success">{mockClient.hireRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg. Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{mockClient.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold text-foreground">
                    {new Date(mockClient.memberSince).getFullYear()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6" />
                  <h3 className="font-semibold">Verified Client</h3>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  This client has been verified and has a strong track record of successful projects.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    Top Client
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Industry Info */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="font-medium text-foreground">{mockClient.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Company Size</span>
                  <span className="font-medium text-foreground">50-100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{mockClient.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-medium text-success">Within 2 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}