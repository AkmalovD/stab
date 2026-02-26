// Scholarship-related types

export interface Scholarship {
  id: string;
  type: string;
  name: string;
  provider: string;
  country: string;
  amount: string;
  coverage: 'Full' | 'Partial' | 'Tuition Only' | 'Variable';
  deadline: string;
  studyLevel: 'Undergraduate' | 'Masters' | 'PhD' | 'All Levels';
  fieldOfStudy: string[];
  eligibleCountries: string[];
  description: string;
  requirements: string[];
  applicationUrl: string;
  difficulty: 'Easy' | 'Moderate' | 'Competitive' | 'Highly Competitive';
  button: string
}

export interface ScholarshipFilters {
  country?: string;
  studyLevel?: string;
  coverage?: string;
  fieldOfStudy?: string;
  searchQuery?: string;
}
