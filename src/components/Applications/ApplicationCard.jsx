import React from 'react';
import { Calendar, Building, MapPin, Clock } from 'lucide-react';

const ApplicationCard = ({ 
  application, 
  showJobDetails = true, 
  showStudentDetails = false,
  onStatusUpdate 
}) => {
  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-purple-100 text-purple-800',
      interview_scheduled: 'bg-indigo-100 text-indigo-800',
      interviewed: 'bg-cyan-100 text-cyan-800',
      selected: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      offer_extended: 'bg-emerald-100 text-emerald-800',
      offer_accepted: 'bg-green-100 text-green-800',
      offer_declined: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      applied: 'Applied',
      under_review: 'Under Review',
      shortlisted: 'Shortlisted',
      interview_scheduled: 'Interview Scheduled',
      interviewed: 'Interviewed',
      selected: 'Selected',
      rejected: 'Rejected',
      offer_extended: 'Offer Extended',
      offer_accepted: 'Offer Accepted',
      offer_declined: 'Offer Declined'
    };
    return labels[status] || status;
  };

  const statusOptions = [
    'applied', 'under_review', 'shortlisted', 'interview_scheduled', 
    'interviewed', 'selected', 'rejected', 'offer_extended', 
    'offer_accepted', 'offer_declined'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {showJobDetails && application.job && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {application.job.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Building className="h-4 w-4 mr-1" />
                <span>{application.employer?.company_name || 'Company Name'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{application.job.location}</span>
              </div>
            </>
          )}
          
          {showStudentDetails && application.student && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {application.student.user_id} {/* This would be the student's name */}
              </h3>
              <div className="text-sm text-gray-600 mb-2">
                Student ID: {application.student.student_id}
              </div>
              <div className="text-sm text-gray-600">
                Department: {application.student.department}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
            {getStatusLabel(application.status)}
          </span>
          <div className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Applied {new Date(application.applied_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {application.cover_letter && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Cover Letter:</h4>
          <p className="text-sm text-gray-600 line-clamp-3">
            {application.cover_letter}
          </p>
        </div>
      )}

      {onStatusUpdate && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700">Update Status:</span>
          <select
            value={application.status}
            onChange={(e) => onStatusUpdate(application.id, e.target.value)}
            className="ml-2 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
        <span>Last updated: {new Date(application.updated_at).toLocaleDateString()}</span>
        {application.job && (
          <span>Deadline: {new Date(application.job.application_deadline).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;