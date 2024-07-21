import { Router } from 'express';
import { downloadAllFlightLogs, downloadFlightLogs, getAllFlightLogs, getFlightLogs } from '../controllers/flightLogController';

const router = Router();

router.get('/flight-logs', getAllFlightLogs);
router.get('/flight-logs/:droneId', getFlightLogs);
router.post('/flight-logs/download', downloadAllFlightLogs);
router.get('/flight-logs/:droneId/download', downloadFlightLogs);

export default router;
