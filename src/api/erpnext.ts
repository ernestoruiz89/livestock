const baseUrl = import.meta.env.VITE_ERPNEXT_URL ?? '';

function buildQuery(params?: Record<string, string>) {
  if (!params) return '';
  const q = new URLSearchParams(params).toString();
  return q ? `?${q}` : '';
}

export async function getDocList<T>(doctype: string, params?: Record<string, string>): Promise<T[]> {
  const res = await fetch(`${baseUrl}/api/resource/${doctype}${buildQuery(params)}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener ${doctype}`);
  const data = await res.json();
  return data.data as T[];
}

export async function createDoc<T>(doctype: string, payload: Partial<T>): Promise<T> {
  const res = await fetch(`${baseUrl}/api/resource/${doctype}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error ${res.status} al crear ${doctype}`);
  const data = await res.json();
  return data.data as T;
}

