"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); // Ensure this is the first import
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const AdminRoutes_1 = __importDefault(require("./Routes/AdminRoutes"));
const baranchRoutes_1 = __importDefault(require("./Routes/baranchRoutes"));
const eventRoutes_1 = __importDefault(require("./Routes/eventRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
const MONGODB_URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
// Database connection
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/admins', AdminRoutes_1.default);
app.use('/api/branches', baranchRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
