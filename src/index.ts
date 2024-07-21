import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import authRoutes from './routes/authRoutes';
import droneRoutes from './routes/droneRoutes';
import missionRoutes from './routes/missionRoutes';
import flightLogRoutes from './routes/flightLogRoutes';
import { authMiddleware } from './middlerware/authMiddleware';

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', authMiddleware, droneRoutes);
app.use('/api', authMiddleware, missionRoutes);
app.use('/api', authMiddleware, flightLogRoutes);

mongoose
  .connect(config.database)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
