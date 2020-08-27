const { erroResponse, defaultResponse } = require("../response");
const Horarios = require("./../models/Horarios");
const Salas = require("./../models/Salas");
const gerarHorarios = require("./../../utils/generateHorary");
const mongoose = require("../../database/database");
const httpStatus = require("http-status");

const ObjectId = mongoose.Types.ObjectId;
class HorarioController {
  //Get all
  async getAllHorary(req, res) {
    try {
      const response = await Horarios.find({});
      res.send(defaultResponse(response));
    } catch (error) {
      res.send(erroResponse(error));
    }
  }
  // Delete
  async delelePeriodo(req, res) {
    const { deleteHorary, sala } = req.body;
    try {
      const horarios = await Horarios.update(
        {
          salaId: ObjectId(sala),
          "periodo.ocupado": false,
        },
        {
          $pull: {
            periodo: { id: { $in: deleteHorary } },
          },
        },
        { multi: true }
      );
      res.send(defaultResponse(horarios, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // update
  async updateHorario(req, res) {
    const { sala, horarios } = req.body;
    try {
      horarios.forEach(async (horario) => {
        await Horarios.updateMany(
          {
            salaId: ObjectId(sala),
            "periodo.id": horario,
          },
          { $set: { "periodo.$.ocupado": true } }
        );
      });
      res.send(defaultResponse("Horarios Update", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  // get horario livre
  async getHorarioLivre(req, res) {
    const { sala, dia } = req.params;
    try {
      const horarios = await Horarios.aggregate([
        {
          $match: { salaId: ObjectId(sala) },
        },
        { $unwind: "$periodo" },
        {
          $match: { "periodo.ocupado": false, "periodo.diaSemana": eval(dia) },
        },
        {
          $group: {
            _id: "$_id",
            periodo: { $push: "$periodo" },
          },
        },
      ]);

      res.send(defaultResponse(horarios));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // get All horary of Room
  async getAllHoraryBySala(req, res) {
    const { sala } = req.params;
    try {
      // const horarios = await Horarios.aggregate([
      //   {
      //     $match: { salaId: ObjectId(sala) },
      //   },
      //   { $unwind: "$periodo" },
      //   {
      //     $group: {
      //     _id: "$_id",
      //     periodo: { $push: "$periodo" },
      //     },
      //   },
      // ]);
      const horarios = await Horarios.find(
        { salaId: ObjectId(sala) },
        { periodo: 1, _id: 0 }
      );

      res.send(defaultResponse(horarios));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Criar horarios
  async createHours(req, res) {
    const {
      dataInicio,
      dataFim,
      intervalo,
      daysWeek,
      t1,
      t2,
      idSala,
    } = req.body;
    const startDate = dataInicio;
    const endDate = dataFim;

    const values = {
      start: startDate,
      end: endDate,
      intervalo,
      daysWeek,
      t1,
      t2,
    };

    const horas = gerarHorarios(values);
    if (horas.length === 0) {
      return res.send(erroResponse("Nenhum periodo gerado"));
    }
    try {
      await Horarios.create({
        salaId: idSala,
        periodo: horas,
      });
      res.send(defaultResponse("Horarios Gerados", httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new HorarioController();
