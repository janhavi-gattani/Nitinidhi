// tokenUtils.js - Token refresh utility with Config
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DJANGO_API_URL, API_ENDPOINTS, COMMON_HEADERS } from './Config';

/**
 * Refresh the access token using the refresh token
 * @returns {Promise<string|null>} New access token or null if refresh fails
 */
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('@refresh_token');
    
    if (!refreshToken) {
      console.log('No refresh token found');
      return null;
    }

    console.log('Attempting to refresh access token...');

    // Call Django refresh endpoint directly
    const response = await fetch(API_ENDPOINTS.DJANGO_REFRESH, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    const rawText = await response.text();
    console.log('Refresh token response status:', response.status);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error('Failed to parse refresh response:', parseError);
      return null;
    }

    if (!response.ok) {
      console.error('Token refresh failed:', data);
      
      // If refresh token is invalid/expired, clear tokens
      if (response.status === 401 || data.code === 'token_not_valid') {
        console.log('Refresh token expired, clearing tokens');
        await clearTokens();
      }
      
      return null;
    }

    // Store the new access token
    if (data.access) {
      await AsyncStorage.setItem('@access_token', data.access);
      console.log('Access token refreshed successfully');
      return data.access;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

/**
 * Make an authenticated API request with automatic token refresh
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} Fetch response
 */
export const authenticatedFetch = async (url, options = {}) => {
  try {
    // Get current access token
    let token = await AsyncStorage.getItem('@access_token');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    // Prepare headers
    const headers = {
      ...COMMON_HEADERS,
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    console.log(`Making authenticated request to: ${url}`);

    // Make the request
    let response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`Response status: ${response.status}`);

    // If token expired (401), try to refresh and retry
    if (response.status === 401) {
      console.log('Token expired (401), attempting refresh...');
      
      const newToken = await refreshAccessToken();
      
      if (!newToken) {
        throw new Error('Session expired. Please login again.');
      }

      console.log('Retrying request with new token...');

      // Retry the request with new token
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`Retry response status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Authenticated fetch error:', error);
    throw error;
  }
};

/**
 * Make an authenticated FormData request (for file uploads)
 * @param {string} url - API endpoint URL
 * @param {FormData} formData - FormData object
 * @returns {Promise<Response>} Fetch response
 */
export const authenticatedFormDataFetch = async (url, formData) => {
  try {
    // Get current access token
    let token = await AsyncStorage.getItem('@access_token');
    
    if (!token) {
      // Try to refresh
      token = await refreshAccessToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
    }

    console.log(`Making FormData request to: ${url}`);

    // Make the request (don't set Content-Type for FormData)
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    });

    console.log(`FormData response status: ${response.status}`);

    // If token expired, refresh and retry
    if (response.status === 401) {
      console.log('Token expired during file upload, refreshing...');
      
      const newToken = await refreshAccessToken();
      
      if (!newToken) {
        throw new Error('Session expired. Please login again.');
      }

      console.log('Retrying file upload with new token...');

      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      console.log(`Retry FormData response status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Authenticated FormData fetch error:', error);
    throw error;
  }
};

/**
 * Check if the current token is valid
 * @returns {Promise<boolean>} True if token is valid, false otherwise
 */
export const isTokenValid = async () => {
  try {
    const token = await AsyncStorage.getItem('@access_token');
    
    if (!token) {
      return false;
    }

    const response = await fetch(API_ENDPOINTS.DJANGO_VERIFY, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({ token }),
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

/**
 * Clear all stored tokens
 */
export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@refresh_token');
    console.log('Tokens cleared');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

/**
 * Get current user tokens
 */
export const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@access_token');
    const refreshToken = await AsyncStorage.getItem('@refresh_token');
    
    return {
      access: accessToken,
      refresh: refreshToken,
    };
  } catch (error) {
    console.error('Error getting tokens:', error);
    return { access: null, refresh: null };
  }
};

/**
 * Check if user is logged in (has valid tokens)
 */
export const isLoggedIn = async () => {
  try {
    const tokens = await getTokens();
    return !!(tokens.access && tokens.refresh);
  } catch (error) {
    return false;
  }
};

/**
 * Login helper function
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{success: boolean, access?: string, refresh?: string, error?: string}>}
 */
export const login = async (username, password) => {
  try {
    console.log('Logging in user:', username);

    const response = await fetch(API_ENDPOINTS.DJANGO_LOGIN, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
      }),
    });

    console.log('Login response status:', response.status);

    const rawText = await response.text();
    console.log('Login raw response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error('Failed to parse login response:', parseError);
      return { success: false, error: 'Invalid response from server' };
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: data?.detail || data?.message || 'Login failed' 
      };
    }

    // Store tokens
    if (data.access && data.refresh) {
      await AsyncStorage.setItem('@access_token', data.access);
      await AsyncStorage.setItem('@refresh_token', data.refresh);
      
      console.log('Login successful, tokens stored');
      
      return {
        success: true,
        access: data.access,
        refresh: data.refresh,
      };
    }

    return { success: false, error: 'No tokens received from server' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};