import React, { useState } from 'react';
import { User, Bell, Settings, Shield, HelpCircle, Trash2, X, AlertTriangle, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPanel = ({ onClose }) => {
  const { user, userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    email: user?.email || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    jobAlerts: true,
    messageNotifications: true,
  });

  const handleSaveProfile = () => {
    // Get existing data
    const data = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
    
    // Update user profile
    if (data.users) {
      const userIndex = data.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        data.users[userIndex] = {
          ...data.users[userIndex],
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
        };
        localStorage.setItem('placementhub-data', JSON.stringify(data));
        alert('Profile updated successfully!');
      }
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('notification-settings', JSON.stringify(notificationSettings));
    alert('Notification preferences saved!');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    // Get existing data
    const data = JSON.parse(localStorage.getItem('placementhub-data') || '{}');
    
    // Remove user
    if (data.users) {
      data.users = data.users.filter(u => u.id !== user.id);
      
      // Remove user's applications
      if (data.applications) {
        data.applications = data.applications.filter(app => app.student_id !== user.id);
      }
      
      // Remove user's notifications
      const notifications = JSON.parse(localStorage.getItem('placementhub-notifications') || '{}');
      delete notifications[user.id];
      localStorage.setItem('placementhub-notifications', JSON.stringify(notifications));
      
      localStorage.setItem('placementhub-data', JSON.stringify(data));
    }
    
    alert('Account deleted successfully. You will be logged out.');
    signOut();
  };

  const renderProfileSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <button
        onClick={handleSaveProfile}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Save className="h-4 w-4" />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
      
      <div className="space-y-3">
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Email Notifications</span>
          <input
            type="checkbox"
            checked={notificationSettings.emailNotifications}
            onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
        
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Application Updates</span>
          <input
            type="checkbox"
            checked={notificationSettings.applicationUpdates}
            onChange={(e) => setNotificationSettings({ ...notificationSettings, applicationUpdates: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
        
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Job Alerts</span>
          <input
            type="checkbox"
            checked={notificationSettings.jobAlerts}
            onChange={(e) => setNotificationSettings({ ...notificationSettings, jobAlerts: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
        
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Message Notifications</span>
          <input
            type="checkbox"
            checked={notificationSettings.messageNotifications}
            onChange={(e) => setNotificationSettings({ ...notificationSettings, messageNotifications: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      
      <button
        onClick={handleSaveNotifications}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Save className="h-4 w-4" />
        <span>Save Preferences</span>
      </button>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-900 mb-1">Change Password</h4>
            <p className="text-xs text-yellow-700 mb-3">Update your password to keep your account secure.</p>
            <button className="text-xs bg-yellow-600 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-700 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Two-Factor Authentication</h4>
            <p className="text-xs text-blue-700 mb-3">Add an extra layer of security to your account.</p>
            <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-900 mb-1">Delete Account</h4>
            <p className="text-xs text-red-700 mb-3">Permanently delete your account and all associated data.</p>
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">Warning: This action is irreversible!</p>
                  <p className="text-xs text-red-700">
                    Deleting your account will permanently remove:
                  </p>
                  <ul className="text-xs text-red-700 list-disc list-inside mt-2 space-y-1">
                    <li>Your profile and personal information</li>
                    <li>All job applications and history</li>
                    <li>All notifications and messages</li>
                    <li>Access to your account</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Type DELETE"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Profile Visibility</h4>
          <p className="text-xs text-gray-600 mb-3">Control who can see your profile information</p>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Everyone</option>
            <option>Employers Only</option>
            <option>Private</option>
          </select>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Data Sharing</h4>
          <p className="text-xs text-gray-600 mb-3">Manage how your data is shared</p>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            <span className="text-sm text-gray-700">Share profile with employers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span className="text-sm text-gray-700">Include in placement statistics</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderHelpSupport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>
      
      <div className="space-y-3">
        <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">FAQs</h4>
          <p className="text-xs text-gray-600">Find answers to common questions</p>
        </a>
        
        <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Contact Support</h4>
          <p className="text-xs text-gray-600">Get help from our support team</p>
        </a>
        
        <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Terms & Conditions</h4>
          <p className="text-xs text-gray-600">Read our terms of service</p>
        </a>
        
        <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Privacy Policy</h4>
          <p className="text-xs text-gray-600">Learn how we protect your data</p>
        </a>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-900 font-medium mb-2">Need immediate assistance?</p>
        <p className="text-xs text-blue-700 mb-3">Email: support@placementhub.edu</p>
        <p className="text-xs text-blue-700">Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="fixed top-16 right-4 sm:right-8 bg-white rounded-2xl shadow-2xl border border-gray-200 w-[95vw] sm:w-[500px] max-h-[calc(100vh-6rem)] overflow-hidden z-[60] animate-scaleIn flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Settings</h2>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'profile' && renderProfileSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'account' && renderAccountSettings()}
        {activeTab === 'privacy' && renderPrivacySecurity()}
        {activeTab === 'help' && renderHelpSupport()}
      </div>
    </div>
  );
};

export default SettingsPanel;
