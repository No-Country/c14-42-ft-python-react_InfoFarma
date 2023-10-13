const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const fs = require("fs"); // Debes incluir la librería fs para escribir en un archivo

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://quefarmacia.com/");
    const $ = cheerio.load(response.data);

    // Función para mostrar el progreso de la descarga de datos
    const mostrarProgreso = (i, total) => {
      console.log(`Descargando datos... ${i + 1} de ${total}`);
    };

    // Función para convertir los datos a JSON
    const convertirAJSON = (medicamentos) => {
      const data = JSON.stringify(medicamentos);
      return data;
    };

    // Extraer datos
    const extraerDatos = () => {
      const medicamentos = [];
      $(".producto").each((i, elem) => {
        const medicamento = {
          nombre: $(elem).find(".nombre").text(),
          precio: $(elem).find(".precio").text(),
          farmacia: $(elem).find(".farmacia").text(),
          imagen: $(elem).find(".imagen").attr("src"),
          detalle: $(elem).find(".detalle").text(),
        };
        medicamentos.push(medicamento);
        mostrarProgreso(i, $(".producto").length);
      });

      // Guardar los datos en un archivo JSON
      const data = convertirAJSON(medicamentos);
      fs.writeFile("medicamentos.json", data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Los datos se guardaron correctamente");
        }
      });
    };

    // Ejecutar la función de extracción de datos
    extraerDatos();

    res.send("Los datos se guardaron correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la extracción de datos");
  }
});

app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});
