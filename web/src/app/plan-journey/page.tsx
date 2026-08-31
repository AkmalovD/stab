'use client'

import DocumentStatus from '@/components/DocumentStatus';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OnboardingModal from '@/components/OnboardingModal';
import PhaseCard from '@/components/PhaseCard';
import ProgressDashboard from '@/components/ProgressDashboard';
import { useAuth } from '@/auth/AuthContext';
import { journeyProfileApi } from '@/services/profileApi';
import { Document, JourneyProfile, Phase } from '@/types';
import { documentsList, journeyPhases } from '@/utils/journeyData';
import { CheckSquare, ClipboardList, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PlanJourney() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState<JourneyProfile | null>(null);
  const [phases, setPhases] = useState<Phase[]>(journeyPhases);
  const [documents, setDocuments] = useState<Document[]>(documentsList);

  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    '';

  // Check if user has profile in localStorage/API
  useEffect(() => {
    const loadData = async () => {
      const profileId = localStorage.getItem('journeyProfileId');
      const savedProfile = localStorage.getItem('journeyProfile');

      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile) as JourneyProfile & {
            startDate: string | Date;
            createdAt: string | Date;
          };
          setProfile({
            ...parsedProfile,
            startDate: new Date(parsedProfile.startDate),
            createdAt: new Date(parsedProfile.createdAt),
          });

          const savedPhases = localStorage.getItem('journeyPhases');
          if (savedPhases) {
            setPhases(JSON.parse(savedPhases));
          }

          const savedDocuments = localStorage.getItem('journeyDocuments');
          if (savedDocuments) {
            setDocuments(JSON.parse(savedDocuments));
          }
          return;
        } catch (error) {
          console.log('Error parsing local profile:', error);
          localStorage.removeItem('journeyProfile');
        }
      }

      if (profileId) {
        try {
          const apiProfile = await journeyProfileApi.getById(parseInt(profileId));

          setProfile({
            name: apiProfile.full_name,
            targetCountry: apiProfile.destination_country,
            studyLevel: 'Masters',
            startDate: new Date(apiProfile.intended_start_date),
            createdAt: new Date(apiProfile.created_at || ''),
            fullName: apiProfile.full_name,
            destinationCountry: apiProfile.destination_country,
            intendedStartDate: apiProfile.intended_start_date
          });

          const savedPhases = localStorage.getItem('journeyPhases');
          let loadedPhases = savedPhases ? JSON.parse(savedPhases) : journeyPhases;
          
          // Unlock phases based on previous phase completion
          loadedPhases = loadedPhases.map((phase: Phase, index: number) => {
            if (phase.status === 'locked' && index > 0) {
              const previousPhase = loadedPhases[index - 1];
              if (previousPhase.status === 'completed') {
                return { ...phase, status: 'not-started' };
              }
            }
            return phase;
          });
          
          setPhases(loadedPhases);
          localStorage.setItem('journeyPhases', JSON.stringify(loadedPhases));
        } catch (error) {
          console.log('Error loading profile:', error);
          localStorage.removeItem('journeyProfileId');
          setShowOnboarding(true);
        }
      } else {
        setShowOnboarding(true);
      }
    };
    
    loadData();
  }, []);

  const handleOnboardingComplete = (newProfile: JourneyProfile) => {
    setProfile(newProfile);
    localStorage.setItem('journeyProfile', JSON.stringify(newProfile));
    setShowOnboarding(false);
  };

  const handleOnboardingCancel = () => {
    setShowOnboarding(false);
  };

  const handleStartPlanning = () => {
    setShowOnboarding(true);
  };

  const handleTaskToggle = (phaseId: string, taskId: string) => {
    const updatedPhases = phases.map((phase, index) => {
      if (phase.id === phaseId) {
        const updatedTasks = phase.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });

        // Update phase status based on task completion
        const allCompleted = updatedTasks.every((task) => task.completed);
        const someCompleted = updatedTasks.some((task) => task.completed);
        
        let newStatus: Phase['status'] = phase.status;
        if (allCompleted) {
          newStatus = 'completed';
        } else if (someCompleted) {
          newStatus = 'in-progress';
        } else if (!someCompleted && phase.status === 'in-progress') {
          newStatus = 'not-started';
        }

        return { ...phase, tasks: updatedTasks, status: newStatus };
      }
      return phase;
    });

    // Unlock next phase if current phase is completed
    const finalPhases = updatedPhases.map((phase, index) => {
      if (phase.status === 'locked' && index > 0) {
        const previousPhase = updatedPhases[index - 1];
        if (previousPhase.status === 'completed') {
          return { ...phase, status: 'not-started' as Phase['status'] };
        }
      }
      return phase;
    });

    setPhases(finalPhases);
    localStorage.setItem('journeyPhases', JSON.stringify(finalPhases));
  };

  const handleDocumentStatusChange = (docId: string, newStatus: Document['status']) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === docId ? { ...doc, status: newStatus } : doc
    );
    setDocuments(updatedDocuments);
    localStorage.setItem('journeyDocuments', JSON.stringify(updatedDocuments));
  };

  const handleResetJourney = () => {
    if (window.confirm('Are you sure you want to reset your journey? This will clear all progress.')) {
      localStorage.removeItem('journeyProfile');
      localStorage.removeItem('journeyPhases');
      localStorage.removeItem('journeyDocuments');
      setProfile(null);
      setPhases(journeyPhases);
      setDocuments(documentsList);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-[85px] min-h-screen bg-[#f8fafc]">
        {!profile ? (
          // Hero Section for new users
          <div className="px-4 md:px-10 lg:px-40 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-[#0d171b] mb-6">
                Plan Your Study Abroad Journey
              </h1>
              <p className="text-xl text-[#4c809a] mb-8 leading-relaxed">
                Get a personalized step-by-step guide with checklists, deadlines, and document tracking. 
                Everything you need to successfully apply and prepare for studying abroad.
              </p>

              <button
                onClick={handleStartPlanning}
                className="px-10 py-5 bg-gradient-to-r from-[#0d98ba] to-[#0d98ba] text-white rounded-xl font-bold text-xl hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
              >
                <span>Start Planning My Journey</span>
              </button>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-14 h-14 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center mb-4 mx-auto">
                    <ClipboardList className="w-7 h-7 text-[#0d98ba]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0d171b] mb-2">
                    Step-by-Step Guide
                  </h3>
                  <p className="text-[#4c809a] text-sm">
                    Follow a clear timeline from research to departure with 6 structured phases
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-14 h-14 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center mb-4 mx-auto">
                    <CheckSquare className="w-7 h-7 text-[#0d98ba]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0d171b] mb-2">
                    Smart Checklists
                  </h3>
                  <p className="text-[#4c809a] text-sm">
                    Never miss a task with pre-filled checklists and progress tracking
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="w-14 h-14 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center mb-4 mx-auto">
                    <FileText className="w-7 h-7 text-[#0d98ba]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0d171b] mb-2">
                    Document Manager
                  </h3>
                  <p className="text-[#4c809a] text-sm">
                    Track all required documents and their status in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Journey Dashboard for existing users
          <div className="px-4 md:px-10 lg:px-40 py-10">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Back */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-[#0d171b] mb-2">
                    Welcome back, {profile.name}! 
                  </h1>
                  <p className="text-lg text-[#4c809a]">
                    Planning to study {profile.studyLevel} in {profile.targetCountry}
                  </p>
                </div>
                <button
                  onClick={handleResetJourney}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Reset Journey
                </button>
              </div>

              {/* Progress Dashboard */}
              <ProgressDashboard phases={phases} startDate={profile.startDate} />

              {/* Phases */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-[#0d171b] mb-6">Your Journey Phases</h2>
                <div className="space-y-4">
                  {phases.map((phase) => (
                    <PhaseCard key={phase.id} phase={phase} onTaskToggle={handleTaskToggle} />
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <DocumentStatus documents={documents} onStatusChange={handleDocumentStatusChange} />
              </div>

              {/* Tips Section */}
              <div className="mt-10 bg-gradient-to-r from-purple-50 to-[#0d98ba]/5 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#0d171b] mb-4">Pro Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-[#0d171b] mb-2">Start Early</h4>
                    <p className="text-sm text-[#4c809a]">
                      Begin your preparation 12-18 months before your intended start date. This gives you enough time for tests, applications, and visa processing.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-[#0d171b] mb-2">Track Deadlines</h4>
                    <p className="text-sm text-[#4c809a]">
                      Set reminders for important deadlines. Applications close months before the start date, so plan accordingly.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-[#0d171b] mb-2">Apply Broadly</h4>
                    <p className="text-sm text-[#4c809a]">
                      Apply to 8-10 universities with a mix of dream schools, target schools, and safety schools to maximize your chances.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-[#0d171b] mb-2">Seek Scholarships</h4>
                    <p className="text-sm text-[#4c809a]">
                      Don't just rely on university scholarships. Use our scholarship database to find external funding opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
        onCancel={handleOnboardingCancel} 
        initialName={profile?.name || userDisplayName}
      />
    </>
  );
}
