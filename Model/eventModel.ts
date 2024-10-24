// src/Model/eventModel.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

// Define the IEvent interface
export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    media: { url: string; type: 'image' | 'video' }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Define the event schema
const eventSchema: Schema<IEvent> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    media: [
        {
            url: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: ['image', 'video'],
            },
        },
    ],
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
    },
});

// Create the Event model
const Event: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
