'use client'

import { useAuth } from '@/auth/AuthContext';
import { debounce, validateSearchQuery } from '@/utils/calculations';
import { searchCities } from '@/utils/data';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import CountUp from 'react-countup';
import AuthRequiredModal from './AuthRequiredModal';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (validateSearchQuery(query)) {
        setIsSearching(true);
        const results = searchCities(query);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSearchQuery(searchQuery)) {
      if (!user) {
        setShowAuthModal(true);
      } else {
        router.push(`/compare?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleCitySelect = (cityName: string) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setSearchQuery(cityName);
      setSearchResults([]);
      router.push(`/compare?city=${encodeURIComponent(cityName)}`);
    }
  };

  const stats = [
    { number: 50, suffix: '+', label: 'Cities Covered' },
    { number: 200, suffix: '+', label: 'Universities' },
    { number: 10, suffix: 'K+', label: 'Students Helped' }
  ];

  return (
    <>
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        featureName="поиску городов"
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-white" />

        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Sign In Button */}
        {!user && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => router.push('/login')}
            className="absolute top-6 right-6 md:top-8 md:right-8 px-6 py-2.5 bg-[#0d98ba] text-white font-semibold rounded-xl hover:bg-[#0b8299] transition-all duration-300 shadow-lg hover:shadow-xl z-20"
          >
            Sign In
          </motion.button>
        )}

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d98ba]/10 border border-[#0d98ba]/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#0d98ba] animate-pulse" />
                <span className="text-sm font-medium text-[#475569]">
                  Your Study Abroad Journey Starts Here
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0f172a] leading-[1.1] tracking-tight mb-6"
              >
                Plan Your{' '}
                <span className="text-[#0d98ba]">
                  Study Abroad
                </span>{' '}
                Journey
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Discover the perfect destination for your international education. Compare cities, universities, and living costs all in one place.
              </motion.p>

              {/* Search Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onSubmit={handleSearchSubmit}
                className="relative max-w-xl mx-auto lg:mx-0"
              >
                <div className="flex items-center bg-white border border-[#e2e8f0] rounded-2xl p-2 focus-within:border-[#0d98ba] focus-within:shadow-lg transition-all duration-300">
                  {/* Search Icon */}
                  <div className="pl-4 pr-2 text-[#94a3b8]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                    </svg>
                  </div>

                  <input
                    placeholder="Search cities, universities, or countries..."
                    className="flex-1 bg-transparent text-[#0f172a] placeholder:text-[#94a3b8] text-base py-3 px-2 focus:outline-none"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    disabled={!validateSearchQuery(searchQuery) || isSearching}
                    className="px-6 py-3 bg-[#0d98ba] text-white font-semibold rounded-xl hover:bg-[#0b8299] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? 'Searching...' : 'Explore'}
                  </button>
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                    >
                      {searchResults.map((city, index) => (
                        <motion.button
                          key={city.id}
                          type="button"
                          onClick={() => handleCitySelect(city.name)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="w-full px-4 py-3 text-left hover:bg-[#0d98ba]/5 border-b border-[#f1f5f9] last:border-b-0 transition-colors duration-150"
                        >
                          <div className="font-medium text-[#0f172a]">{city.name}</div>
                          <div className="text-sm text-[#64748b]">{city.country}</div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#0d98ba] mb-1">
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        suffix={stat.suffix}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm text-[#64748b]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block relative"
            >
              {/* Floating Cards */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main Card */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 glass-card p-6 rounded-2xl"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0d98ba] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[#0f172a] font-semibold">Oxford University</div>
                      <div className="text-[#64748b] text-sm">United Kingdom</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#0d98ba]/10 text-[#0d98ba] rounded-full text-xs font-medium">Top 10 Global</span>
                    <span className="px-3 py-1 bg-[#0d98ba]/10 text-[#0d98ba] rounded-full text-xs font-medium">Research</span>
                  </div>
                </motion.div>

                {/* Secondary Card - Top Right */}
                <motion.div
                  className="absolute top-0 right-0 w-48 glass-card p-4 rounded-xl"
                  animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-[#0f172a] font-medium text-sm">Budget</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0d98ba]">$1,200</div>
                  <div className="text-[#64748b] text-xs">Monthly Living Cost</div>
                </motion.div>

                {/* Secondary Card - Bottom Left */}
                <motion.div
                  className="absolute bottom-0 left-0 w-52 glass-card p-4 rounded-xl"
                  animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <span className="text-[#0f172a] font-medium text-sm">Scholarship</span>
                  </div>
                  <div className="text-lg font-bold text-[#0d98ba]">85% Match</div>
                  <div className="w-full bg-[#e2e8f0] rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-[#0d98ba] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#0d98ba]/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#0d98ba] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
