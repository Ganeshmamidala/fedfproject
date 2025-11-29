import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import PerformanceCharts from '../components/Dashboard/PerformanceCharts';
import AdvancedAnalytics from '../components/Analytics/AdvancedAnalytics';
import { KeyboardShortcutsHelp, useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts.jsx';
import { Keyboard } from 'lucide-react';

const DashboardView = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onHelp: () => setShowShortcutsHelp(true),
    onClose: () => {
      setShowShortcutsHelp(false);
      setShowAnalytics(false);
    },
  });

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getDashboardTitle()}</h1>
          <p className="mt-2 text-gray-600">{getDashboardDescription()}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-4 py-2 rounded-lg transition-all ${
              showAnalytics 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {showAnalytics ? 'Show Overview' : 'Advanced Analytics'}
          </button>
          
          <button
            onClick={() => setShowShortcutsHelp(true)}
            className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            title="Keyboard Shortcuts (Ctrl + /)"
          >
            <Keyboard className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showAnalytics ? (
        <AdvancedAnalytics userRole={userProfile?.role} />
      ) : (
        <>
          <DashboardStats />

          <PerformanceCharts />

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
                  <button 
                    onClick={() => onNavigate?.('browse-jobs')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Browse New Jobs
                  </button>
                  <button 
                    onClick={() => onNavigate?.('profile')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Update Profile
                  </button>
                  <button 
                    onClick={() => onNavigate?.('my-applications')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    View Applications
                  </button>
                </>
              )}
              
              {userProfile?.role === 'employer' && (
                <>
                  <button 
                    onClick={() => onNavigate?.('post-job')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Post New Job
                  </button>
                  <button 
                    onClick={() => onNavigate?.('my-jobs')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Review Applications
                  </button>
                  <button 
                    onClick={() => onNavigate?.('company-profile')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Company Profile
                  </button>
                </>
              )}
              
              {userProfile?.role === 'placement_officer' && (
                <>
                  <button 
                    onClick={() => onNavigate?.('interview-scheduling')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Schedule Interviews
                  </button>
                  <button 
                    onClick={() => onNavigate?.('analytics')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Generate Report
                  </button>
                  <button 
                    onClick={() => setShowAnalytics(true)}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    View Analytics
                  </button>
                </>
              )}
              
              {userProfile?.role === 'admin' && (
                <>
                  <button 
                    onClick={() => onNavigate?.('user-management')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    Manage Users
                  </button>
                  <button 
                    onClick={() => onNavigate?.('analytics')}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
                    System Settings
                  </button>
                  <button 
                    onClick={() => setShowAnalytics(true)}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  >
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
      </>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsHelp 
        isOpen={showShortcutsHelp} 
        onClose={() => setShowShortcutsHelp(false)} 
      />
    </div>
  );
};

export default DashboardView;