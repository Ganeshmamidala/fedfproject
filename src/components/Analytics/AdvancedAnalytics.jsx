import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, Briefcase, GraduationCap, BarChart3, Filter, Download } from 'lucide-react';
import { getData } from '../../lib/mockData';
import ExportButton from '../Common/ExportButton';

const AdvancedAnalytics = ({ userRole }) => {
  const [dateRange, setDateRange] = useState('30'); // days
  const [selectedMetric, setSelectedMetric] = useState('overview');
  
  const data = getData();
  const jobs = data.jobs || [];
  const applications = data.applications || [];
  const placements = data.placements || [];
  const users = data.users || [];

  // Calculate advanced metrics
  const calculateMetrics = () => {
    const now = new Date();
    const rangeDate = new Date(now.setDate(now.getDate() - parseInt(dateRange)));

    const recentApplications = applications.filter(app => 
      new Date(app.applied_at) >= rangeDate
    );

    const recentPlacements = placements.filter(p => 
      new Date(p.placed_at) >= rangeDate
    );

    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.is_active).length,
      totalApplications: applications.length,
      recentApplications: recentApplications.length,
      placementRate: applications.length > 0 
        ? ((placements.length / applications.length) * 100).toFixed(1)
        : 0,
      avgApplicationsPerJob: jobs.length > 0 
        ? (applications.length / jobs.length).toFixed(1)
        : 0,
      topCompanies: getTopCompanies(),
      applicationTrend: getApplicationTrend(),
      placementTrend: getPlacementTrend(),
    };
  };

  const getTopCompanies = () => {
    const companyCounts = {};
    applications.forEach(app => {
      const job = jobs.find(j => j.id === app.job_id);
      if (job && job.employer) {
        const company = job.employer.company_name;
        companyCounts[company] = (companyCounts[company] || 0) + 1;
      }
    });

    return Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([company, count]) => ({ company, count }));
  };

  const getApplicationTrend = () => {
    const trend = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    applications.forEach(app => {
      const month = months[new Date(app.applied_at).getMonth()];
      trend[month] = (trend[month] || 0) + 1;
    });

    return Object.entries(trend).map(([month, count]) => ({ month, count }));
  };

  const getPlacementTrend = () => {
    const trend = {};
    placements.forEach(p => {
      const month = new Date(p.placed_at).toLocaleDateString('en', { month: 'short' });
      trend[month] = (trend[month] || 0) + 1;
    });

    return Object.entries(trend).map(([month, count]) => ({ month, count }));
  };

  const metrics = calculateMetrics();

  // Prepare export data
  const getExportData = () => {
    switch (selectedMetric) {
      case 'applications':
        return applications.map(app => ({
          ID: app.id,
          Student: app.student_id,
          Job: app.job_id,
          Status: app.status,
          'Applied Date': new Date(app.applied_at).toLocaleDateString(),
        }));
      case 'placements':
        return placements.map(p => ({
          ID: p.id,
          Student: p.student_id,
          Company: p.company_name,
          Position: p.position,
          Salary: p.salary,
          'Placed Date': new Date(p.placed_at).toLocaleDateString(),
        }));
      case 'jobs':
        return jobs.map(j => ({
          ID: j.id,
          Title: j.title,
          Company: j.employer?.company_name || 'N/A',
          Location: j.location,
          Type: j.job_type,
          'Applications': applications.filter(a => a.job_id === j.id).length,
        }));
      default:
        return [metrics];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">Detailed insights and trends</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>

          {/* Metric Selector */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="applications">Applications</option>
            <option value="placements">Placements</option>
            <option value="jobs">Jobs</option>
          </select>

          {/* Export Button */}
          <ExportButton 
            data={getExportData()} 
            filename={`analytics-${selectedMetric}-${dateRange}days`}
            format="csv"
          />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="h-8 w-8 opacity-80" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Jobs</span>
          </div>
          <p className="text-3xl font-bold mb-1">{metrics.activeJobs}</p>
          <p className="text-sm opacity-90">Active Positions</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 opacity-80" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Rate</span>
          </div>
          <p className="text-3xl font-bold mb-1">{metrics.placementRate}%</p>
          <p className="text-sm opacity-90">Placement Rate</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 opacity-80" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Apps</span>
          </div>
          <p className="text-3xl font-bold mb-1">{metrics.recentApplications}</p>
          <p className="text-sm opacity-90">Recent Applications</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-8 w-8 opacity-80" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Avg</span>
          </div>
          <p className="text-3xl font-bold mb-1">{metrics.avgApplicationsPerJob}</p>
          <p className="text-sm opacity-90">Apps per Job</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Trend</h3>
          <div className="space-y-3">
            {metrics.applicationTrend.map((item, index) => {
              const maxCount = Math.max(...metrics.applicationTrend.map(i => i.count));
              const percentage = (item.count / maxCount) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.month}</span>
                    <span className="text-gray-600">{item.count}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h3>
          <div className="space-y-4">
            {metrics.topCompanies.map((company, index) => {
              const maxCount = Math.max(...metrics.topCompanies.map(c => c.count));
              const percentage = (company.count / maxCount) * 100;
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 truncate">{company.company}</span>
                      <span className="text-gray-600 ml-2">{company.count}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
