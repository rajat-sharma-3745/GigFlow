import notificationRepository from '../repositories/notification.repository.js';
import { getIO } from '../config/socket.js';

class NotificationService {
  async createNotification(notificationData) {
    const notification = await notificationRepository.create(notificationData);
    return notification;
  }

  async createAndEmitNotification(notificationData) {
    const notification = await this.createNotification(notificationData);
    
    const io = getIO();
    if (io) {
      io.to(notificationData.userId.toString()).emit('notification', {
        id: notification._id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        gigId: notification.gigId,
        bidId: notification.bidId,
        createdAt: notification.createdAt
      });
    }

    return notification;
  }

  async getUserNotifications(userId) {
    return await notificationRepository.findByUserId(userId);
  }

  async markAsRead(notificationId, userId) {
    return await notificationRepository.markAsRead(notificationId, userId);
  }

  async markAllAsRead(userId) {
    return await notificationRepository.markAllAsRead(userId);
  }

  async getUnreadCount(userId) {
    return await notificationRepository.getUnreadCount(userId);
  }
}

export default new NotificationService();