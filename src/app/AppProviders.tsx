import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useThemeStore } from '../store/themeStore';
import { getTheme } from '../theme';
import { Toaster } from 'react-hot-toast';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
            },
          }}
        />
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
