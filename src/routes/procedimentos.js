const procedimentos = require("express").Router();
const procedimentosController = require("../app/controller/procedimentosController");
const verifyToken = require("../middlewares/checkToken");

procedimentos.get("/api/procedimentos", procedimentosController.index);
procedimentos.get(
  "/api/procedimentos/:_id",
  procedimentosController.getBySetor
);
procedimentos.post("/api/procedimentos", procedimentosController.store);
procedimentos.put(
  "/api/procedimentos/:_id",
  procedimentosController.updateProcedimento
);
procedimentos.delete("/api/procedimentos/:_id", procedimentosController.delete);

module.exports = procedimentos;
