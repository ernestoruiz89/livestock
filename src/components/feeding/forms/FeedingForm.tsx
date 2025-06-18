import React from 'react';
import Modal from '../../common/Modal';
import type { FeedingRecord } from '../../../types';

interface Props {
  record?: FeedingRecord;
  readOnly?: boolean;
  onClose: () => void;
  onSave?: (data: FeedingRecord) => void;
}

export default function FeedingForm({ record, readOnly, onClose, onSave }: Props) {
  const [formData, setFormData] = React.useState<FeedingRecord>(
    record ?? {
      id: '',
      date: '',
      pasture_id: '',
      cattle_count: 0,
      feed_type: '',
      quantity: 0,
      notes: ''
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
    <Modal title={record ? (readOnly ? 'Detalle Registro' : 'Editar Registro') : 'Nuevo Registro'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="pasture_id"
          className="input w-full"
          placeholder="Parcela"
          value={formData.pasture_id}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="number"
          name="cattle_count"
          className="input w-full"
          placeholder="Número de animales"
          value={formData.cattle_count}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="feed_type"
          className="input w-full"
          placeholder="Tipo de alimento"
          value={formData.feed_type}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="number"
          name="quantity"
          className="input w-full"
          placeholder="Cantidad"
          value={formData.quantity}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="notes"
          className="input w-full"
          placeholder="Notas"
          value={formData.notes}
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
