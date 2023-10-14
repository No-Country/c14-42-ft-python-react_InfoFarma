const cheerio = require("cheerio");
const axios = require("axios");
const quefarmaciaConsulta = require('./quefarmaciaConsulta');
const medicamentos = require("./quefarmaciaConsulta");

async function extractMedicationData() {
  try {
    const response = await axios.get(`https://quefarmacia.com/precios/${quefarmaciaConsulta.medicamentos}`);
    const $ = cheerio.load(response.data);

    const medications = [];

    // Agregar el medicamento consultado al principio del JSON
    medications.push({
      medicamento: medicamentos[0]
    });

    $(".col-12").each((index, element) => {
      const medicamentos = {
        nombre: $(element).find(".Pname p").text().trim(),
        precio: $(element).find(".Pprecio").text().trim(),
        farmacia: $(element).find(".PfarmaBig img").attr("data-src"),
        imagen: $(element).find(".Pimage img").attr("data-src"),
        detalle: $(element).find(".detalle").text().trim(),
      };

      // Validar que los atributos obligatorios estén presentes
      if (medicamentos.nombre && medicamentos.precio && medicamentos.farmacia && medicamentos.imagen) {
      // Formatear el precio al nuevo formato "$XX.XX"
      if (medicamentos.precio) {
        const precioMatches = medicamentos.precio.match(/\d+\.\d{2}/);
        if (precioMatches) {
          medicamentos.precio = `$${precioMatches[0]}`;
        }
      }

      // Filtrar los atributos vacíos (atributos con valor nulo o cadena vacía)
      const cleanedMedication = Object.fromEntries(
        Object.entries(medicamentos).filter(([key, value]) => value !== null && value !== "")
      );

      medicamentos.push(cleanedMedication);
      }
    });

    console.log("Información de los medicamentos (formateada y sin atributos vacíos):");
    console.log(medicamentos);
  } catch (error) {
    console.error("Error:", error);
  }
}

extractMedicationData();
