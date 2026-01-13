import gigRepository from '../repositories/gig.repository.js';
import {CustomError} from '../utils/CustomError.js';
import { GIG_STATUS } from '../config/constants.js';

class GigService {
  async createGig(gigData, ownerId) {
    const gig = await gigRepository.create({
      ...gigData,
      ownerId
    });

    return await gigRepository.findById(gig._id);
  }

  async getAllGigs(search = '') {
    return await gigRepository.findOpenGigs(search);
  }

  async getGigById(gigId) {
    const gig = await gigRepository.findById(gigId);

    if (!gig) {
      throw new CustomError('Gig not found', 404);
    }

    return gig;
  }

  async updateGigStatus(gigId, status, assignedTo = null) {
    const gig = await gigRepository.findById(gigId);

    if (!gig) {
      throw new CustomError('Gig not found', 404);
    }

    return await gigRepository.updateStatus(gigId, status, assignedTo);
  }

  async getUserGigs(userId) {
    return await gigRepository.findAll({ ownerId: userId });
  }
}

export default new GigService();