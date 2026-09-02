import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const destinations = [
  { slug: 'london', name: 'London', country: 'United Kingdom', image: '/london.webp', region: 'Europe', budgetTier: 'High Cost', monthlyBudgetMin: 1300, monthlyBudgetMax: 2000, universitiesCount: 40, scholarshipMatch: 78, tags: ['English', 'Finance Hub', 'Research'], languages: ['English'], hasDetailPage: true },
  { slug: 'paris', name: 'Paris', country: 'France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Moderate', monthlyBudgetMin: 900, monthlyBudgetMax: 1400, universitiesCount: 20, scholarshipMatch: 82, tags: ['French', 'Arts', 'Fashion'], languages: ['French', 'English'], hasDetailPage: true },
  { slug: 'tokyo', name: 'Tokyo', country: 'Japan', image: '/tokyo.webp', region: 'Asia', budgetTier: 'Moderate', monthlyBudgetMin: 800, monthlyBudgetMax: 1200, universitiesCount: 25, scholarshipMatch: 75, tags: ['Japanese', 'Tech Hub', 'Innovation'], languages: ['Japanese', 'English'], hasDetailPage: true },
  { slug: 'berlin', name: 'Berlin', country: 'Germany', image: 'https://images.pexels.com/photos/1128408/pexels-photo-1128408.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Low Cost', monthlyBudgetMin: 700, monthlyBudgetMax: 1000, universitiesCount: 12, scholarshipMatch: 85, tags: ['English', 'Tech Hub'], languages: ['German', 'English'], hasDetailPage: false },
  { slug: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', image: 'https://images.pexels.com/photos/1345791/pexels-photo-1345791.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Moderate', monthlyBudgetMin: 950, monthlyBudgetMax: 1400, universitiesCount: 8, scholarshipMatch: 72, tags: ['High Int. Focus', 'Creative Hub'], languages: ['English'], hasDetailPage: false },
  { slug: 'prague', name: 'Prague', country: 'Czech Republic', image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Low Cost', monthlyBudgetMin: 550, monthlyBudgetMax: 850, universitiesCount: 10, scholarshipMatch: 90, tags: ['Historical', 'Student Friendly'], languages: ['English'], hasDetailPage: false },
  { slug: 'barcelona', name: 'Barcelona', country: 'Spain', image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Moderate', monthlyBudgetMin: 850, monthlyBudgetMax: 1200, universitiesCount: 7, scholarshipMatch: 68, tags: ['Spanish', 'Architecture', 'Beach Life'], languages: ['Spanish', 'English'], hasDetailPage: false },
  { slug: 'vienna', name: 'Vienna', country: 'Austria', image: 'https://images.pexels.com/photos/1049697/pexels-photo-1049697.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Low Cost', monthlyBudgetMin: 750, monthlyBudgetMax: 1050, universitiesCount: 9, scholarshipMatch: 80, tags: ['German', 'Classical Music', 'Culture'], languages: ['German', 'English'], hasDetailPage: false },
  { slug: 'lisbon', name: 'Lisbon', country: 'Portugal', image: 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Low Cost', monthlyBudgetMin: 600, monthlyBudgetMax: 900, universitiesCount: 6, scholarshipMatch: 74, tags: ['Portuguese', 'Startup Scene', 'Affordable'], languages: ['Portuguese', 'English'], hasDetailPage: false },
  { slug: 'singapore', name: 'Singapore', country: 'Singapore', image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Asia', budgetTier: 'High Cost', monthlyBudgetMin: 1200, monthlyBudgetMax: 1800, universitiesCount: 5, scholarshipMatch: 88, tags: ['English', 'Finance Hub', 'Innovation'], languages: ['English'], hasDetailPage: false },
  { slug: 'seoul', name: 'Seoul', country: 'South Korea', image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Asia', budgetTier: 'Low Cost', monthlyBudgetMin: 700, monthlyBudgetMax: 1000, universitiesCount: 18, scholarshipMatch: 79, tags: ['Korean', 'Tech Hub', 'K-Culture'], languages: ['Korean', 'English'], hasDetailPage: false },
  { slug: 'toronto', name: 'Toronto', country: 'Canada', image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Americas', budgetTier: 'Moderate', monthlyBudgetMin: 1000, monthlyBudgetMax: 1500, universitiesCount: 11, scholarshipMatch: 71, tags: ['English', 'Multicultural', 'Research'], languages: ['English'], hasDetailPage: false },
  { slug: 'melbourne', name: 'Melbourne', country: 'Australia', image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Oceania', budgetTier: 'High Cost', monthlyBudgetMin: 1100, monthlyBudgetMax: 1600, universitiesCount: 8, scholarshipMatch: 76, tags: ['English', 'Student Friendly', 'Coffee Culture'], languages: ['English'], hasDetailPage: false },
  { slug: 'edinburgh', name: 'Edinburgh', country: 'United Kingdom', image: 'https://images.pexels.com/photos/760694/pexels-photo-760694.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Moderate', monthlyBudgetMin: 950, monthlyBudgetMax: 1300, universitiesCount: 5, scholarshipMatch: 81, tags: ['English', 'Historical', 'Research'], languages: ['English'], hasDetailPage: false },
  { slug: 'munich', name: 'Munich', country: 'Germany', image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'Moderate', monthlyBudgetMin: 900, monthlyBudgetMax: 1300, universitiesCount: 6, scholarshipMatch: 83, tags: ['German', 'Engineering', 'Beer Culture'], languages: ['German', 'English'], hasDetailPage: false },
  { slug: 'dublin', name: 'Dublin', country: 'Ireland', image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=800', region: 'Europe', budgetTier: 'High Cost', monthlyBudgetMin: 1200, monthlyBudgetMax: 1700, universitiesCount: 7, scholarshipMatch: 70, tags: ['English', 'Tech Hub', 'Friendly'], languages: ['English'], hasDetailPage: false },
];

const cities = [
  { slug: 'london', name: 'London', country: 'United Kingdom', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop', flag: '', costOfLiving: 'High', costsRent: '$1,500/month', costsFood: '$400/month', costsTransport: '$150/month', costsTuition: '$10,000/year', housing: 1500, food: 400, transport: 150, entertainment: 200, utilities: 100, population: 9000000, climate: 'Temperate oceanic', language: 'English', currency: 'GBP', timezone: 'GMT', studentPopulation: 400000 },
  { slug: 'paris', name: 'Paris', country: 'France', imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', flag: '', costOfLiving: 'Medium-High', costsRent: '$1,200/month', costsFood: '$350/month', costsTransport: '$120/month', costsTuition: '$8,000/year', housing: 1200, food: 350, transport: 120, entertainment: 180, utilities: 90, population: 2100000, climate: 'Oceanic', language: 'French', currency: 'EUR', timezone: 'CET', studentPopulation: 300000 },
  { slug: 'tokyo', name: 'Tokyo', country: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop', flag: '', costOfLiving: 'Medium-High', costsRent: '$1,100/month', costsFood: '$300/month', costsTransport: '$100/month', costsTuition: '$7,500/year', housing: 1100, food: 300, transport: 100, entertainment: 150, utilities: 80, population: 14000000, climate: 'Humid subtropical', language: 'Japanese', currency: 'JPY', timezone: 'JST', studentPopulation: 500000 },
  { slug: 'new-york', name: 'New York', country: 'United States', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop', flag: '', costOfLiving: 'Very High', costsRent: '$2,000/month', costsFood: '$500/month', costsTransport: '$130/month', costsTuition: '$15,000/year', housing: 2000, food: 500, transport: 130, entertainment: 300, utilities: 120, population: 8400000, climate: 'Humid subtropical', language: 'English', currency: 'USD', timezone: 'EST', studentPopulation: 600000 },
  { slug: 'toronto', name: 'Toronto', country: 'Canada', imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800', flag: '', costOfLiving: 'Medium-High', costsRent: '$1,300/month', costsFood: '$380/month', costsTransport: '$140/month', costsTuition: '$12,000/year', housing: 1300, food: 380, transport: 140, entertainment: 200, utilities: 110, population: 2930000, climate: 'Humid continental', language: 'English/French', currency: 'CAD', timezone: 'EST', studentPopulation: 200000 },
  { slug: 'sydney', name: 'Sydney', country: 'Australia', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', flag: '', costOfLiving: 'High', costsRent: '$1,400/month', costsFood: '$420/month', costsTransport: '$160/month', costsTuition: '$13,000/year', housing: 1400, food: 420, transport: 160, entertainment: 220, utilities: 100, population: 5300000, climate: 'Humid subtropical', language: 'English', currency: 'AUD', timezone: 'AEST', studentPopulation: 280000 },
];

const londonData = {
  name: 'Лондон',
  country: 'Великобритания',
  universities: [
    { name: 'Imperial College London', rank: 6, fields: ['Наука', 'Инженерия', 'Медицина', 'Бизнес'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWV0hEEdvizs7POqse6VrITypZO752xOlxqsSAkof9gA0yY1dc5j7Ub40KPwg2XrX_HziNqMEpc6hkNSARQmazcEsf9MZqGHFPsXbhWxsOaZwcKjPpgFj8eHiZOj3leXcdBZ6IB-IcbV3QPWp8Uveol89Ho7j6SrPZMLR2pMGzgZcyoDCQweISU_tLY0dBRmQK8vpbGF_HZrzgbQY8a2wnjC6JTy0CXdF-i4mgQBXtQjphvBPD7PPGb7t1yuPMB--WKoQ1yc4CslfV', description: 'Science, Engineering, Medicine, Business', badge: 'Rank #6 Global' },
    { name: 'UCL (University College London)', rank: 8, fields: ['Многопрофильный', 'Исследовательский университет'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmNpqSXjVDKGxgPq1bJWU5vDraqHK5tOwmLuzd2lT_JPqP_8r1Ex2OKXm0r75xz2VGbUmBmd0mLhtgkEdCiE0U_qmgHnBP310pBOXE8coaK8WotWLsT1QSLjxxxIG1j3noAZrz2wXwRiO-FTwBzDYh2FXIv9g5nTGUWlwR_ARchNvi1F4sl82KkcPVUoGj_pTIaEzAtZfXANmwxQ0BQGM5Ugs1wdNpEB99NBWGbN4Men9roHnJXDCGERnUORBrbHLQdtfgFKnp-lY_', description: 'Multidisciplinary, Research-intensive', badge: 'Rank #8 Global' },
  ],
  costOfLiving: { rent: 850, food: 350, transport: 100, total: [1300, 1600] },
  scholarships: [
    { name: 'Chevening Scholarship', type: 'Government', description: 'Грант от правительства Великобритании для иностранных студентов.', button: 'Подать заявку' },
    { name: 'Commonwealth Scholarship', type: 'Government', description: 'Стипендии для студентов из 14 стран для обучения в университетах Великобритании.', button: 'Подробнее' },
  ],
  housing: [
    { type: 'University Halls', price: '£200-350/неделя', description: 'Лучше всего для первокурсников. Обычно коммунальные услуги включены.', icon: 'Building2' },
    { type: 'Private Flat Share', price: '£150-250/неделя', description: 'Часто выбирают старшекурсники. Комната в доме на 3-5 человек.', icon: 'Home' },
    { type: 'Private Studio', price: '£350-600+/неделя', description: 'Современные студенческие апартаменты с удобствами.', icon: 'BedDouble' },
  ],
  essentials: [
    { title: 'Banking', description: 'Monzo или Revolut для студентов.' },
    { title: 'Healthcare', description: 'NHS surcharge покрывает большинство нужд.' },
    { title: 'Sim Card', description: 'GiffGaff или Voxi — выгодные тарифы.' },
    { title: 'Part-time Work', description: 'Можно работать 20 ч/неделя во время учебы.' },
  ],
  timeline: [
    { step: '12 месяцев до', title: 'Исследование и выбор', description: 'Выберите курс и университет. Проверьте требования.' },
    { step: '9 месяцев до', title: 'Подача и тесты', description: 'Подача через UCAS. IELTS/TOEFL по необходимости.' },
    { step: '3 месяца до', title: 'Виза и жильё', description: 'Примите оффер (CAS). Подайте на визу. Забронируйте жильё.' },
    { step: '1 месяц до', title: 'Финальная подготовка', description: 'Купите билеты, соберите вещи, обменяйте валюту.' },
  ],
};

const parisData = {
  name: 'Париж',
  country: 'Франция',
  universities: [
    { name: 'Sorbonne University', rank: 59, fields: ['Гуманитарные науки', 'Медицина', 'Наука', 'Право'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/cinquième/Sorbonne_University_main_building.jpg/1280px-Sorbonne_University_main_building.jpg', description: 'Humanities, Medicine, Science, Law', badge: 'Rank #59 Global' },
    { name: 'Sciences Po Paris', rank: 220, fields: ['Политология', 'Международные отношения', 'Экономика', 'Право'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sciences_Po_Paris_main_entrance.jpg/1280px-Sciences_Po_Paris_main_entrance.jpg', description: 'Political Science, International Relations, Economics', badge: 'Top University France' },
  ],
  costOfLiving: { rent: 800, food: 350, transport: 90, total: [1240, 1600] },
  scholarships: [
    { name: 'Eiffel Excellence Scholarship', type: 'Government', description: 'Грант от правительства Франции, покрывает обучение, проживание и ежемесячное пособие.', button: 'Подать заявку' },
    { name: 'Campus France Scholarship', type: 'Government', description: 'Стипендия французского агентства поддержки студентов для иностранных учащихся.', button: 'Подробнее' },
  ],
  housing: [
    { type: 'University Dormitory (CROUS)', price: '€200-400/месяц', description: 'Лучше всего для первокурсников. Субсидируется государством, коммунальные услуги включены.', icon: 'Building2' },
    { type: 'Share House / Colocation', price: '€500-800/месяц', description: 'Популярно среди иностранных студентов. Общая кухня и зоны отдыха.', icon: 'Home' },
    { type: 'Private Apartment', price: '€900-1500+/месяц', description: 'Отдельная квартира. Требуется поручитель или сервис Visale при аренде.', icon: 'BedDouble' },
  ],
  essentials: [
    { title: 'Banking', description: 'BNP Paribas или N26 — удобны для иностранцев и студентов.' },
    { title: 'Healthcare', description: 'Обязательная медицинская страховка через Sécurité Sociale (CPAM).' },
    { title: 'Sim Card', description: 'Free Mobile или Lebara — выгодные тарифы для студентов.' },
    { title: 'Part-time Work', description: 'Можно работать до 964 часов в год (≈20 ч/неделя) по студенческой визе.' },
  ],
  timeline: [
    { step: '12 месяцев до', title: 'Исследование и выбор', description: 'Выберите курс и университет. Проверьте языковые требования: французский (DELF/DALF) или английский (IELTS/TOEFL).' },
    { step: '9 месяцев до', title: 'Подача и тесты', description: 'Подайте документы через Campus France или напрямую. Сдайте языковые тесты при необходимости.' },
    { step: '3 месяца до', title: 'Виза и жильё', description: 'Подайте на долгосрочную студенческую визу (VLS-TS). Подайте заявку на жильё CROUS через Portail Trouver Mon Master.' },
    { step: '1 месяц до', title: 'Финальная подготовка', description: 'Купите билеты, соберите вещи, обменяйте валюту на евро. Зарегистрируйтесь на платформе ETUDES EN FRANCE.' },
  ],
};

const tokyoData = {
  name: 'Токио',
  country: 'Япония',
  universities: [
    { name: 'University of Tokyo (Todai)', rank: 28, fields: ['Наука', 'Инженерия', 'Медицина', 'Гуманитарные науки'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Yasuda_Auditorium.jpg/1280px-Yasuda_Auditorium.jpg', description: 'Science, Engineering, Medicine, Humanities', badge: 'Rank #28 Global' },
    { name: 'Waseda University', rank: 201, fields: ['Бизнес', 'Социальные науки', 'Международные отношения', 'Инженерия'], image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Waseda_University_Okuma_Auditorium.jpg/1280px-Waseda_University_Okuma_Auditorium.jpg', description: 'Business, Social Sciences, International Relations', badge: 'Top University Japan' },
  ],
  costOfLiving: { rent: 600, food: 300, transport: 80, total: [980, 1300] },
  scholarships: [
    { name: 'MEXT Scholarship', type: 'Government', description: 'Грант от правительства Японии, покрывает обучение, проживание и ежемесячное пособие.', button: 'Подать заявку' },
    { name: 'JASSO Scholarship', type: 'Government', description: 'Стипендия Японской организации поддержки студентов для иностранных учащихся.', button: 'Подробнее' },
  ],
  housing: [
    { type: 'University Dormitory', price: '¥20,000-50,000/месяц', description: 'Лучше всего для первокурсников. Коммунальные услуги часто включены.', icon: 'Building2' },
    { type: 'Share House', price: '¥40,000-70,000/месяц', description: 'Популярно среди иностранных студентов. Общая кухня и зоны отдыха.', icon: 'Home' },
    { type: 'Private Apartment', price: '¥70,000-130,000+/месяц', description: 'Отдельная квартира. Требуется гарант (поручитель) при аренде.', icon: 'BedDouble' },
  ],
  essentials: [
    { title: 'Banking', description: 'Japan Post Bank или Sony Bank — удобны для иностранцев.' },
    { title: 'Healthcare', description: 'Обязательная медицинская страховка (Kokumin Kenko Hoken).' },
    { title: 'Sim Card', description: 'IIJmio или Rakuten Mobile — выгодные тарифы для студентов.' },
    { title: 'Part-time Work', description: 'Можно работать 28 ч/неделя при наличии разрешения.' },
  ],
  timeline: [
    { step: '12 месяцев до', title: 'Исследование и выбор', description: 'Выберите курс и университет. Проверьте требования по языку и документам.' },
    { step: '9 месяцев до', title: 'Подача и тесты', description: 'Подайте документы напрямую или через JASSO. Сдайте JLPT/TOEFL при необходимости.' },
    { step: '3 месяца до', title: 'Виза и жильё', description: 'Получите COE (Certificate of Eligibility). Подайте на студенческую визу. Забронируйте жильё.' },
    { step: '1 месяц до', title: 'Финальная подготовка', description: 'Купите билеты, соберите вещи, обменяйте валюту на иены.' },
  ],
};

const cityMeta = {
  london: { slug: 'london', image: '/london.webp', imageAlt: 'Aerial view of London skyline at sunset including the Thames', currency: '£', badge: 'Top Destination', visaTitle: 'Student Visa Checklist (Tier 4)', visaDescription: 'Ensure you have all these documents prepared before your appointment at the consulate.', visaChecklist: ['CAS Number (from University)', 'Current Passport', 'Proof of Finances', 'English Proficiency (IELTS)', 'Tuberculosis Test Results', 'Immigration Health Surcharge'], ctaTitle: 'Ready to start your London journey?', ctaDescription: 'Get a free personalized roadmap and connect with counselors who can guide you through the application process.' },
  paris: { slug: 'paris', image: '/paris.webp', imageAlt: 'Aerial view of Paris with the Eiffel Tower', currency: '€', badge: 'Top Destination', visaTitle: 'Student Visa Checklist (VLS-TS)', visaDescription: 'Подготовьте все необходимые документы перед визовым собеседованием в консульстве.', visaChecklist: ['Действующий загранпаспорт', 'Подтверждение зачисления в университет', 'Подтверждение финансовой состоятельности', 'Свидетельство о жилье (CROUS или частное)', 'Медицинская страховка', 'Справка об отсутствии судимостей'], ctaTitle: 'Готовы начать своё парижское путешествие?', ctaDescription: 'Получите персональный план действий и свяжитесь с консультантами, которые помогут вам с поступлением.' },
  tokyo: { slug: 'tokyo', image: '/tokyo.webp', imageAlt: 'Tokyo skyline with Mount Fuji in the background', currency: '¥', badge: 'Top Destination', visaTitle: 'Student Visa Checklist (Japan)', visaDescription: 'Подготовьте все необходимые документы для получения студенческой визы в Японию.', visaChecklist: ['Certificate of Eligibility (COE)', 'Действующий загранпаспорт', 'Подтверждение зачисления в университет', 'Подтверждение финансовой состоятельности', 'Фотографии', 'Анкета на визу'], ctaTitle: 'Готовы начать своё токийское приключение?', ctaDescription: 'Получите персональный план действий и свяжитесь с консультантами, которые помогут вам с поступлением.' },
};

const cityDetails = [
  { slug: 'london', data: londonData, meta: cityMeta.london },
  { slug: 'paris', data: parisData, meta: cityMeta.paris },
  { slug: 'tokyo', data: tokyoData, meta: cityMeta.tokyo },
];

const scholarships = [
  { slug: 'chevening', name: 'Chevening Scholarships', provider: 'UK Government', country: 'United Kingdom', amount: '£18,000 - £26,000', coverage: 'Full', deadline: '2025-11-07', studyLevel: 'Masters', fieldOfStudy: ['All Fields'], eligibleCountries: ['All Countries (excluding UK and EU)'], description: "Chevening Scholarships are the UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations. The scholarships support study at UK universities for international students with leadership potential.", requirements: ['Undergraduate degree', 'At least 2 years of work experience', 'Meet English language requirements', 'Return to your home country for at least 2 years'], applicationUrl: 'https://www.chevening.org/scholarships/', difficulty: 'Highly Competitive' },
  { slug: 'fulbright', name: 'Fulbright Foreign Student Program', provider: 'US Department of State', country: 'United States', amount: 'Full Funding', coverage: 'Full', deadline: '2025-10-15', studyLevel: 'Masters', fieldOfStudy: ['All Fields'], eligibleCountries: ['Over 160 countries'], description: 'The Fulbright Program provides funding for international students to study and conduct research in the United States. Covers tuition, living expenses, airfare, and health insurance.', requirements: ["Bachelor's degree", 'English proficiency (TOEFL/IELTS)', 'Strong academic record', 'Leadership potential'], applicationUrl: 'https://foreign.fulbrightonline.org/', difficulty: 'Highly Competitive' },
  { slug: 'daad', name: 'DAAD Scholarships', provider: 'German Academic Exchange Service', country: 'Germany', amount: '€934/month', coverage: 'Partial', deadline: '2025-11-30', studyLevel: 'Masters', fieldOfStudy: ['Engineering', 'Sciences', 'Arts', 'Social Sciences'], eligibleCountries: ['All Countries'], description: 'DAAD offers various scholarship programs for international students to pursue graduate studies in Germany. Includes monthly stipend, health insurance, and travel allowance.', requirements: ["Bachelor's degree", 'Above average academic performance', 'Knowledge of German or English', 'Relevant work experience (varies by program)'], applicationUrl: 'https://www.daad.de/en/', difficulty: 'Competitive' },
  { slug: 'australia-awards', name: 'Australia Awards Scholarships', provider: 'Australian Government', country: 'Australia', amount: 'Full Funding', coverage: 'Full', deadline: '2025-04-30', studyLevel: 'Masters', fieldOfStudy: ['All Fields'], eligibleCountries: ['Indo-Pacific Region'], description: 'Australia Awards Scholarships provide opportunities for people from developing countries to undertake full-time undergraduate or postgraduate study at participating Australian universities.', requirements: ['Minimum qualification (varies by country)', 'English language proficiency', 'Return to home country for 2 years', 'Meet health requirements'], applicationUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards', difficulty: 'Competitive' },
  { slug: 'erasmus', name: 'Erasmus Mundus Joint Masters', provider: 'European Commission', country: 'Europe', amount: '€1,000 - €1,400/month', coverage: 'Partial', deadline: '2026-01-15', studyLevel: 'Masters', fieldOfStudy: ['Various Fields'], eligibleCountries: ['All Countries'], description: 'Erasmus Mundus offers scholarships for international students to study integrated master programmes taught in at least two European countries.', requirements: ["Bachelor's degree", 'English proficiency', 'Academic excellence', 'Specific program requirements'], applicationUrl: 'https://ec.europa.eu/programmes/erasmus-plus/', difficulty: 'Competitive' },
  { slug: 'commonwealth', name: 'Commonwealth Scholarships', provider: 'Commonwealth Scholarship Commission', country: 'United Kingdom', amount: 'Full Funding', coverage: 'Full', deadline: '2025-12-14', studyLevel: 'Masters', fieldOfStudy: ['Development Related Fields'], eligibleCountries: ['Commonwealth Countries'], description: 'Commonwealth Scholarships are for talented individuals with the potential to make a positive impact on the global stage. Supports students who could not otherwise afford to study in the UK.', requirements: ['From a Commonwealth country', 'Unable to afford UK study', 'Undergraduate degree', 'Return to home country'], applicationUrl: 'https://cscuk.fcdo.gov.uk/', difficulty: 'Highly Competitive' },
  { slug: 'vanier', name: 'Vanier Canada Graduate Scholarships', provider: 'Government of Canada', country: 'Canada', amount: '$50,000 CAD/year', coverage: 'Partial', deadline: '2025-11-01', studyLevel: 'PhD', fieldOfStudy: ['Health Sciences', 'Natural Sciences', 'Engineering', 'Social Sciences', 'Humanities'], eligibleCountries: ['All Countries'], description: 'The Vanier CGS program aims to attract and retain world-class doctoral students by supporting those who demonstrate leadership skills and a high standard of scholarly achievement.', requirements: ['Nominated by Canadian institution', 'Outstanding academic achievement', 'Research potential', 'Leadership skills'], applicationUrl: 'https://vanier.gc.ca/', difficulty: 'Highly Competitive' },
  { slug: 'eiffel', name: 'Eiffel Excellence Scholarship', provider: 'French Ministry of Europe and Foreign Affairs', country: 'France', amount: '€1,181/month', coverage: 'Partial', deadline: '2026-01-08', studyLevel: 'Masters', fieldOfStudy: ['Engineering', 'Economics', 'Law', 'Political Science'], eligibleCountries: ['All Countries'], description: "The Eiffel Excellence Scholarship Program enables French higher education institutions to attract top foreign students to master's and PhD programs.", requirements: ['Maximum 30 years old (Masters)', 'Nominated by French institution', 'Outstanding academic record', 'Not a French citizen'], applicationUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence', difficulty: 'Competitive' },
  { slug: 'gates-cambridge', name: 'Gates Cambridge Scholarships', provider: 'Bill & Melinda Gates Foundation', country: 'United Kingdom', amount: 'Full Funding', coverage: 'Full', deadline: '2025-12-05', studyLevel: 'PhD', fieldOfStudy: ['All Fields'], eligibleCountries: ['All Countries (excluding UK)'], description: 'Gates Cambridge Scholarships are one of the most prestigious international scholarships, awarded to outstanding applicants from countries outside the UK to pursue postgraduate study at Cambridge.', requirements: ['Outstanding intellectual ability', 'Leadership potential', 'Commitment to improving lives', 'Good fit with Cambridge'], applicationUrl: 'https://www.gatescambridge.org/', difficulty: 'Highly Competitive' },
  { slug: 'swedish-institute', name: 'Swedish Institute Scholarships', provider: 'Swedish Institute', country: 'Sweden', amount: 'Full Tuition + Living Expenses', coverage: 'Full', deadline: '2026-02-20', studyLevel: 'Masters', fieldOfStudy: ['All Fields'], eligibleCountries: ['Selected Countries'], description: 'SISGP offers a unique opportunity for future leaders to develop professionally and academically, to experience Swedish society and culture, and to build a long-lasting relationship with Sweden and with each other.', requirements: ['From eligible country', "Bachelor's degree", 'English proficiency', 'Leadership experience'], applicationUrl: 'https://si.se/en/apply/scholarships/', difficulty: 'Competitive' },
  { slug: 'rotary-peace', name: 'Rotary Peace Fellowship', provider: 'Rotary Foundation', country: 'Multiple Countries', amount: 'Full Funding', coverage: 'Full', deadline: '2025-05-15', studyLevel: 'Masters', fieldOfStudy: ['Peace and Conflict Resolution'], eligibleCountries: ['All Countries'], description: 'Rotary Peace Fellowships enable individuals to study at one of the Rotary Peace Centers, gaining the skills and knowledge to become effective peace and development leaders.', requirements: ['Proficiency in English', 'Relevant work experience', 'Strong commitment to peace', 'Academic excellence'], applicationUrl: 'https://www.rotary.org/en/our-programs/peace-fellowships', difficulty: 'Competitive' },
  { slug: 'orange-knowledge', name: 'Orange Knowledge Programme', provider: 'Netherlands Ministry of Foreign Affairs', country: 'Netherlands', amount: 'Full Funding', coverage: 'Full', deadline: '2026-02-01', studyLevel: 'Masters', fieldOfStudy: ['Development Related Fields'], eligibleCountries: ['Selected Countries'], description: 'OKP scholarships support mid-career professionals from selected countries to study in the Netherlands, focusing on capacity building in various sectors.', requirements: ['From eligible country', 'Relevant work experience', 'Employed by organization', 'Admission to Dutch institution'], applicationUrl: 'https://www.studyinnl.org/scholarships/orange-knowledge-programme', difficulty: 'Moderate' },
];

async function main() {
  for (const destination of destinations) {
    await prisma.destination.upsert({
      where: { slug: destination.slug },
      create: destination,
      update: destination,
    });
  }

  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      create: city,
      update: city,
    });
  }

  for (const detail of cityDetails) {
    const record = {
      slug: detail.slug,
      name: detail.data.name,
      country: detail.data.country,
      universities: detail.data.universities,
      costOfLiving: detail.data.costOfLiving,
      scholarships: detail.data.scholarships,
      housing: detail.data.housing,
      essentials: detail.data.essentials,
      timeline: detail.data.timeline,
      meta: detail.meta,
    };
    await prisma.cityDetail.upsert({
      where: { slug: detail.slug },
      create: record,
      update: record,
    });
  }

  for (const scholarship of scholarships) {
    const record = { ...scholarship, deadline: new Date(scholarship.deadline) };
    await prisma.scholarship.upsert({
      where: { slug: scholarship.slug },
      create: record,
      update: record,
    });
  }

  console.log(
    `Seeded ${destinations.length} destinations, ${cities.length} cities, ${cityDetails.length} city details, ${scholarships.length} scholarships`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
