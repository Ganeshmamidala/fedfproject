// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  const session = localStorage.getItem('mock-session');
  if (session) {
    const { access_token } = JSON.parse(session);
    return access_token;
  }
  return null;
};

// API helper function
const api = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: (email, password) => 
    api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (userData) => 
    api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getCurrentUser: () => api('/auth/me'),
};

// User APIs
export const userAPI = {
  getAll: () => api('/users'),
  getById: (id) => api(`/users/${id}`),
  update: (id, data) => 
    api(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) => 
    api(`/users/${id}`, {
      method: 'DELETE',
    }),
  toggleStatus: (id) => 
    api(`/users/${id}/toggle-status`, {
      method: 'PATCH',
    }),
};

// Job APIs
export const jobAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api(`/jobs?${params}`);
  },
  getById: (id) => api(`/jobs/${id}`),
  create: (jobData) => 
    api('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }),
  update: (id, jobData) => 
    api(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    }),
  delete: (id) => 
    api(`/jobs/${id}`, {
      method: 'DELETE',
    }),
  updateStatus: (id, status) => 
    api(`/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Application APIs
export const applicationAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api(`/applications?${params}`);
  },
  getById: (id) => api(`/applications/${id}`),
  create: (applicationData) => 
    api('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    }),
  update: (id, data) => 
    api(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  updateStatus: (id, status) => 
    api(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  withdraw: (id) => 
    api(`/applications/${id}/withdraw`, {
      method: 'PATCH',
    }),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => api('/analytics/dashboard'),
  getPlacementStats: () => api('/analytics/placements'),
  getJobStats: () => api('/analytics/jobs'),
  getApplicationStats: () => api('/analytics/applications'),
};

export default api;
