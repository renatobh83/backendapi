const Setor = require("./../models/Setor");
const mongoose = require("../../database/database");
const { defaultResponse, erroResponse } = require("./../response");
const httpStatus = require("http-status");
const ObjectId = mongoose.Types.ObjectId;
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
      res.send(defaultResponse(setor, httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //Update setor
  async update(req, res) {
    try {
      const setor = await Setor.updateOne(req.params, { $set: req.body });
      res.send(defaultResponse(setor, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //DELETE setor
  async delete(req, res) {
    try {
      await Setor.deleteOne(req.params);

      res.send(defaultResponse("Deleted", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new SetorController();
