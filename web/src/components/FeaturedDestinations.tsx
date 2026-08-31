'use client'

import { useAuth } from '@/auth/AuthContext';
import { citiesData } from '@/utils/data';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AuthRequiredModal from './AuthRequiredModal';

interface DestinationCardProps {
  city: {
    id: string;
    name: string;
    country: string;
    imageUrl: string;
    flag: string;
    costOfLiving: string;
  };
  onExplore: (cityName: string) => void;
  index: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, onExplore, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
    >
      <motion.div
        className="relative h-full bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden cursor-pointer shadow-sm"
        whileHover={{
          y: -8,
          borderColor: "rgba(13, 152, 186, 0.3)",
          boxShadow: "0 20px 40px -12px rgba(13, 152, 186, 0.15)",
          transition: { duration: 0.3 }
        }}
        onClick={() => onExplore(city.name)}
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={city.imageUrl}
            alt={city.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#0d98ba] transition-colors duration-300"
          >
            {city.name}
          </motion.h3>
          <p className="text-sm text-[#64748b] mb-4">{city.country}</p>

          {/* Cost Badge */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#64748b] mb-1">Monthly Living Cost</p>
              <p className="text-lg font-bold text-[#0d98ba]">{city.costOfLiving}</p>
            </div>
            
            {/* Arrow Icon */}
            <motion.div
              className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center group-hover:bg-[#0d98ba] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <svg 
                className="w-5 h-5 text-[#64748b] group-hover:text-white transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(13,152,186,0.1)]" />
      </motion.div>
    </motion.div>
  );
};

const FeaturedDestinations: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  
  const featuredCities = citiesData.slice(0, 6);

  const handleCityExplore = (cityName: string) => {
    if (!user) {
      setSelectedCity(`городу ${cityName}`);
      setShowAuthModal(true);
    } else {
      router.push(`/compare?city=${encodeURIComponent(cityName)}`);
    }
  };

  const handleViewAllClick = () => {
    if (!user) {
      setSelectedCity('всем городам');
      setShowAuthModal(true);
    } else {
      router.push('/compare');
    }
  };

  return (
    <>
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        featureName={selectedCity}
      />
      
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#0d98ba]/5 blur-3xl"
          animate={{ x: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d98ba]/10 border border-[#0d98ba]/20 mb-6"
              >
                <span className="text-sm font-medium text-[#0d98ba]">Popular Destinations</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4"
              >
                Featured{' '}
                <span className="text-[#0d98ba]">
                  Destinations
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-[#64748b] max-w-xl"
              >
                Explore the most popular study abroad destinations chosen by thousands of students
              </motion.p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={handleViewAllClick}
              className="hidden lg:flex items-center gap-2 px-6 py-3 border-2 border-[#0d98ba] text-[#0d98ba] rounded-xl font-semibold hover:bg-[#0d98ba] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Cities
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredCities.map((city, index) => (
              <DestinationCard 
                key={city.id} 
                city={city} 
                onExplore={handleCityExplore}
                index={index}
              />
            ))}
          </div>

          {/* Mobile View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:hidden text-center mt-10"
          >
            <button
              onClick={handleViewAllClick}
              className="px-6 py-3 border-2 border-[#0d98ba] text-[#0d98ba] rounded-xl font-semibold hover:bg-[#0d98ba] hover:text-white transition-all duration-300"
            >
              View All Cities
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FeaturedDestinations;
