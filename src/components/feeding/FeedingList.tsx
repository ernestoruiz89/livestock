import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import type { FeedingRecord } from '../../types';
import FeedingCard from './FeedingCard';

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

  const filteredRecords = MOCK_FEEDING.filter(record => {
    const matchesSearch = record.feed_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || record.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registro de Alimentación</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Registro
        </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <FeedingCard key={record.id} record={record} />
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron registros de alimentación.</p>
        </div>
      )}
    </div>
  );
}