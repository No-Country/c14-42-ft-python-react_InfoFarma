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

// URL base para Farmacias Similares
const baseURL = "https://farmaciasdesimilares.com/#!/busqueda";

async function buscarMedicamentos() {
  const resultados = [];

  for (const medicamento of medicamentos) {
    try {
      const url = `${baseURL}?query=${encodeURIComponent(medicamento)}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Debes ajustar los selectores para obtener la información correcta.
        // Esto es solo un ejemplo, asegúrate de verificar la estructura real del sitio web.
        $('.col-md-4').each((index, element) => {
          const details = $(element).find('h1.pt').text().trim();
          const price = $(element).find('h6.card-text').text().trim();
          const img_farmacia = $(element).find('.col-md-12 img').attr("src");
          const img_medicamento = $(element).find('.ng-scope img').attr("ng-src");

          resultados.push({
            medicamento,
            details,
            price,
            img_farmacia,
            img_medicamento,
          });

          console.log(`${medicamento}: Datos extraídos`);
        });
      } else {
        console.error(`Error en la búsqueda para "${medicamento}": ${response.status}`);
      }
    } catch (error) {
      console.error(`Error en la búsqueda para "${medicamento}": ${error.message}`);
      continue; // Continuar con el siguiente medicamento en caso de error
    }
  }

  if (resultados.length > 0) {
    const outputFilePath = path.join(__dirname, 'data', 'farmaciassimilaresconsulta.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(resultados, null, 2));
    console.log('Resultados guardados en', outputFilePath);
  }
}

buscarMedicamentos();