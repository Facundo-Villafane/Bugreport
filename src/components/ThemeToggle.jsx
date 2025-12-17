import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-4 py-2 font-bold uppercase text-sm z-50"
      style={{
        backgroundColor: 'var(--retro-primary)',
        color: 'var(--retro-header-text)',
        border: '3px solid var(--retro-border)',
        boxShadow: 'var(--retro-shadow)'
      }}
    >
      {theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}
    </button>
  );
};

export default ThemeToggle;
