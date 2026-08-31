// Journey Planner-related types

export interface JourneyProfile {
  name: string;
  targetCountry: string;
  studyLevel: 'Undergraduate' | 'Masters' | 'PhD' | 'Language Course';
  startDate: Date;
  createdAt: Date;
  fullName: string;
  destinationCountry: string;
  intendedStartDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  description: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'not-started' | 'locked';
  tasks: Task[];
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  status: 'ready' | 'in-progress' | 'missing';
  required: boolean;
  expiryDate?: Date;
}
