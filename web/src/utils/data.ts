import { City } from '../types';

export const citiesData: City[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop',
    flag: '',
    costOfLiving: 'High',
    costs: {
      rent: '$1,500/month',
      food: '$400/month',
      transport: '$150/month',
      tuition: '$10,000/year'
    },
    costBreakdown: {
      housing: 1500,
      food: 400,
      transport: 150,
      entertainment: 200,
      utilities: 100
    },
    metadata: {
      population: 9000000,
      climate: 'Temperate oceanic',
      language: 'English',
      currency: 'GBP',
      timezone: 'GMT',
      studentPopulation: 400000
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    flag: '',
    costOfLiving: 'Medium-High',
    costs: {
      rent: '$1,200/month',
      food: '$350/month',
      transport: '$120/month',
      tuition: '$8,000/year'
    },
    costBreakdown: {
      housing: 1200,
      food: 350,
      transport: 120,
      entertainment: 180,
      utilities: 90
    },
    metadata: {
      population: 2100000,
      climate: 'Oceanic',
      language: 'French',
      currency: 'EUR',
      timezone: 'CET',
      studentPopulation: 300000
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
    flag: '',
    costOfLiving: 'Medium-High',
    costs: {
      rent: '$1,100/month',
      food: '$300/month',
      transport: '$100/month',
      tuition: '$7,500/year'
    },
    costBreakdown: {
      housing: 1100,
      food: 300,
      transport: 100,
      entertainment: 150,
      utilities: 80
    },
    metadata: {
      population: 14000000,
      climate: 'Humid subtropical',
      language: 'Japanese',
      currency: 'JPY',
      timezone: 'JST',
      studentPopulation: 500000
    }
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop',
    flag: '',
    costOfLiving: 'Very High',
    costs: {
      rent: '$2,000/month',
      food: '$500/month',
      transport: '$130/month',
      tuition: '$15,000/year'
    },
    costBreakdown: {
      housing: 2000,
      food: 500,
      transport: 130,
      entertainment: 300,
      utilities: 120
    },
    metadata: {
      population: 8400000,
      climate: 'Humid subtropical',
      language: 'English',
      currency: 'USD',
      timezone: 'EST',
      studentPopulation: 600000
    }
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
    flag: '',
    costOfLiving: 'Medium-High',
    costs: {
      rent: '$1,300/month',
      food: '$380/month',
      transport: '$140/month',
      tuition: '$12,000/year'
    },
    costBreakdown: {
      housing: 1300,
      food: 380,
      transport: 140,
      entertainment: 200,
      utilities: 110
    },
    metadata: {
      population: 2930000,
      climate: 'Humid continental',
      language: 'English/French',
      currency: 'CAD',
      timezone: 'EST',
      studentPopulation: 200000
    }
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    flag: '',
    costOfLiving: 'High',
    costs: {
      rent: '$1,400/month',
      food: '$420/month',
      transport: '$160/month',
      tuition: '$13,000/year'
    },
    costBreakdown: {
      housing: 1400,
      food: 420,
      transport: 160,
      entertainment: 220,
      utilities: 100
    },
    metadata: {
      population: 5300000,
      climate: 'Humid subtropical',
      language: 'English',
      currency: 'AUD',
      timezone: 'AEST',
      studentPopulation: 280000
    }
  }
];

// Helper function to get city by ID
export const getCityById = (id: string): City | undefined => {
  return citiesData.find(city => city.id === id);
};

// Helper function to get cities by country
export const getCitiesByCountry = (country: string): City[] => {
  return citiesData.filter(city => 
    city.country.toLowerCase().includes(country.toLowerCase())
  );
};

// Helper function to search cities
export const searchCities = (query: string): City[] => {
  const lowercaseQuery = query.toLowerCase();
  return citiesData.filter(city =>
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.country.toLowerCase().includes(lowercaseQuery)
  );
};