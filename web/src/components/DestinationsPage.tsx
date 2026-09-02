'use client';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Grid3X3,
  List,
  Search,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {
  BUDGET_TIERS,
  BudgetTier,
  DestinationListing,
  LANGUAGES,
  REGIONS,
  Region,
  SORT_OPTIONS,
  SortOption,
} from '@/data/destinationsListData';
import { destinationsApi } from '@/services/contentApi';

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;

const BUDGET_BADGE: Record<BudgetTier, string> = {
  'Low Cost': 'bg-green-100 text-green-700 border border-green-200',
  'Moderate': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  'High Cost': 'bg-red-100 text-red-700 border border-red-200',
};

// ─── Destination card ─────────────────────────────────────────────────────────

function DestinationCard({ city }: { city: DestinationListing }) {
  return (
    <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={city.image}
          alt={`${city.name}, ${city.country}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Name + budget badge */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{city.name}</h3>
            <p className="text-sm text-gray-500">{city.country}</p>
          </div>
          <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${BUDGET_BADGE[city.budgetTier]}`}>
            {city.budgetTier.toUpperCase()}
          </span>
        </div>

        {/* Universities count */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-2.5 mb-3">
          <GraduationCap className="w-4 h-4 text-[#0d98ba]" aria-hidden />
          <span>{city.universitiesCount} Universities</span>
        </div>

        {/* Scholarship match bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Scholarship Match</span>
            <span className="text-[#0d98ba] font-semibold">{city.scholarshipMatch}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d98ba] rounded-full"
              style={{ width: `${city.scholarshipMatch}%` }}
              role="progressbar"
              aria-valuenow={city.scholarshipMatch}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {city.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Explore link */}
        {city.hasDetailPage ? (
          <Link
            href={`/destinations/${city.slug}`}
            className="text-sm font-semibold text-[#0d98ba] transition-colors"
          >
            Explore →
          </Link>
        ) : (
          <span className="text-sm text-gray-400">Coming Soon</span>
        )}
      </div>
    </article>
  );
}

// ─── Filter select wrapper ────────────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-sm border border-gray-200 rounded-lg pl-3 pr-8 py-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#13a4ec]/30 focus:border-[#0d98ba]"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden />
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function buildPageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', current - 1, current, current + 1, '…', total];
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'w-9 h-9 rounded-full text-sm font-medium transition-colors',
        active ? 'bg-[#0d98ba] text-white' : 'text-gray-600 hover:bg-gray-100',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      <PageButton disabled={current === 1} onClick={() => onChange(current - 1)}>
        <ChevronLeft className="w-4 h-4 mx-auto" aria-label="Previous" />
      </PageButton>

      {buildPageRange(current, total).map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-gray-400 select-none">
            …
          </span>
        ) : (
          <PageButton key={page} active={page === current} onClick={() => onChange(page as number)}>
            {page}
          </PageButton>
        ),
      )}

      <PageButton disabled={current === total} onClick={() => onChange(current + 1)}>
        <ChevronRight className="w-4 h-4 mx-auto" aria-label="Next" />
      </PageButton>
    </nav>
  );
}

// ─── Hero stats bar ───────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: '200+', label: 'CITIES' },
  { value: '50+', label: 'COUNTRIES' },
  { value: '10K+', label: 'REVIEWS' },
] as const;

// ─── Main page component ──────────────────────────────────────────────────────

const DestinationsPage: React.FC = () => {
  // — Filter state —
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');
  const [budget, setBudget] = useState<'All' | BudgetTier>('All');
  const [language, setLanguage] = useState<string>('All');
  const [scholarshipsOnly, setScholarshipsOnly] = useState(false);

  // — Sort & view state —
  const [sort, setSort] = useState<SortOption>('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // — Pagination state —
  const [page, setPage] = useState(1);

  // — Data —
  const [destinations, setDestinations] = useState<DestinationListing[]>([]);

  useEffect(() => {
    destinationsApi
      .list()
      .then(setDestinations)
      .catch((error) => console.error('Failed to load destinations:', error));
  }, []);

  // — Active filter chips —
  const activeFilters = useMemo(() => {
    const chips: Array<{ label: string; onRemove: () => void }> = [];

    if (region !== 'All')
      chips.push({ label: `Region: ${region}`, onRemove: () => { setRegion('All'); setPage(1); } });
    if (budget !== 'All')
      chips.push({ label: budget, onRemove: () => { setBudget('All'); setPage(1); } });
    if (language !== 'All')
      chips.push({ label: language, onRemove: () => { setLanguage('All'); setPage(1); } });
    if (scholarshipsOnly)
      chips.push({ label: 'Scholarships Only', onRemove: () => { setScholarshipsOnly(false); setPage(1); } });

    return chips;
  }, [region, budget, language, scholarshipsOnly]);

  // — Filtered + sorted results —
  const filtered = useMemo(() => {
    let results = destinations.filter((city) => {
      const query = search.toLowerCase();
      if (query && !city.name.toLowerCase().includes(query) && !city.country.toLowerCase().includes(query)) return false;
      if (region !== 'All' && city.region !== region) return false;
      if (budget !== 'All' && city.budgetTier !== budget) return false;
      if (language !== 'All' && !city.languages.includes(language)) return false;
      if (scholarshipsOnly && city.scholarshipMatch < 50) return false;
      return true;
    });

    switch (sort) {
      case 'Budget: Low to High':
        results = [...results].sort((a, b) => a.monthlyBudgetMin - b.monthlyBudgetMin);
        break;
      case 'Budget: High to Low':
        results = [...results].sort((a, b) => b.monthlyBudgetMin - a.monthlyBudgetMin);
        break;
      case 'Scholarship Match':
        results = [...results].sort((a, b) => b.scholarshipMatch - a.scholarshipMatch);
        break;
      // 'Popularity': preserve original data-file order
    }

    return results;
  }, [destinations, search, region, budget, language, scholarshipsOnly, sort]);

  // — Paginated slice —
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function clearAllFilters() {
    setSearch('');
    setRegion('All');
    setBudget('All');
    setLanguage('All');
    setScholarshipsOnly(false);
    setPage(1);
  }

  return (
    <>
      <Header />

      <main className="pt-[65px] min-h-screen bg-white">
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Explore{' '}
            <span className="text-[#0d98ba]">Destinations</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-base">
            Discover world-class academic hubs tailored to your career goals and budget.
          </p>
        </section>

        <div className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Filter bar ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden />
              <input
                type="search"
                placeholder="Search cities or countries..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13a4ec]/30 focus:border-[#0d98ba]"
              />
            </div>

            {/* Region */}
            <FilterSelect value={region} onChange={(v) => { setRegion(v as Region); setPage(1); }}>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>
              ))}
            </FilterSelect>

            {/* Budget */}
            <FilterSelect value={budget} onChange={(v) => { setBudget(v as 'All' | BudgetTier); setPage(1); }}>
              <option value="All">Budget Range</option>
              {BUDGET_TIERS.map((b) => <option key={b} value={b}>{b}</option>)}
            </FilterSelect>

            {/* Language */}
            <FilterSelect value={language} onChange={(v) => { setLanguage(v); setPage(1); }}>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l === 'All' ? 'Language' : l}</option>
              ))}
            </FilterSelect>

            {/* Scholarships only */}
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer whitespace-nowrap select-none">
              <input
                type="checkbox"
                checked={scholarshipsOnly}
                onChange={(e) => { setScholarshipsOnly(e.target.checked); setPage(1); }}
                className="accent-[#0d98ba] w-4 h-4 cursor-pointer"
              />
              Scholarships Only
            </label>
          </div>

          {/* ── Active filter chips ─────────────────────────────────────── */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-gray-500 tracking-wider">FILTERS:</span>

              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={filter.onRemove}
                  className="flex items-center gap-1 text-xs bg-[#e8f5fe] text-[#0d98ba] border border-[#b3e0fb] px-3 py-1 rounded-full hover:bg-[#d0ecfc] transition-colors"
                >
                  {filter.label}
                  <X className="w-3 h-3" aria-hidden />
                </button>
              ))}

              <button
                onClick={clearAllFilters}
                className="text-xs text-[#0d98ba] underline hover:no-underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* ── Results header ──────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-gray-700">
              Showing <span className="font-semibold">{filtered.length}</span> destinations
            </p>

            <div className="flex items-center gap-3">
              {/* Grid / list toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#0d98ba] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-4 h-4" aria-hidden />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="List view"
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#0d98ba] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" aria-hidden />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#13a4ec]/30"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s} value={s}>Sort by: {s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Results grid / list ─────────────────────────────────────── */}
          {paginated.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {paginated.map((city) => (
                <DestinationCard key={city.slug} city={city} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">No destinations found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-sm text-[#0d98ba] underline hover:no-underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* ── Pagination ──────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onChange={setPage} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DestinationsPage;
