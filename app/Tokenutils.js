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
      console.log('No access token found, attempting refresh with refresh token...');
      token = await refreshAccessToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
    }

    // Prepare headers (strip any caller-provided Authorization to avoid stale token override)
    const customHeaders = { ...(options.headers || {}) };
    delete customHeaders['Authorization'];
    delete customHeaders['authorization'];

    const headers = {
      ...COMMON_HEADERS,
      ...customHeaders,
      'Authorization': `Bearer ${token}`,
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
      headers['Authorization'] = `Bearer ${newToken}`;
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
 * Safely parse payload from JWT token
 * @param {string} token 
 * @returns {object|null}
 */
export const parseJwt = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = '';
    for (let i = 0; i < base64.length; i += 4) {
      const a = chars.indexOf(base64.charAt(i));
      const b = chars.indexOf(base64.charAt(i + 1));
      const c = chars.indexOf(base64.charAt(i + 2));
      const d = chars.indexOf(base64.charAt(i + 3));
      const bitmap = (a << 18) | (b << 12) | ((c & 63) << 6) | (d & 63);
      if (c === 64) {
        str += String.fromCharCode((bitmap >> 16) & 255);
      } else if (d === 64) {
        str += String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255);
      } else {
        str += String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
      }
    }
    return JSON.parse(decodeURIComponent(escape(str)));
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
};

/**
 * Get current logged in user ID dynamically from storage or token
 * @returns {Promise<string|null>}
 */
export const getCurrentUserId = async () => {
  try {
    let userId = await AsyncStorage.getItem('@user_id');
    if (userId) return userId;
    
    const token = await AsyncStorage.getItem('@access_token');
    if (token) {
      const payload = parseJwt(token);
      userId = payload?.user_id || payload?.sub || payload?.id;
      if (userId) {
        await AsyncStorage.setItem('@user_id', String(userId));
        return String(userId);
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
};

/**
 * Clear all stored tokens and session data
 */
export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('@access_token');
    await AsyncStorage.removeItem('@refresh_token');
    await AsyncStorage.removeItem('@user_id');
    console.log('Tokens and user session cleared');
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
 * @returns {Promise<{success: boolean, access?: string, refresh?: string, userId?: string, error?: string}>}
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
    console.log('Login response content-type:', response.headers.get('content-type'));

    const rawText = await response.text();
    console.log('Login raw response:', rawText.substring(0, 500)); // Truncate to avoid log spam

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error('Failed to parse login response (non-JSON body):', parseError.message);
      console.error('Raw response was:', rawText.substring(0, 300));
      // Likely causes: ngrok interstitial page, Django HTML error page, or wrong URL
      const statusHint = response.status === 404
        ? 'Endpoint not found (404) — check DJANGO_LOGIN URL in Config.js'
        : response.status >= 500
        ? `Server error (${response.status}) — check Django logs`
        : `Unexpected response (HTTP ${response.status})`;
      return { success: false, error: `Invalid response from server. ${statusHint}` };
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: data?.detail || data?.message || 'Login failed' 
      };
    }

    // Store tokens and extract user_id
    if (data.access && data.refresh) {
      await AsyncStorage.setItem('@access_token', data.access);
      await AsyncStorage.setItem('@refresh_token', data.refresh);
      
      const payload = parseJwt(data.access);
      const userId = payload?.user_id || payload?.sub || payload?.id;
      if (userId) {
        await AsyncStorage.setItem('@user_id', String(userId));
        console.log('User ID stored:', userId);
      }
      
      console.log('Login successful, tokens stored');
      
      return {
        success: true,
        access: data.access,
        refresh: data.refresh,
        userId: userId ? String(userId) : null,
      };
    }

    return { success: false, error: 'No tokens received from server' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export default function TokenUtils() {
  return null;
}