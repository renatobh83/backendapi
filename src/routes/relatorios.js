const relatorios = require("express").Router();
const relatoriosController = require("../app/controller/relatoriosController");

relatorios.get("/api/relatorios", relatoriosController.getDadosForReport);

module.exports = relatorios;
