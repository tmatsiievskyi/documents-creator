'use client';

import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debaunceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debaunceValue;
};
