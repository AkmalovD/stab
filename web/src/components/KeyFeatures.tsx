'use client'

import { useAuth } from '@/auth/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import AuthRequiredModal from './AuthRequiredModal';

interface Feature {
  title: string;
  description: string;
  stats: string;
  link: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Global Coverage',
    description: 'Access information about cities and universities across the world with real-time data and insights.',
    stats: '50+ Cities | 200+ Universities',
    link: '/compare',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Budget Planning',
    description: 'Smart calculator to estimate living costs, tuition fees, and total expenses with currency conversion.',
    stats: 'Live Currency | Cost Breakdown',
    link: '/compare',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Scholarship Database',
    description: 'Find and apply for hundreds of scholarships matching your profile and destination preferences.',
    stats: 'Personalized Matches',
    link: '/scholarships',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: 'City Comparison',
    description: 'Compare multiple destinations side-by-side to make informed decisions based on your priorities.',
    stats: 'Visual Analytics',
    link: '/compare',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18"/>
        <path d="M18 17V9M13 17V5M8 17v-3"/>
      </svg>
    ),
  },
  {
    title: 'Step-by-Step Guide',
    description: 'Complete timeline with checklists to keep you organized throughout your application journey.',
    stats: 'Timeline Tracking',
    link: '/plan-journey',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: 'Student Community',
    description: 'Connect with fellow students and learn from their experiences through stories and discussions.',
    stats: 'Real Stories | Forums',
    link: '/community',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const KeyFeatures: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleFeatureClick = (feature: Feature) => {
    if (!user) {
      setSelectedFeature(feature.title);
      setShowAuthModal(true);
    } else {
      router.push(feature.link);
    }
  };

  const handleStartJourneyClick = () => {
    if (!user) {
      setSelectedFeature('планированию путешествия');
      setShowAuthModal(true);
    } else {
      router.push('/plan-journey');
    }
  };

  return (
    <>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        featureName={selectedFeature}
      />
      
      <section className="relative py-24 lg:py-32 bg-[#f8fafc] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d98ba]/10 border border-[#0d98ba]/20 mb-6"
            >
              <span className="text-sm font-medium text-[#0d98ba]">Platform Features</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6"
            >
              Why Choose{' '}
              <span className="text-[#0d98ba]">STAB?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#64748b] max-w-2xl mx-auto"
            >
              Everything you need to plan your study abroad journey in one comprehensive platform
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onClick={() => handleFeatureClick(feature)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative h-full glass-card p-8"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Icon Container */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#0d98ba] flex items-center justify-center text-white mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 10px 30px -10px rgba(13, 152, 186, 0.5)'
                    }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#0d98ba] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[#64748b] text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Stats & Arrow */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                    <span className="text-xs font-medium px-3 py-1.5 bg-[#f1f5f9] text-[#475569] rounded-full">
                      {feature.stats}
                    </span>
                    
                    <motion.div
                      className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center group-hover:bg-[#0d98ba] transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.svg
                        className="w-4 h-4 text-[#64748b] group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-[#0d98ba]/0 group-hover:bg-[#0d98ba]/5 transition-all duration-500 pointer-events-none" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16 bg-[#0d98ba]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-6 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-8 right-12 w-16 h-16 bg-white/10 rounded-full blur-xl"
                animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                >
                  Ready to Start Your Journey?
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
                >
                  Join thousands of students who have successfully planned their study abroad experience with STAB
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-8 mb-10"
                >
                  {[
                    { number: 10000, suffix: '+', label: 'Students Helped' },
                    { number: 95, suffix: '%', label: 'Success Rate' },
                    { number: 50, suffix: '+', label: 'Countries' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        <CountUp
                          end={stat.number}
                          duration={2.5}
                          suffix={stat.suffix}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  onClick={handleStartJourneyClick}
                  className="px-8 py-4 bg-white text-[#0d98ba] rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Get Started for Free
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
