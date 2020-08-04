const { defaultResponse, erroResponse } = require("../response");
const Users = require("../models/Users");

class indexController {
  async ping(req, res) {
    res.send(defaultResponse("Server On"));
  }
}

module.exports = new indexController();
