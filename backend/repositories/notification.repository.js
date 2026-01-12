import Notification from '../models/Notification.model.js';

class NotificationRepository {
  async create(notificationData) {
    return await Notification.create(notificationData);
  }

  async findByUserId(userId, limit = 50) {
    return await Notification.find({ userId })
      .populate('gigId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async markAsRead(notificationId, userId) {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId) {
    return await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
  }

  async getUnreadCount(userId) {
    return await Notification.countDocuments({ userId, isRead: false });
  }
}

export default new NotificationRepository();