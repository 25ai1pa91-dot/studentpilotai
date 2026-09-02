import { z } from 'zod';

export const RoadmapZod = z.object({
  targetCareer: z.string().min(2),
});

export type RoadmapDto = z.infer<typeof RoadmapZod>;
