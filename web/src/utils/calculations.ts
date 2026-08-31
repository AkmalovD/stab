import { City, ComparisonData, ComparisonMetric } from '../types';

/**
 * Calculate cost of living index for a city
 * Base index is 100, calculated relative to average costs
 */
export const calculateCostOfLivingIndex = (city: City): number => {
  try {
    const rent = parseInt(city.costs.rent.replace(/[^\d]/g, '')) || 0;
    const food = parseInt(city.costs.food.replace(/[^\d]/g, '')) || 0;
    const transport = parseInt(city.costs.transport.replace(/[^\d]/g, '')) || 0;
    
    // Base calculation (can be improved with actual market data)
    const totalCost = rent + food + transport;
    return Math.round((totalCost / 20)); // Normalized to reasonable index range
  } catch (error) {
    console.warn(`Failed to calculate cost index for ${city.name}:`, error);
    return 100; // Default index
  }
};

/**
 * Mock currency conversion rates
 * In production, this would connect to a real API like ExchangeRate-API
 */
export const getMockExchangeRates = (): Record<string, Record<string, number>> => ({
  'USD': { 'EUR': 0.85, 'GBP': 0.73, 'CAD': 1.25, 'AUD': 1.35, 'USD': 1 },
  'EUR': { 'USD': 1.18, 'GBP': 0.86, 'CAD': 1.47, 'AUD': 1.59, 'EUR': 1 },
  'GBP': { 'USD': 1.37, 'EUR': 1.16, 'CAD': 1.71, 'AUD': 1.85, 'GBP': 1 },
  'CAD': { 'USD': 0.80, 'EUR': 0.68, 'GBP': 0.58, 'AUD': 1.08, 'CAD': 1 },
  'AUD': { 'USD': 0.74, 'EUR': 0.63, 'GBP': 0.54, 'CAD': 0.93, 'AUD': 1 }
});

/**
 * Convert currency amount
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  const rates = getMockExchangeRates();
  const rate = rates[fromCurrency.toUpperCase()]?.[toCurrency.toUpperCase()];
  
  if (!rate) {
    console.warn(`Exchange rate not found for ${fromCurrency} to ${toCurrency}`);
    return amount; // Return original amount if rate not found
  }
  
  return Number((amount * rate).toFixed(2));
};

/**
 * Format currency with proper symbol and locale
 */
export const formatCurrency = (amount: number, currency: string): string => {
  const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'C$',
    'AUD': 'A$'
  };
  
  const symbol = currencySymbols[currency.toUpperCase()] || currency;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2
  }).format(amount).replace(/[A-Z]{3}/, symbol);
};

/**
 * Generate comparison data for visualization
 */
export const generateComparisonData = (
  cities: City[],
  metric: ComparisonMetric
): ComparisonData[] => {
  return cities.map(city => {
    let value: number;
    let label: string;
    
    switch (metric) {
      case 'cost':
        value = calculateCostOfLivingIndex(city);
        label = `Index: ${value}`;
        break;
      case 'quality':
        // Mock quality score based on city name (in real app, would come from data)
        value = Math.floor(Math.random() * 30) + 70; // 70-100 range
        label = `Score: ${value}/100`;
        break;
      case 'safety':
        // Mock safety score
        value = Math.floor(Math.random() * 20) + 80; // 80-100 range
        label = `Safety: ${value}/100`;
        break;
      case 'lifestyle':
        // Mock lifestyle score
        value = Math.floor(Math.random() * 25) + 75; // 75-100 range
        label = `Lifestyle: ${value}/100`;
        break;
      default:
        value = 50;
        label = 'N/A';
    }
    
    return {
      cityId: city.id,
      metric,
      value,
      label
    };
  });
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Validate search query
 */
export const validateSearchQuery = (query: string): boolean => {
  return query.trim().length >= 2;
};

/**
 * Extract numeric value from cost string
 */
export const extractNumericValue = (costString: string): number => {
  const match = costString.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, '')) : 0;
};