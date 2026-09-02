import { z } from 'zod';

export const AchievementZod = z.object({
  title: z.string().min(1),
  badge: z.string().min(1),
  xpEarned: z.number().optional(),
  milestoneType: z.string().min(1),
});

export type AchievementDto = z.infer<typeof AchievementZod>;
