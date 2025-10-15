import React from 'react';
import { X, Building, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';
import ApplicationStatusTimeline from './ApplicationStatusTimeline';

const ApplicationDetailsModal = ({
  application,
  onClose,
}) => {
  // Generate timeline steps based on application status
  const getTimelineSteps = () => {
    const baseSteps = [
      {
        status: 'completed',
        label: 'Application Submitted',
        date: new Date(application.applied_at).toLocaleDateString(),
        description: 'Your application has been successfully submitted',
      },
    ];

    const statusSteps = {
      applied: [],
      under_review: [
        {
          status: 'current',
          label: 'Under Review',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'Application is being reviewed by the employer',
        },
      ],
      shortlisted: [
        {
          status: 'completed',
          label: 'Under Review',
          date: new Date(application.updated_at).toLocaleDateString(),
        },
        {
          status: 'current',
          label: 'Shortlisted',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'Congratulations! You have been shortlisted',
        },
      ],
      interview_scheduled: [
        {
          status: 'completed',
          label: 'Under Review',
        },
        {
          status: 'completed',
          label: 'Shortlisted',
        },
        {
          status: 'current',
          label: 'Interview Scheduled',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'Your interview has been scheduled',
        },
      ],
      interviewed: [
        {
          status: 'completed',
          label: 'Under Review',
        },
        {
          status: 'completed',
          label: 'Shortlisted',
        },
        {
          status: 'completed',
          label: 'Interview Completed',
          date: new Date(application.updated_at).toLocaleDateString(),
        },
        {
          status: 'current',
          label: 'Awaiting Decision',
          description: 'Interview completed, waiting for final decision',
        },
      ],
      offer_extended: [
        {
          status: 'completed',
          label: 'Interview Process',
        },
        {
          status: 'completed',
          label: 'Selected',
        },
        {
          status: 'current',
          label: 'Offer Extended',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'Congratulations! An offer has been extended to you',
        },
      ],
      offer_accepted: [
        {
          status: 'completed',
          label: 'Offer Extended',
        },
        {
          status: 'completed',
          label: 'Offer Accepted',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'You have accepted the offer',
        },
      ],
      rejected: [
        {
          status: 'completed',
          label: 'Under Review',
        },
        {
          status: 'rejected',
          label: 'Application Rejected',
          date: new Date(application.updated_at).toLocaleDateString(),
          description: 'Unfortunately, your application was not successful this time',
        },
      ],
    };

    return [...baseSteps, ...(statusSteps[application.status] || [])];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Job Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {application.job?.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-700">
                <Building className="w-5 h-5 mr-2 text-gray-400" />
                <span>{application.employer?.company_name}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                <span>{application.job?.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                <span className="capitalize">{application.job?.job_type.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                <span>{application.job?.salary_range}</span>
              </div>
            </div>

            {application.job?.description && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                <p className="text-gray-700">{application.job.description}</p>
              </div>
            )}

            {application.job?.requirements && application.job.requirements.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {application.job.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Application Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Progress
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <ApplicationStatusTimeline steps={getTimelineSteps()} />
            </div>
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Your Cover Letter
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">
                  {application.cover_letter}
                </p>
              </div>
            </div>
          )}

          {/* Application Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Applied: {new Date(application.applied_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last Updated: {new Date(application.updated_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
