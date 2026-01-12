import express from 'express';
import {
  createGig,
  getAllGigs,
  getGigById,
  getUserGigs
} from '../controllers/gig.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllGigs);
router.post('/', protect, createGig);
router.get('/my-gigs', protect, getUserGigs);
router.get('/:id', getGigById);

export default router;