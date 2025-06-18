import React from 'react';
import { CalendarDays } from 'lucide-react';
import type { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
}

const typeColors: Record<string, string> = {
  feeding: 'bg-green-100 text-green-800',
  weighing: 'bg-blue-100 text-blue-800',
  rotation: 'bg-purple-100 text-purple-800',
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const color = typeColors[activity.type] || 'bg-gray-100 text-gray-800';
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{activity.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${color}`}>{activity.type}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <CalendarDays className="w-4 h-4 mr-2" />
        <span className="text-sm">{activity.date}</span>
      </div>
      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
        <button className="btn btn-secondary text-sm">Ver</button>
        <button className="btn btn-primary text-sm">Editar</button>
      </div>
    </div>
  );
}
