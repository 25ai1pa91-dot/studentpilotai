import { Schema, model, Document, Types } from 'mongoose';

export interface IChatMessage {
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokensUsed?: number;
}

export interface IMentorConversationDocument extends Document {
  ownerId: Types.ObjectId;
  title: string;
  messages: IChatMessage[];
  contextSnapshot: { activeNodeId?: string; targetRole?: string; readinessScore?: number };
  totalTokens: number;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  sender: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  tokensUsed: Number,
});

const MentorConversationSchema = new Schema<IMentorConversationDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, default: 'AI Mentor Chat' },
    messages: [ChatMessageSchema],
    contextSnapshot: {
      activeNodeId: String,
      targetRole: String,
      readinessScore: Number,
    },
    totalTokens: { type: Number, default: 0 },
    summary: String,
  },
  { timestamps: true }
);

MentorConversationSchema.index({ ownerId: 1, updatedAt: -1 });

export const MentorConversationModel = model<IMentorConversationDocument>(
  'MentorConversation',
  MentorConversationSchema
);
