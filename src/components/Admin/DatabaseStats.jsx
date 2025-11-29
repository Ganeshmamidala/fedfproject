import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserPlus, Shield, GraduationCap, Building, Briefcase, RefreshCw } from 'lucide-react';
import { getDatabaseStats, listAllUsers, exportUsers } from '../../lib/supabase';

const DatabaseStats = () => {
  const [stats, setStats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  const loadStats = () => {
    const dbStats = getDatabaseStats();
    if (dbStats) {
      setStats(dbStats);
      const users = listAllUsers();
      setAllUsers(users);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleExport = () => {
    const data = exportUsers();
    if (data) {
      // Create downloadable JSON file
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `users-export-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  if (!stats) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
        <p className="text-gray-600">Loading database statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Database Statistics</h2>
          <p className="text-gray-600 mt-1">Real-time user registration and activity data</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadStats}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            📥 Export
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="text-sm opacity-90">Total Registered Users</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <UserPlus className="w-8 h-8 opacity-80" />
            <div className="text-3xl font-bold">{stats.newRegistrations}</div>
          </div>
          <div className="text-sm opacity-90">New Registrations</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <UserCheck className="w-8 h-8 opacity-80" />
            <div className="text-3xl font-bold">{stats.currentlySignedIn}</div>
          </div>
          <div className="text-sm opacity-90">Currently Signed In</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 opacity-80" />
            <div className="text-3xl font-bold">{stats.defaultUsers}</div>
          </div>
          <div className="text-sm opacity-90">Default System Users</div>
        </div>
      </div>

      {/* Users by Role */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
            <Shield className="w-6 h-6 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.byRole.admin}</div>
              <div className="text-sm text-red-700">Administrators</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.byRole.student}</div>
              <div className="text-sm text-blue-700">Students</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <Building className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.byRole.employer}</div>
              <div className="text-sm text-green-700">Employers</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
            <Briefcase className="w-6 h-6 text-cyan-600" />
            <div>
              <div className="text-2xl font-bold text-cyan-600">{stats.byRole.placement_officer}</div>
              <div className="text-sm text-cyan-700">Placement Officers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Session */}
      {stats.currentUser && (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">🔐 Current Active Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm opacity-80">Name</div>
              <div className="font-semibold">{stats.currentUser.full_name}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Email</div>
              <div className="font-semibold">{stats.currentUser.email}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Role</div>
              <div className="font-semibold capitalize">{stats.currentUser.role.replace('_', ' ')}</div>
            </div>
          </div>
        </div>
      )}

      {/* User List Toggle */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <button
          onClick={() => setShowUserList(!showUserList)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900">All Registered Users</h3>
          <span className="text-gray-500">{showUserList ? '▼' : '▶'}</span>
        </button>

        {showUserList && (
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-3">
              {allUsers.map((user, index) => {
                const isDefault = index < stats.defaultUsers;
                return (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg border-2 ${
                      isDefault
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-green-200 bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          isDefault ? 'bg-blue-600' : 'bg-green-600'
                        }`}>
                          {user.full_name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.full_name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'employer' ? 'bg-green-100 text-green-800' :
                          'bg-cyan-100 text-cyan-800'
                        }`}>
                          {user.role.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {isDefault ? '🔹 Default User' : '🆕 New Registration'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseStats;
