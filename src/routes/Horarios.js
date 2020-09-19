const horarios = require("express").Router();
const horariosController = require("../app/controller/HorariosController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");
horarios.get(
  "/api/horarios/",
  verifyToken,

  horariosController.getAllHorary
);
horarios.get("/api/horarios/:sala/:dia", horariosController.getHorarioLivre);
horarios.get("/api/horario/:sala", horariosController.getAllHoraryBySala);
horarios.get("/api/horarios/:setor", horariosController.getAllHoraryBySetor);
// Rotas protegidas
horarios.put("/api/horarios/", verifyToken, horariosController.updateHorario);
horarios.put(
  "/api/horarios/inativo",
  verifyToken,
  horariosController.horarioInativo
);
horarios.post(
  "/api/horarios/delete",
  verifyToken,
  // check,
  horariosController.delelePeriodo
);
horarios.post(
  "/api/horarios/",
  verifyToken,
  // check,
  horariosController.createHours
);

module.exports = horarios;
