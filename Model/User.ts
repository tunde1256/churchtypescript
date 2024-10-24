import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User Document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Pre-save hook to update the updatedAt field
userSchema.pre<IUser>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export User model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
