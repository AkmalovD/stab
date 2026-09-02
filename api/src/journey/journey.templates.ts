export interface TaskTemplate {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
}

export interface PhaseTemplate {
  number: number;
  title: string;
  description: string;
  timeframe: string;
  icon: string;
  tasks: TaskTemplate[];
}

export interface DocumentTemplate {
  name: string;
  category: string;
  status: string;
  required: boolean;
  expiryDate?: string;
}

export const journeyPhaseTemplates: PhaseTemplate[] = [
  {
    number: 1,
    title: 'Research & Planning',
    description: 'Research universities, countries, and create your initial plan',
    timeframe: '12-18 months before departure',
    icon: '🔍',
    tasks: [
      {
        title: 'Research top universities in target country',
        description: 'Create a list of 8-10 universities that match your goals',
        completed: true,
        priority: 'High',
        category: 'Research',
      },
      {
        title: 'Check entry requirements for each program',
        description: 'Review GPA, test scores, and other requirements',
        completed: true,
        priority: 'High',
        category: 'Research',
      },
      {
        title: 'Compare cost of living in different cities',
        description: 'Use STAB comparison tool to evaluate expenses',
        completed: true,
        priority: 'Medium',
        category: 'Research',
      },
      {
        title: 'Research visa requirements',
        description: 'Understand visa process for your target country',
        completed: true,
        priority: 'High',
        category: 'Research',
      },
      {
        title: 'Calculate total budget needed',
        description: 'Include tuition, living costs, travel, and emergency funds',
        completed: true,
        priority: 'High',
        category: 'Financial',
      },
      {
        title: 'Join student forums and communities',
        description: 'Connect with current students in your target universities',
        completed: false,
        priority: 'Low',
        category: 'Networking',
      },
      {
        title: 'Attend virtual university fairs',
        description: 'Get information directly from university representatives',
        completed: false,
        priority: 'Medium',
        category: 'Networking',
      },
      {
        title: 'Request official transcripts',
        description: 'Order transcripts from your current/previous institutions',
        completed: true,
        priority: 'High',
        category: 'Documents',
      },
    ],
  },
  {
    number: 2,
    title: 'Standardized Tests',
    description: 'Prepare for and take required English and entrance exams',
    timeframe: '9-12 months before departure',
    icon: '📝',
    tasks: [
      {
        title: 'Choose English proficiency test (IELTS/TOEFL)',
        description: 'Check which test is accepted by your universities',
        completed: true,
        priority: 'High',
        category: 'Tests',
      },
      {
        title: 'Register for English proficiency test',
        description: 'Book your test date 2-3 months in advance',
        completed: true,
        priority: 'High',
        category: 'Tests',
      },
      {
        title: 'Take practice tests',
        description: 'Complete at least 3-5 full practice tests',
        completed: false,
        priority: 'High',
        category: 'Tests',
      },
      {
        title: 'Take official English proficiency exam',
        description: 'Aim for score above university minimum requirements',
        completed: false,
        priority: 'High',
        category: 'Tests',
      },
      {
        title: 'Check if GRE/GMAT required',
        description: 'Some graduate programs require additional tests',
        completed: true,
        priority: 'Medium',
        category: 'Tests',
      },
      {
        title: 'Send test scores to universities',
        description: 'Most tests allow free score reports to 4-5 universities',
        completed: false,
        priority: 'High',
        category: 'Tests',
      },
    ],
  },
  {
    number: 3,
    title: 'Applications',
    description: 'Prepare documents and submit applications to universities',
    timeframe: '6-9 months before departure',
    icon: '📄',
    tasks: [
      {
        title: 'Write Statement of Purpose (SOP)',
        description: 'Explain your academic goals and why you want to study there',
        completed: false,
        priority: 'High',
        category: 'Documents',
      },
      {
        title: 'Prepare CV/Resume',
        description: 'Highlight academic achievements, work experience, and skills',
        completed: false,
        priority: 'High',
        category: 'Documents',
      },
      {
        title: 'Request 2-3 recommendation letters',
        description: 'Ask professors or supervisors who know you well',
        completed: false,
        priority: 'High',
        category: 'Documents',
      },
      {
        title: 'Translate documents if needed',
        description: 'Get certified translations of non-English documents',
        completed: false,
        priority: 'Medium',
        category: 'Documents',
      },
      {
        title: 'Create accounts on university portals',
        description: 'Set up application accounts for each university',
        completed: false,
        priority: 'High',
        category: 'Application',
      },
      {
        title: 'Fill out application forms',
        description: 'Complete all sections carefully and accurately',
        completed: false,
        priority: 'High',
        category: 'Application',
      },
      {
        title: 'Pay application fees',
        description: 'Application fees typically range from $50-150 per university',
        completed: false,
        priority: 'High',
        category: 'Application',
      },
      {
        title: 'Submit applications before deadlines',
        description: 'Submit at least 1 week before deadline to avoid issues',
        completed: false,
        priority: 'High',
        category: 'Application',
      },
      {
        title: 'Track application status',
        description: 'Check email and portals regularly for updates',
        completed: false,
        priority: 'Medium',
        category: 'Application',
      },
    ],
  },
  {
    number: 4,
    title: 'Financial Planning',
    description: 'Apply for scholarships and arrange funding',
    timeframe: '6-9 months before departure',
    icon: '💰',
    tasks: [
      {
        title: 'Research available scholarships',
        description: 'Use STAB scholarship database to find opportunities',
        completed: false,
        priority: 'High',
        category: 'Scholarships',
      },
      {
        title: 'Shortlist 10-15 scholarships',
        description: 'Focus on scholarships you are eligible for',
        completed: false,
        priority: 'High',
        category: 'Scholarships',
      },
      {
        title: 'Prepare scholarship essays',
        description: 'Write compelling essays explaining your financial need and goals',
        completed: false,
        priority: 'High',
        category: 'Scholarships',
      },
      {
        title: 'Apply for scholarships',
        description: 'Submit applications before deadlines',
        completed: false,
        priority: 'High',
        category: 'Scholarships',
      },
      {
        title: 'Open international bank account',
        description: 'Set up account that works in your target country',
        completed: false,
        priority: 'Medium',
        category: 'Banking',
      },
      {
        title: 'Prepare bank statements',
        description: 'Collect last 6 months of bank statements for visa',
        completed: false,
        priority: 'High',
        category: 'Banking',
      },
      {
        title: 'Get sponsor/parent financial documents',
        description: 'If someone is sponsoring your studies',
        completed: false,
        priority: 'High',
        category: 'Banking',
      },
      {
        title: 'Create monthly savings plan',
        description: 'Track progress toward your funding goal',
        completed: false,
        priority: 'Medium',
        category: 'Banking',
      },
    ],
  },
  {
    number: 5,
    title: 'Visa & Documentation',
    description: 'Apply for student visa and prepare legal documents',
    timeframe: '3-6 months before departure',
    icon: '🛂',
    tasks: [
      {
        title: 'Receive university acceptance letter',
        description: 'Get official acceptance from at least one university',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Pay tuition deposit',
        description: 'Secure your spot by paying deposit to university',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Get CAS/I-20/CoE letter',
        description: 'Receive visa support letter from university',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Collect all visa documents',
        description: 'Prepare passport, photos, financial docs, acceptance letter',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Book visa appointment',
        description: 'Schedule appointment at embassy/visa center',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Pay visa application fee',
        description: 'Fees vary by country ($160-500)',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Attend visa interview/biometrics',
        description: 'Be prepared to answer questions about your study plans',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
      {
        title: 'Get medical examination',
        description: 'Some countries require health check-ups',
        completed: false,
        priority: 'Medium',
        category: 'Health',
      },
      {
        title: 'Get required vaccinations',
        description: 'Check vaccination requirements for your destination',
        completed: false,
        priority: 'Medium',
        category: 'Health',
      },
      {
        title: 'Receive visa approval',
        description: 'Track your visa application status',
        completed: false,
        priority: 'High',
        category: 'Visa',
      },
    ],
  },
  {
    number: 6,
    title: 'Pre-Departure',
    description: 'Book travel, arrange accommodation, and prepare to leave',
    timeframe: '1-3 months before departure',
    icon: '✈️',
    tasks: [
      {
        title: 'Apply for student accommodation',
        description: 'Apply for university dorms or find private housing',
        completed: false,
        priority: 'High',
        category: 'Accommodation',
      },
      {
        title: 'Book flight tickets',
        description: 'Book 3-4 weeks before departure for better prices',
        completed: false,
        priority: 'High',
        category: 'Travel',
      },
      {
        title: 'Get travel insurance',
        description: 'Cover medical emergencies and trip cancellations',
        completed: false,
        priority: 'High',
        category: 'Travel',
      },
      {
        title: 'Purchase student health insurance',
        description: 'Many universities require proof of health insurance',
        completed: false,
        priority: 'High',
        category: 'Health',
      },
      {
        title: 'Arrange airport pickup',
        description: 'Book taxi or arrange university pickup service',
        completed: false,
        priority: 'Medium',
        category: 'Travel',
      },
      {
        title: 'Join university student groups',
        description: 'Connect with other incoming students on social media',
        completed: false,
        priority: 'Low',
        category: 'Networking',
      },
      {
        title: 'Pack essentials',
        description: 'Make checklist: documents, clothes, adapters, medications',
        completed: false,
        priority: 'Medium',
        category: 'Preparation',
      },
      {
        title: 'Get international SIM card or plan',
        description: 'Ensure you have connectivity upon arrival',
        completed: false,
        priority: 'Medium',
        category: 'Preparation',
      },
      {
        title: 'Exchange currency',
        description: 'Get some local currency for initial expenses',
        completed: false,
        priority: 'Medium',
        category: 'Preparation',
      },
      {
        title: 'Attend pre-departure orientation',
        description: 'Join university orientation sessions if available',
        completed: false,
        priority: 'Low',
        category: 'Preparation',
      },
    ],
  },
];

export const documentTemplates: DocumentTemplate[] = [
  { name: 'Passport', category: 'Personal', status: 'ready', required: true, expiryDate: '2030-06-15' },
  { name: 'Passport Photos', category: 'Personal', status: 'ready', required: true },
  { name: 'Birth Certificate', category: 'Personal', status: 'in-progress', required: true },
  { name: 'High School Diploma', category: 'Academic', status: 'ready', required: true },
  { name: 'University Transcripts', category: 'Academic', status: 'ready', required: true },
  { name: 'Degree Certificate', category: 'Academic', status: 'ready', required: true },
  { name: 'Translated Transcripts', category: 'Academic', status: 'in-progress', required: false },
  { name: 'English Test Score (IELTS/TOEFL)', category: 'Tests', status: 'missing', required: true },
  { name: 'GRE/GMAT Score', category: 'Tests', status: 'missing', required: false },
  { name: 'Statement of Purpose', category: 'Application', status: 'missing', required: true },
  { name: 'CV/Resume', category: 'Application', status: 'in-progress', required: true },
  { name: 'Recommendation Letters', category: 'Application', status: 'missing', required: true },
  { name: 'Bank Statements', category: 'Financial', status: 'missing', required: true },
  { name: 'Sponsor Letter', category: 'Financial', status: 'missing', required: false },
  { name: 'Scholarship Award Letter', category: 'Financial', status: 'missing', required: false },
];
