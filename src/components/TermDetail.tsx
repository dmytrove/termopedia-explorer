
import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Term } from '@/types';
import { FadeIn, SlideUp } from '@/components/ui/motion';

interface TermDetailProps {
  term: Term;
}

const TermDetail: React.FC<TermDetailProps> = ({ term }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <FadeIn>
        <Link 
          to="/" 
          className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Назад до всіх термінів</span>
        </Link>
      </FadeIn>
      
      <div className="space-y-8">
        <SlideUp delay={100}>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            ID: {term.id}
          </div>
        </SlideUp>
        
        <SlideUp delay={200}>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium">{term.termUA}</h1>
            <h2 className="text-xl text-muted-foreground">{term.termEN}</h2>
          </div>
        </SlideUp>
        
        <SlideUp delay={300}>
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/90 leading-relaxed">{term.definition}</p>
          </div>
        </SlideUp>
        
        <SlideUp delay={400}>
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Пов'язані терміни: {term.refIds.length}
              </span>
              
              <Link to="#" className="inline-flex items-center text-sm text-primary hover:underline">
                <span className="mr-1">Переглянути додаткову інформацію</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </SlideUp>
      </div>
    </div>
  );
};

export default TermDetail;
