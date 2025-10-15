import React from 'react';
import { CheckCircle, Circle, Clock, XCircle, AlertCircle } from 'lucide-react';





const ApplicationStatusTimeline = ({ steps }) => {
  const getIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'pending':
        return <Circle className="w-6 h-6 text-gray-300" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Vertical line */}
          {index !== steps.length - 1 && (
            <div className={`absolute left-3 top-8 w-0.5 h-full ${getStatusColor(step.status)}`} />
          )}

          {/* Icon */}
          <div className="relative z-10 flex-shrink-0">
            {getIcon(step.status)}
          </div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-semibold ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'current' ? 'text-blue-700' :
                  step.status === 'rejected' ? 'text-red-700' :
                  'text-gray-500'
                }`}>
                  {step.label}
                </h3>
                {step.description && (
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                )}
              </div>
              {step.date && (
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {step.date}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatusTimeline;
