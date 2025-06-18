import React from 'react';
import { CalendarDays, Leaf, Users } from 'lucide-react';
import type { Pasture } from '../../types';

interface PastureCardProps {
  pasture: Pasture;
  onView?: (pasture: Pasture) => void;
  onEdit?: (pasture: Pasture) => void;
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  resting: 'bg-yellow-100 text-yellow-800',
  maintenance: 'bg-red-100 text-red-800'
};

const statusLabels = {
  active: 'Activa',
  resting: 'En descanso',
  maintenance: 'Mantenimiento'
};

export default function PastureCard({ pasture, onView, onEdit }: PastureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{pasture.name}</h3>
          <p className="text-gray-600">{pasture.area} hectáreas</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[pasture.status]}`}>
          {statusLabels[pasture.status]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Última rotación: {new Date(pasture.last_rotation).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Leaf className="w-4 h-4 mr-2" />
          <span className="text-sm">{pasture.grass_type}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">Capacidad: {pasture.capacity} cabezas</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
        <button
          className="btn btn-secondary text-sm"
          onClick={() => onView?.(pasture)}
        >
          Ver Detalles
        </button>
        <button
          className="btn btn-primary text-sm"
          onClick={() => onEdit?.(pasture)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}