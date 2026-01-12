import Bid from '../models/Bid.model.js';
import mongoose from 'mongoose';

class BidRepository {
  async create(bidData) {
    return await Bid.create(bidData);
  }

  async findById(id) {
    return await Bid.findById(id)
      .populate('freelancerId', 'name email')
      .populate('gigId');
  }

  async findByGigId(gigId) {
    return await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });
  }

  async findByFreelancerId(freelancerId) {
    return await Bid.find({ freelancerId })
      .populate('gigId')
      .sort({ createdAt: -1 });
  }

  async updateStatus(id, status) {
    return await Bid.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  async updateManyStatuses(gigId, excludeBidId, status) {
    return await Bid.updateMany(
      { gigId, _id: { $ne: excludeBidId } },
      { status }
    );
  }

  // Transactional method for hiring
  async hireWithTransaction(bidId, session) {
    const bid = await Bid.findById(bidId).session(session);
    
    if (!bid) {
      throw new Error('Bid not found');
    }

    bid.status = 'hired';
    await bid.save({ session });

    await Bid.updateMany(
      { 
        gigId: bid.gigId, 
        _id: { $ne: bidId } 
      },
      { status: 'rejected' },
      { session }
    );

    return bid;
  }

  async checkExistingBid(gigId, freelancerId) {
    return await Bid.findOne({ gigId, freelancerId });
  }
}

export default new BidRepository();