const tabelas = require("express").Router();
// const TabelasController = require("../app/controller/TabelasController");
const tabelasController = require("../app/controller/tabelasController");

const verifyToken = require("../middlewares/checkToken");

tabelas.get("/api/tabelas", tabelasController.index);
// tabelas.get("/api/tabelas/:_id", TabelasController.getSetorById);
tabelas.put("/api/tabelas/:_id", tabelasController.updateExames);
tabelas.post("/api/tabelas", tabelasController.store);
tabelas.delete(
  "/api/tabelas/:procedimento",
  tabelasController.deleteProcedimento
);

module.exports = tabelas;
