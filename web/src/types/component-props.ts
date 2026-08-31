// Component Props Types
import type { City } from './city';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CityCardProps {
  city: City;
  isSelected: boolean;
  onSelect: () => void;
}

export interface CostBreakdownProps {
  cities: City[];
}

export interface CurrencyConverterProps {
  className?: string;
}

export interface VisualComparisonProps {
  cities: City[];
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
