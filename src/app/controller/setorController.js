const Setor = require("./../models/Setor");
const { defaultResponse, erroResponse } = require("./../response");
const httpStatus = require("http-status");

class SetorController {
  // Return all setor
  async index(req, res) {
    try {
      const setor = await Setor.find({}, { createdAt: 0, __v: 0 });
      res.send(defaultResponse(setor));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //Find by id
  async getSetorById(req, res) {
    try {
      const setor = await Setor.findById(req.params, { createdAt: 0, __v: 0 });
      res.send(defaultResponse(setor));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // New setor
  async store(req, res) {
    try {
      const setorExist = await Setor.findOne(req.body);
      if (setorExist) return res.send(erroResponse("Setor já cadastrado"));
      const setor = await Setor.create(req.body);
      res.send(defaultResponse("Setor criado", httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //Update setor
  async update(req, res) {
    try {
      const setorExist = await Setor.findOne(req.body);
      if (setorExist) return res.send(erroResponse("Setor já cadastrado"));
      const setor = await Setor.updateOne(req.params, { $set: req.body });
      res.send(defaultResponse("Updated", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new SetorController();
