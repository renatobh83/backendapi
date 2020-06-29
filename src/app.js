const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routerController = require("./routes/routerController");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(
      cors({ origin: "http://localhost:3000", credentials: true })
    );
  }
  routes() {
    routerController(this.express);
  }
}

module.exports = new AppController().express;
