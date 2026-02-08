import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { TaskModel } from '../models/Task';
import { getTenantId } from '../middleware/tenant';

export class TaskController {
  static async createTask(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const { title, description, status, priority, assignedTo, dueDate } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = await TaskModel.create(
        tenantId,
        title,
        description || null,
        status || 'todo',
        priority || 'medium',
        assignedTo || null,
        req.user!.id,
        dueDate ? new Date(dueDate) : null
      );

      res.status(201).json(task);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getTasks(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const { status, assignedTo } = req.query;

      const filters: any = {};
      if (status) filters.status = status as string;
      if (assignedTo) filters.assignedTo = parseInt(assignedTo as string);

      const tasks = await TaskModel.findAll(tenantId, filters);
      res.json(tasks);
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getTask(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const taskId = parseInt(req.params.id);

      const task = await TaskModel.findById(tenantId, taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Get task error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async updateTask(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const taskId = parseInt(req.params.id);
      const { title, description, status, priority, assigned_to, due_date } = req.body;

      const updates: any = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (status !== undefined) updates.status = status;
      if (priority !== undefined) updates.priority = priority;
      if (assigned_to !== undefined) updates.assigned_to = assigned_to;
      if (due_date !== undefined) updates.due_date = due_date ? new Date(due_date) : null;

      const task = await TaskModel.update(tenantId, taskId, updates);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const taskId = parseInt(req.params.id);

      const deleted = await TaskModel.delete(tenantId, taskId);
      if (!deleted) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getStats(req: AuthRequest, res: Response) {
    try {
      const tenantId = getTenantId(req);
      const stats = await TaskModel.getStatsByTenant(tenantId);
      
      const statsMap: Record<string, number> = {};
      stats.forEach(stat => {
        statsMap[stat.status] = parseInt(stat.count);
      });

      res.json({
        total: stats.reduce((sum, stat) => sum + parseInt(stat.count), 0),
        byStatus: statsMap
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
