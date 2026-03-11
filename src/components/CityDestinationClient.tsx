'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniversityCard from '@/components/UniversityCard';
import { CityData, CityMeta, CityScholarship, CityUniversity, cityMeta, allCities } from '@/data/citiesData';
import {
  ArrowRight,
  BedDouble,
  Briefcase,
  Building2,
  ClipboardCheck,
  HeartPulse,
  Home,
  Landmark,
  MapPin,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const housingIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  BedDouble: <BedDouble className="w-6 h-6" />,
};

const essentialIcons: Record<string, React.ReactNode> = {
  Banking: <Landmark className="text-primary w-8 h-8 mb-2" />,
  Healthcare: <HeartPulse className="text-primary w-8 h-8 mb-2" />,
  'Sim Card': <Smartphone className="text-primary w-8 h-8 mb-2" />,
  'Part-time Work': <Briefcase className="text-primary w-8 h-8 mb-2" />,
};

const housingColors: string[] = [
  'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
  'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400',
  'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
];

interface Props {
  cityData: CityData;
  meta: CityMeta;
}

const CityDestinationClient: React.FC<Props> = ({ cityData, meta }) => {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [scholarshipType, setScholarshipType] = useState('All');

  const filteredScholarships = cityData.scholarships.filter((s: CityScholarship) =>
    scholarshipType === 'All' ? true : s.type === scholarshipType
  );

  const multiplier = period === 'monthly' ? 1 : 12;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-12">

            {/* Overview / Hero */}
            <section id="overview" className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/30"></div>
              <div className="relative w-full h-80">
                <Image
                  src={meta.image}
                  alt={meta.imageAlt}
                  fill
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block uppercase tracking-wide">
                      {meta.badge}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{cityData.name}</h1>
                    <p className="text-lg text-gray-200 flex items-center">
                      <MapPin className="text-primary w-5 h-5 mr-1" /> {cityData.country}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-surface-light/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[100px]">
                      <div className="text-white font-bold text-lg">{cityData.universities.length}+</div>
                      <div className="text-gray-300 text-xs">Universities</div>
                    </div>
                    <div className="bg-surface-light/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[100px]">
                      <div className="text-white font-bold text-lg">
                        {meta.currency}{cityData.costOfLiving.total[0].toLocaleString()}
                      </div>
                      <div className="text-gray-300 text-xs">Avg. Living Cost</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cost of Living */}
            <section id="cost">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Стоимость жизни</h2>
                <div className="flex bg-gray-100 dark:bg-surface-dark p-1 rounded-lg">
                  <button
                    className={`px-3 py-1 rounded-md shadow-sm text-sm font-medium ${period === 'monthly' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors'}`}
                    onClick={() => setPeriod('monthly')}
                  >
                    В месяц
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md shadow-sm text-sm font-medium ${period === 'annual' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors'}`}
                    onClick={() => setPeriod('annual')}
                  >
                    В год
                  </button>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 space-y-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Аренда (комната)</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {meta.currency}{(cityData.costOfLiving.rent * multiplier).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Продукты</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {meta.currency}{(cityData.costOfLiving.food * multiplier).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Транспорт (студ. карта)</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {meta.currency}{(cityData.costOfLiving.transport * multiplier).toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Итого</div>
                  <div className="text-xl font-bold text-primary">
                    {meta.currency}{(cityData.costOfLiving.total[0] * multiplier).toLocaleString()}
                    &nbsp;–&nbsp;
                    {meta.currency}{(cityData.costOfLiving.total[1] * multiplier).toLocaleString()}
                  </div>
                </div>
              </div>
            </section>

            {/* Universities */}
            <section id="universities">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Universities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityData.universities.map((u: CityUniversity) => (
                  <UniversityCard
                    key={u.name}
                    university={{
                      name: u.name,
                      rank: u.rank,
                      fields: u.fields,
                      image: u.image,
                      description: u.description,
                      badge: u.badge,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="#" className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center">
                  Все университеты в {cityData.name} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </section>

            {/* Scholarships */}
            <section id="scholarships">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Доступные стипендии</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'Government', 'Merit-based', 'University Specific'].map(type => (
                  <span
                    key={type}
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer transition border ${scholarshipType === type ? 'bg-primary text-white border-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'}`}
                    onClick={() => setScholarshipType(type)}
                  >
                    {type === 'All' ? 'Все' : type}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {filteredScholarships.map((s: CityScholarship) => (
                  <div
                    key={s.name}
                    className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">{s.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                          {s.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{s.description}</p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark whitespace-nowrap">
                      {s.button}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Visa Checklist */}
            <section id="visa" className="bg-primary-light/30 dark:bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm text-primary hidden sm:block">
                  <ClipboardCheck className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{meta.visaTitle}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{meta.visaDescription}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {meta.visaChecklist.map((item, i) => (
                      <label
                        key={i}
                        className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-transparent hover:border-primary/50 transition cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Accommodation */}
            <section id="housing">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Accommodation Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cityData.housing.map((h: any, idx: number) => (
                  <div
                    key={h.type}
                    className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 hover:border-primary transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${housingColors[idx % housingColors.length]}`}>
                      {housingIcons[h.icon] ?? <Building2 className="w-6 h-6" />}
                    </div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">{h.type}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{h.price}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{h.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Essentials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Practical Essentials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cityData.essentials.map((e: any) => (
                  <div
                    key={e.title}
                    className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex flex-col items-center text-center"
                  >
                    {essentialIcons[e.title] ?? <Landmark className="text-primary w-8 h-8 mb-2" />}
                    <h4 className="font-bold text-sm dark:text-white">{e.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{e.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section id="timeline">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Planning Timeline</h2>
              <div className="relative border-l-2 border-primary/30 ml-3 space-y-8 pb-4">
                {cityData.timeline.map((t: any, i: number) => (
                  <div key={i} className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-background-dark"></span>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">{t.step}</h4>
                    <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                      <h5 className="font-bold text-gray-900 dark:text-white">{t.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* City Navigation */}
            <section className="border-t border-border-light dark:border-border-dark pt-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Explore Other Destinations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(cityMeta)
                  .filter(c => c.slug !== meta.slug)
                  .map(c => (
                    <Link
                      key={c.slug}
                      href={`/destinations/${c.slug}`}
                      className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-36">
                        <Image
                          src={c.image}
                          alt={c.imageAlt}
                          fill
                          className="object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-opacity" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                        <div>
                          <p className="text-white font-bold text-base leading-tight">
                            {allCities[c.slug]?.name ?? c.slug}
                          </p>
                          <p className="text-gray-300 text-xs">
                            {allCities[c.slug]?.country ?? ''}
                          </p>
                        </div>
                        <ArrowRight className="text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{meta.ctaTitle}</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">{meta.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                  Download Full Guide
                </button>
                <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  Talk to Counselor
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CityDestinationClient;