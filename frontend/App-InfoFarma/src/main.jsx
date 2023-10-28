import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';

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
    <Auth0Provider domain='dev-pgd2yuotykytgo4o.us.auth0.com' clientId='WPrFj6ZqPGfcw51CofDeha0m7WztbiTy' authorizationParams={{ redirect_uri: window.location.origin}}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
