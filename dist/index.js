"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import droneRoutes from './routes/droneRoutes';
// import missionRoutes from './routes/missionRoutes';
// import flightLogRoutes from './routes/flightLogRoutes';
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
// app.use('/api/drones', droneRoutes);
// app.use('/api/missions', missionRoutes);
// app.use('/api/flightLogs', flightLogRoutes);
// MongoDB connection
mongoose_1.default.connect(config_1.default.database)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Start the server
app.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
});
