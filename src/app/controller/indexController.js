const { defaultResponse, erroResponse } = require("../response");

class indexController {
  async getToken(req, res) {
    const HeaderToken = req.headers.authorization;
    if (HeaderToken) {
      const token = HeaderToken.split(" ")[1];
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })
        .send(defaultResponse("Token storaged"));
    } else {
      res.send(erroResponse("Token is not found"));
    }
  }
}

module.exports = new indexController();
