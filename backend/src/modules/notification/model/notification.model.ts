import { Schema, model, Document, Types } from 'mongoose';

export interface INotificationDocument extends Document {
  ownerId: Types.ObjectId;
  type: 'achievement' | 'reminder' | 'system' | 'ai_recommendation';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  payload?: any;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotificationDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['achievement', 'reminder', 'system', 'ai_recommendation'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    isRead: { type: Boolean, default: false, index: true },
    payload: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

NotificationSchema.index({ ownerId: 1, isRead: 1 });

export const NotificationModel = model<INotificationDocument>('Notification', NotificationSchema);
