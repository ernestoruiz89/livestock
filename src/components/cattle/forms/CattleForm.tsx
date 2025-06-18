import React from 'react';
import Modal from '../../common/Modal';
import type { Animal } from '../../../types';

interface Props {
  record?: Animal;
  readOnly?: boolean;
  onClose: () => void;
  onSave?: (data: Animal) => void;
}

export default function CattleForm({ record, readOnly, onClose, onSave }: Props) {
  const [formData, setFormData] = React.useState<Animal>(
    record ?? {
      id: '',
      tag_number: '',
      breed: '',
      birth_date: '',
      weight: 0,
      status: 'healthy',
      location: '',
      species: 'bovine'
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
    <Modal title={record ? (readOnly ? 'Detalle Animal' : 'Editar Animal') : 'Nuevo Animal'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="tag_number"
          className="input w-full"
          placeholder="Número de tag"
          value={formData.tag_number}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="text"
          name="breed"
          className="input w-full"
          placeholder="Raza"
          value={formData.breed}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="date"
          name="birth_date"
          className="input w-full"
          placeholder="Fecha de nacimiento"
          value={formData.birth_date}
          onChange={handleChange}
          disabled={readOnly}
        />
        <input
          type="number"
          name="weight"
          className="input w-full"
          placeholder="Peso"
          value={formData.weight}
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
          <option value="healthy">Saludable</option>
          <option value="sick">Enfermo</option>
          <option value="pregnant">Preñada</option>
          <option value="lactating">Lactando</option>
        </select>
        <input
          type="text"
          name="location"
          className="input w-full"
          placeholder="Ubicación"
          value={formData.location}
          onChange={handleChange}
          disabled={readOnly}
        />
        <select
          name="species"
          className="input w-full"
          value={formData.species}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="bovine">Bovino</option>
          <option value="ovine">Ovino</option>
          <option value="porcine">Porcino</option>
          <option value="caprine">Caprino</option>
          <option value="equine">Equino</option>
          <option value="other">Otro</option>
        </select>
        {!readOnly && (
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        )}
      </form>
    </Modal>
  );
}
