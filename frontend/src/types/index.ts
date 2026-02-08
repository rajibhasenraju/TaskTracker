export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  tenantId: number;
  tenantName: string;
  subdomain: string;
}

export interface Task {
  id: number;
  tenant_id: number;
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigned_to: number | null;
  created_by: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TaskStats {
  total: number;
  byStatus: Record<string, number>;
}
