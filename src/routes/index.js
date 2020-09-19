const index = require("express").Router();
const controller = require("../app/controller/indexController");
const verifyToken = require("../middlewares/checkToken");

index.get("/api/", controller.ping);

module.exports = index;
