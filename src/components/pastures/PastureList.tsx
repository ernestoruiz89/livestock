import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { Pasture } from '../../types';
import PastureCard from './PastureCard';

const MOCK_PASTURES: Pasture[] = [
  {
    id: '1',
    name: 'Parcela Norte',
    area: 5.5,
    status: 'active',
    last_rotation: '2024-03-01',
    grass_type: 'Brachiaria',
    capacity: 25
  },
  {
    id: '2',
    name: 'Parcela Este',
    area: 4.2,
    status: 'resting',
    last_rotation: '2024-02-15',
    grass_type: 'Pangola',
    capacity: 20
  },
  {
    id: '3',
    name: 'Parcela Sur',
    area: 6.0,
    status: 'maintenance',
    last_rotation: '2024-03-10',
    grass_type: 'Estrella',
    capacity: 30
  }
];

export default function PastureList() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPastures = MOCK_PASTURES.filter(pasture =>
    pasture.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Parcelas</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Parcela
        </button>
      </div>

      <div className="flex mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar parcela..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPastures.map((pasture) => (
          <PastureCard key={pasture.id} pasture={pasture} />
        ))}
      </div>

      {filteredPastures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron parcelas.</p>
        </div>
      )}
    </div>
  );
}