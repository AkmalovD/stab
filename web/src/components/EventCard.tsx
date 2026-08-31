import { Event } from '@/types';
import React from 'react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntil = (date: Date): number => {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntil(event.date);
  const availableSpots = event.capacity - event.attendees;
  const fillPercentage = (event.attendees / event.capacity) * 100;

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      Virtual: 'bg-[#0d98ba]/10 text-[#0d98ba]',
      Webinar: 'bg-purple-100 text-purple-700',
      Workshop: 'bg-green-100 text-green-700',
      Meetup: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {daysUntil <= 7 && daysUntil > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {daysUntil} days left!
          </div>
        )}
        {event.isRegistered && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            ✓ Registered
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Type badge */}
        <div className="mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
            {event.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* Date and Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-[#0d98ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-[#0d98ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-[#0d98ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Organized by {event.organizer}</span>
          </div>
        </div>

        {/* Attendees progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {event.attendees} / {event.capacity} attendees
            </span>
            <span className="text-gray-600 font-medium">
              {availableSpots} spots left
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                fillPercentage >= 90 ? 'bg-red-500' : fillPercentage >= 70 ? 'bg-orange-500' : 'bg-[#0d98ba]'
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        {/* Action button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            event.isRegistered
              ? 'bg-gray-200 text-gray-700 cursor-default'
              : availableSpots === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#0d98ba] text-white hover:bg-[#0d171b]'
          }`}
          disabled={event.isRegistered || availableSpots === 0}
        >
          {event.isRegistered ? 'Already Registered' : availableSpots === 0 ? 'Event Full' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
