const usersController = require("../app/controller/usersController");
const verifyToken = require("../app/auth/checkToken");
const users = require("express").Router();

users.get("/users", verifyToken, usersController.getall);
users.post("/users", verifyToken, usersController.createUser);
users.get("/users/:name", verifyToken, usersController.findByName);
users.put("/users/:update", verifyToken, usersController.updateUser);
users.delete("/users/:name", verifyToken, usersController.delelteUser);
module.exports = users;
