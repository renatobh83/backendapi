const grupos = require("express").Router();
const gruposController = require("../app/controller/gruposController");
const verifyToken = require("../middlewares/checkToken");

grupos.get("/api/grupos", gruposController.index);
grupos.get("/api/grupos/:_id", gruposController.findById);
grupos.get("/api/grupo/:_id", gruposController.getName);

grupos.post("/api/grupos", gruposController.store);
grupos.put("/api/grupos/:nome", gruposController.editGroup);
grupos.delete("/api/grupos/:_id", gruposController.delete);

module.exports = grupos;
