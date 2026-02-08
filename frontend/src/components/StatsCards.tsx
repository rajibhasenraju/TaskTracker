import React from 'react';
import type { TaskStats } from '../types';

interface StatsCardsProps {
  stats: TaskStats | null;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  if (!stats) return null;

  const cards = [
    { title: 'Total Tasks', value: stats.total, color: 'bg-blue-500' },
    { title: 'To Do', value: stats.byStatus.todo || 0, color: 'bg-gray-500' },
    { title: 'In Progress', value: stats.byStatus['in-progress'] || 0, color: 'bg-yellow-500' },
    { title: 'Done', value: stats.byStatus.done || 0, color: 'bg-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`${card.color} rounded-full p-3 mr-4`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
