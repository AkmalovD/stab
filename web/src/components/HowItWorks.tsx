'use client'

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Research & Explore',
    description: 'Browse through 50+ cities and 200+ universities. Compare costs, living expenses, and programs.',
    details: ['50+ Cities', '200+ Universities', 'Cost Analysis'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6"/>
        <path d="M8 11h6"/>
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Compare Options',
    description: 'Use our interactive tools to compare cities side-by-side and calculate your budget.',
    details: ['Side-by-side', 'Budget Tools', 'Live Data'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Find Scholarships',
    description: 'Discover and apply for scholarships that match your profile and destination.',
    details: ['Match Profile', 'Track Apps', 'Deadlines'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Plan Your Journey',
    description: 'Create a step-by-step timeline with checklists, deadlines, and document tracking.',
    details: ['Timeline', 'Checklists', 'Documents'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

const HowItWorks: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative py-24 lg:py-32 bg-[#f8fafc] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0d98ba]/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#0d98ba]/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
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
            <span className="text-sm font-medium text-[#0d98ba]">Our Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6"
          >
            How It{' '}
            <span className="text-[#0d98ba]">Works</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#64748b] max-w-2xl mx-auto"
          >
            A straightforward process designed to help you navigate your study abroad journey from start to finish
          </motion.p>
        </div>

        {/* Timeline Line - Desktop */}
        <div className="hidden lg:block relative mb-12">
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#0d98ba]/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group relative"
            >
              <motion.div
                className="relative h-full glass-card p-6 lg:p-8"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Step Number Badge */}
                <motion.div
                  className="absolute -top-4 -left-2 w-10 h-10 bg-[#0d98ba] rounded-xl flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center text-[#0d98ba] mb-5 mt-4 group-hover:bg-[#0d98ba]/20 transition-colors duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-xl font-bold text-[#0f172a] mb-3 group-hover:text-[#0d98ba] transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className="text-[#64748b] text-sm leading-relaxed mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                >
                  {step.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}
                >
                  {step.details.map((detail, idx) => (
                    <motion.span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-[#f1f5f9] text-[#475569] rounded-full border border-[#e2e8f0] hover:border-[#0d98ba]/50 hover:text-[#0d98ba] transition-all duration-200 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.15 + 0.8 + idx * 0.05
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {detail}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#0d98ba]/0 group-hover:bg-[#0d98ba]/5 transition-all duration-500 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={() => router.push('/plan-journey')}
            className="group relative px-8 py-4 bg-[#0d98ba] text-white rounded-xl font-semibold text-lg overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px -12px rgba(13, 152, 186, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Today
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-[#0b8299]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
