import React from 'react';
import { Calendar, User, Activity, FileText } from 'lucide-react';
import type { HealthRecord } from '../../types';

interface HealthCardProps {
  record: HealthRecord;
  onView?: (record: HealthRecord) => void;
  onEdit?: (record: HealthRecord) => void;
}

const typeColors = {
  vaccination: 'bg-blue-100 text-blue-800',
  treatment: 'bg-yellow-100 text-yellow-800',
  'check-up': 'bg-green-100 text-green-800'
};

const typeLabels = {
  vaccination: 'Vacunación',
  treatment: 'Tratamiento',
  'check-up': 'Revisión'
};

export default function HealthCard({ record, onView, onEdit }: HealthCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{record.cattle_id}</h3>
          <p className="text-gray-600">{new Date(record.date + 'T00:00:00').toLocaleDateString()}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${typeColors[record.type]}`}>
          {typeLabels[record.type]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-2" />
          <span className="text-sm">{record.description}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="text-sm">Realizado por: {record.performed_by}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
        <button
          className="btn btn-secondary text-sm"
          onClick={() => onView?.(record)}
        >
          Ver Detalles
        </button>
        <button
          className="btn btn-primary text-sm"
          onClick={() => onEdit?.(record)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}