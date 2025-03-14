
export interface Term {
  id: string;
  termUA: string;
  definition: string;
  termEN: string;
  refIds: string[];
}

export interface TermsData {
  terms: Term[];
  allTerms: Record<string, Term>;
}
