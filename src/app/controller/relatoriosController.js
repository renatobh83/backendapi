const { startOfMonth } = require("date-fns/");
const report = require("../../utils/report");
const DadosAgendamento = require("../models/DadosAgendamento");
const Horarios = require("../models/Horarios");
const { defaultResponse, erroResponse } = require("../response");

class RelatoriosController {
  async getDadosForReport(req, res) {
    const { data } = req.body;
    const response = await report.relatorios(data);
    res.send(response);
  }
}

module.exports = new RelatoriosController();
