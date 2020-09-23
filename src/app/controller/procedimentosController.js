const { defaultResponse, erroResponse } = require("../response");

const Procedimentos = require("./../models/Procedimentos");

const httpStatus = require("http-status");
const Tabela = require("../models/Tabelas");

class ProcedimentosController {
  //Get all
  async index(req, res) {
    try {
      const procedimentos = await Procedimentos.find({}, {});
      res.send(defaultResponse(procedimentos));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async indexAgendamento(req, res) {
    try {
      const procedimentos = await Procedimentos.find({ ativo: true }, {}).sort({
        setor: 1,
      });

      res.send(defaultResponse(procedimentos));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  // get by setor
  async getBySetor(req, res) {
    try {
      const procedimentoSetor = await Procedimentos.find(
        {
          setor: req.params,
        },
        { procedimento: 1 }
      );
      res.send(defaultResponse(procedimentoSetor));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //update
  async updateProcedimento(req, res) {
    try {
      await Procedimentos.updateOne(req.params, { $set: req.body });

      res.send(defaultResponse({}, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  // store
  async store(req, res) {
    const { nome, setor } = req.body;

    try {
      const procedimentoExist = await Procedimentos.findOne(
        { procedimento: nome },
        {}
      );
      if (procedimentoExist)
        return res.send(erroResponse("Procedimento ja cadastrado"));

      const newProc = await Procedimentos.create(req.body);

      res.send(defaultResponse(newProc));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async delete(req, res) {
    try {
      await Procedimentos.deleteOne(req.params);
      res.send(defaultResponse("Procedimento apagado", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}
module.exports = new ProcedimentosController();
