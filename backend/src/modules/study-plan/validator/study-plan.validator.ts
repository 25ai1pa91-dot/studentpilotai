import { z } from 'zod';

export const createStudyPlanValidator = z.object({
  body: z.object({
    date: z.string(),
    tasks: z.array(
      z.object({
        taskId: z.string(),
        title: z.string(),
        category: z.string(),
      })
    ),
  }),
});
