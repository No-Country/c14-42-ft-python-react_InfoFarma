const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const medicamentos = [
  "acetaminofen", "ibuprofeno", "naproxeno", "acido-acetilsalicilico", "loratadina", "cetirizina",
  "fexofenadina", "desloratadina", "bromhexina", "guaifenesina", "dextrometorfano", "loperamida",
  "omeprazol", "ranitidina", "simeticona", "metoclopramida", "dimenhidrinato", "eucalipto",
  "clorhexidina", "polvo-de-talco", "vaselina", "crema-de-hidrocortisona", "pomada-de-calendula",
  "difenhidramina", "peroxido-de-benzoilo", "piroxicam", "clotrimazol", "miconazol", "terbinafina",
  "bacitracina", "polimixina-b", "neomicina", "glicerina", "bisacodilo", "lactulosa", "aloe-vera",
  "aceite-de-ricino", "betametasona", "salbutamol", "epinefrina", "polivitaminicos", "calcio",
  "hierro", "acido-folico", "vitamina-c", "sulfato-ferroso", "magnesio", "glucosamina", "omega-3",
  "melatonina", "extracto-de-valeriana", "probioticos", "fenilefrina", "oximetazolina", "clorfenamina",
  "ketotifeno", "cloruro-de-benzalconio", "acido-salicilico", "carbon-activado", "acido-borico",
  "acido-citrico", "metilfenidato", "pseudoefedrina", "gluconato-de-zinc", "aminofilina",
  "acido-hialuronico", "pomada-de-oxido-de-zinc", "enemas", "nistatina", "trimetoprima-y-sulfametoxazol",
  "cloruro-de-sodio", "aceite-mineral", "supositorios-de-glicerina", "lomotil", "yodo", "acido-ascorbico",
  "difenidol", "oxolamina", "dextrometorfano-con-guaifenesina", "metilfenidato", "nimesulida",
  "fenilefrina-con-clorfeniramina", "dextrometorfano-con-fenilefrina", "dexclorfeniramina",
  "ambroxol", "acido-mefenamico", "paracetamol-con-fenilefrina", "naproxeno-con-esomeprazol",
  "ibuprofeno-con-clorfeniramina", "vitamina-d3", "calcio-con-vitamina-d3", "valproato-de-magnesio",
  "piracetam", "carnitina", "paracetamol", "simvastatina", "amoxicilina", "atorvastatina", "losartan",
  "metformina", "acetaminofen", "loratadina", "acido-ascorbico", "colecalciferol", "retinol", "tiamina", 
  "piridoxina", "cianocobalamina", "carbonato-de-calcio", "agave-tequilana", "orlistat", "estradiol",
  "didrogesterona", "talazoparib", "oseltamivir", "neratinib", "celecoxib", "budesonida", "quetiapina",
  "erlotinib", "temozolomida", "olmesartan", "medoxomilo", "bezafibrato", "bevacizumab", "insulina lispro",
  "trastuzumab", "fenilefrina", "glucosa", "hidroclorotiazida", "bortezomib", "doxorubicina", "levetiracetam",
  "paclitaxel", "beclometasona", "ceftriaxona", "trifaroteno", "piracetam", "carboplatino", "damoctocog-alfa-pegol",
  "naproxeno", "filgrastim", "piperacilina", "tazobactam", "cefepima", "mifepristona", "gardasil-9",
  "acido-zoledronico", "colistimetato-de-sodio", "tamsulosina", "budesonida", "glicopirronio",
  "fumarato-de-formoterol", "norepinefrina", "enoxaparina-sodica", "omeprazol", "bicarbonato-de-sodio",
  "clorfenamina", "articaina", "epinefrina", "mepivacaina", "epirubicina", "citarabina", "pregabalina",
  "tramadol", "ofatumumab", "shingrix", "zenalb-20", "cisplatino", "lidocaina", "ertapenem", 
  "cloruro-de-suxametonio", "Bromuro pinaverio", "capsaicina", "misoprostol", "indometacina", "dacarbazina",
  "polimixina-b", "etoricoxib", "nitrofurantoina", "entecavir", "tobramicina", "dexametasona", "celecoxib",
  "ivermectina", "paracetamol", "amlodipino", "losartan", "rosuvastatina", "darolutamida", "bleomicina",
  "tacrolimus", "calcifediol", "etoricoxib", "doxilamina-succinato", "clorhidrato-de-piridoxina", "diroximel fumarato",
  "acotiamida", "cabergolina", "loeramida", "docetaxel", "sunitinib", "erdafitinib", "delafloxacino", "roxadustat",
  "sugammadex", "propofol", "micofenolato-de-mofetilo", "tamsulosina", "isotretinoina", "bosentan", "anastrozol",
  "sucralfato", "dimetilfumarato", "teriflunomida", "acetazolamida", "mesiprostol", "quetiapina"
];

const urlBase = "https://quefarmacia.com/precios/";

// Ruta del archivo de salida
const outputFilePath = path.join(__dirname, 'data', 'medicamentos.json');

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
          const price = $(`.Pprecio`).text().trim();
          const farmacia = $(`.PfarmaBig img`).attr("data-src");
          const img = $(`.Pimage img`).attr("data-src");

          if (nombreFarmacia && price && farmacia && img) {
            // Formatear el precio al nuevo formato "$XX.XX" o "XX"
            const formattedPrice = price.match(/\d+\.\d{2}/) || price.match(/\d+/);

            // Si el precio cumple con el formato, se agrega al resultado
            if (formattedPrice) {
              // Extraer "medimart" del atributo "name" y asignarlo al atributo "brand"
              const brand = nombreFarmacia.includes("medimart") ? "medimart" : null;

              // Filtrar los atributos vacíos (atributos con valor nulo o cadena vacía)
              const cleanedMedication = {
                medicamento: nombreMedicamento,
                name: nombreFarmacia,
                brand,
                price: formattedPrice[0],
                farmacia,
                img,
              };
              medicationsData.push(cleanedMedication);
              console.log(`${nombreMedicamento}: Datos extraídos`);
            } else {
              console.log(`${nombreMedicamento}: Precio no cumple con el formato`);
            }
          } else {
            console.log(`${nombreMedicamento}: Datos faltantes en la página`);
          }
        }
      } else {
        console.log(`${medicamento}: URL no existe`);
      }
    }

    // Guardar los datos en un archivo JSON
    const jsonData = JSON.stringify(medicationsData, null, 2);
    fs.writeFileSync(outputFilePath, jsonData);
    console.log("Datos guardados en ", outputFilePath);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ejecutar la función para extraer los datos de los medicamentos
extractMedicationData();
