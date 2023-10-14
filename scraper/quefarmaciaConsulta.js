const axios = require('axios');

// Diccionario de medicamentos y sus URLs
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
  "piracetam","carnitina"
];


const urlBase = "https://quefarmacia.com/precios/";

// Función para validar la existencia de la URL
async function validarURL(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return true; // URL existe
    }
    return false; // URL no existe
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // URL no existe
    }
    throw error; // Ocurrió un error diferente, lo relanzamos
  }
}

// Realizar solicitudes a las URL de los medicamentos
async function buscarMedicamentos() {
  for (const nombreMedicamento in medicamentos) {
    (nombreMedicamento);

    // Verificar si el nombre formateado existe en el diccionario de medicamentos
    if (medicamentos[nombreMedicamento]) {
      const urlMedicamento = urlBase + medicamentos[nombreMedicamento];
      const existeURL = await validarURL(urlMedicamento);

      if (existeURL) {
        console.log(`${nombreMedicamento}: URL existe - ${urlMedicamento}`);
      } else {
        console.log(`${nombreMedicamento}: URL no existe - ${urlMedicamento}`);
      }
    } else {
      console.log(`${nombreMedicamento}: Nombre formateado no encontrado en el diccionario`);
    }
  }
}

// Ejecutar la búsqueda de medicamentos
buscarMedicamentos();

module.exports = medicamentos;
