const usersController = require("../app/controller/usersController");
const verifyToken = require("../middlewares/checkToken");
const { eAdmin } = require("../middlewares/eAdmin");
const indexController = require("../app/controller/indexController");

const users = require("express").Router();

users.get("/api/ping", indexController.ping);
users.get("/api/pacientes", usersController.indexPacientes);
users.get("/api/users", usersController.indexUsers);
users.get("/api/users/:email", usersController.getUserByEmail);

users.get("/api/users/inativos", usersController.getAllInactive);

users.post("/api/users", usersController.findOrCreate);
users.put("/api/users/:email", usersController.updateUser);

users.delete("/api/users", usersController.delete);
users.delete("/api/users/restoring", usersController.restoring);

users.use(function (user, req, res, next) {
  console.log(user);
  res.status(200).send(user);
});
module.exports = users;
