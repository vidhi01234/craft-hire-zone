import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/layout/Navigation";
import { User, Users, Home, ArrowRight, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, signUp, signIn } = useAuth();
  const initialRole = searchParams.get('role') || 'worker';
  const [selectedRole, setSelectedRole] = useState<'job_giver' | 'worker'>(initialRole as 'job_giver' | 'worker');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('login-email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('login-password') as HTMLInputElement).value;

    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem('signup-first-name') as HTMLInputElement).value;
    const lastName = (form.elements.namedItem('signup-last-name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('signup-email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('signup-password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('signup-confirm-password') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const { error } = await signUp(email, password, fullName, selectedRole);
    
    if (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <Navigation />
      
      <div className="flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Home className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div className="flex items-center space-x-1 text-2xl sm:text-3xl font-heading font-bold">
                <span className="text-primary">Local</span>
                <span className="text-accent">Connect</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
              Welcome to Local Connect
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Connecting people with trusted local services
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full animate-scale-in">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-12">
              <TabsTrigger value="login" className="font-medium">Log In</TabsTrigger>
              <TabsTrigger value="signup" className="font-medium">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-gradient-card border-card-border shadow-brand-lg hover-lift">
                <CardHeader className="text-center">
                  <CardTitle className="font-heading text-xl sm:text-2xl">Welcome Back</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Sign in to access your Local Connect account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="login-email"
                        name="login-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="h-11"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="login-password"
                        name="login-password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="h-11"
                        disabled={loading}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full hover-scale" 
                      size={isMobile ? "default" : "lg"}
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="text-center text-xs sm:text-sm text-muted-foreground">
                      <Link to="/forgot-password" className="hover:text-primary transition-smooth">
                        Forgot your password?
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bg-gradient-card border-card-border shadow-brand-lg hover-lift">
                <CardHeader className="text-center">
                  <CardTitle className="font-heading text-xl sm:text-2xl">Join Local Connect</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Create your account and connect with trusted local services
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">I want to:</Label>
                      <RadioGroup 
                        value={selectedRole} 
                        onValueChange={(value) => setSelectedRole(value as 'job_giver' | 'worker')}
                        className="grid grid-cols-1 gap-3"
                        disabled={loading}
                      >
                        <div className="relative">
                          <RadioGroupItem value="worker" id="worker" className="sr-only" />
                          <Label 
                            htmlFor="worker" 
                            className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 transition-smooth hover-scale ${
                              selectedRole === 'worker' 
                                ? 'border-primary bg-primary/5' 
                                : 'border-card-border hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedRole === 'worker' ? 'border-primary' : 'border-muted-foreground'
                            }`}>
                              {selectedRole === 'worker' && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <User className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <div className="font-medium text-sm sm:text-base">Offer Services</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                I provide household services (electrician, plumber, etc.)
                              </div>
                            </div>
                            {selectedRole === 'worker' && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </Label>
                        </div>
                        
                        <div className="relative">
                          <RadioGroupItem value="job_giver" id="job_giver" className="sr-only" />
                          <Label 
                            htmlFor="job_giver" 
                            className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 transition-smooth hover-scale ${
                              selectedRole === 'job_giver' 
                                ? 'border-accent bg-accent/5' 
                                : 'border-card-border hover:border-accent/50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedRole === 'job_giver' ? 'border-accent' : 'border-muted-foreground'
                            }`}>
                              {selectedRole === 'job_giver' && (
                                <div className="w-2 h-2 rounded-full bg-accent" />
                              )}
                            </div>
                            <Users className="h-5 w-5 text-accent" />
                            <div className="flex-1">
                              <div className="font-medium text-sm sm:text-base">Need Services</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                I need household services (cleaning, repairs, etc.)
                              </div>
                            </div>
                            {selectedRole === 'job_giver' && (
                              <CheckCircle className="h-5 w-5 text-accent" />
                            )}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-first-name" className="text-sm font-medium">First Name</Label>
                        <Input
                          id="signup-first-name"
                          name="signup-first-name"
                          placeholder="Rahul"
                          required
                          className="h-11"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-last-name" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="signup-last-name"
                          name="signup-last-name"
                          placeholder="Sharma"
                          required
                          className="h-11"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="signup-email"
                        name="signup-email"
                        type="email"
                        placeholder="rahul@email.com"
                        required
                        className="h-11"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="signup-password"
                        name="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        required
                        minLength={6}
                        className="h-11"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-sm font-medium">Confirm Password</Label>
                      <Input
                        id="signup-confirm-password"
                        name="signup-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        required
                        minLength={6}
                        className="h-11"
                        disabled={loading}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full hover-scale" 
                      size={isMobile ? "default" : "lg"}
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="text-center text-xs sm:text-sm text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <Link to="/terms" className="hover:text-primary transition-smooth underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="hover:text-primary transition-smooth underline">
                        Privacy Policy
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Need help?{" "}
              <Link to="/help" className="text-primary hover:text-primary-dark transition-smooth font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}