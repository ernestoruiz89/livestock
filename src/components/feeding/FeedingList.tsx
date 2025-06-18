import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import type { FeedingRecord } from '../../types';
import FeedingCard from './FeedingCard';
import ViewToggle from '../ViewToggle';
import FeedingForm from './forms/FeedingForm';
import usePersistedView from '../../hooks/usePersistedView';
import usePersistedState from '../../hooks/usePersistedState';

const MOCK_FEEDING: FeedingRecord[] = [
  {
    id: '1',
    date: '2024-03-20',
    pasture_id: '1',
    cattle_count: 25,
    feed_type: 'Pasto + Suplemento',
    quantity: 250,
    notes: 'Suplemento mineral añadido'
  },
  {
    id: '2',
    date: '2024-03-19',
    pasture_id: '2',
    cattle_count: 20,
    feed_type: 'Pasto natural',
    quantity: 200,
    notes: 'Rotación programada'
  }
];

export default function FeedingList() {
  const [searchTerm, setSearchTerm] = usePersistedState('feeding-search', '');
  const [fromDate, setFromDate] = usePersistedState('feeding-from', '');
  const [toDate, setToDate] = usePersistedState('feeding-to', '');
  const [view, setView] = usePersistedView('feeding-view', 'grid');
  const [showForm, setShowForm] = React.useState(false);
  const [selected, setSelected] = React.useState<FeedingRecord | undefined>();
  const [readOnly, setReadOnly] = React.useState(false);
  const [records, setRecords] = React.useState<FeedingRecord[]>(MOCK_FEEDING);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.feed_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrom = !fromDate || record.date >= fromDate;
    const matchesTo = !toDate || record.date <= toDate;
    const matchesDate = matchesFrom && matchesTo;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registro de Alimentación</h1>
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
            Nuevo Registro
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por tipo de alimento..."
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
          {filteredRecords.map((record) => (
            <FeedingCard
              key={record.id}
              record={record}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcela</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{record.pasture_id}</td>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">{record.feed_type}</td>
                  <td className="px-6 py-4">{record.quantity} kg</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelected(record);
                          setReadOnly(true);
                          setShowForm(true);
                        }}
                      >
                        Ver
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          setSelected(record);
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

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron registros de alimentación.</p>
        </div>
      )}

      {showForm && (
        <FeedingForm
          record={selected}
          readOnly={readOnly}
          onClose={() => setShowForm(false)}
          onSave={(data) => {
            if (selected) {
              setRecords((prev) => prev.map((r) => (r.id === data.id ? data : r)));
            } else {
              setRecords((prev) => [...prev, { ...data, id: Date.now().toString() }]);
            }
          }}
        />
      )}
    </div>
  );
}