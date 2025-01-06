import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
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