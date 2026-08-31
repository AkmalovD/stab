import React from 'react';
import { City } from '@/types';

interface VisualComparisonProps {
  cities: City[];
}

const VisualComparison: React.FC<VisualComparisonProps> = ({ cities }) => {
  // Calculate total monthly cost from breakdown
  const getTotalMonthlyCost = (city: City) => {
    return city.costBreakdown.housing + city.costBreakdown.food + 
           city.costBreakdown.transport + city.costBreakdown.entertainment + 
           city.costBreakdown.utilities;
  };

  const maxCost = Math.max(...cities.map(city => getTotalMonthlyCost(city)));
  
  const getBarWidth = (cost: number) => {
    return (cost / maxCost) * 100;
  };

  const getBarColor = (cost: number) => {
    const percentage = (cost / maxCost) * 100;
    if (percentage <= 33) return 'bg-green-500';
    if (percentage <= 66) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-[#0d171b] mb-6">
        Cost of Living Comparison
      </h3>
      <div className="space-y-4">
        {cities.map(city => (
          <div key={city.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{city.flag}</span>
                <div>
                  <h4 className="font-semibold text-[#0d171b]">{city.name}</h4>
                  <p className="text-sm text-[#4c809a]">{city.country}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#0d171b]">
                  ${getTotalMonthlyCost(city)}/month
                </div>
                <div className="text-sm text-[#4c809a]">
                  Index: {((getTotalMonthlyCost(city) / maxCost) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getBarColor(getTotalMonthlyCost(city))}`}
                style={{ width: `${getBarWidth(getTotalMonthlyCost(city))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-[#4c809a]">Low Cost</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-[#4c809a]">Medium Cost</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-[#4c809a]">High Cost</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualComparison;