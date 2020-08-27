const salas = require("express").Router();
const salasController = require("../app/controller/salasController");
const verifyToken = require("../middlewares/checkToken");

salas.get("/api/salas/", salasController.getAllRoom);
salas.get("/api/salas/:salaId", salasController.getSalaById);
salas.get("/api/sala/:setorId", salasController.getSalaBySetor);
//Rotas Protogidas
salas.delete("/api/salas/:salaId", salasController.deleteRoom);
salas.post("/api/salas", salasController.store);

module.exports = salas;
