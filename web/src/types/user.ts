// User Profile types

export interface UserProfile {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  dateOfBirth?: string;
  location?: string;
  university?: string;
  major?: string;
  studyDestination?: string;
  targetUniversity?: string;
  budget?: string;
  startDate?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
