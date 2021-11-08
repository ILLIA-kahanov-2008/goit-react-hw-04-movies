import { useEffect, useState } from 'react';

export const useLS = (key, init_value) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? init_value,
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
