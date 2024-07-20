import { Request, Response } from 'express';
import flightLogService from '../services/flightLogService';

export const getFlightLogs = async (req: Request, res: Response) => {
  try {
    const flightLogs = await flightLogService.getFlightLogs(req.params.droneId);
    res.status(200).json(flightLogs);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};
