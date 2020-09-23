const report = require("../../utils/report");

const { defaultResponse, erroResponse } = require("../response");

class RelatoriosController {
  async getDadosForReport(req, res) {
    const data = req.query.data;
    const response = await report.relatorios(data);
    res.send(response);
  }
}

module.exports = new RelatoriosController();
