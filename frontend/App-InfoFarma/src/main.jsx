import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Condensed',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#2F3D2D",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
