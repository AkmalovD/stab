'use client'

import EventCard from '@/components/EventCard';
import Footer from '@/components/Footer';
import ForumPostCard from '@/components/ForumPostCard';
import Header from '@/components/Header';
import StoryCard from '@/components/StoryCard';
import {
    categories,
    events,
    eventTypes,
    filterEvents,
    filterForumPosts,
    forumPosts,
    getUpcomingEvents,
    studentStories,
} from '@/utils/communityData';
import { useMemo, useState } from 'react';

type TabType = 'stories' | 'forum' | 'events';

export default function Community() {
  const [activeTab, setActiveTab] = useState<TabType>('stories');
  const [forumSearch, setForumSearch] = useState('');
  const [forumCategory, setForumCategory] = useState('All Categories');
  const [forumCountry, setForumCountry] = useState('All Countries');
  const [eventSearch, setEventSearch] = useState('');
  const [eventType, setEventType] = useState('All Types');

  // Filter forum posts
  const filteredForumPosts = useMemo(() => {
    return filterForumPosts(forumPosts, forumSearch, forumCategory, forumCountry);
  }, [forumSearch, forumCategory, forumCountry]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return filterEvents(events, eventSearch, eventType);
  }, [eventSearch, eventType]);

  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <Header />
      <main className="pt-[120px] px-4 md:px-10 lg:px-40 py-10 bg-[#f8fafc] min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-[#0d171b] mb-4">
            Student Community
          </h1>
          <p className="text-lg text-[#4c809a] max-w-3xl">
            Connect with fellow students, share experiences, and get advice from those who have already 
            embarked on their study abroad journey. Join our vibrant community of international students.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#0d98ba] transition-colors">
              <div className="w-12 h-12 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-[#0d171b]">{studentStories.length}</div>
              <div className="text-[#4c809a] font-medium">Student Stories</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#0d98ba] transition-colors">
              <div className="w-12 h-12 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-[#0d171b]">{forumPosts.length}</div>
              <div className="text-[#4c809a] font-medium">Forum Discussions</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#0d98ba] transition-colors">
              <div className="w-12 h-12 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-[#0d171b]">{upcomingEvents.length}</div>
              <div className="text-[#4c809a] font-medium">Upcoming Events</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#0d98ba] transition-colors">
              <div className="w-12 h-12 bg-[#0d98ba]/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-[#0d171b]">20+</div>
              <div className="text-[#4c809a] font-medium">Countries Covered</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm p-2 inline-flex gap-2 border border-gray-200">
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'stories'
                  ? 'bg-[#0d98ba] text-white'
                  : 'text-[#4c809a] hover:bg-[#f8fafc] hover:text-[#0d171b]'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Student Stories
            </button>
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'forum'
                  ? 'bg-[#0d98ba] text-white'
                  : 'text-[#4c809a] hover:bg-[#f8fafc] hover:text-[#0d171b]'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Forum
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-[#0d98ba] text-white'
                  : 'text-[#4c809a] hover:bg-[#f8fafc] hover:text-[#0d171b]'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Events
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto">
          {/* Student Stories Tab */}
          {activeTab === 'stories' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0d171b] mb-2">
                  Real Stories from Real Students
                </h2>
                <p className="text-[#4c809a]">
                  Learn from the experiences of students who have successfully navigated their study abroad journey
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>
          )}

          {/* Forum Tab */}
          {activeTab === 'forum' && (
            <div>
              {/* Forum Filters */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0d171b] mb-2">
                      Search Questions
                    </label>
                    <input
                      type="text"
                      placeholder="Search forum posts..."
                      value={forumSearch}
                      onChange={(e) => setForumSearch(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors text-[#0d171b]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d171b] mb-2">
                      Category
                    </label>
                    <select
                      value={forumCategory}
                      onChange={(e) => setForumCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors text-[#0d171b]"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d171b] mb-2">
                      Country
                    </label>
                    <select
                      value={forumCountry}
                      onChange={(e) => setForumCountry(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors text-[#0d171b]"
                    >
                      <option value="All Countries">All Countries</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-[#4c809a] font-medium">
                    Showing <span className="text-[#0d171b] font-bold">{filteredForumPosts.length}</span> of {forumPosts.length} discussions
                  </p>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0d98ba] text-white rounded-xl hover:bg-[#0d171b] transition-all font-semibold hover:gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Ask a Question
                  </button>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-4">
                {filteredForumPosts.map((post) => (
                  <ForumPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              {/* Event Filters */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0d171b] mb-2">
                      Search Events
                    </label>
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors text-[#0d171b]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d171b] mb-2">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-colors text-[#0d171b]"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-[#4c809a] font-medium">
                    Showing <span className="text-[#0d171b] font-bold">{filteredEvents.length}</span> of {events.length} events
                  </p>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
