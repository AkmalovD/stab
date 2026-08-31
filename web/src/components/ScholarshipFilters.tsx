import React from 'react';

interface ScholarshipFiltersProps {
  filters: {
    country?: string;
    studyLevel?: string;
    coverage?: string;
    searchQuery?: string;
  };
  onFilterChange: (filters: any) => void;
  countries: string[];
  studyLevels: string[];
  coverageTypes: string[];
}

const ScholarshipFilters: React.FC<ScholarshipFiltersProps> = ({
  filters,
  onFilterChange,
  countries,
  studyLevels,
  coverageTypes
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, country: e.target.value || undefined });
  };

  const handleStudyLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, studyLevel: e.target.value || undefined });
  };

  const handleCoverageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, coverage: e.target.value || undefined });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0d171b]">
          Filter Scholarships
        </h3>
        <button
          onClick={handleReset}
          className="text-sm text-[#0d98ba] hover:underline font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#4c809a] mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            placeholder="Search scholarships..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-[#4c809a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4c809a] mb-2">
            Country
          </label>
          <select
            value={filters.country || ''}
            onChange={handleCountryChange}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Study Level Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4c809a] mb-2">
            Study Level
          </label>
          <select
            value={filters.studyLevel || ''}
            onChange={handleStudyLevelChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
          >
            <option value="">All Levels</option>
            {studyLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Coverage Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4c809a] mb-2">
            Coverage
          </label>
          <select
            value={filters.coverage || ''}
            onChange={handleCoverageChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors"
          >
            <option value="">All Types</option>
            {coverageTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipFilters;