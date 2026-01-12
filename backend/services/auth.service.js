import userRepository from '../repositories/user.repository.js';
import CustomError from '../utils/CustomError.js';
import { generateToken } from '../utils/jwt.utils.js';

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new CustomError('Email already registered', 400);
    }

    const user = await userRepository.create(userData);
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new CustomError('Invalid credentials', 401);
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  async getProfile(userId) {
    const user = await userRepository.findByIdWithoutPassword(userId);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    return user;
  }
}

export default new AuthService();