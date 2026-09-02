import { Schema, model, Document, Types } from 'mongoose';

export interface IRevisionDocument extends Document {
  ownerId: Types.ObjectId;
  nodeId: Types.ObjectId;
  revisionIntervalDays: number;
  nextRevisionDate: Date;
  memoryStrengthPct: number;
  decayRatePct: number;
  priority: 'High' | 'Medium' | 'Low';
  lastRevisedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RevisionSchema = new Schema<IRevisionDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    nodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode', required: true },
    revisionIntervalDays: { type: Number, default: 3 },
    nextRevisionDate: { type: Date, required: true, index: true },
    memoryStrengthPct: { type: Number, default: 100 },
    decayRatePct: { type: Number, default: 10 },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    lastRevisedAt: Date,
  },
  { timestamps: true }
);

RevisionSchema.index({ ownerId: 1, nextRevisionDate: 1 });

export const RevisionModel = model<IRevisionDocument>('Revision', RevisionSchema);
