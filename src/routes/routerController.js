const index = require("./index");
const users = require("./users");

const routeController = (app) => {
  app.use(index);
  app.use(users);
  //   app.use(routerUsers);
  //   app.use(routerGroup);
};

module.exports = routeController;
