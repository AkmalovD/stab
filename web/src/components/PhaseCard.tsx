import { Phase, Task } from '@/types';
import { getPhaseProgress } from '@/utils/journeyData';
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Circle,
    Clock,
    Compass,
    FileText,
    Lock,
    PartyPopper,
    Plane,
    Send,
    Stamp,
    Wallet
} from 'lucide-react';
import React, { useState } from 'react';

interface PhaseCardProps {
  phase: Phase;
  onTaskToggle: (phaseId: string, taskId: string) => void;
}

const getPhaseIcon = (phaseNumber: number) => {
  switch (phaseNumber) {
    case 1: return Compass;
    case 2: return FileText;
    case 3: return Send;
    case 4: return Wallet;
    case 5: return Stamp;
    case 6: return Plane;
    default: return Circle;
  }
};

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onTaskToggle }) => {
  const [isExpanded, setIsExpanded] = useState(phase.status === 'in-progress');
  const progress = getPhaseProgress(phase);
  const completedTasks = phase.tasks.filter((t) => t.completed).length;
  const totalTasks = phase.tasks.length;

  const getStatusConfig = () => {
    switch (phase.status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          label: 'Completed',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          gradient: 'from-green-500 to-emerald-500',
        };
      case 'in-progress':
        return {
          icon: Clock,
          label: 'In Progress',
          color: 'text-[#0d98ba]',
          bgColor: 'bg-[#0d98ba]/10',
          gradient: 'from-[#0d98ba] to-[#0d98ba]',
        };
      case 'locked':
        return {
          icon: Lock,
          label: 'Locked',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          gradient: 'from-gray-400 to-gray-500',
        };
      default:
        return {
          icon: Circle,
          label: 'Not Started',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          gradient: 'from-gray-400 to-gray-500',
        };
    }
  };

  const getPriorityConfig = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
        };
      case 'Medium':
        return {
          color: 'text-orange-700',
          bgColor: 'bg-orange-100',
          borderColor: 'border-orange-200',
        };
      case 'Low':
        return {
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
        };
      default:
        return {
          color: 'text-gray-700',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;
  const PhaseIcon = getPhaseIcon(phase.number);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all ${
        phase.status === 'locked' ? 'opacity-60' : 'hover:shadow-lg'
      }`}
    >
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${statusConfig.gradient} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <PhaseIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Phase {phase.number}: {phase.title}
              </h3>
              <p className="text-white/90 text-sm">{phase.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs text-white/80 font-medium">{phase.timeframe}</span>
              </div>
            </div>
          </div>
          <div className="text-right bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
            <div className="text-3xl font-bold text-white">{progress}%</div>
            <div className="text-xs text-white/90 font-medium">
              {completedTasks}/{totalTasks} Tasks
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
              <span className="text-sm font-semibold text-gray-700">Status: {statusConfig.label}</span>
            </div>
            <span className="text-sm font-semibold text-[#0d98ba]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${statusConfig.gradient} h-2.5 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {totalTasks - completedTasks} of {totalTasks} tasks remaining
          </p>
        </div>

        {/* Expandable Section */}
        {phase.status !== 'locked' && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4"
            >
              <span className="font-semibold text-gray-900">Task Checklist</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Tasks List */}
            {isExpanded && (
              <div className="space-y-2">
                {phase.tasks.map((task) => {
                  const priorityConfig = getPriorityConfig(task.priority);

                  return (
                    <div
                      key={task.id}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        task.completed ? 'bg-green-50/30 border-green-200' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onTaskToggle(phase.id, task.id)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0d98ba] focus:ring-2 focus:ring-[#0d98ba] cursor-pointer transition-all"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p
                                className={`font-medium ${
                                  task.completed
                                    ? 'text-gray-400 line-through'
                                    : 'text-gray-900'
                                }`}
                              >
                                {task.title}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${priorityConfig.bgColor} ${priorityConfig.color}`}
                              >
                                {task.priority === 'High' && <AlertCircle className="w-3 h-3" />}
                                {task.priority}
                              </span>
                            </div>
                            <p className={`text-sm leading-relaxed ${
                              task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Locked Message */}
        {phase.status === 'locked' && (
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Phase Locked</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Complete previous phases to unlock this section and begin working on these tasks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tip Section for Active Phases */}
        {phase.status === 'in-progress' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-[#0d98ba]/5 to-[#0d98ba]/10 rounded-lg border border-[#0d98ba]/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#0d98ba] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#0d98ba] mb-1">Pro Tip</p>
                <p className="text-sm text-[#0d98ba]/80 leading-relaxed">
                  Focus on high-priority tasks first to make the most progress. Break down complex tasks into smaller, manageable steps for better organization.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {phase.status === 'completed' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-green-900">Phase Completed!</p>
                  <PartyPopper className="w-4 h-4 text-green-700" />
                </div>
                <p className="text-sm text-green-800 leading-relaxed">
                  Great job completing all tasks in this phase! You're one step closer to achieving your study abroad goals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseCard;
