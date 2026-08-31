import { londonData } from './londonData';
import { parisData } from './parisData';
import { tokyoData } from './tokyoData';

// Lightweight inline types matching the shape of the hardcoded city data
export interface CityScholarship {
  name: string;
  type: string;
  description: string;
  button: string;
}

export interface CityUniversity {
  name: string;
  rank: number;
  fields: string[];
  image: string;
  description: string;
  badge: string;
}

export interface CityHousing {
  type: string;
  price: string;
  description: string;
  icon: string;
}

export interface CityEssential {
  title: string;
  description: string;
}

export interface CityTimeline {
  step: string;
  title: string;
  description: string;
}

export interface CityData {
  name: string;
  country: string;
  universities: CityUniversity[];
  costOfLiving: {
    rent: number;
    food: number;
    transport: number;
    total: number[];
  };
  scholarships: CityScholarship[];
  housing: CityHousing[];
  essentials: CityEssential[];
  timeline: CityTimeline[];
}

export type CityMeta = {
  slug: string;
  image: string;
  imageAlt: string;
  currency: string;
  badge: string;
  visaTitle: string;
  visaDescription: string;
  visaChecklist: string[];
  ctaTitle: string;
  ctaDescription: string;
};

export const cityMeta: Record<string, CityMeta> = {
  london: {
    slug: 'london',
    image: '/london.webp',
    imageAlt: 'Aerial view of London skyline at sunset including the Thames',
    currency: '£',
    badge: 'Top Destination',
    visaTitle: 'Student Visa Checklist (Tier 4)',
    visaDescription: 'Ensure you have all these documents prepared before your appointment at the consulate.',
    visaChecklist: [
      'CAS Number (from University)',
      'Current Passport',
      'Proof of Finances',
      'English Proficiency (IELTS)',
      'Tuberculosis Test Results',
      'Immigration Health Surcharge',
    ],
    ctaTitle: 'Ready to start your London journey?',
    ctaDescription:
      'Get a free personalized roadmap and connect with counselors who can guide you through the application process.',
  },
  paris: {
    slug: 'paris',
    image: '/paris.webp',
    imageAlt: 'Aerial view of Paris with the Eiffel Tower',
    currency: '€',
    badge: 'Top Destination',
    visaTitle: 'Student Visa Checklist (VLS-TS)',
    visaDescription: 'Подготовьте все необходимые документы перед визовым собеседованием в консульстве.',
    visaChecklist: [
      'Действующий загранпаспорт',
      'Подтверждение зачисления в университет',
      'Подтверждение финансовой состоятельности',
      'Свидетельство о жилье (CROUS или частное)',
      'Медицинская страховка',
      'Справка об отсутствии судимостей',
    ],
    ctaTitle: 'Готовы начать своё парижское путешествие?',
    ctaDescription:
      'Получите персональный план действий и свяжитесь с консультантами, которые помогут вам с поступлением.',
  },
  tokyo: {
    slug: 'tokyo',
    image: '/tokyo.webp',
    imageAlt: 'Tokyo skyline with Mount Fuji in the background',
    currency: '¥',
    badge: 'Top Destination',
    visaTitle: 'Student Visa Checklist (Japan)',
    visaDescription: 'Подготовьте все необходимые документы для получения студенческой визы в Японию.',
    visaChecklist: [
      'Certificate of Eligibility (COE)',
      'Действующий загранпаспорт',
      'Подтверждение зачисления в университет',
      'Подтверждение финансовой состоятельности',
      'Фотографии',
      'Анкета на визу',
    ],
    ctaTitle: 'Готовы начать своё токийское приключение?',
    ctaDescription:
      'Получите персональный план действий и свяжитесь с консультантами, которые помогут вам с поступлением.',
  },
};

export const citiesData: Record<string, CityData> = {
  london: londonData,
  paris: parisData,
  tokyo: tokyoData,
};

export const allCities: Record<string, CityData> = { london: londonData, paris: parisData, tokyo: tokyoData };

