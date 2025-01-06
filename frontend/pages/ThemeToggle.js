import React, { useEffect } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const handleChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={handleChange} />}
      label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

export default ThemeToggle;
