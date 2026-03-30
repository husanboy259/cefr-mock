import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../shared/errors';

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user?.isAdmin) {
    return next(new ForbiddenError('Admin access required'));
  }
  next();
}
