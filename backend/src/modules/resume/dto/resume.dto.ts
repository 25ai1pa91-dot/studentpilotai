import { z } from 'zod';

export const ResumeZod = z.object({
  versionName: z.string().optional(),
  template: z.enum(['FAANG', 'Modern', 'Minimal', 'Startup']).optional(),
  skills: z.array(z.string()).optional(),
});

export type ResumeDto = z.infer<typeof ResumeZod>;
