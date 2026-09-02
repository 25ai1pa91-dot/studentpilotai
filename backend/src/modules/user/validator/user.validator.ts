import { z } from 'zod';

export const createUserValidator = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  }),
});

export const updateUserValidator = z.object({
  body: createUserValidator.shape.body.partial(),
});
