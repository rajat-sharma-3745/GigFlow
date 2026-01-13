export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const GIG_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned'
};

export const BID_STATUS = {
  PENDING: 'pending',
  HIRED: 'hired',
  REJECTED: 'rejected'
};

export const NOTIFICATION_TYPES = {
  BID_RECEIVED: 'bid_received',
  HIRED: 'hired',
  BID_REJECTED: 'bid_rejected'
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};