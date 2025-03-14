
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import TermDetail from '@/components/TermDetail';
import RelatedTerms from '@/components/RelatedTerms';
import { parseCSVData, getRelatedTerms } from '@/utils/dataUtils';
import { Term, TermsData } from '@/types';

const TermPage = () => {
  const { id } = useParams<{ id: string }>();
  const [term, setTerm] = useState<Term | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      return;
    }

    // Simulate loading from CSV
    const timer = setTimeout(() => {
      const parsedData: TermsData = parseCSVData();
      const foundTerm = parsedData.allTerms[id];
      
      if (foundTerm) {
        setTerm(foundTerm);
        setRelatedTerms(getRelatedTerms(id, parsedData.allTerms));
      } else {
        setNotFound(true);
      }
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (notFound) {
    return <Navigate to="/404" />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 max-w-7xl mx-auto pt-32 pb-20">
        {isLoading ? (
          <div className="w-full max-w-4xl mx-auto">
            <div className="h-8 w-24 rounded-full animate-pulse bg-muted mb-8" />
            <div className="h-12 w-3/4 rounded-lg animate-pulse bg-muted mb-4" />
            <div className="h-8 w-1/2 rounded-lg animate-pulse bg-muted mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 rounded-lg animate-pulse bg-muted" />
              ))}
            </div>
          </div>
        ) : term ? (
          <>
            <TermDetail term={term} />
            <RelatedTerms terms={relatedTerms} />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default TermPage;
