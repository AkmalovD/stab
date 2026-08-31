// City-related types

export interface City {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  flag: string;
  costOfLiving: string;
  costs: CityLivingCosts;
  costBreakdown: CostBreakdown;
  metadata?: CityMetadata;
}

export interface CostBreakdown {
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  utilities: number;
}

export interface CityLivingCosts {
  rent: string;
  food: string;
  transport: string;
  tuition: string;
}

export interface CityMetadata {
  population?: number;
  climate?: string;
  language?: string;
  currency?: string;
  timezone?: string;
  studentPopulation?: number;
}

export interface CurrencyConversion {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: string;
}

export type ComparisonMetric = 'cost' | 'quality' | 'safety' | 'lifestyle';

export interface ComparisonData {
  cityId: string;
  metric: ComparisonMetric;
  value: number;
  label: string;
}
