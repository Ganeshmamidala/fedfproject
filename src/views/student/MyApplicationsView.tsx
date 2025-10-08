import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare } from 'lucide-react';
import ApplicationCard from '../../components/Applications/ApplicationCard';
import { Application, ApplicationStatus } from '../../types';

const MyApplicationsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | ''>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'week' | 'month' | 'quarter'>('all');

  // Mock data - in real app, this would come from API
  const mockApplications: Application[] = [
    {
      id: '1',
      job_id: '1',
      student_id: '1',
      status: 'interview_scheduled',
      cover_letter: 'I am excited to apply for this position as it aligns perfectly with my skills in JavaScript and React. I have been working on several projects that demonstrate my ability to build scalable web applications.',
      applied_at: '2024-01-16T10:00:00Z',
      updated_at: '2024-01-18T14:30:00Z',
      job: {
        id: '1',
        employer_id: '1',
        title: 'Senior Software Engineer',
        description: 'Join our dynamic team as a Software Engineer and work on cutting-edge technologies.',
        requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        location: 'San Francisco, CA',
        job_type: 'full_time',
        salary_range: '$120,000 - $160,000',
        application_deadline: '2024-02-15',
        is_active: true,
        created_at: '2024-01-15',
      },
      employer: {
        id: '1',
        user_id: '1',
        company_name: 'TechCorp Solutions',
        company_description: 'Leading technology company',
        industry: 'Technology',
        phone: '+1-555-0123',
        address: 'San Francisco, CA',
        created_at: '2024-01-01'
      }
    },
    {
      id: '2',
      job_id: '2',
      student_id: '1',
      status: 'offer_extended',
      cover_letter: 'As a data science student with strong analytical skills, I am eager to contribute to your data analysis team. My experience with Python and SQL makes me a perfect fit for this internship.',
      applied_at: '2024-01-12T09:15:00Z',
      updated_at: '2024-01-20T11:45:00Z',
      job: {
        id: '2',
        employer_id: '2',
        title: 'Data Analyst Intern',
        description: 'Great opportunity for students to gain hands-on experience in data analysis.',
        requirements: ['Python', 'SQL', 'Excel', 'Tableau'],
        location: 'New York, NY',
        job_type: 'internship',
        salary_range: '$20 - $25/hour',
        application_deadline: '2024-01-30',
        is_active: true,
        created_at: '2024-01-10',
      },
      employer: {
        id: '2',
        user_id: '2',
        company_name: 'DataTech Analytics',
        company_description: 'Data analytics consulting',
        industry: 'Analytics',
        phone: '+1-555-0124',
        address: 'New York, NY',
        created_at: '2024-01-01'
      }
    },
    {
      id: '3',
      job_id: '3',
      student_id: '1',
      status: 'under_review',
      cover_letter: 'I am passionate about user experience design and would love to bring my creative skills to your design team. My portfolio showcases various projects in UI/UX design.',
      applied_at: '2024-01-18T16:20:00Z',
      updated_at: '2024-01-19T09:00:00Z',
      job: {
        id: '3',
        employer_id: '3',
        title: 'UI/UX Designer',
        description: 'We are seeking a creative UI/UX Designer to join our product team.',
        requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
        location: 'Austin, TX',
        job_type: 'full_time',
        salary_range: '$70,000 - $95,000',
        application_deadline: '2024-02-20',
        is_active: true,
        created_at: '2024-01-12',
      },
      employer: {
        id: '3',
        user_id: '3',
        company_name: 'DesignCo',
        company_description: 'Creative design agency',
        industry: 'Design',
        phone: '+1-555-0125',
        address: 'Austin, TX',
        created_at: '2024-01-01'
      }
    },
    {
      id: '4',
      job_id: '4',
      student_id: '1',
      status: 'rejected',
      cover_letter: 'I am interested in joining your marketing team to help drive growth and brand awareness.',
      applied_at: '2024-01-08T14:00:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      job: {
        id: '4',
        employer_id: '4',
        title: 'Marketing Coordinator',
        description: 'Join our marketing team to help execute campaigns and drive growth.',
        requirements: ['Marketing', 'Social Media', 'Analytics', 'Content Creation'],
        location: 'Remote',
        job_type: 'full_time',
        salary_range: '$50,000 - $65,000',
        application_deadline: '2024-01-25',
        is_active: true,
        created_at: '2024-01-05',
      },
      employer: {
        id: '4',
        user_id: '4',
        company_name: 'GrowthCo',
        company_description: 'Digital marketing agency',
        industry: 'Marketing',
        phone: '+1-555-0126',
        address: 'Remote',
        created_at: '2024-01-01'
      }
    },
    {
      id: '5',
      job_id: '5',
      student_id: '1',
      status: 'selected',
      cover_letter: 'I am excited about the opportunity to work as a product manager and contribute to your product strategy.',
      applied_at: '2024-01-05T11:30:00Z',
      updated_at: '2024-01-22T15:00:00Z',
      job: {
        id: '5',
        employer_id: '5',
        title: 'Product Manager',
        description: 'Lead product development and strategy for our flagship products.',
        requirements: ['Product Management', 'Agile', 'Analytics', 'Leadership'],
        location: 'Seattle, WA',
        job_type: 'full_time',
        salary_range: '$90,000 - $120,000',
        application_deadline: '2024-01-20',
        is_active: true,
        created_at: '2024-01-02',
      },
      employer: {
        id: '5',
        user_id: '5',
        company_name: 'InnovateTech',
        company_description: 'Product innovation company',
        industry: 'Technology',
        phone: '+1-555-0127',
        address: 'Seattle, WA',
        created_at: '2024-01-01'
      }
    }
  ];

  const statusOptions: { value: ApplicationStatus | '', label: string }[] = [
    { value: '', label: 'All Status' },
    { value: 'applied', label: 'Applied' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview_scheduled', label: 'Interview Scheduled' },
    { value: 'interviewed', label: 'Interviewed' },
    { value: 'selected', label: 'Selected' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'offer_extended', label: 'Offer Extended' },
    { value: 'offer_accepted', label: 'Offer Accepted' },
    { value: 'offer_declined', label: 'Offer Declined' }
  ];

  const filteredApplications = mockApplications.filter(application => {
    const matchesSearch = application.job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.employer?.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || application.status === selectedStatus;

    // Timeframe filtering
    let matchesTimeframe = true;
    if (selectedTimeframe !== 'all') {
      const applicationDate = new Date(application.applied_at);
      const now = new Date();
      const diffTime = now.getTime() - applicationDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (selectedTimeframe) {
        case 'week':
          matchesTimeframe = diffDays <= 7;
          break;
        case 'month':
          matchesTimeframe = diffDays <= 30;
          break;
        case 'quarter':
          matchesTimeframe = diffDays <= 90;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesTimeframe;
  });

  const getStatusStats = () => {
    const stats = mockApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<ApplicationStatus, number>);

    return {
      total: mockApplications.length,
      pending: (stats.applied || 0) + (stats.under_review || 0),
      interviews: (stats.interview_scheduled || 0) + (stats.interviewed || 0),
      offers: (stats.offer_extended || 0) + (stats.offer_accepted || 0),
      selected: (stats.selected || 0),
      rejected: (stats.rejected || 0)
    };
  };

  const stats = getStatusStats();

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'selected':
      case 'offer_accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
      case 'offer_declined':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'interview_scheduled':
      case 'interviewed':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'offer_extended':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleViewApplication = (applicationId: string) => {
    console.log(`View application ${applicationId}`);
  };

  const handleWithdrawApplication = (applicationId: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      console.log(`Withdraw application ${applicationId}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-2 text-gray-600">
          Track the status of all your job applications and manage your career journey.
        </p>
      </div>

      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-purple-600">{stats.interviews}</div>
          <div className="text-sm text-gray-600">Interviews</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-orange-600">{stats.offers}</div>
          <div className="text-sm text-gray-600">Offers</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-green-600">{stats.selected}</div>
          <div className="text-sm text-gray-600">Selected</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'all' | 'week' | 'month' | 'quarter')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredApplications.length} of {mockApplications.length} applications
        </p>
      </div>

      {/* Application List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or start applying for jobs.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div key={application.id} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(application.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{application.job?.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{application.employer?.company_name}</span> • {application.job?.location}
                  </div>
                  <div className="text-sm text-gray-500">
                    Applied on {new Date(application.applied_at).toLocaleDateString()} • 
                    Last updated {new Date(application.updated_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <ApplicationCard application={application} showJobDetails={false} />
                </div>
              </div>

              {application.cover_letter && (
                <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Cover Letter:</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {application.cover_letter}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Salary: {application.job?.salary_range}
                  </span>
                  <span className="text-sm text-gray-500">
                    Type: {application.job?.job_type.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Message Employer"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  {(application.status === 'applied' || application.status === 'under_review') && (
                    <button
                      onClick={() => handleWithdrawApplication(application.id)}
                      className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsView;