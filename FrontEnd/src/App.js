import React from 'react';
import ImageGenerator from './ImageGenerator';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import backgroundImage from './assets/bg.jpg';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  typography: {
    h3: {
      fontFamily: 'Press Start 2P, sans-serif',
      fontWeight: 700,
      color: '#ff4081',
    },
    h6: {
      fontFamily: 'Press Start 2P, sans-serif',
      fontWeight: 500,
      color: '#f50057',
    },
    button: {
      fontFamily: 'Press Start 2P, sans-serif',
      color: '#ffffff',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <ImageGenerator />
    </div>
  </ThemeProvider>
);

export default App;
