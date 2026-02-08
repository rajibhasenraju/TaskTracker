import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TenantModel } from '../models/Tenant';
import { UserModel } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static async register(req: AuthRequest, res: Response) {
    try {
      const { tenantName, subdomain, email, password, name } = req.body;

      // Validate input
      if (!tenantName || !subdomain || !email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if subdomain already exists
      const existingTenant = await TenantModel.findBySubdomain(subdomain);
      if (existingTenant) {
        return res.status(400).json({ error: 'Subdomain already taken' });
      }

      // Create tenant
      const tenant = await TenantModel.create(tenantName, subdomain);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create admin user for the tenant
      const user = await UserModel.create(tenant.id, email, hashedPassword, name, 'admin');

      // Generate token
      const token = jwt.sign(
        { id: user.id, tenantId: tenant.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: tenant.id,
          tenantName: tenant.name,
          subdomain: tenant.subdomain
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async login(req: AuthRequest, res: Response) {
    try {
      const { subdomain, email, password } = req.body;

      if (!subdomain || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Find tenant
      const tenant = await TenantModel.findBySubdomain(subdomain);
      if (!tenant) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Find user
      const user = await UserModel.findByEmail(tenant.id, email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, tenantId: tenant.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: tenant.id,
          tenantName: tenant.name,
          subdomain: tenant.subdomain
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await UserModel.findById(req.user.tenantId, req.user.id);
      const tenant = await TenantModel.findById(req.user.tenantId);

      if (!user || !tenant) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: tenant.id,
        tenantName: tenant.name,
        subdomain: tenant.subdomain
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
