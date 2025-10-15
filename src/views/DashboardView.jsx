import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivity from '../components/Dashboard/RecentActivity';

const DashboardView = () => {
  const { userProfile } = useAuth();

  const getDashboardTitle = () => {
    switch (userProfile?.role) {
      case 'admin':
        return 'System Administration Dashboard';
      case 'student':
        return 'Student Dashboard';
      case 'employer':
        return 'Employer Dashboard';
      case 'placement_officer':
        return 'Placement Officer Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getDashboardDescription = () => {
    switch (userProfile?.role) {
      case 'admin':
        return 'Monitor system performance and manage platform operations.';
      case 'student':
        return 'Explore opportunities and track your placement journey.';
      case 'employer':
        return 'Manage job postings and connect with talented students.';
      case 'placement_officer':
        return 'Facilitate placements and track student success.';
      default:
        return 'Welcome to PlacementHub';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{getDashboardTitle()}</h1>
        <p className="mt-2 text-gray-600">{getDashboardDescription()}</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {userProfile?.role === 'student' && (
                <>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Browse New Jobs
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Update Profile
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    View Applications
                  </button>
                </>
              )}
              
              {userProfile?.role === 'employer' && (
                <>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Post New Job
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Review Applications
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Company Profile
                  </button>
                </>
              )}
              
              {userProfile?.role === 'placement_officer' && (
                <>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Add Placement Record
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Generate Report
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    View Analytics
                  </button>
                </>
              )}
              
              {userProfile?.role === 'admin' && (
                <>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    Manage Users
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    System Settings
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm">
                    View Reports
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50 card-hover">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-lg shadow-sm">
                <p className="text-sm text-blue-800">
                  Welcome to PlacementHub! Complete your profile to get started.
                </p>
              </div>
              {userProfile?.role === 'student' && (
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-lg shadow-sm">
                  <p className="text-sm text-green-800">
                    5 new jobs match your profile. Check them out!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;