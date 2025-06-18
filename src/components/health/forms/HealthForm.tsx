import React from 'react';
import Modal from '../../common/Modal';
import type { HealthRecord } from '../../../types';

interface Props {
  record?: HealthRecord;
  readOnly?: boolean;
  onClose: () => void;
  onSave?: (data: HealthRecord) => void;
}

export default function HealthForm({ record, readOnly, onClose, onSave }: Props) {
  const [formData, setFormData] = React.useState<HealthRecord>(
    record ?? {
      id: '',
      cattle_id: '',
      date: '',
      type: 'vaccination',
      description: '',
      performed_by: ''
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
    <Modal title={record ? (readOnly ? 'Detalle de Salud' : 'Editar Registro') : 'Nuevo Registro'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="cattle_id"
          className="input w-full"
          placeholder="ID de animal"
          value={formData.cattle_id}
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
        <select
          name="type"
          className="input w-full"
          value={formData.type}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="vaccination">Vacunación</option>
          <option value="treatment">Tratamiento</option>
          <option value="check-up">Revisión</option>
        </select>
        <input
          type="text"
          name="description"
          className="input w-full"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="performed_by"
          className="input w-full"
          placeholder="Realizado por"
          value={formData.performed_by}
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
