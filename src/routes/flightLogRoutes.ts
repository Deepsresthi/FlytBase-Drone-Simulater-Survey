import { Router } from 'express';
import { getFlightLogs } from '../controllers/flightLogController';

const router = Router();

router.get('/flight-logs/:droneId', getFlightLogs);

export default router;
