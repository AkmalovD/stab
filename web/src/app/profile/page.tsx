'use client'

import { useAuth } from '@/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Book, Calendar, DollarSign, GraduationCap, LogOut, Mail, MapPin, Pencil, Save, Target, User } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.user_metadata?.full_name || user?.user_metadata?.name || 'Student Name',
    email: user?.email || '',
    dateOfBirth: '1998-05-15',
    location: 'Tashkent, Uzbekistan',
    university: 'National University of Uzbekistan',
    major: 'Computer Science',
    studyDestination: 'United Kingdom',
    targetUniversity: 'University of Cambridge',
    budget: '$25,000 - $35,000',
    startDate: 'September 2024',
    bio: 'Aspiring computer scientist passionate about AI and machine learning. Looking to pursue a Master\'s degree abroad.',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const completionItems = [
    { label: 'Personal Info', completed: true },
    { label: 'Academic Info', completed: true },
    { label: 'Study Plans', completed: true },
    { label: 'Documents', completed: false },
    { label: 'Preferences', completed: false },
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100);

  return (
    <ProtectedRoute>
      <Header />
      <main className="flex-1 px-4 md:px-10 lg:px-40 py-10 mt-16 min-h-screen bg-[#fff]">
        <div className="layout-content-container mx-auto flex max-w-7xl flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="text-[#0d171b] text-4xl font-bold">
                My Profile
              </p>
              <p className="text-[#4c809a] text-lg">
                Manage your personal information and study abroad preferences.
              </p>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center gap-2 cursor-pointer justify-center rounded-xl h-12 px-6 bg-[#0d98ba] text-white text-base font-bold shadow-lg hover:shadow-xl hover:bg-[#0b889f] transition-all"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Pencil className="w-5 h-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-2xl bg-[#0d98ba] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                    ) : (
                      profileData.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-[#0d171b] mb-2">{profileData.displayName}</h2>
                    <div className="flex items-center gap-2 text-[#4c809a] mb-4">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{profileData.email}</span>
                    </div>
                    
                    {/* Bio */}
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-sm transition-all hover:border-gray-300 resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-[#4c809a] text-sm leading-relaxed">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0d171b]">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.displayName}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0d171b]">Email Address</label>
                    <p className="text-[#0d171b] font-medium py-3">{profileData.email}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <Calendar className="w-4 h-4 text-[#4c809a]" />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <MapPin className="w-4 h-4 text-[#4c809a]" />
                      Current Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.location}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <Book className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">Academic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0d171b]">Current University</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.university}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0d171b]">Major / Field of Study</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.major}
                        onChange={(e) => handleInputChange('major', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.major}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Study Abroad Plans */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">Study Abroad Plans</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <MapPin className="w-4 h-4 text-[#4c809a]" />
                      Target Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.studyDestination}
                        onChange={(e) => handleInputChange('studyDestination', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.studyDestination}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <Target className="w-4 h-4 text-[#4c809a]" />
                      Target University
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.targetUniversity}
                        onChange={(e) => handleInputChange('targetUniversity', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.targetUniversity}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <DollarSign className="w-4 h-4 text-[#4c809a]" />
                      Budget Range
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.budget}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#0d171b]">
                      <Calendar className="w-4 h-4 text-[#4c809a]" />
                      Intended Start Date
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] text-base font-medium transition-all hover:border-gray-300"
                      />
                    ) : (
                      <p className="text-[#0d171b] font-medium py-3">{profileData.startDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Profile Completion */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-[#0d171b] mb-4">Profile Completion</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#e5e7eb"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#0d98ba"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${completionPercentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#0d171b]">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#4c809a]">
                      {completedCount} of {completionItems.length} sections completed
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {completionItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.completed ? 'bg-[#0d98ba]' : 'border-2 border-gray-300'}`}>
                        {item.completed && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${item.completed ? 'text-[#0d171b]' : 'text-[#4c809a]'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-[#0d171b] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="/budget" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-[#0d171b] font-medium hover:border-[#0d98ba] hover:bg-[#0d98ba]/5 transition-all">
                    <DollarSign className="w-5 h-5 text-[#0d98ba]" />
                    <span>Budget Planner</span>
                  </a>
                  <a href="/compare" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-[#0d171b] font-medium hover:border-[#0d98ba] hover:bg-[#0d98ba]/5 transition-all">
                    <MapPin className="w-5 h-5 text-[#0d98ba]" />
                    <span>Compare Cities</span>
                  </a>
                  <a href="/scholarships" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-[#0d171b] font-medium hover:border-[#0d98ba] hover:bg-[#0d98ba]/5 transition-all">
                    <GraduationCap className="w-5 h-5 text-[#0d98ba]" />
                    <span>Find Scholarships</span>
                  </a>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-[#0d171b] mb-4">Account</h3>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-[#0d171b] font-medium hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}
