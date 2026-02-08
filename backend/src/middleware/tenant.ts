import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const tenantMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure tenant context is set from authenticated user
  if (!req.user?.tenantId) {
    return res.status(403).json({ error: 'Tenant context required' });
  }
  next();
};

export const getTenantId = (req: AuthRequest): number => {
  if (!req.user?.tenantId) {
    throw new Error('Tenant context not found');
  }
  return req.user.tenantId;
};
