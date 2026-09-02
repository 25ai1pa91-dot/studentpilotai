import { z } from 'zod';

export const MentorConversationZod = z.object({
  title: z.string().optional(),
  message: z.string().min(1),
});

export type MentorConversationDto = z.infer<typeof MentorConversationZod>;
