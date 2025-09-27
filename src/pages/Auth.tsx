import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/layout/Navigation";
import { Briefcase, User, Users } from "lucide-react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('role') || 'worker';
  const [selectedRole, setSelectedRole] = useState<'job_giver' | 'worker'>(initialRole as 'job_giver' | 'worker');

  const handleSubmit = (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    // TODO: Implement authentication logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-1 text-3xl font-bold">
              <span className="text-primary">Local</span>
              <span className="text-accent">Connect</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-foreground">Welcome to Local Connect</h1>
            <p className="mt-2 text-muted-foreground">Connecting people with trusted local services</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-gradient-card border-card-border shadow-brand-lg">
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                  <CardDescription>
                    Welcome back! Please enter your credentials.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleSubmit(e, 'login')}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" size="lg">
                      Log In
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      <Link to="/forgot-password" className="hover:text-primary transition-smooth">
                        Forgot your password?
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bg-gradient-card border-card-border shadow-brand-lg">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join our community and start your journey today.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleSubmit(e, 'signup')}>
                  <CardContent className="space-y-6">
                    {/* Role Selection */}
                    <div className="space-y-3">
                      <Label>I want to:</Label>
                      <RadioGroup 
                        value={selectedRole} 
                        onValueChange={(value) => setSelectedRole(value as 'job_giver' | 'worker')}
                        className="grid grid-cols-1 gap-4"
                      >
                        <div className="flex items-center space-x-2 border border-card-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                          <RadioGroupItem value="worker" id="worker" />
                          <Label htmlFor="worker" className="flex items-center gap-3 cursor-pointer flex-1">
                            <User className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Offer Services</div>
                              <div className="text-sm text-muted-foreground">I provide household services (electrician, plumber, etc.)</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-card-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                          <RadioGroupItem value="job_giver" id="job_giver" />
                          <Label htmlFor="job_giver" className="flex items-center gap-3 cursor-pointer flex-1">
                            <Users className="h-5 w-5 text-secondary" />
                            <div>
                              <div className="font-medium">Need Services</div>
                              <div className="text-sm text-muted-foreground">I need household services (cleaning, repairs, etc.)</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-first-name">First Name</Label>
                        <Input
                          id="signup-first-name"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-last-name">Last Name</Label>
                        <Input
                          id="signup-last-name"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" size="lg">
                      Create Account
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <Link to="/terms" className="hover:text-primary transition-smooth">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="hover:text-primary transition-smooth">
                        Privacy Policy
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-dark transition-smooth font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}