import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/layout/Navigation";
import { Users, Briefcase, Star, ArrowRight, CheckCircle, Wrench, Zap, Hammer, BookOpen, Home, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image-local-connect.jpg";

export default function Landing() {
  const categories = [
    { icon: <Zap className="h-8 w-8" />, name: "Electrician", jobs: "120+ jobs" },
    { icon: <Wrench className="h-8 w-8" />, name: "Plumber", jobs: "85+ jobs" },
    { icon: <Hammer className="h-8 w-8" />, name: "Carpenter", jobs: "95+ jobs" },
    { icon: <Home className="h-8 w-8" />, name: "House Cleaning", jobs: "200+ jobs" },
    { icon: <BookOpen className="h-8 w-8" />, name: "Home Tutor", jobs: "150+ jobs" },
    { icon: <Users className="h-8 w-8" />, name: "Cook/Maid", jobs: "80+ jobs" },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Trusted Local Workers",
      description: "Connect with verified household service providers in your neighborhood - electricians, plumbers, tutors, and more.",
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Safe & Secure",
      description: "All workers are background verified. Secure payments in Indian Rupees with customer protection.",
    },
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      title: "Quality Guaranteed",
      description: "Rating system and customer reviews ensure you get reliable, quality household services every time.",
    },
  ];

  const benefits = [
    "Verified worker profiles with ID proof",
    "Customer support in Hindi & English", 
    "Secure payment in ₹ (Rupees)",
    "Same-day service availability",
    "Customer protection guarantee",
    "Mobile app for easy booking"
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
            <span className="text-white">Local</span>{" "}
            <span className="text-accent">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
            Connecting people with trusted local services
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-80">
            Find reliable household service providers in your area - from electricians and plumbers to tutors and house help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="xl" className="min-w-48 bg-accent hover:bg-accent-light shadow-brand-lg">
              <Link to="/signup?role=job_giver">
                I Need a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="min-w-48 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              <Link to="/signup?role=worker">
                I Offer a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Household Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find trusted local service providers for all your household needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/browse" className="group">
                <Card className="bg-gradient-card border-card-border hover:shadow-brand-lg transition-smooth hover:-translate-y-2 text-center p-6">
                  <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-smooth w-fit">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.jobs}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Local Connect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              India's most trusted platform for household services with verified local workers
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Safe, reliable household services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get peace of mind with our comprehensive verification process and customer protection for all household services.
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
                <Button asChild size="lg" className="bg-accent hover:bg-accent-light">
                  <Link to="/browse">
                    Find Services Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:order-first">
              <Card className="bg-gradient-primary p-1">
                <div className="bg-background rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Trusted by households across India
                  </h3>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">15K+</div>
                      <div className="text-sm text-muted-foreground">Service Providers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary">50K+</div>
                      <div className="text-sm text-muted-foreground">Services Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">4.8⭐</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
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
            Join Local Connect today and get trusted household services at your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="bg-accent hover:bg-accent-light shadow-brand-lg">
              <Link to="/signup">
                Get Started
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              <Link to="/browse">
                Browse Services
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
                <Home className="h-8 w-8" />
                <span className="text-xl font-bold">Local Connect</span>
              </div>
              <p className="text-background/80 max-w-md">
                India's trusted platform for household services. Connecting you with verified local service providers for all your home needs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/browse" className="hover:text-background transition-smooth">Find Services</Link></li>
                <li><Link to="/signup?role=job_giver" className="hover:text-background transition-smooth">Book a Service</Link></li>
                <li><Link to="/help" className="hover:text-background transition-smooth">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Service Providers</h3>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/signup?role=worker" className="hover:text-background transition-smooth">Join as Provider</Link></li>
                <li><Link to="/browse" className="hover:text-background transition-smooth">Find Work</Link></li>
                <li><Link to="/help" className="hover:text-background transition-smooth">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Local Connect. All rights reserved. Made in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}