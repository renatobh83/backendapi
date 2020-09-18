const { defaultResponse, erroResponse } = require("../response");
const Permissao = require("../models/Permissao");
const httpStatus = require("http-status");

class PermissaoController {
  //list all permission
  async index(req, res) {
    try {
      const permissoes = await Permissao.find({}, { _id: 1, nome: 1 });
      res.send(defaultResponse(permissoes));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // New permission
  async store(req, res) {
    const { nome } = req.body;
    try {
      if (nome) {
        const permissaoExist = await Permissao.findOne(req.body);
        if (permissaoExist)
          return res.send(erroResponse("Permissao já cadastrado"));
        const newPermission = await Permissao.create(req.body);
        res.send(defaultResponse(newPermission, httpStatus.CREATED));
      } else {
        res.send(erroResponse("Informar um nome para a permissao"));
      }
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // // Edit permission
  // async editPermissao(req, res) {
  //   try {
  //     const { nome } = req.params;
  //     const permissaoUpdated = await Permissao.updateOne(
  //       { nome },
  //       { $set: req.body }
  //     );

  //     res.send(defaultResponse(permissaoUpdated.nModified));
  //   } catch (error) {
  //     res.send(erroResponse(error));
  //   }
  // }
  // Get permission by id
  async getByid(req, res) {
    try {
      const permissaoUpdated = await Permissao.findById(req.params);
      res.send(defaultResponse(permissaoUpdated));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }

  //   // Delete permission
  //   async delete(req, res) {
  //     try {
  //       const permissaoDeleted = await Permissao.deleteOne(req.params);
  //       res.send(defaultResponse(permissaoDeleted, httpStatus.NO_CONTENT));
  //     } catch (error) {
  //       res.send(erroResponse(error));
  //     }
  //   }
}

module.exports = new PermissaoController();
