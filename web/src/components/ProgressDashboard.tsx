import { Phase } from '@/types';
import { calculateOverallProgress, getDaysUntilDate } from '@/utils/journeyData';
import {
    Calendar,
    CheckCircle2,
    ChevronRight,
    DollarSign,
    FileCheck,
    FileText,
    Plane,
    Search,
    Shield,
    Target,
    TrendingUp,
} from 'lucide-react';
import React from 'react';

interface ProgressDashboardProps {
  phases: Phase[];
  startDate: Date;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ phases, startDate }) => {
  const overallProgress = calculateOverallProgress(phases);
  const daysUntil = getDaysUntilDate(startDate);
  
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.filter((task) => task.completed).length,
    0
  );

  const currentPhase = phases.find((phase) => phase.status === 'in-progress') || phases[0];

  // Map phase emoji icons to lucide-react icons
  const getPhaseIcon = (iconEmoji: string) => {
    const iconClass = 'w-6 h-6';
    switch (iconEmoji) {
      case '🔍':
        return <Search className={iconClass} />;
      case '📝':
        return <FileText className={iconClass} />;
      case '📄':
        return <FileCheck className={iconClass} />;
      case '💰':
        return <DollarSign className={iconClass} />;
      case '🛂':
        return <Shield className={iconClass} />;
      case '✈️':
        return <Plane className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  const highPriorityTasks = phases
    .flatMap((phase) => phase.tasks)
    .filter((task) => !task.completed && task.priority === 'High')
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-[#0d98ba] to-[#0d98ba] rounded-xl shadow-lg border border-white/10 overflow-hidden mb-8">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Journey Progress</h2>
            <p className="text-white/90 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Keep going! You're doing great</span>
            </p>
          </div>
          <div className="text-right bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <div className="text-5xl font-bold text-white">{overallProgress}%</div>
            <div className="text-white/90 text-sm font-medium mt-1">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white/90">Overall Progress</span>
            <span className="text-sm font-semibold text-white">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${overallProgress}%` }}
            >
              {overallProgress > 10 && (
                <span className="text-xs font-bold text-[#0d98ba]">{overallProgress}%</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Days Until Start */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg border border-white/20">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-white/90">Days Until Start</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {daysUntil > 0 ? daysUntil : 'Started!'}
            </div>
            <div className="text-sm text-white/70">
              {daysUntil > 0 
                ? `${Math.floor(daysUntil / 30)} months away` 
                : 'Your journey has begun'}
            </div>
          </div>

          {/* Tasks Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg border border-white/20">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-white/90">Tasks Progress</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {completedTasks}/{totalTasks}
            </div>
            <div className="text-sm text-white/70">
              {totalTasks - completedTasks} tasks remaining
            </div>
          </div>

          {/* Current Phase */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg border border-white/20">
                <div className="text-white">
                  {getPhaseIcon(currentPhase.icon)}
                </div>
              </div>
              <div className="text-sm font-semibold text-white/90">Current Phase</div>
            </div>
            <div className="text-xl font-bold text-white mb-1">
              Phase {currentPhase.number}
            </div>
            <div className="text-sm text-white/70 line-clamp-1">
              {currentPhase.title}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {highPriorityTasks.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
              <div className="p-1.5 bg-white/20 rounded-lg border border-white/20">
                <Target className="w-4 h-4" />
              </div>
              <span>What to do next?</span>
            </h3>
            <div className="space-y-3">
              {highPriorityTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="text-sm text-white/90 flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="flex-1">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
