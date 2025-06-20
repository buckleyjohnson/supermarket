// src/middleware/requireRoles.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Usage:
 *   router.post('/inventory',
 *     requireAuth,
 *     requireRoles('Inventory Manager', 'System Administrator'),
 *     addItem);
 */
export const requireRoles =
  (...needed: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const roles = (req as any).roles as string[] | undefined;

    if (!roles || !needed.some(r => roles.includes(r))) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    next();
  };
