const cheerio = require("cheerio");
const axios = require("axios");
const quefarmaciaConsulta = require('./quefarmaciaConsulta');

async function extractMedicationData() {
  try {
    if (quefarmaciaConsulta.medicamentos) {
      const medicationsData = [];

      for (const medicamento of quefarmaciaConsulta.medicamentos) {
        const response = await axios.get(`https://quefarmacia.com/precios/${medicamento}`);
        const $ = cheerio.load(response.data);

        const medicationData = {
          medicamento,
          medicamentos: []
        };

        $(".col-12").each((index, element) => {
          const medicamento = {
            name: $(element).find(".Pname p").text().trim(),
            price: $(element).find(".Pprecio").text().trim(),
            farmacia: $(element).find(".PfarmaBig img").attr("data-src"),
            img: $(element).find(".Pimage img").attr("data-src"),
          };

          // Formatear el precio al nuevo formato "$XX.XX"
          if (medicamento.price) {
            const precioMatches = medicamento.price.match(/\d+\.\d{2}/);
            if (precioMatches) {
              medicamento.price = `$${precioMatches[0]}`;
            }
          }

          // Filtrar los atributos vacíos (atributos con valor nulo o cadena vacía)
          const cleanedMedication = Object.fromEntries(
            Object.entries(medicamento).filter(([key, value]) => value !== null && value !== "")
          );

          medicationData.medicamentos.push(cleanedMedication);

        });
        medicationsData.push(medicationData);
      }

      console.log("Información de los medicamentos (formateada y sin atributos vacíos):");
      console.log(medicationsData);
    } else {
      console.log("No se proporcionó la lista de medicamentos para consultar.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

extractMedicationData();
