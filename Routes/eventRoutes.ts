import { Router } from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventsByDate, // Make sure to import this if you intend to use it
} from '../Controller/eventController';
import multer from 'multer';  // For file uploads

const router = Router();

// Setup multer for file upload (single files or arrays for multiple uploads)
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/events', upload.fields([{ name: 'video' }, { name: 'picture' }]), createEvent);
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', upload.fields([{ name: 'video' }, { name: 'picture' }]), updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/date', getEventsByDate); // Example route for filtering by date

export default router;
