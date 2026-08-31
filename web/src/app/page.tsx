'use client';

import { useAuth } from '@/auth/AuthContext';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      <Header />
      <main className={user ? "pt-[80px]" : ""}>
        <Hero />
        <HowItWorks />
        <FeaturedDestinations />
        <KeyFeatures />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
