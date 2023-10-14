const axios = require('axios');
const cheerio = require('cheerio');

const medicamentos = [
  "acetaminofen","ibuprofeno","naproxeno","acido-acetilsalicilico","loratadina","cetirizina",
  "fexofenadina","desloratadina","bromhexina","guaifenesina","dextrometorfano","loperamida",
  "omeprazol","ranitidina","simeticona","metoclopramida","dimenhidrinato","eucalipto",
  "clorhexidina","polvo-de-talco","vaselina","crema-de-hidrocortisona","pomada-de-calendula",
  "difenhidramina","peroxido-de-benzoilo","piroxicam","clotrimazol","miconazol","terbinafina",
  "bacitracina","polimixina-b","neomicina","glicerina","bisacodilo","lactulosa","aloe-vera",
  "aceite-de-ricino","betametasona","salbutamol","epinefrina","polivitaminicos","calcio",
  "hierro","acido-folico","vitamina-c","sulfato-ferroso","magnesio","glucosamina","omega-3",
  "melatonina","extracto-de-valeriana","probioticos","fenilefrina","oximetazolina","clorfenamina",
  "ketotifeno","cloruro-de-benzalconio","acido-salicilico","carbon-activado","acido-borico",
  "acido-citrico","metilfenidato","pseudoefedrina","gluconato-de-zinc","aminofilina",
  "acido-hialuronico","pomada-de-oxido-de-zinc","enemas","nistatina","trimetoprima-y-sulfametoxazol",
  "cloruro-de-sodio","aceite-mineral","supositorios-de-glicerina","lomotil","yodo","acido-ascorbico",
  "difenidol","oxolamina","dextrometorfano-con-guaifenesina","metilfenidato","nimesulida",
  "fenilefrina-con-clorfeniramina","dextrometorfano-con-fenilefrina","dexclorfeniramina",
  "ambroxol","acido-mefenamico","paracetamol-con-fenilefrina","naproxeno-con-esomeprazol",
  "ibuprofeno-con-clorfeniramina","vitamina-d3","calcio-con-vitamina-d3","valproato-de-magnesio",
  "piracetam","carnitina", "paracetamol", "simvastatina", "amoxicilina", "atorvastatina", "losartan",
  "metformina", "acetaminofen", "loratadina"
];

const urlBase = "https://quefarmacia.com/precios/";

// Función para extraer los datos de los medicamentos
async function extractMedicationData() {
  try {
    const medicationsData = [];

    for (const medicamento of medicamentos) {
      const urlMedicamento = urlBase + medicamento;
      const response = await axios.get(urlMedicamento);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Dividir la URL si contiene varios medicamentos
        const nombres = medicamento.split(',');

        for (const nombre of nombres) {
          const nombreMedicamento = nombre.trim();
          const nombreFarmacia = $(`.Pname p`).text().trim();
          let price = $(`.Pprecio`).text().trim();
          const farmacia = $(`.PfarmaBig img`).attr("data-src");
          const imagen = $(`.Pimage img`).attr("data-src");

          if (nombreFarmacia && price && farmacia && imagen) {
            // Formatear el precio al nuevo formato "$XX.XX"
            const precioMatches = price.match(/\d+\.\d{2}/);
            if (precioMatches) {
              price = `$${precioMatches[0]}`;
            }

            // Extraer "medimart" del atributo "nombre" y asignarlo al atributo "brand"
            const brand = nombre.includes("medimart") ? "medimart" : null;

            // Filtrar los atributos vacíos (atributos con valor nulo o cadena vacía)
            const cleanedMedication = {
              medicamento: nombreMedicamento,
              nombre: nombreFarmacia,
              brand,
              price,
              farmacia,
              imagen,
            };
            medicationsData.push(cleanedMedication);
            console.log(`${nombreMedicamento}: Datos extraídos`);
          } else {
            console.log(`${nombreMedicamento}: Datos faltantes en la página`);
          }
        }
      } else {
        console.log(`${medicamento}: URL no existe`);
      }
    }

    console.log("Información de los medicamentos:");
    console.log(medicationsData);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ejecutar la función para extraer los datos de los medicamentos
extractMedicationData();