import { Router } from 'express';
import {
  getMissions,
  updateMission,
  deleteMission,
  startMission,
  stopMission,
  createMissionController,
} from '../controllers/missionController';

const router = Router();

router.post('/missions', createMissionController);
router.get('/missions', getMissions);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id', deleteMission);
router.post('/missions/:id/start', startMission);
router.post('/missions/:id/stop', stopMission);

export default router;
