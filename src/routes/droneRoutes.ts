import { Router } from 'express';
import {
  createDrone,
  getDrones,
  updateDrone,
  deleteDrone,
} from '../controllers/droneController';

const router = Router();

router.post('/drones', createDrone);
router.get('/drones', getDrones);
router.put('/drones/:id', updateDrone);
router.delete('/drones/:id', deleteDrone);

export default router;
