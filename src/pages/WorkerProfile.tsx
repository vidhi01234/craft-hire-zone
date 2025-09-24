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

// Mock data
const mockWorker = {
  id: '1',
  name: 'Alex Chen',
  title: 'Full Stack Developer & UI/UX Designer',
  avatar: '',
  location: 'Seattle, WA',
  hourlyRate: 85,
  completedJobs: 47,
  totalEarnings: 125000,
  successRate: 98,
  rating: 4.9,
  reviewCount: 34,
  memberSince: '2020-03-15',
  skills: [
    'JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design', 
    'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Figma'
  ],
  bio: `Passionate full-stack developer with 8+ years of experience building scalable web applications and intuitive user interfaces. I specialize in modern JavaScript frameworks and have a keen eye for design that creates exceptional user experiences.

My expertise spans both frontend and backend development, with particular strength in React ecosystems, Node.js APIs, and cloud deployment. I believe in writing clean, maintainable code and delivering projects on time and within budget.

I've helped startups launch their MVPs, established companies modernize their tech stacks, and numerous clients bring their digital visions to life. Let's work together to build something amazing!`,
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechFlow Solutions',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and AWS.'
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Digital Agency',
      period: '2020 - 2022',
      description: 'Built responsive websites and web applications for various clients using modern frontend technologies.'
    }
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      school: 'University of Washington',
      year: '2019'
    }
  ],
  portfolio: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      image: '',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      url: 'https://example.com'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      image: '',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
      url: 'https://example.com'
    }
  ],
  reviews: [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      clientCompany: 'Digital Marketing Pro',
      rating: 5,
      comment: 'Alex delivered exceptional work on our website redesign. His attention to detail and technical expertise exceeded our expectations. Highly recommended!',
      projectTitle: 'Website Redesign',
      date: '2024-01-10'
    },
    {
      id: '2',
      clientName: 'Michael Roberts',
      clientCompany: 'StartupLab',
      rating: 5,
      comment: 'Outstanding developer! Alex built our entire platform from scratch and delivered ahead of schedule. Great communication throughout the project.',
      projectTitle: 'Web Application Development',
      date: '2023-12-15'
    }
  ]
};

export default function WorkerProfile() {
  const { id } = useParams();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement message sending logic
    setIsContactOpen(false);
    setMessage('');
  };

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
                    <AvatarImage src={mockWorker.avatar} />
                    <AvatarFallback className="text-2xl">{mockWorker.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{mockWorker.name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{mockWorker.title}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {mockWorker.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {mockWorker.rating} ({mockWorker.reviewCount} reviews)
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {mockWorker.completedJobs} jobs completed
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                        <DialogTrigger asChild>
                          <Button size="lg">
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Alex
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message to {mockWorker.name}</DialogTitle>
                            <DialogDescription>
                              Send a direct message to discuss your project requirements.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleSendMessage} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="message">Your Message</Label>
                              <Textarea
                                id="message"
                                placeholder="Hi Alex, I have a project that might be a good fit for your skills..."
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
                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {mockWorker.bio}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockWorker.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                {mockWorker.portfolio.map((project) => (
                  <Card key={project.id} className="bg-gradient-card border-card-border">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground">Project Image</span>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              View Project
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {mockWorker.reviews.map((review) => (
                  <Card key={review.id} className="bg-gradient-card border-card-border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{review.clientName}</h4>
                          <p className="text-sm text-muted-foreground">{review.clientCompany}</p>
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

              <TabsContent value="experience" className="space-y-6">
                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mockWorker.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold text-foreground">{exp.title}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-card-border">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockWorker.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-secondary pl-4">
                        <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
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
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hourly Rate</span>
                  <span className="font-semibold text-success">${mockWorker.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Jobs Completed</span>
                  <span className="font-semibold text-foreground">{mockWorker.completedJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Earned</span>
                  <span className="font-semibold text-success">${mockWorker.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-success">{mockWorker.successRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold text-foreground">
                    {new Date(mockWorker.memberSince).getFullYear()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6" />
                  <h3 className="font-semibold">Top Rated Freelancer</h3>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Consistently delivers high-quality work with excellent client satisfaction.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    Top 5%
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                    Rising Talent
                  </Badge>
                </div>
              </CardContent>
            </Card>

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