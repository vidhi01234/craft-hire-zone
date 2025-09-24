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
import { MapPin, DollarSign, Clock, User, Briefcase, Star, ArrowLeft, Send } from "lucide-react";

// Mock data
const mockJob = {
  id: '1',
  title: 'Website Redesign Project',
  description: `We are looking for a skilled web designer to completely redesign our company website. The current site needs a modern, professional look that reflects our brand values and improves user experience.

Key Requirements:
• Modern, responsive design that works on all devices
• Clean, professional aesthetic with intuitive navigation
• Integration with existing content management system
• Performance optimization for fast loading times
• SEO-friendly structure and markup
• Accessibility compliance (WCAG 2.1 AA)

Project Timeline:
The project should be completed within 6-8 weeks from the start date. We expect regular check-ins and milestone deliveries throughout the process.

What We Provide:
• Brand guidelines and existing assets
• Content strategy and copywriting
• Technical requirements documentation
• Access to current website and analytics

Ideal Candidate:
• 5+ years of web design experience
• Strong portfolio of similar projects
• Proficiency in modern design tools (Figma, Sketch, etc.)
• Understanding of front-end development principles
• Excellent communication and project management skills`,
  category: 'Web Design',
  location: 'Remote',
  budget: 2500,
  budgetType: 'fixed' as const,
  postedAt: '2024-01-15T10:00:00Z',
  posterName: 'Sarah Johnson',
  posterCompany: 'Creative Solutions Inc.',
  posterAvatar: '',
  applicantCount: 12,
  skills: ['Web Design', 'UI/UX', 'Responsive Design', 'Figma', 'HTML/CSS'],
  images: [],
};

const mockApplicants = [
  {
    id: '1',
    name: 'Alex Chen',
    title: 'Senior Web Designer',
    avatar: '',
    rating: 4.9,
    completedJobs: 47,
    proposalText: 'I have extensive experience in web design and would love to help redesign your website. My approach focuses on user-centered design principles...',
    appliedAt: '2024-01-16T09:30:00Z',
  },
  {
    id: '2', 
    name: 'Maria Rodriguez',
    title: 'Full Stack Designer',
    avatar: '',
    rating: 4.8,
    completedJobs: 32,
    proposalText: 'Your project aligns perfectly with my expertise. I specialize in creating modern, responsive websites that convert visitors into customers...',
    appliedAt: '2024-01-16T14:15:00Z',
  },
];

export default function JobDetail() {
  const { id } = useParams();
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [proposalText, setProposalText] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement application logic
    setIsApplicationOpen(false);
    setProposalText('');
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
                      {mockJob.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {timeAgo(mockJob.postedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {mockJob.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {mockJob.applicantCount} applicants
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {mockJob.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <div className="flex items-center gap-1 text-success font-semibold text-lg">
                    <DollarSign className="h-5 w-5" />
                    {mockJob.budgetType === 'fixed' 
                      ? `$${mockJob.budget.toLocaleString()} fixed price`
                      : `$${mockJob.budget}/hour`
                    }
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
                            <p>Job: {mockJob.title}</p>
                            <p>Budget: ${mockJob.budget.toLocaleString()} {mockJob.budgetType}</p>
                            <p>Your proposal will be sent to {mockJob.posterName}</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsApplicationOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            Submit Application
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {mockJob.description}
                  </div>
                </div>

                {/* Skills Required */}
                {mockJob.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockJob.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Images */}
                {mockJob.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Project Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockJob.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`Project image ${index + 1}`}
                          className="rounded-lg object-cover aspect-video"
                        />
                      ))}
                    </div>
                  </div>
                )}
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
                    <AvatarImage src={mockJob.posterAvatar} />
                    <AvatarFallback>{mockJob.posterName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{mockJob.posterName}</p>
                    <p className="text-sm text-muted-foreground">{mockJob.posterCompany}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="text-foreground">Jan 2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jobs posted</span>
                    <span className="text-foreground">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hire rate</span>
                    <span className="text-foreground">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground">4.9</span>
                    </div>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to={`/profile/client/${mockJob.posterName}`}>
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
                  <span className="font-medium text-foreground">{mockJob.applicantCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Saved</span>
                  <span className="font-medium text-foreground">23</span>
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