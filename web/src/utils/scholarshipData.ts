import { Scholarship } from '../types';

export const scholarshipsData: Scholarship[] = [
  {
    id: 'chevening',
    name: 'Chevening Scholarships',
    provider: 'UK Government',
    country: 'United Kingdom',
    amount: '£18,000 - £26,000',
    coverage: 'Full',
    deadline: '2025-11-07',
    studyLevel: 'Masters',
    fieldOfStudy: ['All Fields'],
    eligibleCountries: ['All Countries (excluding UK and EU)'],
    description: 'Chevening Scholarships are the UK government\'s global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations. The scholarships support study at UK universities for international students with leadership potential.',
    requirements: [
      'Undergraduate degree',
      'At least 2 years of work experience',
      'Meet English language requirements',
      'Return to your home country for at least 2 years'
    ],
    applicationUrl: 'https://www.chevening.org/scholarships/',
    difficulty: 'Highly Competitive'
  },
  {
    id: 'fulbright',
    name: 'Fulbright Foreign Student Program',
    provider: 'US Department of State',
    country: 'United States',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2025-10-15',
    studyLevel: 'Masters',
    fieldOfStudy: ['All Fields'],
    eligibleCountries: ['Over 160 countries'],
    description: 'The Fulbright Program provides funding for international students to study and conduct research in the United States. Covers tuition, living expenses, airfare, and health insurance.',
    requirements: [
      'Bachelor\'s degree',
      'English proficiency (TOEFL/IELTS)',
      'Strong academic record',
      'Leadership potential'
    ],
    applicationUrl: 'https://foreign.fulbrightonline.org/',
    difficulty: 'Highly Competitive'
  },
  {
    id: 'daad',
    name: 'DAAD Scholarships',
    provider: 'German Academic Exchange Service',
    country: 'Germany',
    amount: '€934/month',
    coverage: 'Partial',
    deadline: '2025-11-30',
    studyLevel: 'Masters',
    fieldOfStudy: ['Engineering', 'Sciences', 'Arts', 'Social Sciences'],
    eligibleCountries: ['All Countries'],
    description: 'DAAD offers various scholarship programs for international students to pursue graduate studies in Germany. Includes monthly stipend, health insurance, and travel allowance.',
    requirements: [
      'Bachelor\'s degree',
      'Above average academic performance',
      'Knowledge of German or English',
      'Relevant work experience (varies by program)'
    ],
    applicationUrl: 'https://www.daad.de/en/',
    difficulty: 'Competitive'
  },
  {
    id: 'australia-awards',
    name: 'Australia Awards Scholarships',
    provider: 'Australian Government',
    country: 'Australia',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2025-04-30',
    studyLevel: 'Masters',
    fieldOfStudy: ['All Fields'],
    eligibleCountries: ['Indo-Pacific Region'],
    description: 'Australia Awards Scholarships provide opportunities for people from developing countries to undertake full-time undergraduate or postgraduate study at participating Australian universities.',
    requirements: [
      'Minimum qualification (varies by country)',
      'English language proficiency',
      'Return to home country for 2 years',
      'Meet health requirements'
    ],
    applicationUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    difficulty: 'Competitive'
  },
  {
    id: 'erasmus',
    name: 'Erasmus Mundus Joint Masters',
    provider: 'European Commission',
    country: 'Europe',
    amount: '€1,000 - €1,400/month',
    coverage: 'Partial',
    deadline: '2026-01-15',
    studyLevel: 'Masters',
    fieldOfStudy: ['Various Fields'],
    eligibleCountries: ['All Countries'],
    description: 'Erasmus Mundus offers scholarships for international students to study integrated master programmes taught in at least two European countries.',
    requirements: [
      'Bachelor\'s degree',
      'English proficiency',
      'Academic excellence',
      'Specific program requirements'
    ],
    applicationUrl: 'https://ec.europa.eu/programmes/erasmus-plus/',
    difficulty: 'Competitive'
  },
  {
    id: 'commonwealth',
    name: 'Commonwealth Scholarships',
    provider: 'Commonwealth Scholarship Commission',
    country: 'United Kingdom',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2025-12-14',
    studyLevel: 'Masters',
    fieldOfStudy: ['Development Related Fields'],
    eligibleCountries: ['Commonwealth Countries'],
    description: 'Commonwealth Scholarships are for talented individuals with the potential to make a positive impact on the global stage. Supports students who could not otherwise afford to study in the UK.',
    requirements: [
      'From a Commonwealth country',
      'Unable to afford UK study',
      'Undergraduate degree',
      'Return to home country'
    ],
    applicationUrl: 'https://cscuk.fcdo.gov.uk/',
    difficulty: 'Highly Competitive'
  },
  {
    id: 'vanier',
    name: 'Vanier Canada Graduate Scholarships',
    provider: 'Government of Canada',
    country: 'Canada',
    amount: '$50,000 CAD/year',
    coverage: 'Partial',
    deadline: '2025-11-01',
    studyLevel: 'PhD',
    fieldOfStudy: ['Health Sciences', 'Natural Sciences', 'Engineering', 'Social Sciences', 'Humanities'],
    eligibleCountries: ['All Countries'],
    description: 'The Vanier CGS program aims to attract and retain world-class doctoral students by supporting those who demonstrate leadership skills and a high standard of scholarly achievement.',
    requirements: [
      'Nominated by Canadian institution',
      'Outstanding academic achievement',
      'Research potential',
      'Leadership skills'
    ],
    applicationUrl: 'https://vanier.gc.ca/',
    difficulty: 'Highly Competitive'
  },
  {
    id: 'eiffel',
    name: 'Eiffel Excellence Scholarship',
    provider: 'French Ministry of Europe and Foreign Affairs',
    country: 'France',
    amount: '€1,181/month',
    coverage: 'Partial',
    deadline: '2026-01-08',
    studyLevel: 'Masters',
    fieldOfStudy: ['Engineering', 'Economics', 'Law', 'Political Science'],
    eligibleCountries: ['All Countries'],
    description: 'The Eiffel Excellence Scholarship Program enables French higher education institutions to attract top foreign students to master\'s and PhD programs.',
    requirements: [
      'Maximum 30 years old (Masters)',
      'Nominated by French institution',
      'Outstanding academic record',
      'Not a French citizen'
    ],
    applicationUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
    difficulty: 'Competitive'
  },
  {
    id: 'gates-cambridge',
    name: 'Gates Cambridge Scholarships',
    provider: 'Bill & Melinda Gates Foundation',
    country: 'United Kingdom',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2025-12-05',
    studyLevel: 'PhD',
    fieldOfStudy: ['All Fields'],
    eligibleCountries: ['All Countries (excluding UK)'],
    description: 'Gates Cambridge Scholarships are one of the most prestigious international scholarships, awarded to outstanding applicants from countries outside the UK to pursue postgraduate study at Cambridge.',
    requirements: [
      'Outstanding intellectual ability',
      'Leadership potential',
      'Commitment to improving lives',
      'Good fit with Cambridge'
    ],
    applicationUrl: 'https://www.gatescambridge.org/',
    difficulty: 'Highly Competitive'
  },
  {
    id: 'swedish-institute',
    name: 'Swedish Institute Scholarships',
    provider: 'Swedish Institute',
    country: 'Sweden',
    amount: 'Full Tuition + Living Expenses',
    coverage: 'Full',
    deadline: '2026-02-20',
    studyLevel: 'Masters',
    fieldOfStudy: ['All Fields'],
    eligibleCountries: ['Selected Countries'],
    description: 'SISGP offers a unique opportunity for future leaders to develop professionally and academically, to experience Swedish society and culture, and to build a long-lasting relationship with Sweden and with each other.',
    requirements: [
      'From eligible country',
      'Bachelor\'s degree',
      'English proficiency',
      'Leadership experience'
    ],
    applicationUrl: 'https://si.se/en/apply/scholarships/',
    difficulty: 'Competitive'
  },
  {
    id: 'rotary-peace',
    name: 'Rotary Peace Fellowship',
    provider: 'Rotary Foundation',
    country: 'Multiple Countries',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2025-05-15',
    studyLevel: 'Masters',
    fieldOfStudy: ['Peace and Conflict Resolution'],
    eligibleCountries: ['All Countries'],
    description: 'Rotary Peace Fellowships enable individuals to study at one of the Rotary Peace Centers, gaining the skills and knowledge to become effective peace and development leaders.',
    requirements: [
      'Proficiency in English',
      'Relevant work experience',
      'Strong commitment to peace',
      'Academic excellence'
    ],
    applicationUrl: 'https://www.rotary.org/en/our-programs/peace-fellowships',
    difficulty: 'Competitive'
  },
  {
    id: 'orange-knowledge',
    name: 'Orange Knowledge Programme',
    provider: 'Netherlands Ministry of Foreign Affairs',
    country: 'Netherlands',
    amount: 'Full Funding',
    coverage: 'Full',
    deadline: '2026-02-01',
    studyLevel: 'Masters',
    fieldOfStudy: ['Development Related Fields'],
    eligibleCountries: ['Selected Countries'],
    description: 'OKP scholarships support mid-career professionals from selected countries to study in the Netherlands, focusing on capacity building in various sectors.',
    requirements: [
      'From eligible country',
      'Relevant work experience',
      'Employed by organization',
      'Admission to Dutch institution'
    ],
    applicationUrl: 'https://www.studyinnl.org/scholarships/orange-knowledge-programme',
    difficulty: 'Moderate'
  }
];

// Helper functions
export const getScholarshipById = (id: string): Scholarship | undefined => {
  return scholarshipsData.find(scholarship => scholarship.id === id);
};

export const filterScholarships = (filters: {
  country?: string;
  studyLevel?: string;
  coverage?: string;
  fieldOfStudy?: string;
  searchQuery?: string;
}): Scholarship[] => {
  return scholarshipsData.filter(scholarship => {
    if (filters.country && scholarship.country !== filters.country) {
      return false;
    }
    if (filters.studyLevel && scholarship.studyLevel !== filters.studyLevel && scholarship.studyLevel !== 'All Levels') {
      return false;
    }
    if (filters.coverage && scholarship.coverage !== filters.coverage) {
      return false;
    }
    if (filters.fieldOfStudy && !scholarship.fieldOfStudy.includes(filters.fieldOfStudy) && !scholarship.fieldOfStudy.includes('All Fields')) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        scholarship.name.toLowerCase().includes(query) ||
        scholarship.provider.toLowerCase().includes(query) ||
        scholarship.description.toLowerCase().includes(query)
      );
    }
    return true;
  });
};

export const getUpcomingDeadlines = (): Scholarship[] => {
  const today = new Date();
  return scholarshipsData
    .filter(scholarship => new Date(scholarship.deadline) > today)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);
};

export const getCountries = (): string[] => {
  return Array.from(new Set(scholarshipsData.map(s => s.country))).sort();
};

export const getStudyLevels = (): string[] => {
  return Array.from(new Set(scholarshipsData.map(s => s.studyLevel))).sort();
};

export const getCoverageTypes = (): string[] => {
  return Array.from(new Set(scholarshipsData.map(s => s.coverage))).sort();
};

export const getFieldsOfStudy = (): string[] => {
  const fields = new Set<string>();
  scholarshipsData.forEach(s => s.fieldOfStudy.forEach(f => fields.add(f)));
  return Array.from(fields).sort();
};