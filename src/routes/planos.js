const planos = require("express").Router();
const planoController = require("../app/controller/planoController");
const verifyToken = require("../middlewares/checkToken");

planos.get("/api/planos/", planoController.index);
// //Rotas Protogidas
planos.put("/api/planos/:_id", planoController.update);
planos.post("/api/planos", planoController.store);

module.exports = planos;
