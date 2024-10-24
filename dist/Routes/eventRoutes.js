"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../Controller/eventController");
const multer_1 = __importDefault(require("multer")); // For file uploads
const router = (0, express_1.Router)();
// Setup multer for file upload (single files or arrays for multiple uploads)
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Routes
router.post('/events', upload.fields([{ name: 'video' }, { name: 'picture' }]), eventController_1.createEvent);
router.get('/events', eventController_1.getAllEvents);
router.get('/events/:id', eventController_1.getEventById);
router.put('/events/:id', upload.fields([{ name: 'video' }, { name: 'picture' }]), eventController_1.updateEvent);
router.delete('/events/:id', eventController_1.deleteEvent);
router.get('/events/date', eventController_1.getEventsByDate); // Example route for filtering by date
exports.default = router;
