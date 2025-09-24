import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/layout/Navigation";
import { Users, Briefcase, Star, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export default function Landing() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Find Skilled Workers",
      description: "Connect with qualified professionals across various industries and skill levels.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-secondary" />,
      title: "Post Your Jobs",
      description: "Easily create detailed job postings and manage applications from talented workers.",
    },
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      title: "Quality Assurance",
      description: "Built-in rating system ensures quality work and reliable service providers.",
    },
  ];

  const benefits = [
    "Secure payment processing",
    "24/7 customer support", 
    "Verified worker profiles",
    "Project milestone tracking",
    "Dispute resolution system",
    "Mobile-friendly platform"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect. Work. Succeed.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            The marketplace where skilled workers meet opportunities. 
            Post jobs or find work that matches your expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="xl" variant="secondary" className="min-w-48">
              <Link to="/signup?role=job_giver">
                I Need Workers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="min-w-48 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              <Link to="/signup?role=worker">
                I Want to Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose JobMarket?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect, collaborate, and complete projects successfully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-card-border hover:shadow-brand-lg transition-smooth hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-muted w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Everything you need for successful projects
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive platform provides all the tools and support you need 
                to manage projects from start to finish.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/browse">
                    Start Browsing Jobs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:order-first">
              <Card className="bg-gradient-primary p-1">
                <div className="bg-background rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Join thousands of satisfied users
                  </h3>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">25K+</div>
                      <div className="text-sm text-muted-foreground">Active Workers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary">50K+</div>
                      <div className="text-sm text-muted-foreground">Jobs Posted</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">98%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join JobMarket today and discover the future of work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="secondary">
              <Link to="/signup">
                Create Account
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              <Link to="/browse">
                Browse Jobs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-8 w-8" />
                <span className="text-xl font-bold">JobMarket</span>
              </div>
              <p className="text-background/80 max-w-md">
                The premier marketplace connecting skilled workers with opportunities. 
                Building the future of work, one project at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Workers</h3>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/browse" className="hover:text-background transition-smooth">Find Jobs</Link></li>
                <li><Link to="/signup?role=worker" className="hover:text-background transition-smooth">Create Profile</Link></li>
                <li><Link to="/help" className="hover:text-background transition-smooth">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/signup?role=job_giver" className="hover:text-background transition-smooth">Post Jobs</Link></li>
                <li><Link to="/browse" className="hover:text-background transition-smooth">Find Workers</Link></li>
                <li><Link to="/help" className="hover:text-background transition-smooth">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 JobMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}