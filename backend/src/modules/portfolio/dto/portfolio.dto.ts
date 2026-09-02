import { z } from 'zod';

export const PortfolioZod = z.object({
  theme: z.enum(['Linear', 'Vercel', 'Apple']).optional(),
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
});

export type PortfolioDto = z.infer<typeof PortfolioZod>;
