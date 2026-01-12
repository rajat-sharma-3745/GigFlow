import User from '../models/User.model.js';

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select('+password');
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByIdWithoutPassword(id) {
    return await User.findById(id).select('-password');
  }
}

export default new UserRepository();