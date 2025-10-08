import React from 'react';
import { BarChart3, TrendingUp, Users, Briefcase, FileText, Calendar, Award, Building } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 1248,
    activeJobs: 89,
    totalApplications: 3421,
    successfulPlacements: 156,
    placementRate: 78,
    averageSalary: 85000
  };

  const monthlyData = [
    { month: 'Jan', applications: 245, placements: 12 },
    { month: 'Feb', applications: 289, placements: 18 },
    { month: 'Mar', applications: 356, placements: 22 },
    { month: 'Apr', applications: 412, placements: 28 },
    { month: 'May', applications: 378, placements: 25 },
    { month: 'Jun', applications: 445, placements: 31 }
  ];

  const topCompanies = [
    { name: 'Google', placements: 23, avgSalary: 125000 },
    { name: 'Microsoft', placements: 19, avgSalary: 118000 },
    { name: 'Amazon', placements: 17, avgSalary: 112000 },
    { name: 'Apple', placements: 15, avgSalary: 120000 },
    { name: 'Meta', placements: 12, avgSalary: 115000 }
  ];

  const departmentStats = [
    { department: 'Computer Science', students: 450, placed: 89, rate: 89 },
    { department: 'Electrical Engineering', students: 320, placed: 65, rate: 78 },
    { department: 'Mechanical Engineering', students: 280, placed: 52, rate: 72 },
    { department: 'Business Administration', students: 198, placed: 41, rate: 85 }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive insights into placement performance and trends.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-xl shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <div className="flex items-center">
            <div className="bg-orange-500 p-3 rounded-xl shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placements</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.successfulPlacements}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Monthly Trends
          </h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.applications / 500) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.applications} apps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(data.placements / 35) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{data.placements} placed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Rate */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Placement Performance
          </h3>
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center justify-center w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.placementRate / 100)}`}
                  className="text-green-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{stats.placementRate}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Overall Placement Rate</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Salary</span>
              <span className="font-medium">${stats.averageSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Placed</span>
              <span className="font-medium">{stats.successfulPlacements}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Companies */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="h-5 w-5 mr-2 text-purple-600" />
            Top Recruiting Companies
          </h3>
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{company.name}</p>
                  <p className="text-sm text-gray-600">{company.placements} placements</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">${company.avgSalary.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">avg salary</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-600" />
            Department Performance
          </h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-900">{dept.department}</p>
                  <span className="text-sm font-medium text-green-600">{dept.rate}%</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{dept.students} students</span>
                  <span>{dept.placed} placed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                    style={{ width: `${dept.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;