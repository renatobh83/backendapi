const index = require("express").Router();
const controller = require("../app/controller/indexController");
const checkToken = require("../app/auth/checkToken");

index.get("/", controller.getToken);
index.get("/testToken", checkToken, (req, res) => {
  res.send("valid");
});
module.exports = index;
