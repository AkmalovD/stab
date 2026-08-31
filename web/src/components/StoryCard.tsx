import { StudentStory } from '@/types';
import React from 'react';

interface StoryCardProps {
  story: StudentStory;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Header with student info */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={story.studentPhoto}
            alt={story.studentName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{story.studentName}</h3>
            <p className="text-sm text-gray-600">{story.program}</p>
            <p className="text-sm text-gray-500">
              {story.university}, {story.country} • {story.year}
            </p>
          </div>
        </div>

        {/* Story content */}
        <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>

        {/* Budget and scholarship info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#0d98ba]/5 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Annual Budget</p>
            <p className="font-bold text-[#0d98ba]">{story.budget}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Scholarship</p>
            <p className="font-semibold text-green-700 text-sm">{story.scholarship}</p>
          </div>
        </div>

        {/* Tips */}
        <div className="mb-4">
          <p className="font-semibold text-sm text-gray-700 mb-2">💡 Top Tips:</p>
          <ul className="space-y-1">
            {story.tips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-[#0d98ba] mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer with likes and comments */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#0d98ba] transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm font-medium">{story.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#0d98ba] transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm font-medium">{story.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
