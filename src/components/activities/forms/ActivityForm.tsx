import React from 'react';
import Modal from '../../common/Modal';
import type { Activity } from '../../../types';

interface Props {
  record?: Activity;
  readOnly?: boolean;
  onClose: () => void;
  onSave?: (data: Activity) => void;
}

export default function ActivityForm({ record, readOnly, onClose, onSave }: Props) {
  const [formData, setFormData] = React.useState<Activity>(
    record ?? {
      id: '',
      title: '',
      date: '',
      type: ''
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  }

  return (
    <Modal title={record ? (readOnly ? 'Detalle Actividad' : 'Editar Actividad') : 'Nueva Actividad'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          className="input w-full"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="date"
          name="date"
          className="input w-full"
          value={formData.date}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="type"
          className="input w-full"
          placeholder="Tipo"
          value={formData.type}
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
