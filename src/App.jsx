import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import LandingPage from './components/Landing/LandingPage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardView from './views/DashboardView';
import BrowseJobsView from './views/student/BrowseJobsView';
import MyApplicationsView from './views/student/MyApplicationsView';
import PostJobView from './views/employer/PostJobView';
import MyJobsView from './views/employer/MyJobsView';
import ProfileView from './views/student/ProfileView';
import AnalyticsView from './views/admin/AnalyticsView';
import UserManagementView from './views/admin/UserManagementView';
import CompanyProfileView from './views/employer/CompanyProfileView';
import MessagingView from './views/shared/MessagingView';
import InterviewSchedulingView from './views/shared/InterviewSchedulingView';
import DocumentManagementView from './views/shared/DocumentManagementView';

const AppContent = () => {
  const { user, userProfile, loading } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);

  console.log('AppContent state:', { user, userProfile, loading, showLogin });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    if (showLogin) {
      console.log('Showing login form');
      return <LoginForm onBackToLanding={() => setShowLogin(false)} />;
    }
    console.log('Showing landing page');
    return <LandingPage onShowLogin={() => {
      console.log('Sign In clicked');
      setShowLogin(true);
    }} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveView} />;
      case 'browse-jobs':
        return <BrowseJobsView />;
      case 'my-applications':
        return <MyApplicationsView />;
      case 'post-job':
        return <PostJobView />;
      case 'my-jobs':
        return <MyJobsView />;
      case 'profile':
        return <ProfileView onNavigate={setActiveView} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'users':
        return <UserManagementView />;
      case 'user-management':
        return <UserManagementView />;
      case 'company-profile':
        return <CompanyProfileView />;
      case 'document-management':
        return <DocumentManagementView />;
      case 'messaging':
        return <MessagingView />;
      case 'interview-scheduling':
        return <InterviewSchedulingView />;
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {activeView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <p className="text-gray-600">
                This view is currently under development. Please check back later.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;