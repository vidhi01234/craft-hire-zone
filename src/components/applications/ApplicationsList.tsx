import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Mail, MapPin, Clock } from "lucide-react";
import { useMyJobApplications, useUpdateApplicationStatus, Application } from "@/hooks/useApplications";
import { Link } from "react-router-dom";

export const ApplicationsList = () => {
  const { data: applications = [], isLoading } = useMyJobApplications();
  const updateStatus = useUpdateApplicationStatus();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const reviewedApplications = applications.filter(app => app.status !== 'pending');

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-card-border">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Loading applications...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Applications */}
      <Card className="bg-gradient-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Pending Applications
            <Badge variant="secondary">{pendingApplications.length}</Badge>
          </CardTitle>
          <CardDescription>
            Review and respond to new applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingApplications.length > 0 ? (
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <ApplicationCard 
                  key={application.id} 
                  application={application}
                  onAccept={() => updateStatus.mutate({ applicationId: application.id, status: 'accepted' })}
                  onReject={() => updateStatus.mutate({ applicationId: application.id, status: 'rejected' })}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No pending applications</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviewed Applications */}
      {reviewedApplications.length > 0 && (
        <Card className="bg-gradient-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Reviewed Applications
              <Badge variant="outline">{reviewedApplications.length}</Badge>
            </CardTitle>
            <CardDescription>
              Previously reviewed applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewedApplications.map((application) => (
                <ApplicationCard 
                  key={application.id} 
                  application={application}
                  showActions={false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface ApplicationCardProps {
  application: Application;
  onAccept?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

const ApplicationCard = ({ application, onAccept, onReject, showActions = true }: ApplicationCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    }
  };

  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <Link to={`/worker/${application.worker_id}`}>
          <Avatar className="h-12 w-12">
            <AvatarImage src={application.profiles.avatar_url} />
            <AvatarFallback>
              {application.profiles.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <Link to={`/worker/${application.worker_id}`} className="font-semibold text-foreground hover:text-primary">
                {application.profiles.full_name}
              </Link>
              <p className="text-sm text-muted-foreground">Applied for: {application.jobs.title}</p>
            </div>
            <Badge className={getStatusColor(application.status)} variant="outline">
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            {application.profiles.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {application.profiles.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(application.applied_at)}
            </div>
            {application.proposed_rate && (
              <div className="font-medium text-foreground">
                Proposed rate: ₹{application.proposed_rate}
              </div>
            )}
          </div>

          {application.cover_message && (
            <p className="text-sm text-foreground mb-3 line-clamp-2">
              {application.cover_message}
            </p>
          )}

          {showActions && application.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={onAccept}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={onReject}
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
