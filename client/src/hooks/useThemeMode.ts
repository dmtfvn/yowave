import { useEffect, useState } from 'react';

export default function useThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const themeMode = localStorage.getItem('theme');

    if (themeMode) {
      return themeMode === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleThemeMode = () => setIsDarkMode((curMode) => !curMode);

  return {
    isDarkMode,
    toggleThemeMode,
  };
}
