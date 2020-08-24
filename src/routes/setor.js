const setor = require("express").Router();
const setorController = require("../app/controller/setorController");
const verifyToken = require("../middlewares/checkToken");

setor.get("/api/setor", setorController.index);
setor.get("/api/setor/:_id", setorController.getSetorById);
setor.put("/api/setor/:_id", setorController.update);
setor.post("/api/setor", setorController.store);
setor.delete("/api/setor/:_id", setorController.delete);

module.exports = setor;
