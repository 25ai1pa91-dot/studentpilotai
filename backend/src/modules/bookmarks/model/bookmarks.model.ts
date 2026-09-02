import { Schema, model, Document, Types } from 'mongoose';

export interface IBookmarkDocument extends Document {
  ownerId: Types.ObjectId;
  resourceId?: Types.ObjectId;
  nodeId?: Types.ObjectId;
  problemId?: Types.ObjectId;
  itemType: 'resource' | 'node' | 'problem';
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmarkDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource' },
    nodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode' },
    problemId: { type: Schema.Types.ObjectId, ref: 'CodingProblem' },
    itemType: { type: String, enum: ['resource', 'node', 'problem'], required: true },
  },
  { timestamps: true }
);

BookmarkSchema.index({ ownerId: 1, itemType: 1 });

export const BookmarkModel = model<IBookmarkDocument>('Bookmark', BookmarkSchema);
