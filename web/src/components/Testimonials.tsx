'use client'

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  university: string;
  country: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'University of Oxford',
    country: 'United Kingdom',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'STAB made my study abroad journey so much easier! The budget calculator and scholarship finder saved me thousands of dollars. Highly recommend!',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    university: 'Technical University of Munich',
    country: 'Germany',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    text: 'The city comparison tool helped me make an informed decision. I found the perfect balance between quality education and affordable living.',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    university: 'University of Amsterdam',
    country: 'Netherlands',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'Amazing platform! The step-by-step planning guide kept me organized throughout the entire application process. Got accepted to my dream university!',
  },
  {
    id: 4,
    name: 'John Chen',
    university: 'University of Toronto',
    country: 'Canada',
    image: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    text: 'The scholarship database is incredible. I found and applied for 5 scholarships I never knew existed. Won 2 of them! Thank you STAB!',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#0d98ba]/5 blur-3xl"
        animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-[#0d98ba]/5 blur-3xl"
        animate={{ x: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
            <span className="text-sm font-medium text-[#0d98ba]">Student Success</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6"
          >
            What Our{' '}
            <span className="text-[#0d98ba]">
              Students Say
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#64748b] max-w-2xl mx-auto"
          >
            Join thousands of students who successfully planned their study abroad journey
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="glass-card p-8 md:p-12 relative">
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-[#0d98ba] rounded-xl flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>

                {/* Rating Stars */}
                <motion.div
                  className="flex items-center gap-1 mb-6 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-[#0d98ba] fill-current"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + i * 0.1,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Testimonial Text */}
                <motion.p
                  className="text-xl md:text-2xl text-[#0f172a] leading-relaxed mb-8 font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  "{currentTestimonial.text}"
                </motion.p>

                {/* Author Info */}
                <motion.div
                  className="flex items-center gap-4 pt-6 border-t border-[#e2e8f0]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Avatar */}
                  <motion.div
                    className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#0d98ba]/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={currentTestimonial.image} 
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#0f172a]">
                      {currentTestimonial.name}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-[#0d98ba]/10 text-[#0d98ba] rounded-full">
                        {currentTestimonial.university}
                      </span>
                      <span className="text-xs px-2 py-1 bg-[#0d98ba]/10 text-[#0d98ba] rounded-full">
                        {currentTestimonial.country}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 glass-card flex items-center justify-center hover:bg-[#0d98ba]/10 transition-colors duration-300"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 glass-card flex items-center justify-center hover:bg-[#0d98ba]/10 transition-colors duration-300"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
              animate={{
                width: index === currentIndex ? 32 : 8,
                backgroundColor: index === currentIndex ? "#0d98ba" : "#cbd5e1"
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-[#0d98ba]"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Logo Carousel - Partner Universities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-[#e2e8f0]"
        >
          <p className="text-center text-sm text-[#64748b] mb-8">Trusted by students from top universities worldwide</p>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 px-8">
                  {['Oxford', 'MIT', 'Stanford', 'Cambridge', 'Harvard', 'ETH Zurich'].map((uni, i) => (
                    <motion.div
                      key={`${setIndex}-${i}`}
                      className="text-2xl font-bold text-[#cbd5e1] hover:text-[#0d98ba] transition-colors duration-300 whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                    >
                      {uni}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
