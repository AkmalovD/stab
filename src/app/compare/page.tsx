'use client';

import { Suspense } from 'react';
import CityComparison from '../../components/CityComparison';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Compare() {
  return (
    <>
      <Header />
      <main className="pt-[80px]">
        <Suspense fallback={<div>Loading...</div>}>
          <CityComparison />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}