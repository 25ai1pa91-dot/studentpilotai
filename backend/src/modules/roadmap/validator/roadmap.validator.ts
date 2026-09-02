import { z } from 'zod';

export const createRoadmapValidator = z.object({
  body: z.object({
    targetCareer: z.string().min(2),
  }),
});
