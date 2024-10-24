"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsByDate = exports.getEventById = exports.getAllEvents = exports.deleteEvent = exports.updateEvent = exports.createEvent = void 0;
const cloudinary_1 = require("../middleware/cloudinary"); // Ensure this matches the export
const eventModel_1 = __importDefault(require("../Model/eventModel"));
// Function to handle creating an event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date, location } = req.body;
        const media = [];
        // Process files
        if (req.files) {
            const files = req.files;
            for (const file of files) {
                const type = file.mimetype.startsWith('image') ? 'image' : 'video';
                const url = yield (0, cloudinary_1.uploadFileToCloudinary)(file.buffer); // Use file.buffer for upload
                media.push({ url, type });
            }
        }
        // Create new event
        const newEvent = yield eventModel_1.default.create({
            title,
            description,
            date,
            location,
            media,
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});
exports.createEvent = createEvent;
// Function to handle updating
// Function to handle updating an event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;
        // Create an object with only the fields that can be updated
        const updatedFields = { title, description, date, location };
        const event = yield eventModel_1.default.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});
exports.updateEvent = updateEvent;
// Function to handle deleting an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedEvent = yield eventModel_1.default.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});
exports.deleteEvent = deleteEvent;
// Function to handle getting all events
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventModel_1.default.find();
        res.json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get events' });
    }
});
exports.getAllEvents = getAllEvents;
// Function to handle getting an event by ID
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield eventModel_1.default.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get event' });
    }
});
exports.getEventById = getEventById;
// Function to handle filtering events by date
const getEventsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const startDateString = startDate;
        const endDateString = endDate;
        const startDateDate = new Date(startDateString);
        const endDateDate = new Date(endDateString);
        // Check if dates are valid
        if (isNaN(startDateDate.getTime()) || isNaN(endDateDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date range' });
        }
        const events = yield eventModel_1.default.find({ date: { $gte: startDateDate, $lte: endDateDate } });
        res.json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get events by date' });
    }
});
exports.getEventsByDate = getEventsByDate;
