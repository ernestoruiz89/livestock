import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import type { FeedingRecord } from '../../types';
import FeedingCard from './FeedingCard';
import ViewToggle from '../ViewToggle';

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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const filteredRecords = MOCK_FEEDING.filter(record => {
    const matchesSearch = record.feed_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || record.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registro de Alimentación</h1>
        <div className="flex gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <button className="btn btn-primary flex items-center">
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <FeedingCard key={record.id} record={record} />
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

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron registros de alimentación.</p>
        </div>
      )}
    </div>
  );
}