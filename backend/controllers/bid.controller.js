import asyncHandler from '../middleware/asyncHandler.js';
import bidService from '../services/bid.service.js';
import { bidSchema } from '../utils/validators.js';

export const createBid = asyncHandler(async (req, res) => {
  const validatedData = bidSchema.parse(req.body);

  const bid = await bidService.createBid(validatedData, req.userId);

  res.status(201).json({
    success: true,
    message: 'Bid submitted successfully',
    data: { bid }
  });
});

export const getBidsByGigId = asyncHandler(async (req, res) => {
  const bids = await bidService.getBidsByGigId(req.params.gigId, req.userId);

  res.status(200).json({
    success: true,
    count: bids.length,
    data: { bids }
  });
});

export const getUserBids = asyncHandler(async (req, res) => {
  const bids = await bidService.getUserBids(req.userId);

  res.status(200).json({
    success: true,
    count: bids.length,
    data: { bids }
  });
});

export const hireBid = asyncHandler(async (req, res) => {
  const bid = await bidService.hireBid(req.params.bidId, req.userId);

  res.status(200).json({
    success: true,
    message: 'Freelancer hired successfully',
    data: { bid }
  });
});