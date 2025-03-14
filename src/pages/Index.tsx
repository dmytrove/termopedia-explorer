
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import TermCard from '@/components/TermCard';
import TermsTable from '@/components/TermsTable';
import ViewToggle, { ViewMode } from '@/components/ViewToggle';
import { parseCSVData, searchTerms, getRelatedTermNames } from '@/utils/dataUtils';
import { Term, TermsData } from '@/types';
import { FadeIn, SlideUp } from '@/components/ui/motion';

const Index = () => {
  const [data, setData] = useState<Term[]>([]);
  const [filteredData, setFilteredData] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [termsData, setTermsData] = useState<TermsData>({ terms: [], allTerms: {} });
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [relatedTermsMap, setRelatedTermsMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Simulate loading from CSV
    const timer = setTimeout(() => {
      const parsedData = parseCSVData();
      setData(parsedData.terms);
      setFilteredData(parsedData.terms);
      setTermsData(parsedData);
      
      // Create a map of related terms names for each term
      const map: Record<string, string[]> = {};
      parsedData.terms.forEach(term => {
        map[term.id] = getRelatedTermNames(term, parsedData.allTerms);
      });
      setRelatedTermsMap(map);
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setFilteredData(searchTerms(query, data));
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 max-w-7xl mx-auto pt-32 pb-20">
        <FadeIn className="text-center mx-auto max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Термопедія
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Досліджуйте базу знань термінології українською та англійською мовами
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center max-w-2xl mx-auto">
            <div className="flex-1 w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
            <ViewToggle 
              activeView={viewMode} 
              onChange={setViewMode} 
              className="self-end sm:self-auto"
            />
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="h-64 rounded-xl animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : filteredData.length > 0 ? (
          <div className="mt-12">
            {viewMode === 'card' ? (
              <SlideUp delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((term, index) => (
                    <TermCard 
                      key={term.id} 
                      term={term} 
                      index={index} 
                      relatedTermNames={relatedTermsMap[term.id] || []}
                    />
                  ))}
                </div>
              </SlideUp>
            ) : (
              <TermsTable terms={filteredData} relatedTermsMap={relatedTermsMap} />
            )}
          </div>
        ) : (
          <FadeIn className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              Не знайдено жодного терміну за вашим запитом.
            </p>
          </FadeIn>
        )}
      </div>
    </main>
  );
};

export default Index;
