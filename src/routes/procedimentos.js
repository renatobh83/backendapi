const procedimentos = require("express").Router();
const procedimentosController = require("../app/controller/procedimentosController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

procedimentos.get(
  "/api/procedimentos",
  verifyToken,
  check,
  procedimentosController.index
);
procedimentos.get(
  "/api/procedimentos/agendamento",
  verifyToken,
  procedimentosController.indexAgendamento
);
procedimentos.get(
  "/api/procedimentos/:_id",
  verifyToken,
  procedimentosController.getBySetor
);

procedimentos.post(
  "/api/procedimentos",
  verifyToken,
  check,
  procedimentosController.store
);
procedimentos.put(
  "/api/procedimentos/:_id",
  verifyToken,
  check,
  procedimentosController.updateProcedimento
);
procedimentos.delete(
  "/api/procedimentos/:_id",
  verifyToken,
  check,
  procedimentosController.delete
);

module.exports = procedimentos;
