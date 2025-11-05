import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useWorkerReviews } from "@/hooks/useReviews";

interface ReviewsListProps {
  workerId: string;
}

export function ReviewsList({ workerId }: ReviewsListProps) {
  const { data: reviews = [], isLoading } = useWorkerReviews(workerId);

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No reviews yet. Be the first to leave a review!
      </p>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-gradient-card border-card-border">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.reviewer?.avatar_url || undefined} />
                <AvatarFallback>
                  {review.reviewer?.full_name?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {review.reviewer?.full_name || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {review.comment && (
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
