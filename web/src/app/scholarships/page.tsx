'use client'

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScholarshipCard from '@/components/ScholarshipCard';
import ScholarshipFilters from '@/components/ScholarshipFilters';
import {
    filterScholarships,
    getCountries,
    getCoverageTypes,
    getStudyLevels,
    getUpcomingDeadlines,
    scholarshipsData
} from '@/utils/scholarshipData';
import { useMemo, useState } from 'react';

export default function Scholarships() {
  const [filters, setFilters] = useState<{
    country?: string;
    studyLevel?: string;
    coverage?: string;
    searchQuery?: string;
  }>({});

  const [showUpcoming, setShowUpcoming] = useState(false);

  // Filter scholarships based on current filters
  const filteredScholarships = useMemo(() => {
    if (showUpcoming) {
      return getUpcomingDeadlines();
    }
    return filterScholarships(filters);
  }, [filters, showUpcoming]);

  // Get filter options
  const countries = useMemo(() => getCountries(), []);
  const studyLevels = useMemo(() => getStudyLevels(), []);
  const coverageTypes = useMemo(() => getCoverageTypes(), []);
  return (
    <>
      <Header />
      <main className="pt-[120px] px-4 md:px-10 lg:px-40 py-10 bg-[#f8fafc] min-h-screen">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0d171b] mb-4">
            Find Your Perfect Scholarship
          </h1>
          <p className="text-lg text-[#4c809a] max-w-3xl">
            Discover funding opportunities from around the world. Search through our comprehensive database 
            of scholarships to find the perfect match for your study abroad journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#0d98ba] mb-1">
              {scholarshipsData.length}
            </div>
            <div className="text-sm text-[#4c809a]">Total Scholarships</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#0d98ba] mb-1">
              {scholarshipsData.filter(s => s.coverage === 'Full').length}
            </div>
            <div className="text-sm text-[#4c809a]">Full Funding</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#0d98ba] mb-1">
              {countries.length}
            </div>
            <div className="text-sm text-[#4c809a]">Countries</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#0d98ba] mb-1">
              {getUpcomingDeadlines().length}
            </div>
            <div className="text-sm text-[#4c809a]">Upcoming Deadlines</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showUpcoming
                ? 'bg-[#0d98ba] text-white'
                : 'bg-white text-[#0d171b] border border-gray-300 hover:bg-[#f8fafc]'
            }`}
          >
            All Scholarships
          </button>
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showUpcoming
                ? 'bg-[#0d98ba] text-white'
                : 'bg-white text-[#0d171b] border border-gray-300 hover:bg-[#f8fafc]'
            }`}
          >
            Upcoming Deadlines
          </button>
        </div>

        {/* Filters */}
        {!showUpcoming && (
          <ScholarshipFilters
            filters={filters}
            onFilterChange={setFilters}
            countries={countries}
            studyLevels={studyLevels}
            coverageTypes={coverageTypes}
          />
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-[#4c809a]">
            Showing <span className="font-semibold text-[#0d171b]">{filteredScholarships.length}</span>{' '}
            {filteredScholarships.length === 1 ? 'scholarship' : 'scholarships'}
          </p>
        </div>

        {/* Scholarship Cards Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map(scholarship => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm text-center border border-gray-200">
            <div className="w-20 h-20 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#0d171b] mb-2">
              No Scholarships Found
            </h3>
            <p className="text-[#4c809a] mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => setFilters({})}
              className="bg-[#0d98ba] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0d171b] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Application Tips Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-[#0d171b] mb-6">
            Scholarship Application Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0d171b] mb-2">Start Early</h3>
                <p className="text-sm text-[#4c809a] leading-relaxed">
                  Begin your application process at least 6-12 months before the deadline. This gives you time to gather documents and write strong essays.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0d171b] mb-2">Tailor Your Application</h3>
                <p className="text-sm text-[#4c809a] leading-relaxed">
                  Customize your essays and documents for each scholarship. Show how you align with their specific goals and values.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0d171b] mb-2">Check Requirements</h3>
                <p className="text-sm text-[#4c809a] leading-relaxed">
                  Carefully read all eligibility criteria and requirements. Missing one requirement can disqualify your entire application.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0d171b] mb-2">Get Strong References</h3>
                <p className="text-sm text-[#4c809a] leading-relaxed">
                  Choose recommenders who know you well and can speak to your achievements and potential. Give them plenty of notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
