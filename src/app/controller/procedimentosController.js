const { defaultResponse, erroResponse } = require("../response");
const mongoose = require("../../database/database");
const Procedimentos = require("./../models/Procedimentos");
const Setor = require("./../models/Setor");
const httpStatus = require("http-status");

const ObjectId = mongoose.Types.ObjectId;
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

  // get by setor
  async getBySetor(req, res) {
    try {
      const procedimentoSetor = await Procedimentos.find(
        {
          setorId: req.params,
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

      const newProc = await Procedimentos.create({
        procedimento: nome,
        setorId: setor,
      });

      res.send(defaultResponse(newProc));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}
module.exports = new ProcedimentosController();
