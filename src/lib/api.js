import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Jobs API
export const jobsAPI = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getEmployerJobs: (employerId) => api.get(`/jobs/employer/${employerId}`),
};

// Applications API
export const applicationsAPI = {
  applyForJob: (applicationData) => api.post('/applications', applicationData),
  getStudentApplications: (studentId, status) => 
    api.get(`/applications/student/${studentId}`, { params: { status } }),
  getJobApplications: (jobId, status) => 
    api.get(`/applications/job/${jobId}`, { params: { status } }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  updateApplicationStatus: (id, statusData) => 
    api.put(`/applications/${id}/status`, statusData),
  scheduleInterview: (id, interviewData) => 
    api.put(`/applications/${id}/interview`, interviewData),
  withdrawApplication: (id) => api.delete(`/applications/${id}`),
};

// Users API
export const usersAPI = {
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateUserProfile: (id, profileData) => api.put(`/users/${id}`, profileData),
  updateStudentProfile: (userId, profileData) => 
    api.put(`/users/student/${userId}`, profileData),
  updateEmployerProfile: (userId, profileData) => 
    api.put(`/users/employer/${userId}`, profileData),
  addResume: (userId, resumeData) => 
    api.post(`/users/student/${userId}/resume`, resumeData),
  deleteResume: (userId, resumeId) => 
    api.delete(`/users/student/${userId}/resume/${resumeId}`),
  setDefaultResume: (userId, resumeId) => 
    api.put(`/users/student/${userId}/resume/${resumeId}/default`),
  getAllUsers: (params) => api.get('/users', { params }),
};

// File Upload API
export const uploadFile = async (file, folder = 'documents') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
