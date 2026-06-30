import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_DELAY_MS = 500;

export const useDebouncedValue = (value: string, delay = DEFAULT_DEBOUNCE_DELAY_MS) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};