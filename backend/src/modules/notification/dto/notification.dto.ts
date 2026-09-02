import { z } from 'zod';

export const NotificationZod = z.object({
  type: z.enum(['achievement', 'reminder', 'system', 'ai_recommendation']),
  title: z.string().min(1),
  message: z.string().min(1),
  priority: z.enum(['high', 'medium', 'low']).optional(),
});

export type NotificationDto = z.infer<typeof NotificationZod>;
