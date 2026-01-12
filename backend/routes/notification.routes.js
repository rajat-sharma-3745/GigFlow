import express from 'express';
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount
} from '../controllers/notification.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getUserNotifications);
router.get('/unread-count', protect, getUnreadCount);
router.patch('/:id/read', protect, markAsRead);
router.patch('/mark-all-read', protect, markAllAsRead);

export default router;