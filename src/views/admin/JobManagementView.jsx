import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, MapPin, DollarSign, Users } from 'lucide-react';

const JobManagementView = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load jobs from localStorage
    const storedData = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
    setJobs(storedData.jobs || []);
  }, []);

  const handleApprove = async (jobId) => {
    setLoading(true);
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: 'active' } : job
      ));
      const storedData = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
      storedData.jobs = storedData.jobs.map(job => 
        job.id === jobId ? { ...job, status: 'active' } : job
      );
      localStorage.setItem('placementhub-data', JSON.stringify(storedData));
      setLoading(false);
    }, 500);
  };

  const handleReject = async (jobId) => {
    if (!confirm('Are you sure you want to reject this job posting?')) return;
    
    setLoading(true);
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: 'inactive' } : job
      ));
      const storedData = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
      storedData.jobs = storedData.jobs.map(job => 
        job.id === jobId ? { ...job, status: 'inactive' } : job
      );
      localStorage.setItem('placementhub-data', JSON.stringify(storedData));
      setLoading(false);
    }, 500);
  };

  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
    
    setLoading(true);
    setTimeout(() => {
      setJobs(prev => prev.filter(job => job.id !== jobId));
      const storedData = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
      storedData.jobs = storedData.jobs.filter(job => job.id !== jobId);
      localStorage.setItem('placementhub-data', JSON.stringify(storedData));
      setLoading(false);
    }, 500);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'active').length,
    inactive: jobs.filter(j => j.status === 'inactive').length,
    pending: jobs.filter(j => j.status === 'pending').length
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Job Management
        </h1>
        <p className="text-gray-600 mt-2">Manage and moderate all job postings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'active' ? 'bg-green-100 text-green-700' :
                      job.status === 'inactive' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {job.status === 'active' ? 'Active' : job.status === 'inactive' ? 'Inactive' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  {job.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(job.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(job.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  {job.status === 'active' && (
                    <button
                      onClick={() => handleReject(job.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                      Deactivate
                    </button>
                  )}
                  {job.status === 'inactive' && (
                    <button
                      onClick={() => handleApprove(job.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobManagementView;
