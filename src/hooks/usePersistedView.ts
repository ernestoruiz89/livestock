import React from 'react';

export default function usePersistedView(key: string, initial: 'grid' | 'list' = 'grid') {
  const [view, setView] = React.useState<'grid' | 'list'>(() => {
    if (typeof window === 'undefined') return initial;
    const stored = localStorage.getItem(key);
    return stored === 'grid' || stored === 'list' ? (stored as 'grid' | 'list') : initial;
  });

  const setPersistedView = React.useCallback(
    (next: 'grid' | 'list') => {
      setView(next);
      try {
        localStorage.setItem(key, next);
      } catch {
        // ignore
      }
    },
    [key]
  );

  return [view, setPersistedView] as const;
}
