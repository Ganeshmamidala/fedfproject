import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, BarChart3, User, Building2, FileText, Settings, LogOut, MessageCircle, Calendar, FolderOpen, LayoutDashboard, TrendingUp, Shield, UserPlus, GraduationCap, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';



const Sidebar = ({ activeView, setActiveView }) => {
  const { userProfile } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ];

    switch (userProfile?.role) {
      case 'admin':
        return [
          ...commonItems,
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'jobs', label: 'Job Management', icon: Briefcase },
          { id: 'applications', label: 'Applications', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'settings', label: 'System Settings', icon: Shield }
        ];
      
      case 'student':
        return [
          ...commonItems,
          { id: 'browse-jobs', label: 'Browse Jobs', icon: Briefcase },
          { id: 'my-applications', label: 'My Applications', icon: FileText },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'documents', label: 'Documents', icon: FolderOpen },
          { id: 'profile', label: 'My Profile', icon: Users }
        ];
      
      case 'employer':
        return [
          ...commonItems,
          { id: 'post-job', label: 'Post Job', icon: UserPlus },
          { id: 'my-jobs', label: 'My Job Listings', icon: Briefcase },
          { id: 'applications-received', label: 'Applications Received', icon: FileText },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'documents', label: 'Documents', icon: FolderOpen },
          { id: 'interviews', label: 'Interviews', icon: Calendar },
          { id: 'company-profile', label: 'Company Profile', icon: Building }
        ];
      
      case 'placement_officer':
        return [
          ...commonItems,
          { id: 'placement-records', label: 'Placement Records', icon: GraduationCap },
          { id: 'job-management', label: 'Job Management', icon: Briefcase },
          { id: 'student-management', label: 'Student Management', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'reports', label: 'Reports', icon: BarChart3 }
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white/80 backdrop-blur-lg border-r border-gray-200/50 w-64 min-h-screen shadow-lg">
      <nav className="mt-8">
        <div className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md border-r-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${activeView === item.id ? 'text-blue-600' : ''}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;