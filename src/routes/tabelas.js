const tabelas = require("express").Router();
const tabelasController = require("../app/controller/tabelasController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

tabelas.get("/api/tabelas", verifyToken, check, tabelasController.index);
// tabelas.get("/api/tabelas/:_id", TabelasController.getSetorById);
tabelas.put(
  "/api/tabelas/:_id",
  verifyToken,
  check,
  tabelasController.updateExames
);
tabelas.post("/api/tabelas", verifyToken, check, tabelasController.store);
tabelas.delete(
  "/api/tabelas/:procedimento",
  verifyToken,
  check,
  tabelasController.deleteProcedimento
);

module.exports = tabelas;
