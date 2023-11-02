// Importa express y otras dependencias
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const MemoryStore = require('memorystore')(session);

const app = express();
const activeSessions = {};

// Configuración de sesión
app.use(
  session({
    secret: '36_5jFpPZDAJlwC5knM4qPdq1wCciFcJGOiA9r4jZvgRqGhd_1VMXzw5ldOUXBYX',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: 86400000 }),
  })
);

// Configuración de Passport con estrategia de Auth0
passport.use(new Auth0Strategy({
    domain: 'dev-pgd2yuotykytgo4o.us.auth0.com',
    clientID: 'WPrFj6ZqPGfcw51CofDeha0m7WztbiTy',
    clientSecret: '36_5jFpPZDAJlwC5knM4qPdq1wCciFcJGOiA9r4jZvgRqGhd_1VMXzw5ldOUXBYX',
    callbackURL: 'http://localhost:5173/dashboard'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
));

// ...

// Rutas protegidas
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    if (activeSessions[userId]) {
      // El usuario ya tiene una sesión de dashboard activa, redirige o muestra un mensaje de error.
      res.status(403).send('Ya tienes una sesión de dashboard activa');
    } else {
      activeSessions[userId] = true;
      // Permite el acceso a la página de dashboard
      res.send('Bienvenido al dashboard');
    }
  } else {
    res.redirect('/login');
  }
});

// Cierre de sesión
app.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    if (activeSessions[userId]) {
      delete activeSessions[userId];
    }
    req.logout();
  }
  res.redirect('/');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
