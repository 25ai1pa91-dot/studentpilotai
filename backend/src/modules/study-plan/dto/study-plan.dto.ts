import { z } from 'zod';

export const StudyPlanZod = z.object({
  date: z.string(),
  tasks: z.array(
    z.object({
      taskId: z.string(),
      title: z.string(),
      category: z.string(),
      priority: z.enum(['high', 'medium', 'low']).optional(),
      estimatedMinutes: z.number().optional(),
    })
  ),
});

export type StudyPlanDto = z.infer<typeof StudyPlanZod>;
