import { Request, Response } from 'express';
import missionService, {
  createMissionService,
} from '../services/missionService';

export const createMissionController = async (req: Request, res: Response) => {
  const missionData = req.body;
  const droneId = missionData.drone_id;
  try {
    const mission = await createMissionService(missionData, droneId);
    res.status(201).json(mission);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const getMissions = async (req: Request, res: Response) => {
  try {
    const missions = await missionService.getMissions();
    res.status(200).json(missions);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const updateMission = async (req: Request, res: Response) => {
  try {
    const mission = await missionService.updateMission(req.params.id, req.body);
    res.status(200).json(mission);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const deleteMission = async (req: Request, res: Response) => {
  try {
    await missionService.deleteMission(req.params.id);
    res.status(200).json({ msg: 'Mission deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const startMission = async (req: Request, res: Response) => {
  try {
    const flightLog = await missionService.startMission(req.params.id);
    res.status(200).json(flightLog);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const stopMission = async (req: Request, res: Response) => {
  try {
    const flightLog = await missionService.stopMission(req.params.id);
    res.status(200).json(flightLog);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};
