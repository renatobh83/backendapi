const salas = require("express").Router();
const salasController = require("../app/controller/salasController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

salas.get("/api/salas/horarios", verifyToken, salasController.salasHorarios);
salas.get("/api/salas/:salaId", verifyToken, salasController.getSalaById);
salas.get("/api/sala/:setor", verifyToken, salasController.getSalaBySetor);
//Rotas Protogidas
salas.get("/api/salas/", verifyToken, check, salasController.getAllRoom);
salas.delete(
  "/api/salas/:salaId",
  verifyToken,
  check,
  salasController.deleteRoom
);
salas.post("/api/salas", verifyToken, check, salasController.store);

module.exports = salas;
