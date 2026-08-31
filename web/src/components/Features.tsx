import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🏙️',
      title: 'City Comparison',
      description: 'Compare living costs across different cities and countries to make informed decisions.',
    },
    {
      icon: '💰',
      title: 'Cost Calculator',
      description: 'Calculate detailed monthly expenses including housing, food, transport, and more.',
    },
    {
      icon: '💱',
      title: 'Currency Converter',
      description: 'Convert currencies in real-time to understand costs in your local currency.',
    },
    {
      icon: '🎓',
      title: 'University Finder',
      description: 'Discover top universities and their tuition fees in your preferred destinations.',
    },
    {
      icon: '💳',
      title: 'Scholarship Search',
      description: 'Find available scholarships and funding opportunities for international students.',
    },
    {
      icon: '👥',
      title: 'Student Community',
      description: 'Connect with other students and get advice from those who have studied abroad.',
    },
  ];

  return (
    <section className="px-4 md:px-10 lg:px-40 py-16 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0d171b] mb-4">
            Everything You Need to Plan Your Study Abroad Journey
          </h2>
          <p className="text-lg text-[#4c809a] max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and information you need to make informed decisions about studying abroad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#0d171b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#4c809a] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;