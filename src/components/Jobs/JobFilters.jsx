import React from 'react';
import { Search, MapPin, DollarSign, Building2, Briefcase, Filter } from 'lucide-react';

const JobFilters = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  jobTypeFilter,
  setJobTypeFilter,
  companyFilter,
  setCompanyFilter,
  salaryRange,
  setSalaryRange,
  locations,
  companies,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Jobs
        </h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Jobs
          </label>
          <input
            type="text"
            placeholder="Search by title, description, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Job Type
          </label>
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Company
          </label>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Salary Range (Annual)
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min"
                value={salaryRange.min || ''}
                onChange={(e) =>
                  setSalaryRange({ ...salaryRange, min: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max"
                value={salaryRange.max || ''}
                onChange={(e) =>
                  setSalaryRange({ ...salaryRange, max: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
