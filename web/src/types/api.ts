// API and Utility Types
import type { City } from './city';
import type { University } from './university';

export interface SearchFormData {
  query: string;
  filters: {
    country?: string;
    budgetRange?: [number, number];
    programType?: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export type CityListResponse = ApiResponse<City[]>;
export type UniversityListResponse = ApiResponse<University[]>;
