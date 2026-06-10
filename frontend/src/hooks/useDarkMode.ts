import { useEffect } from 'react';
import { useCarbonStore } from '../store/carbonStore';

export const useDarkMode = () => {
  const isDarkMode = useCarbonStore((state) => state.isDarkMode);
  const toggleDarkMode = useCarbonStore((state) => state.toggleDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
