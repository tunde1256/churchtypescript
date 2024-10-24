// src/controllers/eventController.ts
import { Request, Response } from 'express';
import upload from '../middleware/mutter'; // Ensure this is the correct import
import { uploadFileToCloudinary } from '../middleware/cloudinary'; // Ensure this matches the export
import Event, { IEvent } from '../Model/eventModel';
import { ParsedQs } from 'qs';

// Function to handle creating an event
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, description, date, location } = req.body;
        const media: { url: string; type: 'image' | 'video' }[] = [];

        // Process files
        if (req.files) {
            const files = req.files as Express.Multer.File[];

            for (const file of files) {
                const type = file.mimetype.startsWith('image') ? 'image' : 'video';
                const url = await uploadFileToCloudinary(file.buffer); // Use file.buffer for upload
                media.push({ url, type });
            }
        }

        // Create new event
        const newEvent = await Event.create({
            title,
            description,
            date,
            location,
            media,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Function to handle updating


// Function to handle updating an event
export const updateEvent = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;

        // Create an object with only the fields that can be updated
        const updatedFields: Partial<IEvent> = { title, description, date, location };

        const event = await Event.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update event' });
    }
};

// Function to handle deleting an event
export const deleteEvent = async (req: Request, res: Response):Promise<any> => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

// Function to handle getting all events
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get events' });
    }
};

// Function to handle getting an event by ID
export const getEventById = async (req: Request, res: Response):Promise<any> => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get event' });
    }
};

// Function to handle filtering events by date
export const getEventsByDate = async (
    req: Request<{}, {}, {}, { startDate?: string | ParsedQs | string[]; endDate?: string | ParsedQs | string[] }>,
    res: Response
): Promise<any> => {
    try {
        const { startDate, endDate } = req.query;

        // Validate and parse the start date
        if (!startDate || Array.isArray(startDate)) {
            return res.status(400).json({ error: 'Invalid startDate' });
        }

        // Validate and parse the end date
        if (!endDate || Array.isArray(endDate)) {
            return res.status(400).json({ error: 'Invalid endDate' });
        }

        // Cast to string for safe usage
        const startDateString = startDate as string;
        const endDateString = endDate as string;

        const startDateDate = new Date(startDateString);
        const endDateDate = new Date(endDateString);

        // Check if dates are valid
        if (isNaN(startDateDate.getTime()) || isNaN(endDateDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date range' });
        }

        const events = await Event.find({ date: { $gte: startDateDate, $lte: endDateDate } });

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get events by date' });
    }
};