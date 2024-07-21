import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const message = await authService.register(req.body);
    res.status(201).json({ message });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: 'An unexpected error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: 'An unexpected error occurred' });
    }
  }
};
