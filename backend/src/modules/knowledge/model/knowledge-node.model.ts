import { Schema, model, Document, Types } from 'mongoose';

export interface IKnowledgeNodeDocument extends Document {
  nodeType: 'skill' | 'topic' | 'subtopic' | 'project' | 'quiz' | 'interview' | 'company' | 'resource';
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  estimatedTime: string;
  companies: string[];
  resources: { name: string; type: string; url: string }[];
  prerequisites: Types.ObjectId[];
  children: Types.ObjectId[];
  tags: string[];
  status: 'active' | 'archived' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeNodeSchema = new Schema<IKnowledgeNodeDocument>(
  {
    nodeType: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    category: { type: String, required: true, index: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    xp: { type: Number, default: 100 },
    estimatedTime: String,
    companies: [String],
    resources: [{ name: String, type: String, url: String }],
    prerequisites: [{ type: Schema.Types.ObjectId, ref: 'KnowledgeNode' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'KnowledgeNode' }],
    tags: [String],
    status: { type: String, enum: ['active', 'archived', 'draft'], default: 'active' },
  },
  { timestamps: true }
);

KnowledgeNodeSchema.index({ slug: 1 });
KnowledgeNodeSchema.index({ category: 1, nodeType: 1 });
KnowledgeNodeSchema.index({ companies: 1 });

export const KnowledgeNodeModel = model<IKnowledgeNodeDocument>('KnowledgeNode', KnowledgeNodeSchema);
