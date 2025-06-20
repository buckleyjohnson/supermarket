// middleware/requireAuth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request { userId: number; roles: string[] }

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const { id, roles } = jwt.verify(token, process.env.JWT_SECRET!) as
      { id: number; roles: string[] };
    (req as AuthRequest).userId = id;
    (req as AuthRequest).roles  = roles;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};


// export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
//   const header = req.headers.authorization;          // "Bearer <token>"
//   const token  = header?.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: 'No token' });

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);
//     // @ts-ignore
//     req.userId = payload.id;                         // attach to request
//     next();
//   } catch {
//     res.status(401).json({ msg: 'Invalid or expired token' });
//   }
// };
