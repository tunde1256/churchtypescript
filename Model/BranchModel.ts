import mongoose, { Schema, Model, Document } from "mongoose";

// Define the IBranch interface
export interface IBranch extends Document {
  name: string;            // Name of the branch
  location: string;        // Location of the branch
  contactNumber: string;   // Contact number of the branch
  email: string;           // Email address of the branch
  serviceTimes: string[];  // Array of service times
  isActive: boolean;       // Status of the branch
  createdAt: Date;         // Timestamp for creation
  updatedAt: Date;         // Timestamp for updates
}

// Define the branch schema
const branchSchema: Schema<IBranch> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  serviceTimes: {
    type: [String],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Assuming branches are active by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
branchSchema.pre<IBranch>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the Branch model
const Branch: Model<IBranch> = mongoose.model<IBranch>("Branch", branchSchema);

export default Branch;
