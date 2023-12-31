const express = require('express');
const fastify = require("fastify");
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const api = fastify();
const port = 3000;

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'backend/data')));

// Ruta para cargar la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scrape', async (req, res) => {
  try {
    const response = await axios.get('https://www.quefarmacia.com/');
    const html = response.data;
    const $ = cheerio.load(html);

    // Encuentra y extrae los datos que te interesan utilizando cheerio
    // Aquí debes escribir tu código para encontrar y extraer los datos específicos

    // Ejemplo: Supongamos que deseas extraer el título de la página
    const pageTitle = $('title').text();

    // Crea un objeto con los datos extraídos
    const data = {
      pageTitle,
      // Agrega aquí más datos extraídos
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al raspar la página' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js en el puerto ${port}`);
});

// Conexión con el servidor de Node

app.get("/", async (req, res) => {
  const data = await api.get("/medicamentos");
  res.send(data);
});

// Conexión con el servidor de FastAPI

api.get("/medicamentos", async (req, res) => {
  const data = await fs.readFile("medicamentos.json", "utf-8");
  res.send(JSON.parse(data));
});

app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});

api.listen(5000, () => {
  console.log("El servidor está escuchando en el puerto 5000");
});