import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, User } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    budget: number;
    budgetType: 'fixed' | 'hourly';
    postedAt: string;
    posterName: string;
    applicantCount?: number;
    image?: string;
  };
  showApplyButton?: boolean;
  showManageButton?: boolean;
}

export function JobCard({ job, showApplyButton = false, showManageButton = false }: JobCardProps) {
  const formatBudget = (amount: number, type: 'fixed' | 'hourly') => {
    return type === 'fixed' ? `$${amount.toLocaleString()}` : `$${amount}/hr`;
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
    <Card className="bg-gradient-card border-card-border hover:shadow-brand-md transition-smooth hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground hover:text-primary transition-smooth">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {job.posterName}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {timeAgo(job.postedAt)}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {job.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {job.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={job.image} 
              alt={job.title}
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-success font-medium">
            <DollarSign className="h-4 w-4" />
            {formatBudget(job.budget, job.budgetType)}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
        </div>

        {job.applicantCount !== undefined && (
          <div className="mt-2 text-xs text-muted-foreground">
            {job.applicantCount} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/jobs/${job.id}`}>
              View Details
            </Link>
          </Button>
          
          {showApplyButton && (
            <Button className="flex-1">
              Apply Now
            </Button>
          )}
          
          {showManageButton && (
            <Button asChild variant="secondary" className="flex-1">
              <Link to={`/jobs/${job.id}/manage`}>
                Manage
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}