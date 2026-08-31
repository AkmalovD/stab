// Community-related types

export interface StudentStory {
  id: string;
  studentName: string;
  studentPhoto: string;
  country: string;
  university: string;
  program: string;
  year: number;
  story: string;
  budget: string;
  scholarship: string;
  tips: string[];
  likes: number;
  comments: number;
}

export interface ForumPost {
  id: string;
  author: string;
  authorPhoto: string;
  title: string;
  content: string;
  category: string;
  country: string;
  timestamp: Date;
  views: number;
  replies: number;
  likes: number;
  answered: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'Virtual' | 'Webinar' | 'Workshop' | 'Meetup';
  date: Date;
  time: string;
  organizer: string;
  attendees: number;
  capacity: number;
  isRegistered: boolean;
  imageUrl: string;
}
