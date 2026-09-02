import { Schema, model, Document, Types } from 'mongoose';

export interface INotesDocument extends Document {
  ownerId: Types.ObjectId;
  nodeId?: Types.ObjectId;
  title: string;
  markdownContent: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotesSchema = new Schema<INotesDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    nodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode' },
    title: { type: String, required: true, trim: true },
    markdownContent: { type: String, default: '' },
    tags: [String],
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotesSchema.index({ ownerId: 1, isPinned: -1 });

export const NotesModel = model<INotesDocument>('Notes', NotesSchema);
