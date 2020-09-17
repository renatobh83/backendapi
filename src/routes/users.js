const usersController = require("../app/controller/usersController");
const verifyToken = require("../middlewares/checkToken");
const { eAdmin } = require("../middlewares/eAdmin");
const { check } = require("../middlewares/checkPermission");

const indexController = require("../app/controller/indexController");

const users = require("express").Router();

users.get("/api/ping", indexController.ping);
// pegar pacientes
users.get("/api/pacientes", verifyToken, usersController.indexPacientes);

// listar  todos usuario
users.get("/api/usuarios", verifyToken, check, usersController.indexUsers);

users.get("/api/usuarios/login", verifyToken, usersController.userLogin);
users.put("/api/usuarios/:email", verifyToken, usersController.updateUser);

users.post("/api/usuarios", verifyToken, check, usersController.findOrCreate);
users.delete("/api/usuarios", verifyToken, check, usersController.delete);
// users.get("/api/users/:email", usersController.getUserByEmail);
// users.get("/api/users/inativos", usersController.getAllInactive);
// users.put("/api/users/", verifyToken, check, usersController.createOrUpdate);
// users.delete("/api/users/restoring", usersController.restoring);

module.exports = users;
