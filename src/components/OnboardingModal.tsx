import { useAuth } from '@/auth/AuthContext';
import { journeyProfileApi } from '@/services/profileApi';
import { JourneyProfile } from '@/types';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: JourneyProfile) => void;
  onCancel: () => void;
  initialName?: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete, onCancel, initialName  }) => {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<JourneyProfile>>({
    name: initialName || '',
    targetCountry: '',
    studyLevel: 'Masters',
    startDate: new Date(),
    createdAt: new Date(),
  });

  if (!isOpen) return null;

  const handleComplete = async () => {
    if (!profile.name || !profile.targetCountry || !profile.startDate) {
      toast('Please fill in all fields');
      return;
    }

    try {
      await journeyProfileApi.create({
        full_name: profile.name || '',
        destination_country: profile.targetCountry || '',
        intended_start_date: profile.startDate?.toISOString().split('T')[0] || '',
      });
      onComplete(profile as JourneyProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast('Failed to save profile');
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCancel = () => {
    onCancel()
  }

  const isStepValid = () => {
    if (step === 1) return profile.name && profile.name.length > 0;
    if (step === 2) return profile.targetCountry && profile.studyLevel;
    if (step === 3) return profile.startDate;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#0d171b] mb-2">
            Plan Your Study Abroad Journey
          </h2>
          <p className="text-[#4c809a]">
            Let's get started with some basic information (Step {step} of 3)
          </p>
          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#0d98ba] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-transparent text-lg"
                  autoFocus
                />
              </div>
              <div className="bg-[#0d98ba]/5 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  We'll use this to personalize your journey plan
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Study Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which country do you want to study in?
                </label>
                <select
                  value={profile.targetCountry}
                  onChange={(e) => setProfile({ ...profile, targetCountry: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-transparent text-lg"
                >
                  <option value="">Select a country</option>
                  <option value="United Kingdom">🇬🇧 United Kingdom</option>
                  <option value="United States">🇺🇸 United States</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Netherlands">🇳🇱 Netherlands</option>
                  <option value="France">🇫🇷 France</option>
                  <option value="Spain">🇪🇸 Spain</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What level of study?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Undergraduate', 'Masters', 'PhD', 'Language Course'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setProfile({ ...profile, studyLevel: level })}
                      className={`p-4 rounded-lg border-2 transition-all ${profile.studyLevel === level
                          ? 'border-[#0d98ba] bg-[#0d98ba]/10 text-[#0d98ba]'
                          : 'border-gray-300 hover:border-[#0d98ba]/50'
                        }`}
                    >
                      <div className="font-semibold">{level}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When do you plan to start your studies?
                </label>
                <input
                  type="month"
                  value={profile.startDate instanceof Date ? profile.startDate.toISOString().slice(0, 7) : ''}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setProfile({ ...profile, startDate: new Date(parseInt(year), parseInt(month) - 1, 1) });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-transparent text-lg"
                  min={new Date().toISOString().slice(0, 7)}
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-green-800">Almost there!</p>
                <p className="text-sm text-green-700">
                  Based on your start date, we'll create a personalized timeline with all the tasks and deadlines you need to complete.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div>
            {step === 1 && (
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-gray-600 hover:text-[#0d98ba] transition-colors font-semibold"
              >
                ← Cancel
              </button>
            )}
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-[#0d98ba] transition-colors font-semibold"
              >
                ← Back
              </button>
            )}
          </div>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-8 py-3 bg-[#0d98ba] text-white rounded-lg font-semibold hover:bg-[#0d171b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Start My Journey' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
