const relatorios = require("express").Router();
const relatoriosController = require("../app/controller/relatoriosController");
const { check } = require("../middlewares/checkPermission");
const verifyToken = require("../middlewares/checkToken");

relatorios.get(
  "/api/relatorios",
  verifyToken,
  check,
  relatoriosController.getDadosForReport
);

module.exports = relatorios;
