const index = require("express").Router();
const controller = require("../app/controller/indexController");

index.get("/", controller.getToken);

module.exports = index;
