const { defaultResponse, erroResponse } = require("../response");
const DadosAgendamento = require("../models/DadosAgendamento");
const mongoose = require("../../database/database");
const ObjectId = mongoose.Types.ObjectId;

class DadosAgendamentoController {
  async store(req, res) {
    await DadosAgendamento.create(req.body);
    res.send(defaultResponse("Agendamento Concluido"));
  }

  async findAgendamentoByPaciente(req, res) {
    const { paciente } = req.params;
    const pacienteAgendamnentos = await DadosAgendamento.aggregate([
      { $match: { paciente: ObjectId(paciente) } },
      { $unwind: "$dados" },
      {
        $addFields: {
          "dados.hora.time": {
            $dateFromString: {
              dateString: {
                $concat: ["$dados.hora.data", "T", "$dados.hora.horaInicio"],
              },
              format: "%d/%m/%YT%H:%M",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          dados: 1,
        },
      },
      {
        $sort: { "dados.hora.data": 1, "dados.hora.horaInicio": 1 },
      },
      {
        $group: {
          _id: "$paciente",
          dados: { $push: "$dados" },
        },
      },
    ]);

    res.send(defaultResponse(pacienteAgendamnentos));
  }
  async cancelAgendamento(req, res) {
    const { id } = req.params;
    const respons = await DadosAgendamento.deleteOne({ "dados.hora.id": id });
    console.log(respons);
    res.send(defaultResponse("cancelado"));
  }
}

module.exports = new DadosAgendamentoController();