import pool from '../config/database';

export interface Task {
  id: number;
  tenant_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assigned_to: number | null;
  created_by: number;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export class TaskModel {
  static async create(
    tenantId: number,
    title: string,
    description: string | null,
    status: string,
    priority: string,
    assignedTo: number | null,
    createdBy: number,
    dueDate: Date | null
  ): Promise<Task> {
    const result = await pool.query(
      `INSERT INTO tasks (tenant_id, title, description, status, priority, assigned_to, created_by, due_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [tenantId, title, description, status, priority, assignedTo, createdBy, dueDate]
    );
    return result.rows[0];
  }

  static async findById(tenantId: number, id: number): Promise<Task | null> {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE tenant_id = $1 AND id = $2',
      [tenantId, id]
    );
    return result.rows[0] || null;
  }

  static async findAll(tenantId: number, filters?: { status?: string; assignedTo?: number }): Promise<Task[]> {
    let query = 'SELECT * FROM tasks WHERE tenant_id = $1';
    const params: any[] = [tenantId];
    let paramIndex = 2;

    if (filters?.status) {
      query += ` AND status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters?.assignedTo) {
      query += ` AND assigned_to = $${paramIndex}`;
      params.push(filters.assignedTo);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async update(
    tenantId: number,
    id: number,
    updates: Partial<Omit<Task, 'id' | 'tenant_id' | 'created_at' | 'created_by'>>
  ): Promise<Task | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) {
      return this.findById(tenantId, id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(tenantId, id);

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE tenant_id = $${paramIndex} AND id = $${paramIndex + 1} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(tenantId: number, id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM tasks WHERE tenant_id = $1 AND id = $2',
      [tenantId, id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async getStatsByTenant(tenantId: number) {
    const result = await pool.query(
      `SELECT 
        status,
        COUNT(*) as count
       FROM tasks 
       WHERE tenant_id = $1 
       GROUP BY status`,
      [tenantId]
    );
    return result.rows;
  }
}
