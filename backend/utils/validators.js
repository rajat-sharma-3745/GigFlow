import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const gigSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  budget: z.number().positive('Budget must be a positive number')
});

export const bidSchema = z.object({
  gigId: z.string().min(1, 'Gig ID is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  price: z.number().positive('Price must be a positive number')
});