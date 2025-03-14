
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import TermCard from '@/components/TermCard';
import { parseCSVData, searchTerms } from '@/utils/dataUtils';
import { Term } from '@/types';
import { FadeIn, SlideUp } from '@/components/ui/motion';

const Index = () => {
  const [data, setData] = useState<Term[]>([]);
  const [filteredData, setFilteredData] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from CSV
    const timer = setTimeout(() => {
      const parsedData = parseCSVData();
      setData(parsedData.terms);
      setFilteredData(parsedData.terms);
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
          
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
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
          <SlideUp delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {filteredData.map((term, index) => (
                <TermCard key={term.id} term={term} index={index} />
              ))}
            </div>
          </SlideUp>
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
