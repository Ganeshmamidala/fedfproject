import React, { useState } from 'react';
import { Search, Filter, Users, UserPlus, CreditCard, Trash2, Eye, Edit, Shield, CheckCircle, XCircle } from 'lucide-react';

const UserManagementView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - in real app, this would come from API
  const mockUsers = [
    {
      id: '1',
      email: 'john.student@university.edu',
      full_name: 'John Student',
      role: 'student',
      created_at: '2024-01-15T10:00:00Z',
      status: 'active',
      last_login: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      email: 'jane.employer@techcorp.com',
      full_name: 'Jane Employer',
      role: 'employer',
      created_at: '2024-01-10T09:00:00Z',
      status: 'active',
      last_login: '2024-01-19T16:45:00Z'
    },
    {
      id: '3',
      email: 'mike.officer@university.edu',
      full_name: 'Mike Officer',
      role: 'placement_officer',
      created_at: '2024-01-05T11:30:00Z',
      status: 'active',
      last_login: '2024-01-20T09:15:00Z'
    },
    {
      id: '4',
      email: 'sarah.admin@university.edu',
      full_name: 'Sarah Admin',
      role: 'admin',
      created_at: '2024-01-01T08:00:00Z',
      status: 'active',
      last_login: '2024-01-20T10:00:00Z'
    },
    {
      id: '5',
      email: 'inactive.user@example.com',
      full_name: 'Inactive User',
      role: 'student',
      created_at: '2024-01-12T12:00:00Z',
      status: 'inactive',
      last_login: '2024-01-12T12:30:00Z'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getUserStats = () => {
    return {
      total: mockUsers.length,
      active: mockUsers.filter(u => u.status === 'active').length,
      inactive: mockUsers.filter(u => u.status === 'inactive').length,
      students: mockUsers.filter(u => u.role === 'student').length,
      employers: mockUsers.filter(u => u.role === 'employer').length,
      officers: mockUsers.filter(u => u.role === 'placement_officer').length,
      admins: mockUsers.filter(u => u.role === 'admin').length
    };
  };

  const stats = getUserStats();

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      student: 'bg-blue-100 text-blue-800',
      employer: 'bg-green-100 text-green-800',
      placement_officer: 'bg-cyan-100 text-cyan-800'
    };
    return colors[role];
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: 'Administrator',
      student: 'Student',
      employer: 'Employer',
      placement_officer: 'Placement Officer'
    };
    return labels[role];
  };

  const handleViewUser = (userId) => {
    console.log(`View user ${userId}`);
  };

  const handleEditUser = (userId) => {
    console.log(`Edit user ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log(`Delete user ${userId}`);
    }
  };

  const handleToggleStatus = (userId) => {
    console.log(`Toggle status for user ${userId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage all users and their permissions across the platform.
          </p>
        </div>
        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-green-600">{stats.employers}</div>
          <div className="text-sm text-gray-600">Employers</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-cyan-600">{stats.officers}</div>
          <div className="text-sm text-gray-600">Officers</div>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-gray-200/50 card-hover">
          <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
            >
              <option value="">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="student">Student</option>
              <option value="employer">Employer</option>
              <option value="placement_officer">Placement Officer</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value | 'active' | 'inactive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.full_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className={`text-sm ${user.status === 'active' ? 'text-green-800' : 'text-red-800'}`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.last_login).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View User"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          user.status === 'active'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementView;