import express from "express";
import App from "../../App";
import viteNode from 'vite-plugin-node';


const app = express();

// Cargamos las rutas de la aplicación
app.use(require("./routes/index"));

// Iniciamos el servidor
app.listen(3000, () => {
  console.log("El servidor se está ejecutando en el puerto 3000");
});
