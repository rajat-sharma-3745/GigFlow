import {asyncHandler} from '../utils/asyncHandler.js';
import gigService from '../services/gig.service.js';
import { gigSchema } from '../utils/validators.js';

export const createGig = asyncHandler(async (req, res) => {
  const validatedData = gigSchema.parse(req.body);

  const gig = await gigService.createGig(validatedData, req.userId);

  res.status(201).json({
    success: true,
    message: 'Gig created successfully',
    data: { gig }
  });
});

export const getAllGigs = asyncHandler(async (req, res) => {
  const { search = '' } = req.query;

  const gigs = await gigService.getAllGigs(search);

  res.status(200).json({
    success: true,
    count: gigs.length,
    data: { gigs }
  });
});

export const getGigById = asyncHandler(async (req, res) => {
  const gig = await gigService.getGigById(req.params.id);

  res.status(200).json({
    success: true,
    data: { gig }
  });
});

export const getUserGigs = asyncHandler(async (req, res) => {
  const gigs = await gigService.getUserGigs(req.userId);

  res.status(200).json({
    success: true,
    count: gigs.length,
    data: { gigs }
  });
});



