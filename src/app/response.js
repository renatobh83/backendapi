const httpStatus = require("http-status");

class Response {
  defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode,
  });
  erroResponse = (message, statusCode = httpStatus.BAD_REQUEST) => ({
    message,
    statusCode,
  });
}

module.exports = new Response();
