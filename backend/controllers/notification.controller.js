import {asyncHandler} from '../utils/asyncHandler.js';
import notificationService from '../services/notification.service.js';

export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationService.getUserNotifications(req.userId);

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: { notifications }
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(
    req.params.id,
    req.userId
  );

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    data: { notification }
  });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.userId);

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.getUnreadCount(req.userId);

  res.status(200).json({
    success: true,
    data: { unreadCount: count }
  });
});