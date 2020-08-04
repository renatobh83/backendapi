const horarios = require("express").Router();
const horariosController = require("../app/controller/HorariosController");

horarios.get("/api/horarios/", horariosController.getAllHorary);
horarios.get("/api/horarios/:sala/:dia", horariosController.getHorarioLivre);
horarios.get("/api/horarios/:sala", horariosController.getAllHoraryBySala);
// Rotas protegidas
horarios.put("/api/horarios/", horariosController.updateHorario);
horarios.delete("/api/horarios/", horariosController.delelePeriodo);
horarios.post("/api/horarios/", horariosController.createHours);

module.exports = horarios;
