import React from 'react';
import type { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onUpdateStatus: (taskId: number, status: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onEditTask, onDeleteTask, onUpdateStatus }) => {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-200' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-200' },
    { id: 'done', title: 'Done', color: 'bg-green-200' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="bg-white rounded-lg shadow">
          <div className={`${column.color} px-4 py-3 rounded-t-lg`}>
            <h3 className="font-semibold text-gray-800">
              {column.title} ({getTasksByStatus(column.id).length})
            </h3>
          </div>
          <div className="p-4 space-y-3 min-h-[400px]">
            {getTasksByStatus(column.id).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
                onStatusChange={(newStatus) => onUpdateStatus(task.id, newStatus)}
              />
            ))}
            {getTasksByStatus(column.id).length === 0 && (
              <p className="text-gray-400 text-center py-8">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
