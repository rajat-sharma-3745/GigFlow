import axios from './axiosConfig';

export const notificationAPI = {
  getUserNotifications: async () => {
    const response = await axios.get('/api/notifications');
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axios.get('/api/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axios.patch(`/api/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.patch('/api/notifications/mark-all-read');
    return response.data;
  },
};