import { z } from 'zod';

export const updatePortfolioValidator = z.object({
  body: z.object({
    theme: z.enum(['Linear', 'Vercel', 'Apple']).optional(),
    name: z.string().optional(),
    role: z.string().optional(),
  }),
});
