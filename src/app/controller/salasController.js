const { defaultResponse, erroResponse } = require("../response");
const mongoose = require("../../database/database");
const Sala = require("../models/Salas");
const Setor = require("../models/Setor");
const httpStatus = require("http-status");
const ObjectId = mongoose.Types.ObjectId;

class SalasController {
  // store new room
  async store(req, res) {
    const { nome } = req.body;

    try {
      const findSala = await Sala.findOne({ nome: nome });
      if (findSala) return res.send(erroResponse("Descrição já cadastrada"));

      const salaResponse = await Sala.create(req.body);
      console.log(salaResponse);

      res.send(defaultResponse(salaResponse, httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Get all room
  async getAllRoom(req, res) {
    try {
      const salas = await Sala.find({}, { createdAt: 0, __v: 0 });
      res.send(defaultResponse(salas));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Get room by id
  async getSalaById(req, res) {
    const { salaId } = req.params;
    try {
      const salas = await Sala.findOne(
        { _id: salaId },
        { createdAt: 0, __v: 0 }
      );
      res.send(defaultResponse(salas));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Update Room
  async updateRoom(req, res) {
    const { salaId } = req.params;
    const { nome } = req.body;
    try {
      const salas = await Sala.findByIdAndUpdate(
        { _id: salaId },
        { $set: req.body },
        { new: true, select: { nome } }
      );
      res.send(defaultResponse(salas, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Delete a room
  // async deleteRom(req, res) {
  //   const { salaId } = req.params;
  //   try {
  //     const salas = await Sala.deleteOne({ _id: salaId });
  //     res.send(defaultResponse(salas, httpStatus.NO_CONTENT));
  //   } catch (error) {
  //     res.send(erroResponse(error.message));
  //   }
  // }
}

module.exports = new SalasController();
