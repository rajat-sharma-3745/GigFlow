import axios from './axiosConfig';

export const gigAPI = {
  getAllGigs: async (search = '') => {
    const response = await axios.get('/api/gigs', {
      params: { search }
    });
    return response.data;
  },

  getGigById: async (id) => {
    const response = await axios.get(`/api/gigs/${id}`);
    return response.data;
  },

  createGig: async (gigData) => {
    const response = await axios.post('/api/gigs', gigData);
    return response.data;
  },

  getUserGigs: async () => {
    const response = await axios.get('/api/gigs/my-gigs');
    return response.data;
  },
};