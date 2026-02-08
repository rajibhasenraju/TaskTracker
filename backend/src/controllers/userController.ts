import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { UserModel } from '../models/User';
import { getTenantId } from '../middleware/tenant';

export class UserController {
  static async getUsers(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const users = await UserModel.findAllByTenant(tenantId);
      res.json(users);
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getUser(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const userId = parseInt(req.params.id);

      const user = await UserModel.findById(tenantId, userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Don't send password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
