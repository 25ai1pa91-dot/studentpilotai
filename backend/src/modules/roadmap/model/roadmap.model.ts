import { Schema, model, Document, Types } from 'mongoose';

export interface IRoadmapDocument extends Document {
  ownerId: Types.ObjectId;
  targetCareer: string;
  unlockedNodeIds: Types.ObjectId[];
  completedNodeIds: Types.ObjectId[];
  currentNodeId?: Types.ObjectId;
  progressPct: number;
  totalXp: number;
  level: number;
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema = new Schema<IRoadmapDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    targetCareer: { type: String, required: true },
    unlockedNodeIds: [{ type: Schema.Types.ObjectId, ref: 'KnowledgeNode' }],
    completedNodeIds: [{ type: Schema.Types.ObjectId, ref: 'KnowledgeNode' }],
    currentNodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode' },
    progressPct: { type: Number, default: 0 },
    totalXp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    achievements: [String],
  },
  { timestamps: true }
);

RoadmapSchema.index({ ownerId: 1 });

export const RoadmapModel = model<IRoadmapDocument>('Roadmap', RoadmapSchema);
