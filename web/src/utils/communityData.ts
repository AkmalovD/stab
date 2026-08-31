import { StudentStory, ForumPost, Event } from '../types';

export const studentStories: StudentStory[] = [
  {
    id: '1',
    studentName: 'Sarah Johnson',
    studentPhoto: 'https://i.pravatar.cc/150?img=1',
    country: 'United Kingdom',
    university: 'University of Oxford',
    program: 'MSc Computer Science',
    year: 2023,
    story: 'Moving to Oxford was a dream come true. The scholarship covered my tuition, and budgeting carefully helped me manage living costs. The key was finding affordable accommodation outside the city center.',
    budget: '$18,000/year',
    scholarship: 'Chevening Scholarship',
    tips: [
      'Apply for accommodation early',
      'Use student discounts everywhere',
      'Cook meals at home to save money',
    ],
    likes: 127,
    comments: 23,
  },
  {
    id: '2',
    studentName: 'Rajesh Kumar',
    studentPhoto: 'https://i.pravatar.cc/150?img=2',
    country: 'Germany',
    university: 'Technical University of Munich',
    program: 'MS Mechanical Engineering',
    year: 2022,
    story: 'Germany was my top choice because of the quality education and no tuition fees. The DAAD scholarship helped with living expenses. Munich is expensive, but student housing made it manageable.',
    budget: '$12,000/year',
    scholarship: 'DAAD Scholarship',
    tips: [
      'Learn basic German before arriving',
      'Get a part-time job (20hrs/week allowed)',
      'Use public transport monthly pass',
    ],
    likes: 95,
    comments: 18,
  },
  {
    id: '3',
    studentName: 'Maria Garcia',
    studentPhoto: 'https://i.pravatar.cc/150?img=3',
    country: 'Netherlands',
    university: 'University of Amsterdam',
    program: 'MA International Relations',
    year: 2024,
    story: 'Amsterdam offered the perfect blend of culture and academics. The Holland Scholarship kickstarted my journey. Living with roommates and biking everywhere kept costs down.',
    budget: '$15,000/year',
    scholarship: 'Holland Scholarship',
    tips: [
      'Buy a good bike - it saves transport costs',
      'Share accommodation with other students',
      'Take advantage of free museum days',
    ],
    likes: 143,
    comments: 31,
  },
  {
    id: '4',
    studentName: 'John Chen',
    studentPhoto: 'https://i.pravatar.cc/150?img=4',
    country: 'Canada',
    university: 'University of Toronto',
    program: 'MBA',
    year: 2023,
    story: 'Toronto is diverse and welcoming. The Vanier scholarship was highly competitive but worth applying for. Winter can be harsh, so budget for warm clothing!',
    budget: '$22,000/year',
    scholarship: 'Vanier CGS',
    tips: [
      'Network early with alumni',
      'Budget for winter clothing',
      'Use campus facilities to save money',
    ],
    likes: 88,
    comments: 15,
  },
];

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    author: 'Alex Thompson',
    authorPhoto: 'https://i.pravatar.cc/150?img=5',
    title: 'How much should I budget for groceries in London?',
    content: "I'm planning to study in London next year. What's a realistic monthly budget for groceries if I cook most of my meals at home?",
    category: 'Budgeting',
    country: 'United Kingdom',
    timestamp: new Date('2025-01-15'),
    views: 234,
    replies: 12,
    likes: 18,
    answered: true,
  },
  {
    id: '2',
    author: 'Emily Zhang',
    authorPhoto: 'https://i.pravatar.cc/150?img=6',
    title: 'Best student accommodation in Berlin?',
    content: 'Looking for affordable student housing in Berlin. Any recommendations for dormitories or shared apartments near TU Berlin?',
    category: 'Accommodation',
    country: 'Germany',
    timestamp: new Date('2025-01-10'),
    views: 189,
    replies: 8,
    likes: 15,
    answered: false,
  },
  {
    id: '3',
    author: 'Mohammed Ali',
    authorPhoto: 'https://i.pravatar.cc/150?img=7',
    title: 'Can I work part-time on a student visa in Australia?',
    content: 'What are the regulations for international students working in Australia? How many hours per week are allowed?',
    category: 'Work & Visa',
    country: 'Australia',
    timestamp: new Date('2025-01-08'),
    views: 412,
    replies: 15,
    likes: 32,
    answered: true,
  },
  {
    id: '4',
    author: 'Sophie Martin',
    authorPhoto: 'https://i.pravatar.cc/150?img=8',
    title: 'Transportation costs in Amsterdam',
    content: 'Is it worth buying a bike or should I rely on public transport? What are the pros and cons of each option?',
    category: 'Transportation',
    country: 'Netherlands',
    timestamp: new Date('2025-01-05'),
    views: 156,
    replies: 9,
    likes: 11,
    answered: true,
  },
  {
    id: '5',
    author: 'David Kim',
    authorPhoto: 'https://i.pravatar.cc/150?img=9',
    title: 'Health insurance requirements for students in Canada',
    content: 'What type of health insurance do international students need in Canada? Is it expensive?',
    category: 'Healthcare',
    country: 'Canada',
    timestamp: new Date('2025-01-03'),
    views: 298,
    replies: 11,
    likes: 24,
    answered: true,
  },
  {
    id: '6',
    author: 'Lisa Wang',
    authorPhoto: 'https://i.pravatar.cc/150?img=10',
    title: 'Scholarship application tips needed!',
    content: 'I have a 3.7 GPA and want to apply for the Fulbright scholarship. Any tips on making my application stand out?',
    category: 'Scholarships',
    country: 'United States',
    timestamp: new Date('2025-01-01'),
    views: 523,
    replies: 19,
    likes: 45,
    answered: false,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Study Abroad Virtual Fair',
    description: 'Meet representatives from 50+ universities worldwide. Ask questions about programs, scholarships, and student life.',
    type: 'Virtual',
    date: new Date('2025-02-15'),
    time: '10:00 AM - 4:00 PM EST',
    organizer: 'STAB Community',
    attendees: 342,
    capacity: 500,
    isRegistered: false,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    id: '2',
    title: 'Budgeting Workshop: Living on a Student Budget',
    description: 'Learn practical tips for managing finances while studying abroad. Topics include budgeting apps, cost-cutting strategies, and emergency funds.',
    type: 'Webinar',
    date: new Date('2025-02-20'),
    time: '6:00 PM - 7:30 PM GMT',
    organizer: 'Financial Aid Office',
    attendees: 128,
    capacity: 200,
    isRegistered: false,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
  },
  {
    id: '3',
    title: 'UK Student Visa Q&A Session',
    description: 'Immigration experts answer your questions about UK student visa applications, requirements, and processing times.',
    type: 'Webinar',
    date: new Date('2025-02-25'),
    time: '3:00 PM - 4:30 PM GMT',
    organizer: 'UK Immigration Services',
    attendees: 215,
    capacity: 300,
    isRegistered: true,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
  },
  {
    id: '4',
    title: 'Meet & Greet: Students in Germany',
    description: 'Connect with current and former students studying in Germany. Share experiences and get insider tips.',
    type: 'Virtual',
    date: new Date('2025-03-01'),
    time: '7:00 PM - 8:30 PM CET',
    organizer: 'Germany Student Network',
    attendees: 89,
    capacity: 150,
    isRegistered: false,
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400',
  },
  {
    id: '5',
    title: 'Scholarship Application Writing Workshop',
    description: 'Expert guidance on writing compelling scholarship essays and preparing strong applications.',
    type: 'Workshop',
    date: new Date('2025-03-10'),
    time: '2:00 PM - 5:00 PM EST',
    organizer: 'Scholarship Advisors',
    attendees: 167,
    capacity: 250,
    isRegistered: true,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
  },
];

export const categories = [
  'All Categories',
  'Budgeting',
  'Accommodation',
  'Scholarships',
  'Work & Visa',
  'Transportation',
  'Healthcare',
  'Culture',
  'Academics',
];

export const eventTypes = ['All Types', 'Virtual', 'Webinar', 'Workshop', 'Meetup'];

export function filterForumPosts(
  posts: ForumPost[],
  searchTerm: string,
  category: string,
  country: string
): ForumPost[] {
  return posts.filter((post) => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All Categories' || post.category === category;
    const matchesCountry = country === 'All Countries' || post.country === country;

    return matchesSearch && matchesCategory && matchesCountry;
  });
}

export function filterEvents(
  events: Event[],
  searchTerm: string,
  type: string
): Event[] {
  return events.filter((event) => {
    const matchesSearch =
      searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = type === 'All Types' || event.type === type;

    return matchesSearch && matchesType;
  });
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events
    .filter((event) => event.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
