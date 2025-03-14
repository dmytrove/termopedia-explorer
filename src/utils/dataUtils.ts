
import { Term, TermsData } from '@/types';

// Mock data based on the provided CSV structure
const mockData: Term[] = [
  {
    id: "1",
    termUA: "Автономність",
    definition: "Властивість системи ШІ, що полягає в її здатності функціонувати самостійно без втручання людини. Системи ШІ можна охарактеризувати як системи «людина в циклі», «людина над циклом», або «людина поза циклом» залежно від рівня значущої залученості людини. Автономна система має набір інструментів до навчання, адаптації та аналітики для реагування на ситуації, які не були заздалегідь запрограмовані чи передбачені до розгортання системи.",
    termEN: "Autonomy",
    refIds: ["2", "3", "5", "6", "8", "31", "42", "49", "50", "51", "58", "66", "76", "89", "92"]
  },
  {
    id: "2",
    termUA: "Автоматизоване прийняття рішень",
    definition: "Процес прийняття рішення за допомогою інформаційних технологій з низьким рівнем залученості людини.",
    termEN: "Automated decision-making",
    refIds: ["1", "3", "5", "49", "50", "51"]
  },
  {
    id: "3",
    termUA: "Автоматичне прийняття рішень",
    definition: "Процес прийняття рішення за допомогою інформаційних технологій без участі людини.",
    termEN: "Automatic decision-making",
    refIds: ["1", "2", "5", "49", "50", "51"]
  }
];

// In a real application, this would parse a CSV file
export const parseCSVData = (): TermsData => {
  // For now, we'll use the mock data
  const allTerms: Record<string, Term> = {};
  
  mockData.forEach(term => {
    allTerms[term.id] = term;
  });
  
  return {
    terms: mockData,
    allTerms
  };
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
