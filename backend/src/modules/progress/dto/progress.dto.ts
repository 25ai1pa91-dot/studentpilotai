import { z } from 'zod';

export const ProgressZod = z.object({
  placementReadinessScore: z.number().optional(),
  streakDays: z.number().optional(),
});

export type ProgressDto = z.infer<typeof ProgressZod>;
