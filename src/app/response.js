const httpStatus = require("http-status");

class Response {
  defaultResponse = (message, statusCode = httpStatus.OK) => ({
    message,
    statusCode,
  });
  erroResponse = (message, statusCode = httpStatus.BAD_REQUEST) => ({
    message,
    statusCode,
  });
}

module.exports = new Response();
