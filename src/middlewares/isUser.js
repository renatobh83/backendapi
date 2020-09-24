const User = require("../app/models/Users");
const { erroResponse, defaultResponse } = require("../app/response");
const Grupos = require("../app/models/Grupos");

module.exports = {
  isUser: function (req, res, next) {
    const paciente = req.user.sub.split("|");
    if (paciente[0] !== "auth0") {
      var err = new Error();
      err.status = 401;
      next(err);
    } else {
      return next();
    }
  },
};
