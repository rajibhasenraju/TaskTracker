import pool from '../config/database';

export interface Tenant {
  id: number;
  name: string;
  subdomain: string;
  created_at: Date;
  updated_at: Date;
}

export class TenantModel {
  static async create(name: string, subdomain: string): Promise<Tenant> {
    const result = await pool.query(
      'INSERT INTO tenants (name, subdomain) VALUES ($1, $2) RETURNING *',
      [name, subdomain]
    );
    return result.rows[0];
  }

  static async findById(id: number): Promise<Tenant | null> {
    const result = await pool.query('SELECT * FROM tenants WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    const result = await pool.query('SELECT * FROM tenants WHERE subdomain = $1', [subdomain]);
    return result.rows[0] || null;
  }
}
