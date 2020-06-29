const index = require("express").Router();
const controller = require("../app/controller");
const checkToken = require("../app/auth/checkToken");

index.get("/", controller.getToken);

module.exports = index;
