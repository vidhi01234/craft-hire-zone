import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [dashboardPath, setDashboardPath] = useState('/dashboard');

  useEffect(() => {
    if (user) {
      // Fetch profile
      supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));

      // Fetch user role to determine dashboard path
      supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.role === 'job_giver') {
            setDashboardPath('/dashboard/job-giver');
          } else {
            setDashboardPath('/dashboard');
          }
        });
    } else {
      setProfile(null);
      setDashboardPath('/dashboard');
    }
  }, [user]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-brand-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <Home className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <div className="flex items-center space-x-1">
              <span className="text-lg sm:text-xl font-heading font-bold text-primary">Local</span>
              <span className="text-lg sm:text-xl font-heading font-bold text-accent">Connect</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && profile ? (
              <>
                <Link 
                  to={dashboardPath}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActive(dashboardPath) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                        <AvatarFallback>{profile.full_name?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background z-50" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
            <>
                <Link 
                  to="/browse" 
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-smooth"
                >
                  Browse Services
                </Link>
                <Button asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-muted/50 rounded-lg mt-2">
              {user && profile ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}