const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/scrape", async (req, res) => {
  try {
    // Realiza una solicitud HTTP para obtener el HTML de quefarmacia.com
    const response = await axios.get("https://quefarmacia.com/");

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Aquí, puedes utilizar Cheerio para seleccionar y extraer los datos que necesitas
      // Ejemplo: Extraer los nombres de los medicamentos
      const medicamentos = [];
      $(".nombreMedicamento").each((index, element) => {
        medicamentos.push($(element).text());
      });

      // Devuelve los datos extraídos en formato JSON
      res.json({ medicamentos });
    } else {
      res.status(500).json({ error: "Error al obtener la página web" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`El servicio Node.js con Cheerio está escuchando en el puerto ${port}`);
});
