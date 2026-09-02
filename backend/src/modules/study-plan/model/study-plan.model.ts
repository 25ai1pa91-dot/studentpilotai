import { Schema, model, Document, Types } from 'mongoose';

export interface IStudyTask {
  taskId: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  isCompleted: boolean;
  completedAt?: Date;
  aiReason?: string;
  nodeId?: Types.ObjectId;
}

export interface IStudyPlanDocument extends Document {
  ownerId: Types.ObjectId;
  date: string; // YYYY-MM-DD
  tasks: IStudyTask[];
  createdAt: Date;
  updatedAt: Date;
}

const StudyTaskSchema = new Schema<IStudyTask>({
  taskId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  estimatedMinutes: { type: Number, default: 45 },
  isCompleted: { type: Boolean, default: false },
  completedAt: Date,
  aiReason: String,
  nodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode' },
});

const StudyPlanSchema = new Schema<IStudyPlanDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true, index: true },
    tasks: [StudyTaskSchema],
  },
  { timestamps: true }
);

StudyPlanSchema.index({ ownerId: 1, date: 1 }, { unique: true });

export const StudyPlanModel = model<IStudyPlanDocument>('StudyPlan', StudyPlanSchema);
