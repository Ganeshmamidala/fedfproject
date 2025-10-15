import React from 'react';
import { MapPin, Clock, DollarSign, Building, Calendar } from 'lucide-react';

const JobCard = ({ job, onApply, onView, showActions = true }) => {
  const getJobTypeColor = (type) => {
    const colors = {
      full_time: 'bg-green-100 text-green-800',
      part_time: 'bg-blue-100 text-blue-800',
      internship: 'bg-purple-100 text-purple-800',
      contract: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getJobTypeLabel = (type) => {
    const labels = {
      full_time: 'Full Time',
      part_time: 'Part Time',
      internship: 'Internship',
      contract: 'Contract'
    };
    return labels[type];
  };

  const isDeadlineNear = () => {
    const deadline = new Date(job.application_deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isExpired = () => {
    const deadline = new Date(job.application_deadline);
    const now = new Date();
    return deadline < now;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-1" />
            <span>{job.employer?.company_name || 'Company Name'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJobTypeColor(job.job_type)}`}>
            {getJobTypeLabel(job.job_type)}
          </span>
          {job.applications_count && (
            <span className="text-xs text-gray-500">
              {job.applications_count} applicants
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
        {job.salary_range && (
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{job.salary_range}</span>
          </div>
        )}
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
        </div>
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="text-xs text-gray-500">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => onView?.(job.id)}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            View Details
          </button>
          {!isExpired() ? (
            <button
              onClick={() => onApply?.(job.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isDeadlineNear()
                  ? 'text-white bg-amber-600 hover:bg-amber-700'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isDeadlineNear() ? 'Apply Soon!' : 'Apply Now'}
            </button>
          ) : (
            <button
              disabled
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-md cursor-not-allowed"
            >
              Expired
            </button>
          )}
        </div>
      )}

      {isDeadlineNear() && !isExpired() && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-xs text-amber-800 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Application deadline is approaching!
          </p>
        </div>
      )}
    </div>
  );
};

export default JobCard;