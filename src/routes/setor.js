const setor = require("express").Router();
const setorController = require("../app/controller/setorController");
const verifyToken = require("../middlewares/checkToken");
const { check } = require("../middlewares/checkPermission");

setor.get("/api/setor/sala", setorController.setorSala);
setor.get("/api/setor/:_id", setorController.getSetorById);

// Rotas protegidas
setor.get("/api/setor", verifyToken, check, setorController.index);
setor.post("/api/setor", verifyToken, check, setorController.store);
setor.put("/api/setor/:_id", verifyToken, check, setorController.update);
setor.delete("/api/setor/:_id", verifyToken, check, setorController.delete);

module.exports = setor;
