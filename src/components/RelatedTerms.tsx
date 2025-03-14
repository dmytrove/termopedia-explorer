
import React from 'react';
import { Link } from 'react-router-dom';
import { Term } from '@/types';
import { SlideUp } from '@/components/ui/motion';

interface RelatedTermsProps {
  terms: Term[];
  title?: string;
}

const RelatedTerms: React.FC<RelatedTermsProps> = ({ 
  terms,
  title = "Пов'язані терміни"
}) => {
  if (terms.length === 0) {
    return null;
  }
  
  return (
    <SlideUp delay={500}>
      <div className="w-full max-w-4xl mx-auto mt-12">
        <h3 className="text-xl font-medium mb-6">{title}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {terms.map((term, index) => (
            <Link
              key={term.id}
              to={`/term/${term.id}`}
              className="group p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col space-y-1.5">
                <span className="text-xs text-primary font-medium">
                  {term.termEN}
                </span>
                <span className="font-medium group-hover:text-primary transition-colors">
                  {term.termUA}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SlideUp>
  );
};

export default RelatedTerms;
