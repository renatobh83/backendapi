const User = require("../app/models/Users");
const { erroResponse, defaultResponse } = require("../app/response");
const Grupos = require("../app/models/Grupos");

module.exports = {
  eAdmin: function (req, res, next) {
    const { email } = req.user;

    User.findOne({ email: email })
      .then((r) => {
        const { _id: user } = r;

        Grupos.findOne({ userId: user })
          .then((response) => {
            if (response) {
              const { isAdmin } = response;
              if (isAdmin) {
                return next();
              } else {
                res.send(erroResponse("Admin required"));
              }
            } else {
              res.send(erroResponse("Você não pode acessar nessa area"));
            }
          })
          .catch((err) => res.send(erroResponse(err)));
      })

      .catch((err) => res.send(erroResponse("Admin required")));
  },
};
