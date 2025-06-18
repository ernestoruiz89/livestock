import React from 'react';
import { CalendarDays, Users, Scale, ClipboardList } from 'lucide-react';
import type { FeedingRecord } from '../../types';

interface FeedingCardProps {
  record: FeedingRecord;
  onView?: (record: FeedingRecord) => void;
  onEdit?: (record: FeedingRecord) => void;
}

export default function FeedingCard({ record, onView, onEdit }: FeedingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Parcela {record.pasture_id}</h3>
          <p className="text-gray-600">{record.feed_type}</p>
        </div>
        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          {new Date(record.date + 'T00:00:00').toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{record.cattle_count} cabezas</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Scale className="w-4 h-4 mr-2" />
          <span className="text-sm">{record.quantity} kg</span>
        </div>

        {record.notes && (
          <div className="flex items-center text-gray-600">
            <ClipboardList className="w-4 h-4 mr-2" />
            <span className="text-sm">{record.notes}</span>
          </div>
        )}
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