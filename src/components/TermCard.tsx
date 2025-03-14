
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Term } from '@/types';
import { SlideUp } from '@/components/ui/motion';
import { Link2 } from 'lucide-react';

interface TermCardProps {
  term: Term;
  index: number;
  className?: string;
  relatedTermNames?: string[];
}

const TermCard: React.FC<TermCardProps> = ({ term, index, className, relatedTermNames = [] }) => {
  return (
    <SlideUp delay={100 + index * 50} duration={400}>
      <Link 
        to={`/term/${term.id}`}
        className={cn(
          "block group relative overflow-hidden rounded-xl transition-all duration-300",
          "bg-card text-card-foreground",
          "hover:shadow-xl hover:-translate-y-1",
          "border border-border/50",
          className
        )}
      >
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-medium leading-tight">
                {term.termUA}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {term.termEN}
              </p>
            </div>
            
            <p className="text-sm line-clamp-3 text-foreground/80">
              {term.definition}
            </p>
            
            {relatedTermNames.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {relatedTermNames.slice(0, 3).map((name, i) => (
                  <Badge key={i} variant="outline" className="flex items-center gap-1 text-xs">
                    <Link2 className="w-3 h-3" />
                    {name}
                  </Badge>
                ))}
                {relatedTermNames.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{relatedTermNames.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </SlideUp>
  );
};

export default TermCard;
