import dotenv from 'dotenv';  // Ensure this is the first import
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoutes';
import adminRoutes from './Routes/AdminRoutes';
import branchRoutes from './Routes/baranchRoutes';
import EventRoutes from './Routes/eventRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const MONGODB_URI='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
// Database connection
mongoose.connect(MONGODB_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/events', EventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
