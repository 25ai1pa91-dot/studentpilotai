import { z } from 'zod';

export const createNotificationValidator = z.object({
  body: z.object({
    type: z.enum(['achievement', 'reminder', 'system', 'ai_recommendation']),
    title: z.string().min(1),
    message: z.string().min(1),
  }),
});
