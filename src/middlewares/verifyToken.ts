import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  // Extract JWT token from authorization header
  const token = authHeader.substring('Bearer '.length);

  try {
    // Verify JWT token and extract user ID
    if (process.env.JWT_SECRET) {
      const decodedToken = <jwt.CustomJwtPayload>jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
    }
  } catch (error) {
    console.error(error);
  }

  next();
}