import React, { useState } from 'react';
import { Search, Plus, Eye, Trash2, Users, Edit, X, Save, AlertCircle } from 'lucide-react';

const MyJobsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize jobs with mock data - simulating API data
  React.useEffect(() => {
    const initialJobs = [
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
    setJobs(initialJobs);
  }, []);

  // Validation function
  const validateJob = (job) => {
    if (!job.title || job.title.trim().length < 3) {
      return 'Job title must be at least 3 characters';
    }
    if (!job.description || job.description.trim().length < 20) {
      return 'Job description must be at least 20 characters';
    }
    if (!job.location || job.location.trim().length < 2) {
      return 'Location is required';
    }
    if (!job.salary_range) {
      return 'Salary range is required';
    }
    if (!job.application_deadline) {
      return 'Application deadline is required';
    }
    const deadline = new Date(job.application_deadline);
    if (deadline <= new Date()) {
      return 'Application deadline must be in the future';
    }
    if (!job.requirements || job.requirements.length === 0) {
      return 'At least one requirement is needed';
    }
    return null;
  };

  // Create new job
  const handleCreateJob = async (jobData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const validationError = validateJob(jobData);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newJob = {
        ...jobData,
        id: String(Date.now()),
        employer_id: '1',
        created_at: new Date().toISOString(),
        applications_count: 0,
        is_active: true
      };

      setJobs(prev => [newJob, ...prev]);
      setSuccess('Job posted successfully!');
      setIsCreating(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update existing job
  const handleUpdateJob = async (jobId, jobData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const validationError = validateJob(jobData);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, ...jobData } : job
      ));
      
      setSuccess('Job updated successfully!');
      setEditingJob(null);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setJobs(prev => prev.filter(job => job.id !== jobId));
      setSuccess('Job deleted successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle job status
  const handleToggleStatus = async (jobId) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, is_active: !job.is_active } : job
      ));
      
      setSuccess('Job status updated!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && job.is_active) ||
                         (selectedStatus === 'inactive' && !job.is_active);

    return matchesSearch && matchesStatus;
  });

  const getJobStats = () => {
    return {
      total: jobs.length,
      active: jobs.filter(job => job.is_active).length,
      inactive: jobs.filter(job => !job.is_active).length,
      totalApplications: jobs.reduce((sum, job) => sum + (job.applications_count || 0), 0)
    };
  };

  const stats = getJobStats();

  const handleStartEdit = (job) => {
    setEditingJob({ ...job });
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setIsCreating(false);
    setError('');
  };

  const handleStartCreate = () => {
    setEditingJob({
      title: '',
      description: '',
      location: '',
      job_type: 'full_time',
      salary_range: '',
      application_deadline: '',
      requirements: []
    });
    setIsCreating(true);
  };

  const handleSaveJob = () => {
    if (isCreating) {
      handleCreateJob(editingJob);
    } else {
      handleUpdateJob(editingJob.id, editingJob);
    }
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
        <button 
          onClick={handleStartCreate}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-fadeIn">
          <AlertCircle className="h-5 w-5 mr-2" />
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-shake">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Job Edit/Create Modal */}
      {(editingJob || isCreating) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {isCreating ? 'Post New Job' : 'Edit Job'}
              </h2>
              <button onClick={handleCancelEdit} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={editingJob?.title || ''}
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={editingJob?.description || ''}
                  onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role and responsibilities..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={editingJob?.location || ''}
                    onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    value={editingJob?.job_type || 'full_time'}
                    onChange={(e) => setEditingJob({...editingJob, job_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range *</label>
                  <input
                    type="text"
                    value={editingJob?.salary_range || ''}
                    onChange={(e) => setEditingJob({...editingJob, salary_range: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline *</label>
                  <input
                    type="date"
                    value={editingJob?.application_deadline || ''}
                    onChange={(e) => setEditingJob({...editingJob, application_deadline: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma-separated) *</label>
                <input
                  type="text"
                  value={editingJob?.requirements?.join(', ') || ''}
                  onChange={(e) => setEditingJob({...editingJob, requirements: e.target.value.split(',').map(r => r.trim()).filter(r => r)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., JavaScript, React, 5+ years experience"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t">
              <button
                onClick={handleCancelEdit}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJob}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Saving...</>
                ) : (
                  <><Save className="h-4 w-4 mr-2" />{isCreating ? 'Post Job' : 'Save Changes'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="text-2xl font-bold text-cyan-600">{stats.totalApplications}</div>
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
                    onClick={() => handleStartEdit(job)}
                    disabled={loading}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Edit Job"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(job.id)}
                    disabled={loading}
                    className={`px-3 py-1 text-xs rounded-md transition-colors disabled:opacity-50 ${
                      job.is_active
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {job.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    disabled={loading}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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