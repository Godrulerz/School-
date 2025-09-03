import { z } from 'zod';

export const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  contact: z.string().regex(/^\d{10}$/, 'Contact must be exactly 10 digits'),
  email: z.string().email('Please enter a valid email address'),
});