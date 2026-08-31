import { Document } from '@/types';
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Circle,
    Clock,
    DollarSign,
    FileCheck,
    FileText,
    Folder,
    GraduationCap,
    User,
    XCircle,
} from 'lucide-react';
import React from 'react';

interface DocumentStatusProps {
  documents: Document[];
  onStatusChange?: (docId: string, newStatus: Document['status']) => void;
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({ documents, onStatusChange }) => {
  const getStatusConfig = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Ready',
        };
      case 'in-progress':
        return {
          icon: Clock,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          label: 'In Progress',
        };
      case 'missing':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Missing',
        };
      default:
        return {
          icon: Circle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Not Started',
        };
    }
  };

  const categoryGroups = documents.reduce((groups, doc) => {
    if (!groups[doc.category]) {
      groups[doc.category] = [];
    }
    groups[doc.category].push(doc);
    return groups;
  }, {} as Record<string, Document[]>);

  const getCategoryIcon = (category: string) => {
    const iconClass = 'w-5 h-5 text-[#0d98ba]';
    switch (category) {
      case 'Personal':
        return <User className={iconClass} />;
      case 'Academic':
        return <GraduationCap className={iconClass} />;
      case 'Tests':
        return <FileText className={iconClass} />;
      case 'Application':
        return <FileCheck className={iconClass} />;
      case 'Financial':
        return <DollarSign className={iconClass} />;
      default:
        return <Folder className={iconClass} />;
    }
  };

  const readyCount = documents.filter((d) => d.status === 'ready').length;
  const totalRequired = documents.filter((d) => d.required).length;
  const progressPercentage = totalRequired > 0 ? (readyCount / totalRequired) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0d98ba] to-[#0d98ba] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Document Checklist</h2>
            <p className="text-white/80 text-sm">Track all required documents for your application</p>
          </div>
          <div className="text-right bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
            <div className="text-3xl font-bold text-white">
              {readyCount}/{totalRequired}
            </div>
            <div className="text-xs text-white/80 font-medium">Documents Ready</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-[#0d98ba]">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0d98ba] to-[#0d98ba] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {totalRequired - readyCount} of {totalRequired} required documents remaining
          </p>
        </div>

        {/* Documents by Category */}
        <div className="space-y-6">
          {Object.entries(categoryGroups).map(([category, docs]) => {
            const categoryReady = docs.filter((d) => d.status === 'ready').length;
            const categoryTotal = docs.length;
            const categoryProgress = categoryTotal > 0 ? (categoryReady / categoryTotal) * 100 : 0;

            return (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white rounded-md border border-gray-200">
                        {getCategoryIcon(category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category}</h3>
                        <p className="text-xs text-gray-500">
                          {categoryReady} of {categoryTotal} completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#0d98ba]">{Math.round(categoryProgress)}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-[#0d98ba] h-1.5 rounded-full transition-all"
                          style={{ width: `${categoryProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="divide-y divide-gray-100">
                  {docs.map((doc) => {
                    const statusConfig = getStatusConfig(doc.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={doc.id}
                        className={`px-4 py-4 hover:bg-gray-50 transition-colors ${
                          doc.status === 'ready' ? 'bg-green-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div
                              className={`p-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border flex-shrink-0`}
                            >
                              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                {doc.required && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                                    <AlertCircle className="w-3 h-3" />
                                    Required
                                  </span>
                                )}
                                <span
                                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
                                >
                                  {statusConfig.label}
                                </span>
                              </div>
                              {doc.expiryDate && (
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>Expires: {doc.expiryDate.toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {onStatusChange && (
                            <div className="flex-shrink-0">
                              <select
                                value={doc.status}
                                onChange={(e) => onStatusChange(doc.id, e.target.value as Document['status'])}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] transition-all cursor-pointer hover:border-gray-400"
                              >
                                <option value="missing">Missing</option>
                                <option value="in-progress">In Progress</option>
                                <option value="ready">Ready</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip Section */}
        <div className="mt-8 p-4 bg-gradient-to-r from-[#0d98ba]/5 to-[#0d98ba]/10 rounded-lg border border-[#0d98ba]/20">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#0d98ba] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#0d98ba] mb-1">Pro Tip</p>
              <p className="text-sm text-[#0d98ba]/80 leading-relaxed">
                Start gathering documents early! Some documents like transcripts and recommendation letters can take several weeks to obtain. Plan ahead to avoid last-minute delays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStatus;
