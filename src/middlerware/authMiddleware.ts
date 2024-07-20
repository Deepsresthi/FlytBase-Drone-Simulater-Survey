import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ExtendedRequest from '../types/express.ds';

export const authMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // const token = req.header['Authorization']?.replace('Bearer ', '');
  // if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No Token Attached' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
