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
      cors({
        // allowedHeaders: ["*"],
        origin: [
          "http://192.168.1.226:3000",
          "http://localhost:3000",
          "http://192.168.1.32:3000",
          "https://healtcare.herokuapp.com",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      })
    );
  }
  routes() {
    routerController(this.express);
  }
}

module.exports = new AppController().express;
