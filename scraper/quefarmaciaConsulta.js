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

const outputFilePath = path.join(__dirname, 'data', 'medicamentos.json');
const dataDirectory = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDirectory, 'medicamentos.json');
const backupDirectory = path.join(dataDirectory, 'backup');

function asignarFarmacias(datosMedicamentos) {
  return datosMedicamentos.map((medicamento) => {
    const imgFarmacia = medicamento.img_farmacia;

    // Asignar "farmacia" según el valor de "img_farmacia"
    if (imgFarmacia.includes('walmart')) {
      medicamento.farmacia = 'walmart';
    } else if (imgFarmacia.includes('Chedraui')) {
      medicamento.farmacia = 'chedraui';
    } else if (imgFarmacia.includes('Amazon')) {
      medicamento.farmacia = 'amazon';
    } else {
      medicamento.farmacia = 'desconocida'; // Opcional: si no coincide con ninguna de las anteriores
    }

    return medicamento;
  });
}

async function extractMedicationData() {
  try {
    const medicationsData = [];

    for (const medicamento of medicamentos) {
      const urlMedicamento = urlBase + medicamento;
      const response = await axios.get(urlMedicamento);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Encuentra todos los productos dentro de '.col-12'
        $('.col-12').each((index, element) => {
          const details = $(element).find('.Pname p').text().trim();
          const price = $(element).find('.Pprecio').text().trim();
          const img_farmacia = $(element).find('.PfarmaBig img').attr("data-src");
          const img_medicamento = $(element).find('.Pimage img').attr("data-src");

          if (details && price && img_farmacia && img_medicamento) {
            const formattedPrice = price.match(/\d+\.\d{2}/) || price.match(/\d+/);
            if (formattedPrice) {
              const brand = details.includes("medimart") ? "medimart" : null;
              const cleanedMedication = {
                medicamento,
                details: details,
                brand,
                price: formattedPrice[0],
                img_farmacia,
                img_medicamento,
              };
              medicationsData.push(cleanedMedication);
              console.log(`${details}: Datos extraídos`);
            } else {
              console.log(`${details}: Precio no cumple con el formato`);
            }
          } else {
            console.log(`${details}: Datos faltantes en la página`);
          }
        });
      } else {
        console.log(`${medicamento}: URL no existe`);
      }
    }

    // Asignar el atributo "farmacia" utilizando la función
    const datosConFarmacias = asignarFarmacias(medicationsData);

    console.log(medicationsData);

    const jsonData = JSON.stringify(datosConFarmacias, null, 2);
    fs.writeFileSync(outputFilePath, jsonData);
    console.log("Datos guardados en", outputFilePath);
  } catch (error) {
    console.error("Error:", error);
  }
}

function backupMedicamentosFile() {
  try {
    // Verificar si el archivo existe
    if (fs.existsSync(dataFilePath)) {
      const timestamp = new Date().toISOString();
      const backupFileName = `medicamentos_${timestamp}.json`;
      const backupFilePath = path.join(backupDirectory, backupFileName); // Ruta de la copia de seguridad

      // Crear el directorio de copias de seguridad si no existe
      if (!fs.existsSync(backupDirectory)) {
        fs.mkdirSync(backupDirectory);
      }

      // Copiar el archivo original a la copia de seguridad
      fs.copyFileSync(dataFilePath, backupFilePath);

      console.log(`Copia de seguridad creada: ${backupFileName}`);
    } else {
      console.log('No se puede realizar copia de seguridad, el archivo original no existe.');
    }
  } catch (error) {
    console.error('Error al crear copia de seguridad:', error);
  }
}

function updateMedicamentosFile(data) {
  try {
    // Realizar una copia de seguridad antes de actualizar el archivo
    backupMedicamentosFile();

    // Actualizar el archivo con los nuevos datos
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, jsonData);

    console.log('Datos actualizados en', dataFilePath);
  } catch (error) {
    console.error('Error al actualizar el archivo:', error);
  }
}

// Ejemplo de uso:
const newData = { /* Nuevos datos */ };
updateMedicamentosFile(newData);

extractMedicationData();

