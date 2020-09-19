const { defaultResponse, erroResponse } = require("../response");
const Grupos = require("../models/Grupos");

class PermissaoGrupos {
  // Include permission in group
  async include(req, res) {
    try {
      const { checkedPermissao: permissoes, grupo } = req.body;
      const grupoAddPermission = await Grupos.findById(grupo);
      grupoAddPermission.permissaoId = permissoes;
      await grupoAddPermission.save();
      res.send(defaultResponse("Permissao Liberada"));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new PermissaoGrupos();
