import { z } from 'zod';

export const updateProgressValidator = z.object({
  body: z.object({
    placementReadinessScore: z.number().optional(),
    streakDays: z.number().optional(),
  }),
});
