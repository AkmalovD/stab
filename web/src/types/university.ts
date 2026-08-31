// University-related types

export interface University {
  id: string;
  name: string;
  cityId: string;
  ranking?: number;
  programs: string[];
  tuitionFees: {
    domestic: string;
    international: string;
  };
  requirements: {
    gpa: number;
    languageTest?: LanguageRequirement;
  };
}

export interface LanguageRequirement {
  type: 'IELTS' | 'TOEFL' | 'PTE' | 'Cambridge';
  minimumScore: number;
}
