const horarios = require("express").Router();
const horariosController = require("../app/controller/HorariosController");

horarios.get("/api/horarios/", horariosController.getAllHorary);
horarios.get("/api/horarios/:sala/:dia", horariosController.getHorarioLivre);
horarios.get("/api/horario/:sala", horariosController.getAllHoraryBySala);

horarios.get("/api/horarios/:setor", horariosController.getAllHoraryBySetor);
// Rotas protegidas
horarios.put("/api/horarios/", horariosController.updateHorario);
horarios.put("/api/horarios/inativo", horariosController.horarioInativo);
horarios.post("/api/horarios/delete", horariosController.delelePeriodo);
horarios.post("/api/horarios/", horariosController.createHours);

module.exports = horarios;
