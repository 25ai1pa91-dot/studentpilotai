import { z } from 'zod';

export const createAchievementValidator = z.object({
  body: z.object({
    title: z.string().min(1),
    badge: z.string().min(1),
    milestoneType: z.string().min(1),
  }),
});
