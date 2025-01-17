import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import type { Cattle } from '../../types';
import CattleCard from './CattleCard';
import ViewToggle from '../ViewToggle';

const MOCK_CATTLE: Cattle[] = [
  {
    id: '1',
    tag_number: 'BOV-001',
    breed: 'Angus',
    birth_date: '2022-06-15',
    weight: 520,
    status: 'healthy',
    location: 'Parcela 1'
  },
  {
    id: '2',
    tag_number: 'BOV-002',
    breed: 'Hereford',
    birth_date: '2022-04-20',
    weight: 480,
    status: 'pregnant',
    location: 'Parcela 2'
  },
  {
    id: '3',
    tag_number: 'BOV-003',
    breed: 'Brahman',
    birth_date: '2022-08-10',
    weight: 495,
    status: 'lactating',
    location: 'Parcela 1'
  }
];

const statusLabels = {
  healthy: 'Saludable',
  sick: 'Enfermo',
  pregnant: 'Preñada',
  lactating: 'Lactando'
};

export default function CattleList() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<Cattle['status'] | 'all'>('all');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const filteredCattle = MOCK_CATTLE.filter(cattle => {
    const matchesSearch = cattle.tag_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cattle.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cattle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Ganado</h1>
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
            placeholder="Buscar por número de tag o raza..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            className="input !w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Cattle['status'] | 'all')}
          >
            <option value="all">Todos los estados</option>
            <option value="healthy">Saludable</option>
            <option value="sick">Enfermo</option>
            <option value="pregnant">Preñada</option>
            <option value="lactating">Lactando</option>
          </select>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCattle.map((cattle) => (
            <CattleCard key={cattle.id} cattle={cattle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tag / Raza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCattle.map((cattle) => (
                <tr key={cattle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{cattle.tag_number}</div>
                      <div className="text-sm text-gray-500">{cattle.breed}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      {statusLabels[cattle.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {cattle.weight} kg
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {cattle.location}
                  </td>
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

      {filteredCattle.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron registros que coincidan con los filtros.</p>
        </div>
      )}
    </div>
  );
}