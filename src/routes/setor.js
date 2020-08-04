const setor = require("express").Router();
const setorController = require("../app/controller/setorController");
const verifyToken = require("../middlewares/checkToken");

setor.get("/api/setor", setorController.index);
setor.get("/api/setor/:_id", setorController.getSetorById);
setor.post("/api/setor", setorController.store);
setor.put("/api/setor/:_id", setorController.update);

module.exports = setor;
