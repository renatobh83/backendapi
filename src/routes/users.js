const usersController = require("../app/controller/usersController");
const verifyToken = require("../middlewares/checkToken");
const users = require("express").Router();

users.get("/users", usersController.getall);
users.post("/users", usersController.createUser);
users.get("/users/:name", usersController.findByName);
users.put("/users/:email", usersController.updateUser);
users.delete("/users/:email", usersController.delelteUser);
module.exports = users;
