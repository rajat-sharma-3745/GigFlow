import Gig from '../models/Gig.model.js';
import { GIG_STATUS } from '../config/constants.js';

class GigRepository {
  async create(gigData) {
    return await Gig.create(gigData);
  }

  async findAll(query = {}, search = '') {
    const filter = { ...query };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    return await Gig.find(filter)
      .populate('ownerId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Gig.findById(id)
      .populate('ownerId', 'name email')
      .populate('assignedTo', 'name email');
  }

  async updateStatus(id, status, assignedTo = null) {
    return await Gig.findByIdAndUpdate(
      id,
      { status, assignedTo },
      { new: true, runValidators: true }
    );
  }

  async findOpenGigs(search = '') {
    return await this.findAll({ status: GIG_STATUS.OPEN }, search);
  }
}

export default new GigRepository();