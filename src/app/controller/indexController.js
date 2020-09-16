const { defaultResponse, erroResponse } = require("../response");

class indexController {
  async ping(req, res) {
    res.send(defaultResponse("Server On"));
  }
}

module.exports = new indexController();
