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
users.get("/api/users", verifyToken, check, usersController.indexUsers);

users.get("/api/users/login", verifyToken, usersController.userLogin);

// users.get("/api/users/:email", usersController.getUserByEmail);
// users.get("/api/users/inativos", usersController.getAllInactive);
// users.post("/api/users", verifyToken, check, usersController.findOrCreate);

users.put("/api/users/", verifyToken, check, usersController.createOrUpdate);
users.put("/api/users/:email", verifyToken, check, usersController.updateUser);
users.delete("/api/users", verifyToken, check, usersController.delete);
// users.delete("/api/users/restoring", usersController.restoring);

module.exports = users;
