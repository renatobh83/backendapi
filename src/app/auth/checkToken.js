const jwksRsa = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const response = require("../response");
const { erroResponse } = require("../response");

const client = jwksRsa({
  jwksUri: process.env.URI,
});
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
const decoded = (token, callback) => {
  jwt.verify(token, getKey, { algorithms: ["RS256"] }, function (err, decoded) {
    callback(err, decoded);
  });
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies["token"] || "";
  try {
    if (!token) {
      return res.send(response.erroResponse("Favor efetuar login", 401));
    }
    decoded(token, (err, data) => {
      if (err) {
        res.send(erroResponse(err.message));
      } else {
        req.user = {
          data,
        };
        next();
      }
    });
  } catch (error) {
    return res.status(500).json(error.toString());
  }
};

module.exports = verifyToken;
