'use client'

import { useAuth } from '@/auth/AuthContext';
import DocumentStatus from '@/components/DocumentStatus';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OnboardingModal from '@/components/OnboardingModal';
import PhaseCard from '@/components/PhaseCard';
import ProgressDashboard from '@/components/ProgressDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  journeyApi,
  journeyProfileApi,
  type JourneyProfileData,
} from '@/services/profileApi';
import { Document, JourneyProfile, Phase } from '@/types';
import { CheckSquare, ClipboardList, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function mapProfile(data: JourneyProfileData, studyLevel: JourneyProfile['studyLevel']): JourneyProfile {
  return {
    name: data.full_name,
    targetCountry: data.destination_country,
    studyLevel,
    startDate: new Date(data.intended_start_date),
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    fullName: data.full_name,
    destinationCountry: data.destination_country,
    intendedStartDate: data.intended_start_date,
  };
}

export default function PlanJourney() {
  const { user, loading: authLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [profile, setProfile] = useState<JourneyProfile | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    '';

  const loadJourney = async (data: JourneyProfileData, studyLevel: JourneyProfile['studyLevel']) => {
    if (data.id === undefined) return;

    setProfileId(data.id);
    setProfile(mapProfile(data, studyLevel));

    const [loadedPhases, loadedDocuments] = await Promise.all([
      journeyApi.getPhases(data.id),
      journeyApi.getDocuments(data.id),
    ]);

    setPhases(loadedPhases as Phase[]);
    setDocuments(
      loadedDocuments.map((document) => ({
        ...document,
        expiryDate: document.expiryDate ? new Date(document.expiryDate) : undefined,
      })) as Document[]
    );
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const profiles = await journeyProfileApi.getAll();
        if (profiles.length > 0) {
          await loadJourney(profiles[0], 'Masters');
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Error loading journey:', error);
        setShowOnboarding(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authLoading, user]);

  const handleOnboardingComplete = async (
    created: JourneyProfileData,
    studyLevel: JourneyProfile['studyLevel']
  ) => {
    try {
      await loadJourney(created, studyLevel);
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error loading new journey:', error);
      toast.error('Failed to load your journey');
    }
  };

  const handleOnboardingCancel = () => {
    setShowOnboarding(false);
  };

  const handleStartPlanning = () => {
    setShowOnboarding(true);
  };

  const handleTaskToggle = async (phaseId: string, taskId: string) => {
    if (profileId === null) return;

    const phase = phases.find((item) => item.id === phaseId);
    const task = phase?.tasks.find((item) => item.id === taskId);
    if (!task) return;

    try {
      const updated = await journeyApi.toggleTask(profileId, taskId, !task.completed);
      setPhases(updated as Phase[]);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDocumentStatusChange = async (docId: string, newStatus: Document['status']) => {
    if (profileId === null) return;

    try {
      const updated = await journeyApi.updateDocument(profileId, docId, newStatus);
      setDocuments((prev) =>
        prev.map((document) =>
          document.id === docId
            ? {
                ...document,
                status: updated.status as Document['status'],
              }
            : document
        )
      );
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    }
  };

  const handleResetJourney = async () => {
    if (profileId === null) return;
    if (!window.confirm('Are you sure you want to reset your journey? This will clear all progress.')) {
      return;
    }

    try {
      await journeyProfileApi.delete(profileId);
      setProfileId(null);
      setProfile(null);
      setPhases([]);
      setDocuments([]);
      setShowOnboarding(true);
    } catch (error) {
      console.error('Error resetting journey:', error);
      toast.error('Failed to reset journey');
    }
  };

  return (
    <ProtectedRoute>
      <Header />
      <main className="pt-[85px] min-h-screen bg-[#f8fafc]">
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0d98ba]" />
          </div>
        ) : !profile ? (
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
    </ProtectedRoute>
  );
}
