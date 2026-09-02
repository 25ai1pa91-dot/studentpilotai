import { Schema, model, Document } from 'mongoose';

export interface IResourceDocument extends Document {
  title: string;
  category: string;
  resourceType: 'Book' | 'Article' | 'Video' | 'Course' | 'Doc' | 'Repo' | 'CheatSheet';
  url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  companies: string[];
  rating: number;
  bookmarksCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResourceDocument>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    resourceType: { type: String, required: true },
    url: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    companies: [String],
    rating: { type: Number, default: 4.8 },
    bookmarksCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ResourceSchema.index({ category: 1, resourceType: 1 });

export const ResourceModel = model<IResourceDocument>('Resource', ResourceSchema);
