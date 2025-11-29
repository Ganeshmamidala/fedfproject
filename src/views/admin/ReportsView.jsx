import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, Users, Briefcase, FileText, Award } from 'lucide-react';

const ReportsView = () => {
  const [reportType, setReportType] = useState('placement');
  const [dateRange, setDateRange] = useState('month');

  const handleDownloadReport = (format) => {
    alert(`Downloading ${reportType} report in ${format} format...`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-2">Generate and download comprehensive reports</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="placement">Placement Report</option>
              <option value="application">Application Report</option>
              <option value="job">Job Posting Report</option>
              <option value="student">Student Performance Report</option>
              <option value="employer">Employer Activity Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => handleDownloadReport('pdf')}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Placement Report', icon: Award, color: 'green', desc: 'Track placement statistics and success rates' },
          { title: 'Application Report', icon: FileText, color: 'blue', desc: 'Monitor application trends and status' },
          { title: 'Job Posting Report', icon: Briefcase, color: 'cyan', desc: 'Analyze job posting performance' },
          { title: 'Student Performance', icon: TrendingUp, color: 'purple', desc: 'Student engagement and success metrics' },
          { title: 'Employer Activity', icon: Users, color: 'orange', desc: 'Employer engagement and hiring trends' },
          { title: 'Custom Analytics', icon: BarChart3, color: 'pink', desc: 'Build custom reports with filters' }
        ].map((report, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer">
            <div className={`p-3 bg-${report.color}-100 rounded-lg inline-block mb-4`}>
              <report.icon className={`w-6 h-6 text-${report.color}-600`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
            <button
              onClick={() => handleDownloadReport('pdf')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-600 mt-1">Placement Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-600 mt-1">Total Applications</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-600">156</p>
            <p className="text-sm text-gray-600 mt-1">Active Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">89</p>
            <p className="text-sm text-gray-600 mt-1">Employers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
