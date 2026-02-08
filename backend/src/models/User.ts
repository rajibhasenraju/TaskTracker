import pool from '../config/database';

export interface User {
  id: number;
  tenant_id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  static async create(tenantId: number, email: string, password: string, name: string, role: string = 'user'): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (tenant_id, email, password, name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tenantId, email, password, name, role]
    );
    return result.rows[0];
  }

  static async findByEmail(tenantId: number, email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE tenant_id = $1 AND email = $2',
      [tenantId, email]
    );
    return result.rows[0] || null;
  }

  static async findById(tenantId: number, id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE tenant_id = $1 AND id = $2',
      [tenantId, id]
    );
    return result.rows[0] || null;
  }

  static async findAllByTenant(tenantId: number): Promise<User[]> {
    const result = await pool.query(
      'SELECT id, tenant_id, email, name, role, created_at, updated_at FROM users WHERE tenant_id = $1',
      [tenantId]
    );
    return result.rows;
  }
}
