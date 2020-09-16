const grupos = require("express").Router();
const gruposController = require("../app/controller/gruposController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

grupos.get("/api/grupos", verifyToken, gruposController.index);
grupos.get("/api/grupos/:_id", gruposController.findById);
grupos.get("/api/grupo/:_id", gruposController.getName);

grupos.post("/api/grupos", verifyToken, check, gruposController.store);
grupos.put("/api/grupos/:nome", verifyToken, check, gruposController.editGroup);
grupos.delete("/api/grupos/:_id", verifyToken, check, gruposController.delete);

module.exports = grupos;
