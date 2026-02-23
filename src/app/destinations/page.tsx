"use client"

// import Footer from '@/components/Footer';
// import Header from '@/components/Header';
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
  Smartphone
} from 'lucide-react';
import Image from 'next/image';
// import Link from 'next/link';



import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UniversityCard from "@/components/UniversityCard";
import { londonData } from "@/constants/londonData";
import Link from "next/link";
import { useState } from "react";

export default function Destinations() {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [scholarshipType, setScholarshipType] = useState('All')
  const filteredScholarships = londonData.scholarships.filter(s =>
    scholarshipType === 'All' ? true : s.type === scholarshipType
  )
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <main className="lg:col-span-9 space-y-12">
            <section id="overview" className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/30"></div>
              <div className="relative w-full h-80">
                <Image
                  src="/london.webp"
                  alt="Aerial view of London skyline at sunset including the Thames"
                  fill
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block uppercase tracking-wide">Top Destination</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">London</h1>
                    <p className="text-lg text-gray-200 flex items-center">
                      <MapPin className="text-primary w-5 h-5 mr-1" /> United Kingdom
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-surface-light/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[100px]">
                      <div className="text-white font-bold text-lg">40+</div>
                      <div className="text-gray-300 text-xs">Universities</div>
                    </div>
                    <div className="bg-surface-light/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center min-w-[100px]">
                      <div className="text-white font-bold text-lg">£1,500</div>
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
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      {/* <Building2 className="text-primary w-5 h-5" /> */} Аренда (комната)
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      £{period === 'monthly' ? londonData.costOfLiving.rent : londonData.costOfLiving.rent * 12}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      {/* <Utensils className="text-primary w-5 h-5" /> */} Продукты
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      £{period === 'monthly' ? londonData.costOfLiving.food : londonData.costOfLiving.food * 12}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      {/* <Bus className="text-primary w-5 h-5" /> */} Транспорт (студ. карта)
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      £{period === 'monthly' ? londonData.costOfLiving.transport : londonData.costOfLiving.transport * 12}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Итого</div>
                  <div className="text-xl font-bold text-primary">
                    £{period === 'monthly' ? londonData.costOfLiving.total[0] : londonData.costOfLiving.total[0] * 12}
                    - £{period === 'monthly' ? londonData.costOfLiving.total[1] : londonData.costOfLiving.total[1] * 12}
                  </div>
                </div>
              </div>
            </section>

            {/* Universities */}
            <section id="universities">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Universities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gray-200 relative">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWV0hEEdvizs7POqse6VrITypZO752xOlxqsSAkof9gA0yY1dc5j7Ub40KPwg2XrX_HziNqMEpc6hkNSARQmazcEsf9MZqGHFPsXbhWxsOaZwcKjPpgFj8eHiZOj3leXcdBZ6IB-IcbV3QPWp8Uveol89Ho7j6SrPZMLR2pMGzgZcyoDCQweISU_tLY0dBRmQK8vpbGF_HZrzgbQY8a2wnjC6JTy0CXdF-i4mgQBXtQjphvBPD7PPGb7t1yuPMB--WKoQ1yc4CslfV"
                      alt="University campus building"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">Rank #6 Global</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Imperial College London</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Science, Engineering, Medicine, Business</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-xs">Tuition (Intl)</span>
                        <span className="font-semibold dark:text-gray-200">£34,000 /yr</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-gray-400 text-xs">Acceptance</span>
                        <span className="font-semibold text-green-600">14%</span>
                      </div>
                    </div>
                    <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium text-sm">View Programs</button>
                  </div>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gray-200 relative">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmNpqSXjVDKGxgPq1bJWU5vDraqHK5tOwmLuzd2lT_JPqP_8r1Ex2OKXm0r75xz2VGbUmBmd0mLhtgkEdCiE0U_qmgHnBP310pBOXE8coaK8WotWLsT1QSLjxxxIG1j3noAZrz2wXwRiO-FTwBzDYh2FXIv9g5nTGUWlwR_ARchNvi1F4sl82KkcPVUoGj_pTIaEzAtZfXANmwxQ0BQGM5Ugs1wdNpEB99NBWGbN4Men9roHnJXDCGERnUORBrbHLQdtfgFKnp-lY_"
                      alt="Classic university library interior"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">Rank #8 Global</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">UCL (University College London)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Multidisciplinary, Research-intensive</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-xs">Tuition (Intl)</span>
                        <span className="font-semibold dark:text-gray-200">£26,000 /yr</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-gray-400 text-xs">Acceptance</span>
                        <span className="font-semibold text-green-600">38%</span>
                      </div>
                    </div>
                    <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium text-sm">View Programs</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {londonData.universities.map(u => (
                  <UniversityCard key={u.name} university={u} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="#" className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center">
                  View all 40+ universities in London <ArrowRight className="w-4 h-4 ml-1" />
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
                {filteredScholarships.map(s => (
                  <div key={s.name} className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary">{s.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{s.type}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{s.description}</p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark whitespace-nowrap">{s.button}</button>
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student Visa Checklist (Tier 4)</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">Ensure you have all these documents prepared before your appointment at the consulate.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "CAS Number (from University)",
                      "Current Passport",
                      "Proof of Finances",
                      "English Proficiency (IELTS)",
                      "Tuberculosis Test Results",
                      "Immigration Health Surcharge"
                    ].map((item, i) => (
                      <label key={i} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-transparent hover:border-primary/50 transition cursor-pointer group">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{item}</span>
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
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">University Halls</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">£200-350<span className="text-sm font-normal text-gray-500">/week</span></p>
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">Safe</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">Social</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs rounded font-medium">Shared Bathrooms</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Best for first-year students wanting to make friends easily. Utilities usually included.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                    <Home className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Private Flat Share</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">£150-250<span className="text-sm font-normal text-gray-500">/week</span></p>
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">Independent</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">More Space</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs rounded font-medium">Bills Extra</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Common for older students. Rent a room in a house with 3-5 other people.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 hover:border-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                    <BedDouble className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 dark:text-white">Private Studio</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">£350-600+<span className="text-sm font-normal text-gray-500">/week</span></p>
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">Private</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded font-medium">Modern</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs rounded font-medium">Expensive</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Managed student accommodation blocks (PBSA) with gyms and concierges.</p>
                </div>
              </div>
            </section>

            {/* Practical Essentials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Practical Essentials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex flex-col items-center text-center">
                  <Landmark className="text-primary w-8 h-8 mb-2" />
                  <h4 className="font-bold text-sm dark:text-white">Banking</h4>
                  <p className="text-xs text-gray-500 mt-1">Open a Monzo or Revolut account easily.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex flex-col items-center text-center">
                  <HeartPulse className="text-primary w-8 h-8 mb-2" />
                  <h4 className="font-bold text-sm dark:text-white">Healthcare</h4>
                  <p className="text-xs text-gray-500 mt-1">NHS surcharge covers most needs.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex flex-col items-center text-center">
                  <Smartphone className="text-primary w-8 h-8 mb-2" />
                  <h4 className="font-bold text-sm dark:text-white">Sim Card</h4>
                  <p className="text-xs text-gray-500 mt-1">GiffGaff or Voxi offer student plans.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex flex-col items-center text-center">
                  <Briefcase className="text-primary w-8 h-8 mb-2" />
                  <h4 className="font-bold text-sm dark:text-white">Part-time Work</h4>
                  <p className="text-xs text-gray-500 mt-1">Allowed 20hrs/week during term.</p>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section id="timeline">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Planning Timeline</h2>
              <div className="relative border-l-2 border-primary/30 ml-3 space-y-8 pb-4">
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-background-dark"></span>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">12 Months Before</h4>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                    <h5 className="font-bold text-gray-900 dark:text-white">Research &amp; Shortlist</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Decide on the course and university. Check entry requirements.</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-background-dark"></span>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">9 Months Before</h4>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                    <h5 className="font-bold text-gray-900 dark:text-white">Apply &amp; Take Tests</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Submit UCAS applications. Take IELTS/TOEFL if required.</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-background-dark"></span>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">3 Months Before</h4>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                    <h5 className="font-bold text-gray-900 dark:text-white">Visa &amp; Accommodation</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accept offer (CAS). Apply for Student Visa. Book housing.</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-white dark:border-background-dark"></span>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-1">1 Month Before</h4>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                    <h5 className="font-bold text-gray-900 dark:text-white">Final Prep</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Book flights, pack, arrange airport pickup, get currency.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your London journey?</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">Get a free personalized roadmap and connect with counselors who can guide you through the application process.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">Download Full Guide</button>
                <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">Talk to Counselor</button>
              </div>
            </section>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
}
