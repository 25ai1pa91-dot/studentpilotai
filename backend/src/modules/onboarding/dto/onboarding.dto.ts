import { z } from 'zod';

export const SaveAnswerZod = z.object({
  questionId: z.string().min(1, 'questionId is required'),
  value: z.any(),
});

export type SaveAnswerDto = z.infer<typeof SaveAnswerZod>;
