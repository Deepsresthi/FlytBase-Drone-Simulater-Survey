import { Request, Response } from 'express';
import flightLogService from '../services/flightLogService';

export const getAllFlightLogs = async (req: Request, res: Response) => {
    try {
        const allFlightLogs = await flightLogService.getAllFlightLogs();
        res.status(200).json(allFlightLogs);
    } catch (error) {
        res.status(400).json({ msg: (error as Error).message });
    }
}

export const downloadAllFlightLogs = async (req: Request, res: Response) => {
    try {
    const pdfStream = await flightLogService.generatePDFForAllFlightLogs();
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  } catch (error) {
    if (error instanceof Error) { 
      if (error.message === 'No flight logs found') {
        res.status(404).json({ msg: 'No flight logs found' });
      } else {
        res.status(500).json({ msg: 'An unexpected error occurred' });
      }
    } else {
      res.status(500).json({ msg: 'An unexpected error occurred' });
    }
  }
};

export const downloadFlightLogs = async (req: Request, res: Response) => {
    try {
    const pdfStream = await flightLogService.generatePDFForFlightLogs(req.params.droneId);
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  } catch (error) {
    if (error instanceof Error) { 
      if (error.message === 'No flight logs found') {
        res.status(404).json({ msg: 'No flight logs found' });
      } else {
        res.status(500).json({ msg: 'An unexpected error occurred' });
      }
    } else {
      res.status(500).json({ msg: 'An unexpected error occurred' });
    }
  }
};


export const getFlightLogs = async (req: Request, res: Response) => {
  try {
    const flightLogs = await flightLogService.getFlightLogs(req.params.droneId);
    res.status(200).json(flightLogs);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};


