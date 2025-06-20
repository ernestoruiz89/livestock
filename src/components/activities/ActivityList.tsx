import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import type { Activity } from '../../types';
import ActivityCard from './ActivityCard';
import ViewToggle from '../ViewToggle';
import ActivityForm from './forms/ActivityForm';
import usePersistedView from '../../hooks/usePersistedView';
import usePersistedState from '../../hooks/usePersistedState';

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', title: 'Alimentación mañana', date: '2024-03-25', type: 'feeding' },
  { id: '2', title: 'Rotación Parcela 4', date: '2024-03-26', type: 'rotation' },
  { id: '3', title: 'Pesaje mensual', date: '2024-03-28', type: 'weighing' },
];

export default function ActivityList() {
  const [searchTerm, setSearchTerm] = usePersistedState('activity-search', '');
  const [fromDate, setFromDate] = usePersistedState('activity-from', '');
  const [toDate, setToDate] = usePersistedState('activity-to', '');
  const [view, setView] = usePersistedView('activities-view', 'grid');
  const [showForm, setShowForm] = React.useState(false);
  const [selected, setSelected] = React.useState<Activity | undefined>();
  const [readOnly, setReadOnly] = React.useState(false);
  const [activities, setActivities] = React.useState<Activity[]>(MOCK_ACTIVITIES);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFrom = !fromDate || activity.date >= fromDate;
    const matchesTo = !toDate || activity.date <= toDate;
    const matchesDate = matchesFrom && matchesTo;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programación de Actividades</h1>
        <div className="flex gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <button
            className="btn btn-primary flex items-center"
            onClick={() => {
              setSelected(undefined);
              setReadOnly(false);
              setShowForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Actividad
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
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

        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            className="input !w-auto"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="mx-1">-</span>
          <input
            type="date"
            className="input !w-auto"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary self-start md:ml-auto"
          onClick={() => {
            setSearchTerm('');
            setFromDate('');
            setToDate('');
          }}
        >
          Borrar filtros
        </button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onView={(data) => {
                setSelected(data);
                setReadOnly(true);
                setShowForm(true);
              }}
              onEdit={(data) => {
                setSelected(data);
                setReadOnly(false);
                setShowForm(true);
              }}
            />
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
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelected(activity);
                          setReadOnly(true);
                          setShowForm(true);
                        }}
                      >
                        Ver
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          setSelected(activity);
                          setReadOnly(false);
                          setShowForm(true);
                        }}
                      >
                        Editar
                      </button>
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

      {showForm && (
        <ActivityForm
          record={selected}
          readOnly={readOnly}
          onClose={() => setShowForm(false)}
          onSave={(data) => {
            if (selected) {
              setActivities((prev) => prev.map((a) => (a.id === data.id ? data : a)));
            } else {
              setActivities((prev) => [...prev, { ...data, id: Date.now().toString() }]);
            }
          }}
        />
      )}
    </div>
  );
}
