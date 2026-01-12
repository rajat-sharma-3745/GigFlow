import express from 'express';
import {
  createBid,
  getBidsByGigId,
  getUserBids,
  hireBid
} from '../controllers/bid.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBid);
router.get('/my-bids', protect, getUserBids);
router.get('/:gigId', protect, getBidsByGigId);
router.patch('/:bidId/hire', protect, hireBid);

export default router;