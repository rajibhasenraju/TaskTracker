import axios from 'axios';
import { AuthResponse, Task, TaskStats, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (data: {
    tenantName: string;
    subdomain: string;
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: {
    subdomain: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const taskService = {
  getTasks: async (filters?: { status?: string; assignedTo?: number }): Promise<Task[]> => {
    const response = await api.get('/tasks', { params: filters });
    return response.data;
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    assignedTo?: number;
    dueDate?: string;
  }): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  updateTask: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getStats: async (): Promise<TaskStats> => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },
};

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
