import React from 'react';

export default function usePersistedState<T>(key: string, initial: T) {
  const [state, setState] = React.useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setPersistedState = React.useCallback(
    (next: React.SetStateAction<T>) => {
      setState((prev) => {
        const value = typeof next === 'function' ? (next as (v: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {
          // ignore
        }
        return value;
      });
    },
    [key]
  );

  return [state, setPersistedState] as const;
}
