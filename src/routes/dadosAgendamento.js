const dadosAgendamento = require("express").Router();
const dadosControler = require("../app/controller/dadosAgendamento");
const verifyToken = require("../middlewares/checkToken");

// dadosAgendamento.get("/api/grupos", DadosAgendamentoController.index);
// dadosAgendamento.get("/api/grupos/:_id", DadosAgendamentoController.findById);
dadosAgendamento.get(
  "/api/da/:paciente",
  verifyToken,
  dadosControler.findAgendamentoByPaciente
);

dadosAgendamento.post("/api/da", verifyToken, dadosControler.store);
// dadosAgendamento.put("/api/grupos/:nome", DadosAgendamentoController.editGroup);
dadosAgendamento.delete(
  "/api/da/:id",
  verifyToken,
  dadosControler.cancelAgendamento
);

module.exports = dadosAgendamento;
