const { defaultResponse, erroResponse } = require("../response");
const Planos = require("../models/Planos");
const httpStatus = require("http-status");

class PlanosController {
  async store(req, res) {
    try {
      const planoFind = await Planos.findOne({ descricao: req.body.descricao });

      if (planoFind) return res.send(erroResponse("Plano ja cadastrado"));
      const newPlano = await Planos.create(req.body);

      res.send(newPlano, httpStatus.CREATED);
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async index(req, res) {
    try {
      const planos = await Planos.find({ ativo: true });
      res.send(defaultResponse(planos));
    } catch (err) {
      res.send(erroResponse(err.message));
    }
  }

  async update(req, res) {
    try {
      await Planos.updateOne(req.params, { $set: req.body });
      res.send(defaultResponse(httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new PlanosController();
