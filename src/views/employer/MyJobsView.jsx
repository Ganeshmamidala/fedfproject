import React, { useState } from 'react';
import { Search, Plus, CreditCard, Eye, Trash2, Users } from 'lucide-react';

const MyJobsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - in real app, this would come from API
  const mockJobs = [
    {
      id: '1',
      employer_id: '1',
      title: 'Senior Software Engineer',
      description: 'We are looking for an experienced software engineer to join our team and work on cutting-edge projects.',
      requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB', '5+ years experience'],
      location: 'San Francisco, CA',
      job_type: 'full_time',
      salary_range: '$120,000 - $160,000',
      application_deadline: '2024-03-15',
      is_active: true,
      created_at: '2024-01-15',
      applications_count: 45
    },
    {
      id: '2',
      employer_id: '1',
      title: 'Frontend Developer Intern',
      description: 'Great opportunity for students to gain hands-on experience in frontend development.',
      requirements: ['HTML', 'CSS', 'JavaScript', 'React basics'],
      location: 'Remote',
      job_type: 'internship',
      salary_range: '$20 - $25/hour',
      application_deadline: '2024-02-28',
      is_active: true,
      created_at: '2024-01-10',
      applications_count: 23
    },
    {
      id: '3',
      employer_id: '1',
      title: 'Product Manager',
      description: 'Lead product development and strategy for our flagship products.',
      requirements: ['Product Management', 'Agile', 'Analytics', '3+ years experience'],
      location: 'New York, NY',
      job_type: 'full_time',
      salary_range: '$100,000 - $140,000',
      application_deadline: '2024-01-20',
      is_active: false,
      created_at: '2024-01-05',
      applications_count: 67
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && job.is_active) ||
                         (selectedStatus === 'inactive' && !job.is_active);

    return matchesSearch && matchesStatus;
  });

  const getJobStats = () => {
    return {
      total: mockJobs.length,
      active: mockJobs.filter(job => job.is_active).length,
      inactive: mockJobs.filter(job => !job.is_active).length,
      totalApplications: mockJobs.reduce((sum, job) => sum + (job.applications_count || 0), 0)
    };
  };

  const stats = getJobStats();

  const handleEdit = (jobId) => {
    alert(`Edit job ${jobId} functionality would be implemented here`);
  };

  const handleView = (jobId) => {
    alert(`View job ${jobId} details functionality would be implemented here`);
  };

  const handleDelete = (jobId) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      alert(`Delete job ${jobId} functionality would be implemented here`);
    }
  };

  const handleToggleStatus = (jobId) => {
    alert(`Toggle status for job ${jobId} functionality would be implemented here`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Job Listings</h1>
          <p className="mt-2 text-gray-600">
            Manage your job postings and track applications.
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactive Jobs</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-purple-600">{stats.totalApplications}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search job titles or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value | 'active' | 'inactive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
            >
              <option value="all">All Jobs</option>
              <option value="active">Active Jobs</option>
              <option value="inactive">Inactive Jobs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or post your first job.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span className="capitalize">{job.job_type.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{job.applications_count} applications</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-700"
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

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleView(job.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(job.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit Job"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(job.id)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      job.is_active
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {job.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsView;