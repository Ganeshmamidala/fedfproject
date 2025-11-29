import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../lib/mockData';
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react';

const PerformanceCharts = () => {
  const { user, userProfile } = useAuth();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (user && userProfile) {
      const data = getData();
      const users = JSON.parse(localStorage.getItem('mock-users') || '[]');
      
      // Calculate data for charts based on role
      let performanceData = {};

      switch (userProfile.role) {
        case 'admin':
          performanceData = calculateAdminCharts(data, users);
          break;
        case 'student':
          performanceData = calculateStudentCharts(data, user.id);
          break;
        case 'employer':
          performanceData = calculateEmployerCharts(data, user.id);
          break;
        case 'placement_officer':
          performanceData = calculatePlacementOfficerCharts(data, users);
          break;
        default:
          break;
      }

      setChartData(performanceData);
    }
  }, [user, userProfile]);

  if (!chartData) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* User Distribution Chart (Admin/Placement Officer) */}
      {chartData.userDistribution && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            User Distribution
          </h3>
          <div className="space-y-4">
            {chartData.userDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Status Chart */}
      {chartData.applicationStatus && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-green-600" />
            Application Status
          </h3>
          <div className="space-y-4">
            {chartData.applicationStatus.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Trend Chart */}
      {chartData.monthlyTrend && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-cyan-600" />
            Monthly Trend
          </h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {chartData.monthlyTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden relative" style={{ height: '150px' }}>
                  <div
                    className={`absolute bottom-0 w-full ${item.color} rounded-t-lg transition-all duration-500 flex items-end justify-center pb-1`}
                    style={{ height: `${item.percentage}%` }}
                  >
                    <span className="text-xs font-bold text-white">{item.value}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Rate Chart */}
      {chartData.successRate && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-orange-600" />
            Success Metrics
          </h3>
          <div className="flex items-center justify-center h-48">
            <div className="relative w-48 h-48">
              {/* Circular Progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - chartData.successRate.percentage / 100)}`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {chartData.successRate.percentage}%
                </span>
                <span className="text-sm text-gray-600 mt-1">{chartData.successRate.label}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Score */}
      {chartData.performanceScore && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chartData.performanceScore.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${item.bgColor} mb-2`}>
                  <span className={`text-2xl font-bold ${item.textColor}`}>{item.value}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions to calculate chart data
const calculateAdminCharts = (data, users) => {
  const totalUsers = users.length;
  const students = users.filter(u => u.role === 'student').length;
  const employers = users.filter(u => u.role === 'employer').length;
  const officers = users.filter(u => u.role === 'placement_officer').length;
  const admins = users.filter(u => u.role === 'admin').length;

  const totalApplications = (data.applications || []).length;
  const pendingApps = (data.applications || []).filter(a => a.status === 'pending').length;
  const acceptedApps = (data.applications || []).filter(a => a.status === 'accepted').length;
  const rejectedApps = (data.applications || []).filter(a => a.status === 'rejected').length;

  return {
    userDistribution: [
      { label: 'Students', value: students, percentage: (students / totalUsers) * 100, color: 'bg-blue-500' },
      { label: 'Employers', value: employers, percentage: (employers / totalUsers) * 100, color: 'bg-green-500' },
      { label: 'Officers', value: officers, percentage: (officers / totalUsers) * 100, color: 'bg-cyan-500' },
      { label: 'Admins', value: admins, percentage: (admins / totalUsers) * 100, color: 'bg-orange-500' }
    ],
    applicationStatus: [
      { label: 'Pending', value: pendingApps, percentage: totalApplications > 0 ? (pendingApps / totalApplications) * 100 : 0, color: 'bg-yellow-500' },
      { label: 'Accepted', value: acceptedApps, percentage: totalApplications > 0 ? (acceptedApps / totalApplications) * 100 : 0, color: 'bg-green-500' },
      { label: 'Rejected', value: rejectedApps, percentage: totalApplications > 0 ? (rejectedApps / totalApplications) * 100 : 0, color: 'bg-red-500' }
    ],
    monthlyTrend: [
      { month: 'Jan', value: Math.floor(totalApplications * 0.15), percentage: 60, color: 'bg-gradient-to-t from-cyan-500 to-blue-500' },
      { month: 'Feb', value: Math.floor(totalApplications * 0.18), percentage: 72, color: 'bg-gradient-to-t from-cyan-500 to-blue-500' },
      { month: 'Mar', value: Math.floor(totalApplications * 0.22), percentage: 88, color: 'bg-gradient-to-t from-cyan-500 to-blue-500' },
      { month: 'Apr', value: totalApplications, percentage: 100, color: 'bg-gradient-to-t from-cyan-500 to-blue-500' }
    ],
    successRate: {
      percentage: totalApplications > 0 ? Math.round((acceptedApps / totalApplications) * 100) : 0,
      label: 'Success Rate'
    }
  };
};

const calculateStudentCharts = (data, userId) => {
  const myApplications = (data.applications || []).filter(a => a.studentId === userId);
  const totalApps = myApplications.length;
  const pendingApps = myApplications.filter(a => a.status === 'pending').length;
  const acceptedApps = myApplications.filter(a => a.status === 'accepted').length;
  const rejectedApps = myApplications.filter(a => a.status === 'rejected').length;
  const interviews = (data.interviews || []).filter(i => i.studentId === userId).length;
  const placements = (data.placements || []).filter(p => p.studentId === userId).length;

  return {
    applicationStatus: [
      { label: 'Pending', value: pendingApps, percentage: totalApps > 0 ? (pendingApps / totalApps) * 100 : 0, color: 'bg-yellow-500' },
      { label: 'Accepted', value: acceptedApps, percentage: totalApps > 0 ? (acceptedApps / totalApps) * 100 : 0, color: 'bg-green-500' },
      { label: 'Rejected', value: rejectedApps, percentage: totalApps > 0 ? (rejectedApps / totalApps) * 100 : 0, color: 'bg-red-500' }
    ],
    successRate: {
      percentage: totalApps > 0 ? Math.round((acceptedApps / totalApps) * 100) : 0,
      label: 'Application Success Rate'
    },
    performanceScore: [
      { label: 'Applied', value: totalApps, description: 'Total Applications', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
      { label: 'Shortlisted', value: acceptedApps, description: 'Accepted Apps', bgColor: 'bg-green-100', textColor: 'text-green-600' },
      { label: 'Interviews', value: interviews, description: 'Scheduled', bgColor: 'bg-cyan-100', textColor: 'text-cyan-600' },
      { label: 'Placed', value: placements, description: 'Successful', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
    ]
  };
};

const calculateEmployerCharts = (data, userId) => {
  const myJobs = (data.jobs || []).filter(j => j.employerId === userId);
  const jobIds = myJobs.map(j => j.id);
  const myApplications = (data.applications || []).filter(a => jobIds.includes(a.jobId));
  const totalApps = myApplications.length;
  const pendingApps = myApplications.filter(a => a.status === 'pending').length;
  const acceptedApps = myApplications.filter(a => a.status === 'accepted').length;
  const rejectedApps = myApplications.filter(a => a.status === 'rejected').length;

  return {
    applicationStatus: [
      { label: 'Pending Review', value: pendingApps, percentage: totalApps > 0 ? (pendingApps / totalApps) * 100 : 0, color: 'bg-yellow-500' },
      { label: 'Shortlisted', value: acceptedApps, percentage: totalApps > 0 ? (acceptedApps / totalApps) * 100 : 0, color: 'bg-green-500' },
      { label: 'Rejected', value: rejectedApps, percentage: totalApps > 0 ? (rejectedApps / totalApps) * 100 : 0, color: 'bg-red-500' }
    ],
    monthlyTrend: [
      { month: 'Jan', value: Math.floor(totalApps * 0.2), percentage: 40, color: 'bg-gradient-to-t from-green-500 to-blue-500' },
      { month: 'Feb', value: Math.floor(totalApps * 0.35), percentage: 70, color: 'bg-gradient-to-t from-green-500 to-blue-500' },
      { month: 'Mar', value: Math.floor(totalApps * 0.45), percentage: 90, color: 'bg-gradient-to-t from-green-500 to-blue-500' },
      { month: 'Apr', value: totalApps, percentage: 100, color: 'bg-gradient-to-t from-green-500 to-blue-500' }
    ],
    performanceScore: [
      { label: 'Jobs Posted', value: myJobs.length, description: 'Total Jobs', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
      { label: 'Applications', value: totalApps, description: 'Received', bgColor: 'bg-green-100', textColor: 'text-green-600' },
      { label: 'Shortlisted', value: acceptedApps, description: 'Candidates', bgColor: 'bg-cyan-100', textColor: 'text-cyan-600' },
      { label: 'Hired', value: Math.floor(acceptedApps * 0.3), description: 'Successful', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
    ]
  };
};

const calculatePlacementOfficerCharts = (data, users) => {
  const totalStudents = users.filter(u => u.role === 'student').length;
  const placedStudents = (data.placements || []).length;
  const totalApps = (data.applications || []).length;
  const pendingApps = (data.applications || []).filter(a => a.status === 'pending').length;
  const acceptedApps = (data.applications || []).filter(a => a.status === 'accepted').length;

  return {
    userDistribution: [
      { label: 'Total Students', value: totalStudents, percentage: 100, color: 'bg-blue-500' },
      { label: 'Placed', value: placedStudents, percentage: totalStudents > 0 ? (placedStudents / totalStudents) * 100 : 0, color: 'bg-green-500' },
      { label: 'In Process', value: pendingApps, percentage: totalStudents > 0 ? (pendingApps / totalStudents) * 100 : 0, color: 'bg-yellow-500' }
    ],
    successRate: {
      percentage: totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0,
      label: 'Placement Rate'
    },
    performanceScore: [
      { label: 'Students', value: totalStudents, description: 'Total Registered', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
      { label: 'Placed', value: placedStudents, description: 'Successfully', bgColor: 'bg-green-100', textColor: 'text-green-600' },
      { label: 'Active Apps', value: pendingApps, description: 'In Progress', bgColor: 'bg-cyan-100', textColor: 'text-cyan-600' },
      { label: 'Companies', value: users.filter(u => u.role === 'employer').length, description: 'Partners', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
    ]
  };
};

export default PerformanceCharts;
