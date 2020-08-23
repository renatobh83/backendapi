const { defaultResponse, erroResponse } = require("../response");
const Grupos = require("../models/Grupos");

class GrupoController {
  //list all group
  async index(req, res) {
    try {
      const grupos = await Grupos.find();
      res.send(defaultResponse(grupos));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // find by id
  async findById(req, res) {
    try {
      const grupo = await Grupos.findById(req.params);
      res.send(defaultResponse(grupo));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  async getName(req, res) {
    try {
      const grupo = await Grupos.findById(req.params, { _id: 0, nome: 1 });
      res.send(defaultResponse(grupo));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // novo grupo
  async store(req, res) {
    const { nome } = req.body;
    console.log(req.body);
    try {
      if (nome) {
        const grupoExist = await Grupos.findOne({ nome: nome });
        if (grupoExist) return res.send(erroResponse("Grupo já cadastrado"));
        const newGrupo = await Grupos.create(req.body);
        res.send(defaultResponse(newGrupo));
      } else {
        res.send(erroResponse("Informar um nome para o grupo"));
      }
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // edit grupo
  async editGroup(req, res) {
    try {
      const { nome } = req.params;
      const grupoUpdated = await Grupos.updateOne({ nome }, { $set: req.body });

      res.send(defaultResponse(grupoUpdated.nModified));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }

  // delete Group
  async delete(req, res) {
    try {
      const grupoDeleted = await Grupos.deleteOne(req.params);
      res.send(defaultResponse(grupoDeleted));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
}

module.exports = new GrupoController();
