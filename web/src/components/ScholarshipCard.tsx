import React from 'react';
import { Scholarship } from '@/types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const getDaysUntilDeadline = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isPast = daysLeft < 0;

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0d98ba] transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#0d171b] mb-1.5 group-hover:text-[#0d98ba] transition-colors">
                {scholarship.name}
              </h3>
              <p className="text-sm text-[#4c809a] font-medium">
                {scholarship.provider}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#4c809a] mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{scholarship.country}</span>
            <span className="mx-1.5">•</span>
            <span>{scholarship.studyLevel}</span>
          </div>
        </div>
        
        {!isPast && (
          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
            isUrgent 
              ? 'bg-[#0d171b] text-white' 
              : 'bg-[#f8fafc] text-[#0d98ba] border border-[#0d98ba]/20'
          }`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {daysLeft}d
          </div>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between py-3 px-4 bg-[#f8fafc] rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span className="text-xs text-[#4c809a] font-medium">AMOUNT</span>
          </div>
          <span className="font-bold text-[#0d171b]">{scholarship.amount}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 px-4 bg-[#f8fafc] rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-xs text-[#4c809a] font-medium">COVERAGE</span>
          </div>
          <span className="font-semibold text-[#0d171b] text-sm">{scholarship.coverage}</span>
        </div>
        
        <div className="flex items-center justify-between py-3 px-4 bg-[#f8fafc] rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-xs text-[#4c809a] font-medium">DIFFICULTY</span>
          </div>
          <span className="font-semibold text-[#0d171b] text-sm">{scholarship.difficulty}</span>
        </div>
      </div>

      <p className="text-sm text-[#4c809a] leading-relaxed mb-4 line-clamp-2">
        {scholarship.description}
      </p>

      <div className="mb-5 p-4 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center gap-2 mb-2.5">
          <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span className="text-xs font-bold text-[#0d171b] uppercase tracking-wide">Requirements</span>
        </div>
        <ul className="space-y-2">
          {scholarship.requirements.slice(0, 3).map((req, index) => (
            <li key={index} className="text-xs text-[#4c809a] flex items-start gap-2 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-[#0d98ba] mt-1.5 flex-shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#4c809a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="text-xs text-[#4c809a] font-medium">
            {new Date(scholarship.deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <a
          href={scholarship.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0d98ba] text-white rounded-xl text-sm font-semibold hover:bg-[#0d171b] transition-all hover:gap-3"
        >
          <span>Apply</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ScholarshipCard;