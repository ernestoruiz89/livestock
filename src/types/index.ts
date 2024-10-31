export interface Cattle {
  id: string;
  tag_number: string;
  breed: string;
  birth_date: string;
  weight: number;
  status: 'healthy' | 'sick' | 'pregnant' | 'lactating';
  location: string;
}

export interface Pasture {
  id: string;
  name: string;
  area: number;
  status: 'active' | 'resting' | 'maintenance';
  last_rotation: string;
  grass_type: string;
  capacity: number;
}

export interface FeedingRecord {
  id: string;
  date: string;
  pasture_id: string;
  cattle_count: number;
  feed_type: string;
  quantity: number;
  notes: string;
}

export interface HealthRecord {
  id: string;
  cattle_id: string;
  date: string;
  type: 'vaccination' | 'treatment' | 'check-up';
  description: string;
  performed_by: string;
}