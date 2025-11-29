import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Bell, Settings } from 'lucide-react';
import NotificationCenter from '../Notifications/NotificationCenter';
import SettingsPanel from '../Settings/SettingsPanel';
import { getNotifications } from '../../lib/mockData';

const Header = () => {
  const { userProfile, user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Load unread notification count
  useEffect(() => {
    if (user) {
      try {
        const notifications = getNotifications(user.id);
        console.log('Loaded notifications:', notifications);
        const unread = notifications.filter(n => !n.read).length;
        console.log('Unread count:', unread);
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, [user, showNotifications]); // Refresh when notifications panel closes

  const handleNotificationClick = () => {
    console.log('Notification bell clicked, current state:', showNotifications);
    setShowNotifications(!showNotifications);
    setShowSettings(false); // Close settings if open
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false); // Close notifications if open
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      admin: 'Administrator',
      student: 'Student',
      employer: 'Employer',
      placement_officer: 'Placement Officer'
    };
    return roleMap[role] || role;
  };

  const getRoleColor = (role) => {
    const colorMap = {
      admin: 'bg-red-100 text-red-800',
      student: 'bg-blue-100 text-blue-800',
      employer: 'bg-green-100 text-green-800',
      placement_officer: 'bg-cyan-100 text-cyan-800'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              PlacementHub
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-400 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-lg"
              title="Notifications"
              type="button"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {userProfile?.full_name}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${
                    userProfile ? getRoleColor(userProfile.role) : 'bg-gray-100 text-gray-800'
                  }`}>
                    {userProfile ? getRoleDisplayName(userProfile.role) : 'Loading...'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleSettingsClick}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-lg"
                  title="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-red-600 transition-all duration-200 hover:bg-red-50 rounded-lg"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Close dropdowns when clicking outside */}
      {(showNotifications || showSettings) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowSettings(false);
          }}
        />
      )}
      
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => {
          setShowNotifications(false);
          // Refresh unread count when closing
          if (user) {
            const notifications = getNotifications(user.id);
            const unread = notifications.filter(n => !n.read).length;
            setUnreadCount(unread);
          }
        }}
      />
      
      {showSettings && (
        <SettingsPanel 
          onClose={() => setShowSettings(false)}
        />
      )}
    </header>
  );
};

export default Header;