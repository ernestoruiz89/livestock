import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { Pasture } from '../../types';
import PastureCard from './PastureCard';
import ViewToggle from '../ViewToggle';
import PastureForm from './forms/PastureForm';
import usePersistedView from '../../hooks/usePersistedView';

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
  const [view, setView] = usePersistedView('pastures-view', 'grid');
  const [showForm, setShowForm] = React.useState(false);
  const [selected, setSelected] = React.useState<Pasture | undefined>();
  const [readOnly, setReadOnly] = React.useState(false);
  const [pastures, setPastures] = React.useState<Pasture[]>(MOCK_PASTURES);

  const filteredPastures = pastures.filter(pasture =>
    pasture.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Parcelas</h1>
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
            Nueva Parcela
          </button>
        </div>
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

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPastures.map((pasture) => (
            <PastureCard
              key={pasture.id}
              pasture={pasture}
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Área
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPastures.map((pasture) => (
                <tr key={pasture.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{pasture.name}</td>
                  <td className="px-6 py-4">{pasture.status}</td>
                  <td className="px-6 py-4">{pasture.area} ha</td>
                  <td className="px-6 py-4">{pasture.capacity}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelected(pasture);
                          setReadOnly(true);
                          setShowForm(true);
                        }}
                      >
                        Ver
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => {
                          setSelected(pasture);
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

      {filteredPastures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron parcelas.</p>
        </div>
      )}

      {showForm && (
        <PastureForm
          record={selected}
          readOnly={readOnly}
          onClose={() => setShowForm(false)}
          onSave={(data) => {
            if (selected) {
              setPastures((prev) => prev.map((p) => (p.id === data.id ? data : p)));
            } else {
              setPastures((prev) => [...prev, { ...data, id: Date.now().toString() }]);
            }
          }}
        />
      )}
    </div>
  );
}