import { ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerifiedBadgeProps {
  verified: boolean | null;
  size?: 'sm' | 'md' | 'lg';
}

export const VerifiedBadge = ({ verified, size = 'md' }: VerifiedBadgeProps) => {
  if (!verified) return null;

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ShieldCheck 
            className={`${sizeClasses[size]} text-green-500 fill-green-100`} 
            aria-label="Verified"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Identity Verified</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
