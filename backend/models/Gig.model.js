import mongoose from 'mongoose';
import { GIG_STATUS } from '../config/constants.js';

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters']
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [0, 'Budget must be a positive number']
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: Object.values(GIG_STATUS),
      default: GIG_STATUS.OPEN
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
);

gigSchema.index({ title: 'text', description: 'text' });
gigSchema.index({ status: 1 });
gigSchema.index({ ownerId: 1 });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;