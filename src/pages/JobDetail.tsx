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

// Import job images
import gardeningImage from "@/assets/job-gardening.jpg";
import electricianImage from "@/assets/job-electrician.jpg";
import plumbingImage from "@/assets/job-plumbing.jpg";
import cleaningImage from "@/assets/job-cleaning.jpg";
import handymanImage from "@/assets/job-handyman.jpg";
import tutoringImage from "@/assets/job-tutoring.jpg";
import webDesignImage from "@/assets/job-web-design.jpg";
import mobileDevImage from "@/assets/job-mobile-dev.jpg";

// Mock jobs data matching BrowseJobs
const mockJobs = [
  {
    id: '1',
    title: 'Garden Maintenance & Landscaping',
    description: `Need an experienced gardener for weekly garden maintenance, pruning, lawn care, and seasonal planting in residential property.

Key Requirements:
• Weekly garden maintenance and lawn care
• Seasonal planting and garden design
• Tree and shrub pruning expertise
• Lawn mowing and edging
• Weed control and fertilization
• Garden bed maintenance and mulching

Project Details:
This is an ongoing weekly service needed for a 0.5-acre residential property. The ideal candidate should have experience with both ornamental and vegetable gardens.

What We Provide:
• Basic gardening tools and equipment
• Seasonal plants and materials budget
• Water access and storage shed
• Flexible scheduling options

Ideal Candidate:
• 3+ years of professional gardening experience
• Knowledge of local plants and growing conditions
• Own transportation and basic tools
• Reliable and detail-oriented
• Good communication skills`,
    category: 'Gardening',
    location: 'Brooklyn, NY',
    budget: 40,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-15T10:00:00Z',
    posterName: 'Sarah Johnson',
    posterCompany: 'Homeowner',
    posterAvatar: '',
    applicantCount: 8,
    skills: ['Gardening', 'Landscaping', 'Plant Care', 'Lawn Maintenance', 'Pruning'],
    image: gardeningImage,
  },
  {
    id: '2',
    title: 'Electrical Wiring & Installation',
    description: `Licensed electrician needed for home electrical work including outlet installation, lighting fixtures, and electrical panel upgrade.

Scope of Work:
• Install 6 new electrical outlets in living room
• Replace outdated light fixtures (5 rooms)
• Upgrade electrical panel to modern standards
• Install ceiling fan in master bedroom
• Troubleshoot existing electrical issues
• Ensure all work meets local building codes

Safety Requirements:
All work must be performed by a licensed electrician with proper insurance coverage. We will need permits pulled for the panel upgrade work.

Timeline:
Project should be completed within 2-3 days. We can work around your schedule for the best times.

What We Provide:
• All electrical materials and fixtures
• Access to electrical panel and work areas
• Permits and inspection coordination

Ideal Candidate:
• Licensed electrician with 5+ years experience
• Bonded and insured
• Experience with residential electrical systems
• Knowledge of local electrical codes
• Professional references available`,
    category: 'Electrical',
    location: 'Queens, NY',
    budget: 75,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-10T14:30:00Z',
    posterName: 'Mike Wilson',
    posterCompany: 'Homeowner',
    posterAvatar: '',
    applicantCount: 5,
    skills: ['Electrical Wiring', 'Licensed Electrician', 'Panel Upgrade', 'Code Compliance', 'Troubleshooting'],
    image: electricianImage,
  },
  {
    id: '3',
    title: 'Kitchen Plumbing Repair',
    description: `Experienced plumber needed to fix kitchen sink leak, replace faucet, and check water pressure issues. Same day service preferred.

Issues to Address:
• Kitchen sink has persistent leak under cabinet
• Replace old faucet with new pull-out sprayer model
• Low water pressure in kitchen sink only
• Check garbage disposal connections
• Inspect shut-off valves and replace if needed

Urgency:
This is causing water damage to the cabinet, so same-day or next-day service is highly preferred.

What We Provide:
• New faucet (already purchased)
• Access to all plumbing areas
• Immediate payment upon completion

Ideal Candidate:
• Licensed plumber with emergency service availability
• Experience with kitchen plumbing repairs
• Own tools and basic supplies
• Can provide same-day or next-day service
• Professional and reliable`,
    category: 'Plumbing',
    location: 'Manhattan, NY',
    budget: 200,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-18T09:00:00Z',
    posterName: 'Lisa Chen',
    posterCompany: 'Homeowner',
    posterAvatar: '',
    applicantCount: 12,
    skills: ['Plumbing Repair', 'Emergency Service', 'Faucet Installation', 'Leak Repair', 'Kitchen Plumbing'],
    image: plumbingImage,
  },
  {
    id: '4',
    title: 'Deep House Cleaning Service',
    description: `Professional house cleaning service needed for 3-bedroom apartment. Looking for thorough cleaning including windows, appliances, and bathrooms.

Cleaning Scope:
• Deep clean all 3 bedrooms and common areas
• Scrub bathrooms including tiles and fixtures
• Clean inside/outside of all appliances
• Wash windows (inside only, 2nd floor)
• Vacuum and mop all floors
• Dust all surfaces and ceiling fans

Special Requirements:
• Use eco-friendly cleaning products only
• Must be bonded and insured
• Flexible with pet-friendly cleaning methods
• Attention to detail is essential

Timeline:
One-time deep clean, approximately 6-8 hours of work. Can be split over 2 days if needed.

What We Provide:
• All cleaning supplies and equipment
• List of specific areas needing attention
• Access to apartment and parking

Ideal Candidate:
• Professional cleaning service with references
• Experience with deep cleaning services
• Eco-friendly cleaning products and methods
• Bonded and insured
• Excellent attention to detail`,
    category: 'Cleaning',
    location: 'Bronx, NY',
    budget: 150,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-17T16:20:00Z',
    posterName: 'Robert Martinez',
    posterCompany: 'Homeowner',
    posterAvatar: '',
    applicantCount: 15,
    skills: ['House Cleaning', 'Deep Cleaning', 'Eco-Friendly', 'Window Cleaning', 'Appliance Cleaning'],
    image: cleaningImage,
  },
  {
    id: '5',
    title: 'Home Renovation & Repairs',
    description: `Skilled handyman needed for various home repairs including drywall patching, painting, door installation, and furniture assembly.

Repair List:
• Patch and paint drywall holes (living room)
• Install new interior door and frame
• Assemble IKEA furniture (3 pieces)
• Fix squeaky hardwood floors
• Repair loose cabinet handles
• Touch-up paint in multiple rooms

Skills Needed:
• Drywall repair and painting
• Door installation experience
• Furniture assembly expertise
• Basic carpentry skills
• Attention to detail and quality work

Timeline:
Flexible scheduling over 2-3 weekends. Can work around family schedule.

What We Provide:
• All materials and hardware
• Paint and supplies
• Tools if needed (though prefer you bring your own)
• Clear instructions and priorities

Ideal Candidate:
• Experienced handyman with diverse skills
• Own basic tools and transportation
• Weekend availability preferred
• Good problem-solving abilities
• Professional and reliable`,
    category: 'Handyman',
    location: 'Staten Island, NY',
    budget: 50,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-16T11:00:00Z',
    posterName: 'Jennifer Davis',
    posterCompany: 'Homeowner',
    posterAvatar: '',
    applicantCount: 6,
    skills: ['Drywall Repair', 'Painting', 'Door Installation', 'Furniture Assembly', 'General Repairs'],
    image: handymanImage,
  },
  {
    id: '6',
    title: 'Math Tutoring for High School',
    description: `Experienced math tutor needed for high school student. Help with algebra, geometry, and calculus preparation. Flexible schedule preferred.

Student Profile:
• Junior in high school (11th grade)
• Struggling with Algebra II and Pre-Calculus
• Needs help preparing for SATs
• Learns best with visual and hands-on methods
• Available after school and weekends

Tutoring Goals:
• Improve understanding of algebraic concepts
• Build confidence in problem-solving
• Prepare for upcoming tests and SATs
• Develop better study habits and techniques
• Support homework completion

Session Details:
• 2-3 sessions per week, 1.5 hours each
• Flexible scheduling (afternoons/evenings/weekends)
• Can meet at our home or local library
• Long-term commitment preferred (rest of school year)

What We Provide:
• Quiet study space
• Access to textbooks and materials
• Regular communication about progress
• Competitive hourly rate

Ideal Candidate:
• Degree in mathematics or related field
• Experience tutoring high school students
• Patient and encouraging teaching style
• Flexible schedule
• Excellent communication with parents and student`,
    category: 'Tutoring',
    location: 'Long Island, NY',
    budget: 35,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-19T08:15:00Z',
    posterName: 'Thomas Brown',
    posterCompany: 'Parent',
    posterAvatar: '',
    applicantCount: 9,
    skills: ['Math Tutoring', 'High School Math', 'SAT Prep', 'Algebra', 'Calculus'],
    image: tutoringImage,
  },
  {
    id: '7',
    title: 'Website Development for Local Business',
    description: `Small business needs a simple website with contact information, services, and online booking system. Mobile-friendly design required.

Website Requirements:
• Professional homepage with business info
• Services page with pricing
• Online booking/appointment system
• Contact page with map integration
• Photo gallery for completed work
• Mobile-responsive design
• SEO-friendly structure

Business Type:
Local home services company needing online presence to attract more customers and streamline booking process.

Timeline:
Website needed within 4-6 weeks. Ongoing maintenance and updates may be available.

What We Provide:
• All content and photos
• Business information and branding
• Hosting and domain (or guidance on setup)
• Clear requirements and feedback

Ideal Candidate:
• Experience building small business websites
• Knowledge of booking systems integration
• Mobile-first design approach
• SEO best practices understanding
• Good communication and project management`,
    category: 'Web Development',
    location: 'Brooklyn, NY',
    budget: 800,
    budgetType: 'fixed' as const,
    postedAt: '2024-01-14T12:00:00Z',
    posterName: 'Maria Rodriguez',
    posterCompany: 'Local Business Owner',
    posterAvatar: '',
    applicantCount: 11,
    skills: ['Web Development', 'Booking Systems', 'Mobile Design', 'SEO', 'Small Business'],
    image: webDesignImage,
  },
  {
    id: '8',
    title: 'Mobile App for Service Booking',
    description: `Looking for mobile developer to create a service booking app for home maintenance services. iOS and Android compatibility needed.

App Features:
• Service provider profiles and ratings
• Real-time booking and scheduling
• Payment processing integration
• Photo sharing for completed work
• Push notifications for appointments
• GPS location services
• Review and rating system

Technical Requirements:
• iOS and Android compatibility
• Real-time synchronization
• Secure payment processing
• Photo upload and storage
• Push notification system
• GPS integration

Timeline:
3-4 month development timeline with regular milestone deliveries and testing phases.

What We Provide:
• Detailed app requirements and wireframes
• Business logic and user flow documentation
• Design assets and branding guidelines
• Testing devices and feedback

Ideal Candidate:
• Experience with cross-platform mobile development
• Knowledge of payment system integration
• Real-time app development experience
• Portfolio of similar service apps
• Good project management and communication skills`,
    category: 'Mobile Development',
    location: 'Manhattan, NY',
    budget: 65,
    budgetType: 'hourly' as const,
    postedAt: '2024-01-13T15:30:00Z',
    posterName: 'David Kim',
    posterCompany: 'Startup Founder',
    posterAvatar: '',
    applicantCount: 7,
    skills: ['Mobile Development', 'Cross-Platform', 'Payment Integration', 'Real-time Apps', 'GPS Services'],
    image: mobileDevImage,
  },
];

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

  // Find the job by ID or use first job as fallback
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];

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
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {timeAgo(job.postedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {job.applicantCount} applicants
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
                    {job.budgetType === 'fixed' 
                      ? `$${job.budget.toLocaleString()} fixed price`
                      : `$${job.budget}/hour`
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
                              <p>Job: {job.title}</p>
                              <p>Budget: ${job.budget.toLocaleString()} {job.budgetType}</p>
                              <p>Your proposal will be sent to {job.posterName}</p>
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
                {/* Job Image */}
                {job.image && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Project Image</h3>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={job.image} 
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

                {/* Skills Required */}
                {job.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
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
                    <AvatarImage src={job.posterAvatar} />
                    <AvatarFallback>{job.posterName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{job.posterName}</p>
                    <p className="text-sm text-muted-foreground">{job.posterCompany}</p>
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
                  <Link to={`/profile/client/${job.posterName}`}>
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
                  <span className="font-medium text-foreground">{job.applicantCount}</span>
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