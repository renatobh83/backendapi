const index = require("./index");
const users = require("./users");
const grupos = require("./grupos");
const permissao = require("./permissao");
const horarios = require("./Horarios");
const salas = require("./salas");
const setor = require("./setor");
const procedimentos = require("./procedimentos");
const dadosAgendamento = require("./dadosAgendamento");

const routeController = (app) => {
  app.use(index);
  app.use(users);
  app.use(grupos);
  app.use(permissao);
  app.use(horarios);
  app.use(salas);
  app.use(setor);
  app.use(procedimentos);
  app.use(dadosAgendamento);
};

module.exports = routeController;
