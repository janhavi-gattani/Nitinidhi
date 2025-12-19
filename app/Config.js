// config.js - Centralized API Configuration
// ===========================================
// Update this file whenever your ngrok URL changes

// CURRENT NGROK URL
export const DJANGO_API_URL = 'https://7e3777787c19.ngrok-free.app';

// NODE.JS BACKEND URL (if using)
export const NODE_API_URL = 'https://nitinidhi-gbs1.onrender.com';

// API ENDPOINTS
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${NODE_API_URL}/api/auth/token`,
  REFRESH_TOKEN: `${NODE_API_URL}/api/auth/refresh`,
  VERIFY_TOKEN: `${NODE_API_URL}/api/auth/verify`,
  
  // Direct Django endpoints (when not using Node.js proxy)
  DJANGO_LOGIN: `${DJANGO_API_URL}/api/auth/token/`,
  DJANGO_REFRESH: `${DJANGO_API_URL}/api/token/refresh/`,
  DJANGO_VERIFY: `${DJANGO_API_URL}/api/token/verify/`,
  
  // User endpoints
  USER: (userId) => `${DJANGO_API_URL}/api/users/${userId}`,
  
  // Complaints
  COMPLAINTS: `${DJANGO_API_URL}/api/complaints/`,
  COMPLAINT_DETAIL: (id) => `${DJANGO_API_URL}/api/complaints/${id}/`,
  
  // Job Applications
  JOB_APPLY: (jobId) => `${DJANGO_API_URL}/api/job-vacancies/${jobId}/apply/`,
  
  // Schemes
  SCHEMES: `${DJANGO_API_URL}/api/schemes`,
  SCHEMES_BY_DEPARTMENT: (department) => `${DJANGO_API_URL}/api/schemes?department=${department}`,
  
  // News
  NEWS: `${DJANGO_API_URL}/api/news/`,
};

// Common headers
export const COMMON_HEADERS = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

// Helper function to get auth headers
export const getAuthHeaders = (token) => ({
  ...COMMON_HEADERS,
  'Authorization': `Bearer ${token}`,
});

export default {
  DJANGO_API_URL,
  NODE_API_URL,
  API_ENDPOINTS,
  COMMON_HEADERS,
  getAuthHeaders,
};