import mongoose from 'mongoose';
import { BID_STATUS } from '../config/constants.js';

const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: true
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    status: {
      type: String,
      enum: Object.values(BID_STATUS),
      default: BID_STATUS.PENDING
    }
  },
  {
    timestamps: true
  }
);

bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });
bidSchema.index({ gigId: 1, status: 1 });
bidSchema.index({ freelancerId: 1 });

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;