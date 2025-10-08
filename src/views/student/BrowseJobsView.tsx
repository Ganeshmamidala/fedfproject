import React, { useState } from 'react';
import { Search, Filter, MapPin, Building } from 'lucide-react';
import JobCard from '../../components/Jobs/JobCard';
import JobApplicationModal from '../../components/Jobs/JobApplicationModal';
import { Job } from '../../types';

const BrowseJobsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const mockJobs: Job[] = [
    {
      id: '1',
      employer_id: '1',
      title: 'Software Engineer',
      description: 'Join our dynamic team as a Software Engineer and work on cutting-edge technologies. We are looking for passionate developers who love to solve complex problems and build scalable applications.',
      requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      location: 'San Francisco, CA',
      job_type: 'full_time',
      salary_range: '$80,000 - $120,000',
      application_deadline: '2024-02-15',
      is_active: true,
      created_at: '2024-01-15',
      employer: {
        id: '1',
        user_id: '1',
        company_name: 'TechCorp Solutions',
        company_description: 'Leading technology company',
        industry: 'Technology',
        phone: '+1-555-0123',
        address: 'San Francisco, CA',
        created_at: '2024-01-01'
      },
      applications_count: 45
    },
    {
      id: '2',
      employer_id: '2',
      title: 'Data Analyst Intern',
      description: 'Great opportunity for students to gain hands-on experience in data analysis, working with real-world datasets and modern analytics tools.',
      requirements: ['Python', 'SQL', 'Excel', 'Tableau'],
      location: 'New York, NY',
      job_type: 'internship',
      salary_range: '$15 - $20/hour',
      application_deadline: '2024-01-30',
      is_active: true,
      created_at: '2024-01-10',
      employer: {
        id: '2',
        user_id: '2',
        company_name: 'DataTech Analytics',
        company_description: 'Data analytics consulting',
        industry: 'Analytics',
        phone: '+1-555-0124',
        address: 'New York, NY',
        created_at: '2024-01-01'
      },
      applications_count: 23
    },
    {
      id: '3',
      employer_id: '3',
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX Designer to join our product team. You will be responsible for designing user-friendly interfaces and improving user experience across our platforms.',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      location: 'Austin, TX',
      job_type: 'full_time',
      salary_range: '$70,000 - $95,000',
      application_deadline: '2024-02-20',
      is_active: true,
      created_at: '2024-01-12',
      employer: {
        id: '3',
        user_id: '3',
        company_name: 'DesignCo',
        company_description: 'Creative design agency',
        industry: 'Design',
        phone: '+1-555-0125',
        address: 'Austin, TX',
        created_at: '2024-01-01'
      },
      applications_count: 31
    }
  ];

  const locations = [...new Set(mockJobs.map(job => job.location))];
  const jobTypes = [...new Set(mockJobs.map(job => job.job_type))];
  const companies = [...new Set(mockJobs.map(job => job.employer?.company_name).filter(Boolean))];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.employer?.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.job_type === selectedJobType;
    const matchesCompany = !selectedCompany || job.employer?.company_name === selectedCompany;

    return matchesSearch && matchesLocation && matchesJobType && matchesCompany;
  });

  const handleApply = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsApplicationModalOpen(true);
    }
  };

  const handleApplicationSubmit = async (applicationData: { coverLetter: string; resume?: File }) => {
    try {
      // In a real app, this would make an API call
      console.log('Application submitted:', {
        jobId: selectedJob?.id,
        ...applicationData
      });
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideDown';
      notification.textContent = 'Application submitted successfully!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } catch (error) {
      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-shake';
      notification.textContent = 'Failed to submit application. Please try again.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  };

  const handleView = (jobId: string) => {
    // In a real app, this would navigate to job details page
    console.log(`Viewing job details for ${jobId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Job Opportunities</h1>
        <p className="mt-2 text-gray-600">
          Discover exciting career opportunities that match your skills and interests.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your criteria
        </p>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isApplicationModalOpen}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setSelectedJob(null);
          }}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
};

export default BrowseJobsView;