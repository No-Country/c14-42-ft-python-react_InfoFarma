const cron = require("cron");

cron.schedule("0 0 0 * * *", async () => {

  // Guardar los datos actualizados en el archivo JSON
  const data = JSON.stringify(medicamenos);
  fs.writeFile("medicamentos.json", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Los datos se actualizaron correctamente");
    }
  });
});