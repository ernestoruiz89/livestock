import React from 'react';
import Modal from '../../common/Modal';
import type { Pasture } from '../../../types';

interface Props {
  record?: Pasture;
  readOnly?: boolean;
  onClose: () => void;
  onSave?: (data: Pasture) => void;
}

export default function PastureForm({ record, readOnly, onClose, onSave }: Props) {
  const [formData, setFormData] = React.useState<Pasture>(
    record ?? {
      id: '',
      name: '',
      area: 0,
      status: 'active',
      last_rotation: '',
      grass_type: '',
      capacity: 0
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  }

  return (
    <Modal title={record ? (readOnly ? 'Detalle Parcela' : 'Editar Parcela') : 'Nueva Parcela'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="number"
          name="area"
          className="input w-full"
          placeholder="Área"
          value={formData.area}
          onChange={handleChange}
          disabled={readOnly}
        />
        <select
          name="status"
          className="input w-full"
          value={formData.status}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="active">Activa</option>
          <option value="resting">En descanso</option>
          <option value="maintenance">Mantenimiento</option>
        </select>
        <input
          type="date"
          name="last_rotation"
          className="input w-full"
          value={formData.last_rotation}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="grass_type"
          className="input w-full"
          placeholder="Tipo de pasto"
          value={formData.grass_type}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="number"
          name="capacity"
          className="input w-full"
          placeholder="Capacidad"
          value={formData.capacity}
          onChange={handleChange}
          disabled={readOnly}
        />
        {!readOnly && (
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        )}
      </form>
    </Modal>
  );
}
