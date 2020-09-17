const planos = require("express").Router();
const planoController = require("../app/controller/planoController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

planos.get(
  "/api/planos/agendamento",
  verifyToken,
  planoController.planoAgendamento
);
planos.get("/api/planos/:_id", verifyToken, planoController.getExamesFromPlano);

// //Rotas Protogidas
planos.get("/api/planos/", verifyToken, check, planoController.index);
planos.put("/api/planos/:_id", verifyToken, check, planoController.update);
planos.post("/api/planos", verifyToken, check, planoController.store);

module.exports = planos;
