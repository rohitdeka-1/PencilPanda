const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authAPI = {
  // Local auth
  signup: async (data) => {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Google OAuth
  googleAuth: async (credential) => {
    const response = await fetch(`${API_URL}/api/v1/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/api/v1/auth/profile`, {
      credentials: 'include',
    });
    return response.json();
  },
};
