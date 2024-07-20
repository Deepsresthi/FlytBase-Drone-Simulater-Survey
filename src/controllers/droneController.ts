import { Request, Response } from 'express';
import droneService from '../services/droneService';

export const createDrone = async (req: Request, res: Response) => {
  try {
    const drone = await droneService.createDrone(req.body);
    res.status(201).json(drone);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const getDrones = async (req: Request, res: Response) => {
  try {
    const drones = await droneService.getDrones();
    res.status(200).json(drones);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const updateDrone = async (req: Request, res: Response) => {
  try {
    const drone = await droneService.updateDrone(req.params.id, req.body);
    res.status(200).json(drone);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const deleteDrone = async (req: Request, res: Response) => {
  try {
    await droneService.deleteDrone(req.params.id);
    res.status(200).json({ msg: 'Drone deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};
