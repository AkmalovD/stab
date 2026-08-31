import { City } from '@/types';
import React from 'react';

interface CostBreakdownProps {
  cities: City[];
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ cities }) => {
  // Color palettes for contrast comparison
  const colorPalettes = [
    // Shared color palette for both cities - modern UI-friendly colors
    {
      housing: '#3b82f6',
      food: '#10b981',
      transport: '#8b5cf6',
      entertainment: '#f59e0b',
      utilities: '#6b7280',
      primary: '#3b82f6',
      secondary: '#6b7280'
    },
    // Same palette for second city
    {
      housing: '#3b82f6',
      food: '#10b981',
      transport: '#8b5cf6',
      entertainment: '#f59e0b',
      utilities: '#6b7280',
      primary: '#3b82f6',
      secondary: '#6b7280'
    }
  ];

  const costCategories = [
    { key: 'housing' as keyof City['costBreakdown'], label: 'Housing' },
    { key: 'food' as keyof City['costBreakdown'], label: 'Food' },
    { key: 'transport' as keyof City['costBreakdown'], label: 'Transport' },
    { key: 'entertainment' as keyof City['costBreakdown'], label: 'Entertainment' },
    { key: 'utilities' as keyof City['costBreakdown'], label: 'Utilities' },
  ];

  const getCityTotal = (city: City) => {
    return costCategories.reduce((sum, category) => {
      return sum + (Number(city.costBreakdown[category.key]) || 0);
    }, 0);
  };

  const getCityBreakdownData = (city: City, cityIndex: number) => {
    const total = getCityTotal(city);
    const palette = colorPalettes[cityIndex % colorPalettes.length];
    let currentAngle = -90; // Start from top
    
    return costCategories.map(category => {
      const value = Number(city.costBreakdown[category.key]) || 0;
      const percentage = total > 0 ? (value / total) * 100 : 0;
      const angle = (percentage / 100) * 360;
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      return {
        ...category,
        value,
        percentage,
        startAngle,
        endAngle,
        color: palette[category.key as keyof typeof palette] as string,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary
      };
    });
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const createArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number, gapAngle: number = 3) => {
    // Add small gap between segments for better visual separation
    const adjustedStartAngle = startAngle + gapAngle / 2;
    const adjustedEndAngle = endAngle - gapAngle / 2;
    
    const start = polarToCartesian(x, y, radius, adjustedEndAngle);
    const end = polarToCartesian(x, y, radius, adjustedStartAngle);
    const largeArcFlag = adjustedEndAngle - adjustedStartAngle <= 180 ? '0' : '1';
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z'
    ].join(' ');
  };

  // Dynamic sizing based on number of cities
  const getCardStyles = () => {
    const cityCount = cities.length;
    if (cityCount >= 4) {
      return {
        cardWidth: 'w-[220px] md:w-[240px]',
        chartSize: 'w-40 h-40 md:w-44 md:h-44',
        padding: 'p-4 md:p-5',
        gap: 'gap-3 md:gap-4',
        totalText: 'text-xl md:text-2xl',
        cityNameText: 'text-base md:text-lg',
        legendText: 'text-xs',
        legendValueText: 'text-xs md:text-sm'
      };
    } else if (cityCount === 3) {
      return {
        cardWidth: 'w-[240px] md:w-[280px]',
        chartSize: 'w-44 h-44 md:w-52 md:h-52',
        padding: 'p-5 md:p-6',
        gap: 'gap-4 md:gap-6',
        totalText: 'text-2xl md:text-3xl',
        cityNameText: 'text-lg',
        legendText: 'text-xs md:text-sm',
        legendValueText: 'text-sm md:text-base'
      };
    } else {
      return {
        cardWidth: 'w-[280px] md:w-[320px]',
        chartSize: 'w-48 h-48 md:w-56 md:h-56',
        padding: 'p-6 md:p-7',
        gap: 'gap-6 md:gap-8',
        totalText: 'text-2xl md:text-3xl',
        cityNameText: 'text-lg',
        legendText: 'text-xs md:text-sm',
        legendValueText: 'text-sm md:text-base'
      };
    }
  };

  const styles = getCardStyles();

  return (
    <div className="flex justify-center w-full overflow-x-auto py-4">
      <div className={`flex flex-nowrap justify-center ${styles.gap} w-full max-w-full px-4`}>
        {cities.map((city, cityIndex) => {
          const total = getCityTotal(city);
          const breakdownData = getCityBreakdownData(city, cityIndex);
          const palette = colorPalettes[cityIndex % colorPalettes.length];
          
          return (
            <div 
              key={city.id} 
              className={`flex flex-col items-center flex-shrink-0 ${styles.cardWidth} bg-white rounded-2xl ${styles.padding} shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200`}
            >
              {/* Circle Chart */}
              <div className={`relative ${styles.chartSize} mb-6`}>
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-0">
                  {breakdownData.map((item, idx) => (
                    <path
                      key={idx}
                      d={createArc(100, 100, 80, item.startAngle, item.endAngle)}
                      fill={item.color}
                      className="transition-all duration-300 hover:brightness-110 cursor-pointer"
                      style={{ 
                        transformOrigin: '100px 100px'
                      }}
                    />
                  ))}
                  {/* Center circle with subtle shadow */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="50" 
                    fill="white"
                  />
                </svg>
                
                {/* Total in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className={`${styles.totalText} font-bold`} style={{ color: palette.primary }}>
                    ${total.toLocaleString()}
                  </div>
                  <div className="text-xs mt-1 font-medium" style={{ color: palette.secondary }}>per month</div>
                </div>
              </div>

              {/* City Name */}
              <div className="text-center mb-4">
                <h4 className={`font-bold text-[#0d171b] ${styles.cityNameText} mb-1`}>{city.name}</h4>
                <p className="text-xs font-medium" style={{ color: palette.secondary }}>{city.country}</p>
              </div>

              {/* Legend */}
              <div className="w-full space-y-2">
                {breakdownData.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between ${styles.legendText} p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium" style={{ color: '#374151' }}>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-[#0d171b] ${styles.legendValueText}`}>${item.value.toLocaleString()}</span>
                      <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100" style={{ color: palette.secondary }}>
                        {item.percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CostBreakdown;