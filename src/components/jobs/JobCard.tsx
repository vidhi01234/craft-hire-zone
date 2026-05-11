import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, User } from "lucide-react";
import { Job } from "@/hooks/useJobs";
import { VerifiedBadge } from "@/components/profile/VerifiedBadge";

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
  showManageButton?: boolean;
}

export function JobCard({ job, showApplyButton = false, showManageButton = false }: JobCardProps) {
  const formatBudget = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
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

  const primaryImage = job.job_images?.find(img => img.is_primary)?.image_url || job.job_images?.[0]?.image_url;
  const posterName = job.profiles?.full_name || 'Unknown';
  const applicantCount = job.applications?.length || 0;

  return (
    <Card className="glass border-card-border/60 group overflow-hidden transition-smooth hover:-translate-y-1 hover:glow-primary hover:border-primary/40">
      {/* Image First - Prominent Display */}
      {primaryImage && (
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={primaryImage} 
            alt={job.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-bounce duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header with Category Badge */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <Badge className="bg-accent hover:bg-accent text-accent-foreground text-xs font-medium">
            {job.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeAgo(job.created_at)}
          </div>
        </div>

        {/* Title */}
        <CardTitle className="text-lg sm:text-xl font-heading font-semibold text-foreground hover:text-primary transition-smooth mb-2 leading-tight">
          <Link to={`/jobs/${job.id}`} className="line-clamp-2">
            {job.title}
          </Link>
        </CardTitle>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Budget and Location */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1 text-success font-bold">
            <DollarSign className="h-4 w-4" />
            {formatBudget(job.budget)}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-20 sm:max-w-none">{job.location}</span>
          </div>
        </div>

        {/* Poster Info */}
        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{posterName}</span>
          {applicantCount > 0 && (
            <>
              <span>•</span>
              <span>{applicantCount} {applicantCount === 1 ? 'applicant' : 'applicants'}</span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1 hover-scale text-sm">
            <Link to={`/jobs/${job.id}`}>
              View Details
            </Link>
          </Button>
          
          {showApplyButton && (
            <Button asChild className="flex-1 hover-scale text-sm">
              <Link to={`/jobs/${job.id}`}>
                Apply Now
              </Link>
            </Button>
          )}
          
          {showManageButton && (
            <Button asChild variant="secondary" className="flex-1 hover-scale text-sm">
              <Link to={`/jobs/${job.id}/manage`}>
                Manage
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}