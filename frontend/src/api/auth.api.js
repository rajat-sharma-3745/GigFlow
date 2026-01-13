import axios from './axiosConfig';

export const authAPI = {
  register: async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/api/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/api/auth/profile');
    return response.data;
  },
};