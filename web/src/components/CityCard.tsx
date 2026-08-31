import { CityCardProps } from '@/types';
import React from 'react';

const CityCard: React.FC<CityCardProps> = ({ city, isSelected, onSelect }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group
      ${isSelected ? 'ring-2 ring-[#0d98ba] shadow-xl' : 'hover:shadow-lg'}
    `}
    onClick={onSelect}
    >
      {/* City Image */}
      <div
        className="h-48 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url("${city.imageUrl}")` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Selection Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-[#0d98ba] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Selected
          </div>
        )}

        {/* City Name Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{city.name}</h3>
          <p className="text-sm opacity-90">{city.country}</p>
        </div>
      </div>

      {/* City Info */}
      <div className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm text-[#4c809a] mb-1">Rent</div>
            <div className="font-semibold text-[#0d171b]">{city.costs.rent}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm text-[#4c809a] mb-1">Food</div>
            <div className="font-semibold text-[#0d171b]">{city.costs.food}</div>
          </div>
        </div>

        {/* Metadata */}
        {city.metadata && (
          <div className="space-y-2 mb-4">
            {city.metadata.population && (
              <div className="flex justify-between text-sm">
                <span className="text-[#4c809a]">Population:</span>
                <span className="font-medium">
                  {(city.metadata.population / 1000000).toFixed(1)}M
                </span>
              </div>
            )}
            {city.metadata.currency && (
              <div className="flex justify-between text-sm">
                <span className="text-[#4c809a]">Currency:</span>
                <span className="font-medium">{city.metadata.currency}</span>
              </div>
            )}
            {city.metadata.language && (
              <div className="flex justify-between text-sm">
                <span className="text-[#4c809a]">Language:</span>
                <span className="font-medium">{city.metadata.language}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          className={`
            w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${isSelected 
              ? 'bg-[#0d98ba] text-white hover:bg-[#0d98ba] focus:ring-[#0d98ba]' 
              : 'bg-[#e7eff3] text-[#0d171b] hover:bg-[#d1e7f1] focus:ring-[#e7eff3]'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? 'Remove from Comparison' : 'Add to Comparison'}
        </button>
      </div>
    </div>
  );
};

export default CityCard;