import mongoose from 'mongoose';
import bidRepository from '../repositories/bid.repository.js';
import gigRepository from '../repositories/gig.repository.js';
import notificationService from './notification.service.js';
import CustomError from '../utils/CustomError.js';
import { GIG_STATUS, BID_STATUS, NOTIFICATION_TYPES } from '../config/constants.js';

class BidService {
  async createBid(bidData, freelancerId) {
    const gig = await gigRepository.findById(bidData.gigId);

    if (!gig) {
      throw new CustomError('Gig not found', 404);
    }

    if (gig.status !== GIG_STATUS.OPEN) {
      throw new CustomError('This gig is no longer accepting bids', 400);
    }

    if (gig.ownerId._id.toString() === freelancerId) {
      throw new CustomError('You cannot bid on your own gig', 400);
    }

    const existingBid = await bidRepository.checkExistingBid(
      bidData.gigId,
      freelancerId
    );

    if (existingBid) {
      throw new CustomError('You have already bid on this gig', 400);
    }

    const bid = await bidRepository.create({
      ...bidData,
      freelancerId
    });

    await notificationService.createNotification({
      userId: gig.ownerId._id,
      type: NOTIFICATION_TYPES.BID_RECEIVED,
      title: 'New Bid Received',
      message: `You received a new bid on "${gig.title}"`,
      gigId: gig._id,
      bidId: bid._id
    });

    return await bidRepository.findById(bid._id);
  }

  async getBidsByGigId(gigId, userId) {
    const gig = await gigRepository.findById(gigId);

    if (!gig) {
      throw new CustomError('Gig not found', 404);
    }

    if (gig.ownerId._id.toString() !== userId) {
      throw new CustomError('You are not authorized to view these bids', 403);
    }

    return await bidRepository.findByGigId(gigId);
  }

  async getUserBids(freelancerId) {
    return await bidRepository.findByFreelancerId(freelancerId);
  }

  // Hire with MongoDB Transaction to prevent race conditions
  async hireBid(bidId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const bid = await bidRepository.findById(bidId);

      if (!bid) {
        throw new CustomError('Bid not found', 404);
      }

      const gig = await gigRepository.findById(bid.gigId._id);

      if (!gig) {
        throw new CustomError('Gig not found', 404);
      }

      if (gig.ownerId._id.toString() !== userId) {
        throw new CustomError('You are not authorized to hire for this gig', 403);
      }

      if (gig.status !== GIG_STATUS.OPEN) {
        throw new CustomError('This gig has already been assigned', 400);
      }

      if (bid.status !== BID_STATUS.PENDING) {
        throw new CustomError('This bid is no longer available', 400);
      }

      const updatedBid = await bidRepository.hireWithTransaction(bidId, session);

      await gigRepository.updateStatus(
        gig._id,
        GIG_STATUS.ASSIGNED,
        bid.freelancerId._id
      );

      await notificationService.createAndEmitNotification({
        userId: bid.freelancerId._id,
        type: NOTIFICATION_TYPES.HIRED,
        title: 'Congratulations! You were hired',
        message: `You have been hired for "${gig.title}"!`,
        gigId: gig._id,
        bidId: bid._id
      });

      const rejectedBids = await bidRepository.findByGigId(gig._id);
      
      for (const rejectedBid of rejectedBids) {
        if (rejectedBid._id.toString() !== bidId && rejectedBid.status === BID_STATUS.REJECTED) {
          await notificationService.createAndEmitNotification({
            userId: rejectedBid.freelancerId._id,
            type: NOTIFICATION_TYPES.BID_REJECTED,
            title: 'Bid Not Selected',
            message: `Your bid for "${gig.title}" was not selected`,
            gigId: gig._id,
            bidId: rejectedBid._id
          });
        }
      }

      await session.commitTransaction();

      return await bidRepository.findById(updatedBid._id);

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new BidService();