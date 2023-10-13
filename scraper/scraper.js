const cheerio = require("cheerio");
const axios = require("axios");

async function extractMedicationData() {
  try {
    const response = await axios.get("https://quefarmacia.com/precios/Clotrimazol/");
    const $ = cheerio.load(response.data);

    const medications = [];

    // Agregar el medicamento consultado al principio del JSON
    medications.push({
      medicamento: "Clotrimazol"
    })

    $(".col-12").each((index, element) => {
      const medication = {
        nombre: $(element).find(".Pname p").text().trim(),
        precio: $(element).find(".Pprecio").text().trim(),
        farmacia: $(element).find(".PfarmaBig img").attr("data-src"),
        imagen: $(element).find(".Pimage img").attr("data-src"),
        detalle: $(element).find(".detalle").text().trim(),
      };

      // Validar que los atributos obligatorios estén presentes
      if (medication.nombre && medication.precio && medication.farmacia && medication.imagen) {
      // Formatear el precio al nuevo formato "$XX.XX"
      if (medication.precio) {
        const precioMatches = medication.precio.match(/\d+\.\d{2}/);
        if (precioMatches) {
          medication.precio = `$${precioMatches[0]}`;
        }
      }

      // Filtrar los atributos vacíos (atributos con valor nulo o cadena vacía)
      const cleanedMedication = Object.fromEntries(
        Object.entries(medication).filter(([key, value]) => value !== null && value !== "")
      );

      medications.push(cleanedMedication);
      }
    });

    console.log("Información de los medicamentos (formateada y sin atributos vacíos):");
    console.log(medications);
  } catch (error) {
    console.error("Error:", error);
  }
}

extractMedicationData();
