import React from 'react';
import { Calendar, Weight, MapPin } from 'lucide-react';
import type { Animal } from '../../types';

interface CattleCardProps {
  cattle: Animal;
}

const statusColors = {
  healthy: 'bg-green-100 text-green-800',
  sick: 'bg-red-100 text-red-800',
  pregnant: 'bg-purple-100 text-purple-800',
  lactating: 'bg-blue-100 text-blue-800'
};

const statusLabels = {
  healthy: 'Saludable',
  sick: 'Enfermo',
  pregnant: 'Preñada',
  lactating: 'Lactando'
};

export default function CattleCard({ cattle }: CattleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{cattle.tag_number}</h3>
          <p className="text-gray-600">{cattle.breed} - {cattle.species}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[cattle.status]}`}>
          {statusLabels[cattle.status]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Nacimiento: {new Date(cattle.birth_date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Weight className="w-4 h-4 mr-2" />
          <span className="text-sm">{cattle.weight} kg</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{cattle.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
        <button className="btn btn-secondary text-sm">Ver Detalles</button>
        <button className="btn btn-primary text-sm">Editar</button>
      </div>
    </div>
  );
}
