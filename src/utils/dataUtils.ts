
import { Term, TermsData } from '@/types';
import csvData from '../../ai_terms.csv?raw';

// Parse CSV data from the provided file
export const parseCSVData = (): TermsData => {
  try {
    // Skip the header row and parse the remaining rows
    const rows = csvData.split('\n').slice(1).filter(row => row.trim() !== '');
    const terms: Term[] = [];
    const allTerms: Record<string, Term> = {};
    
    rows.forEach(row => {
      // Split by semicolon and handle possible quoted values
      const columns = row.split(';');
      
      if (columns.length >= 5) {
        const id = columns[0].trim();
        const termUA = columns[1].trim();
        const definition = columns[2].trim();
        const termEN = columns[3].trim();
        
        // Parse the related terms (RefIds)
        const refIdsText = columns[4].trim();
        const refIds = refIdsText 
          ? refIdsText.split(',').map(id => id.trim())
          : [];
          
        const term: Term = {
          id,
          termUA,
          definition,
          termEN,
          refIds
        };
        
        terms.push(term);
        allTerms[id] = term;
      }
    });
    
    return {
      terms,
      allTerms
    };
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return { terms: [], allTerms: {} };
  }
};

export const searchTerms = (query: string, terms: Term[]): Term[] => {
  if (!query) return terms;
  
  const normalizedQuery = query.toLowerCase();
  
  return terms.filter(term => 
    term.termUA.toLowerCase().includes(normalizedQuery) || 
    term.termEN.toLowerCase().includes(normalizedQuery) ||
    term.definition.toLowerCase().includes(normalizedQuery)
  );
};

export const getRelatedTerms = (termId: string, allTerms: Record<string, Term>): Term[] => {
  const term = allTerms[termId];
  if (!term) return [];
  
  return term.refIds
    .map(id => allTerms[id])
    .filter(Boolean);
};
