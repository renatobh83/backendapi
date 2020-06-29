const index = require("./index");

const routeController = (app) => {
  app.use(index);
  //   app.use(auth);
  //   app.use(routerUsers);
  //   app.use(routerGroup);
};

module.exports = routeController;
