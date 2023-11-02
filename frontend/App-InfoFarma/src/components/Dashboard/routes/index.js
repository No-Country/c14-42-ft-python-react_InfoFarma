import express from "express";
import router from "express-router";
import MedicineService from "../services/api";
import viteNode from 'vite-plugin-node';


const router = router();

// Ruta para buscar medicamentos
router.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const medicines = await MedicineService.search(searchTerm);
  res.json(medicines);
});

// Ruta para guardar búsquedas
router.post("/saveSearch", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const user = req.user;
  await user.saveSearch(searchTerm);
  res.sendStatus(200);
});

// Ruta para recibir notificaciones push
router.post("/subscribeToPushNotifications", async (req, res) => {
  const user = req.user;
  await user.subscribeToPushNotifications();
  res.sendStatus(200);
});

// Ruta para encontrar la farmacia más cercana
router.post("/findNearestPharmacy", async (req, res) => {
  const userLocation = req.body.userLocation;
  const pharmacies = await MedicineService.findNearestPharmacies(userLocation);
  res.json(pharmacies);
});

// Ruta para suscribirse al plan premium
router.post("/subscribeToPremiumPlan", async (req, res) => {
  const user = req.user;
  await user.subscribeToPremiumPlan();
  res.sendStatus(200);
});

app.use(router);

module.exports = app;
