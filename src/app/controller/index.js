const response = require("../response");

class IndexController {
  async getToken(req, res) {
    const HeaderToken = req.headers.authorization;
    if (HeaderToken) {
      const token = HeaderToken.split(" ")[1];
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })
        .send(response.defaultResponse("Token storaged"));
    } else {
      res.send(response.erroResponse("Token is not found"));
    }
  }
}

module.exports = new IndexController();
