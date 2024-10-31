import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      <button
        className={`p-2 rounded ${
          view === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-600'
        }`}
        onClick={() => onViewChange('grid')}
        title="Vista en cuadrícula"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded ${
          view === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-600'
        }`}
        onClick={() => onViewChange('list')}
        title="Vista en lista"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}