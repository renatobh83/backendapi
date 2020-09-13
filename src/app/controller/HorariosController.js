const { erroResponse, defaultResponse } = require("../response");
const Horarios = require("./../models/Horarios");
const Salas = require("./../models/Salas");
const gerarHorarios = require("./../../utils/generateHorary");
const mongoose = require("../../database/database");
const httpStatus = require("http-status");
const moment = require("moment");

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
    const { ocupado, horarios } = req.body;
    try {
      horarios.forEach(async (horario) => {
        await Horarios.updateMany(
          {
            // salaId: ObjectId(sala),
            "periodo.id": horario,
          },
          { $set: { "periodo.$.ocupado": ocupado } }
        );
      });
      res.send(defaultResponse("Horarios Update", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async horarioInativo(req, res) {
    const { id } = req.body;

    try {
      await Horarios.findOneAndUpdate(
        { "periodo.id": id },
        { $set: { "periodo.$.ativo": false } }
      );
      res.send(defaultResponse("Update", httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  // get horario livre
  async getHorarioLivre(req, res) {
    const { setor, dia } = req.params;

    try {
      const horarios = await Horarios.aggregate([
        {
          $match: { setorId: ObjectId(setor) },
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
  // async getAllHoraryBySetor(req, res) {
  //   const { setor, horario = "19:00" } = req.params;
  //   const { nextHour } = req.query;
  //   console.log(nextHour);
  //   try {
  //     const horarios = await Horarios.aggregate([
  //       {
  //         $match: { setorId: ObjectId(setor) },
  //       },
  //       { $unwind: "$periodo" },
  //       {
  //         $match: {
  //           "periodo.ocupado": false,
  //           // "periodo.horaInicio": { $gte: horario },
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           periodo: { $push: "$periodo" },
  //         },
  //       },
  //     ]);

  //     res.send(defaultResponse(horarios));
  //   } catch (error) {
  //     res.send(erroResponse(error.message));
  //   }
  // }
  async getAllHoraryBySetor(req, res) {
    const { setor } = req.params;
    const { nextHour } = req.query;

    let horario = "0:00";
    if (nextHour) {
      horario = nextHour;
    }
    try {
      const horarios = await Horarios.aggregate([
        { $match: { setorId: ObjectId(setor) } },
        { $unwind: "$periodo" },
        {
          $addFields: {
            data: {
              $dateFromString: {
                dateString: {
                  $concat: ["$periodo.data", "T", "$periodo.horaInicio"],
                },
                format: "%d/%m/%YT%H:%M",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            periodo: 1,
            data: 1,
          },
        },
        {
          $match: {
            "periodo.ocupado": false,
            "periodo.ativo": true,
            data: {
              $gte: new Date(horario),
              // $lt: new Date(horario),
            },
          },
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
  async getAllHoraryBySala(req, res) {
    const { sala } = req.params;

    try {
      const response = await Horarios.find({
        salaId: ObjectId(sala),
        "periodo.ativo": true,
      });

      res.send(defaultResponse(response));
    } catch (error) {
      res.send(erroResponse(error));
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
      setorId,
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
        setorId,
      });
      res.send(defaultResponse("Horarios Gerados", httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new HorarioController();
