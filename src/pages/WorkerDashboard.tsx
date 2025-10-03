import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/layout/Navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Briefcase, Clock, Star, Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWorkerProfile } from "@/hooks/useWorkerProfile";
import { useWorkerApplications, useWithdrawApplication } from "@/hooks/useWorkerApplications";
import { useJobs } from "@/hooks/useJobs";

export default function WorkerDashboard() {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useWorkerProfile();
  const { data: applications = [], isLoading: applicationsLoading } = useWorkerApplications();
  const { data: jobs = [] } = useJobs({});
  const withdrawApplication = useWithdrawApplication();

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const acceptedApplications = applications.filter(app => app.status === 'accepted');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  const stats = [
    {
      title: "Total Applications",
      value: applications.length.toString(),
      icon: <Briefcase className="h-5 w-5" />,
      description: "All time",
    },
    {
      title: "Pending",
      value: pendingApplications.length.toString(),
      icon: <Clock className="h-5 w-5" />,
      description: "Awaiting response",
    },
    {
      title: "Accepted",
      value: acceptedApplications.length.toString(),
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Jobs secured",
    },
    {
      title: "Average Rating",
      value: profile?.workerProfile?.rating_average?.toFixed(1) || "0.0",
      icon: <Star className="h-5 w-5" />,
      description: "Your rating",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  if (profileLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Worker Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.full_name || 'Worker'}! Track your applications and find new opportunities.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/profile/worker">
                View Profile
              </Link>
            </Button>
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
            {/* My Applications */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Applications
                  <Badge variant="secondary">{applications.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <Link to={`/jobs/${application.job_id}`}>
                              <h3 className="font-semibold text-foreground mb-1 hover:text-primary">
                                {application.jobs.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2">
                              Posted by: {application.jobs.profiles.full_name}
                            </p>
                            {application.status === 'accepted' && (
                              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-md p-2 mb-2 text-sm">
                                <p className="font-medium text-green-900 dark:text-green-100 mb-1">Contact Information:</p>
                                {application.jobs.profiles.email && (
                                  <p className="text-green-800 dark:text-green-200">Email: {application.jobs.profiles.email}</p>
                                )}
                                {application.jobs.profiles.phone && (
                                  <p className="text-green-800 dark:text-green-200">Phone: {application.jobs.profiles.phone}</p>
                                )}
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span>{application.jobs.category}</span>
                              <span>{application.jobs.location}</span>
                              <span>Budget: ₹{application.jobs.budget.toLocaleString()}</span>
                              {application.proposed_rate && (
                                <span className="text-foreground font-medium">
                                  Your rate: ₹{application.proposed_rate}
                                </span>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        {application.cover_message && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {application.cover_message}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Clock className="h-3 w-3" />
                          Applied {new Date(application.applied_at).toLocaleDateString()}
                        </div>

                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/jobs/${application.job_id}`}>View Job</Link>
                          </Button>
                          {application.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => withdrawApplication.mutate(application.id)}
                            >
                              Withdraw
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet</p>
                    <Button asChild>
                      <Link to="/browse">Browse Jobs</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Worker Stats */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Your Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {profile?.workerProfile?.rating_average?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jobs Completed</span>
                  <span className="font-semibold">
                    {profile?.workerProfile?.total_jobs_completed || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="font-semibold">
                    {profile?.workerProfile?.experience_years || 0} years
                  </span>
                </div>
                {profile?.workerProfile?.categories && profile.workerProfile.categories.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.workerProfile.categories.map((category, idx) => (
                        <Badge key={idx} variant="secondary">{category}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <Button asChild className="w-full" variant="outline">
                  <Link to="/profile/worker">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Application Summary */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Accepted</span>
                  </div>
                  <span className="font-semibold text-green-600">{acceptedApplications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-semibold text-yellow-600">{pendingApplications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Rejected</span>
                  </div>
                  <span className="font-semibold text-red-600">{rejectedApplications.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-accent text-accent-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">💡 Quick Tip</h3>
                <p className="text-sm mb-4 opacity-90">
                  Complete your profile and add portfolio examples to increase your chances of getting hired.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-accent">
                  <Link to="/browse">Find Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}