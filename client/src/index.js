import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import Context from './Components/Context';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212"
    },
    action: {
      hoverOpacity: "0.05"
    },
    primary: {
      main: "#1e88e5"
    }
  },
  typography: {
    fontFamily: "Montserrat"
  }
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Context>
          <App />
        </Context>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>

);

