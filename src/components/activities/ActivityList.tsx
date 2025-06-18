import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { Activity } from '../../types';
import ActivityCard from './ActivityCard';
import ViewToggle from '../ViewToggle';

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', title: 'Alimentación mañana', date: '2024-03-25', type: 'feeding' },
  { id: '2', title: 'Rotación Parcela 4', date: '2024-03-26', type: 'rotation' },
  { id: '3', title: 'Pesaje mensual', date: '2024-03-28', type: 'weighing' },
];

export default function ActivityList() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const filteredActivities = MOCK_ACTIVITIES.filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programación de Actividades</h1>
        <div className="flex gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <button className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Actividad
          </button>
        </div>
      </div>

      <div className="flex mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar actividad..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{activity.title}</td>
                  <td className="px-6 py-4">{activity.date}</td>
                  <td className="px-6 py-4">{activity.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Ver</button>
                      <button className="text-green-600 hover:text-green-900">Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron actividades programadas.</p>
        </div>
      )}
    </div>
  );
}
