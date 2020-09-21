const { startOfMonth, endOfMonth, addMonths, subMonths } = require("date-fns");
const DadosAgendamento = require("../app/models/DadosAgendamento");
const Horarios = require("../app/models/Horarios");

const firstDayMonth = (date) => {
  return startOfMonth(date);
};
const endDayMonth = (date) => {
  return endOfMonth(date);
};

module.exports = {
  async relatorios(params) {
    let dataAtual = new Date();
    if (params !== undefined) {
      dataAtual = new Date(params);
    }

    const inicioMes = firstDayMonth(dataAtual);
    try {
      const totalAgendadosMes = () => {
        const fimMes = endDayMonth(dataAtual);
        const response = DadosAgendamento.aggregate([
          { $unwind: "$dados" },
          {
            $addFields: {
              data: {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      "$dados.hora.data",
                      "T",
                      "$dados.hora.horaInicio",
                    ],
                  },
                  format: "%d/%m/%YT%H:%M",
                },
              },
              setor: { $toObjectId: "$dados.exame.exame.setor" },
            },
          },
          {
            $lookup: {
              from: "setors",
              localField: "setor",
              foreignField: "_id",
              as: "setor",
            },
          },
          {
            $unwind: "$setor",
          },
          {
            $match: { data: { $gt: inicioMes, $lt: fimMes } },
          },

          { $group: { _id: "$setor", count: { $sum: 1 } } },
          { $project: { "_id.nome": 1, count: 1 } },
        ]);

        return response;
      };
      const examesAgendado = () => {
        const response = DadosAgendamento.aggregate([
          { $unwind: "$dados" },
          {
            $addFields: {
              data: {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      "$dados.hora.data",
                      "T",
                      "$dados.hora.horaInicio",
                    ],
                  },
                  format: "%d/%m/%YT%H:%M",
                },
              },
              // setor: { $toObjectId: "$dados.exame.exame.setor" },
            },
          },

          // {
          //   $unwind: "$setor",
          // },
          { $match: { data: { $gte: inicioMes } } },

          {
            $group: {
              _id: "$dados.exame.exame.procedimento",
              count: { $sum: 1 },
            },
          },
          // { $project: { "_id.nome": 1, count: 1 } },
        ]);

        return response;
      };

      const totalHorarioMes = async () => {
        const response = await Horarios.aggregate([
          { $unwind: "$periodo" },

          {
            $lookup: {
              from: "setors",
              localField: "setor",
              foreignField: "_id",
              as: "setor",
            },
          },
          {
            $unwind: "$setor",
          },
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
          { $match: { data: { $gte: inicioMes, $lte: dataAtual } } },
          { $group: { _id: "$setor", count: { $sum: 1 } } },
          { $project: { "_id.nome": 1, count: 1 } },
        ]);

        return response;
      };

      const totalAgendadosMesFuncionario = () => {
        const response = DadosAgendamento.aggregate([
          { $unwind: "$dados" },
          {
            $addFields: {
              data: {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      "$dados.hora.data",
                      "T",
                      "$dados.hora.horaInicio",
                    ],
                  },
                  format: "%d/%m/%YT%H:%M",
                },
              },
            },
          },
          { $match: { data: { $gte: inicioMes, $lte: dataAtual } } },
          { $group: { _id: "$agent", count: { $sum: 1 } } },
        ]);

        return response;
      };

      const totalagandadodia = () => {
        const dataInicio = new Date();
        const dataFim = new Date();
        dataInicio.setHours(0);
        const response = DadosAgendamento.aggregate([
          // { $match: req.params },
          { $unwind: "$dados" },
          {
            $addFields: {
              data: {
                $dateFromString: {
                  dateString: {
                    $concat: [
                      "$dados.hora.data",
                      "T",
                      "$dados.hora.horaInicio",
                    ],
                  },
                  format: "%d/%m/%YT%H:%M",
                },
              },
            },
          },
          { $match: { createdAt: { $gte: dataInicio, $lte: dataFim } } },
          { $group: { _id: "$agent", count: { $sum: 1 } } },
        ]);
        return response;
      };

      const taxaOcupacao = async () => {
        let horarios = 0;
        let agendados = 0;
        const totalHorarios = await totalHorarioMes();
        const totalAgendamento = await totalAgendadosMes();

        totalHorarios.length > 0
          ? totalHorarios.forEach((horario) => (horarios += horario.count))
          : horarios;
        totalAgendamento.length > 0
          ? totalAgendamento.forEach(
              (agendado) => (agendados += agendado.count)
            )
          : agendados;
        let tx;
        if (horarios !== 0) {
          tx = (agendados / horarios) * 100;
        } else {
          tx = 0;
        }

        return `${tx.toFixed(2)}%`;
      };
      const [
        totalAgendaMes,
        horarioMes,
        agendadoMesAgent,
        agendadoDia,
        txOcupacao,
        exames,
      ] = await Promise.all([
        totalAgendadosMes(),
        totalHorarioMes(),
        totalAgendadosMesFuncionario(),
        totalagandadodia(),
        taxaOcupacao(),
        examesAgendado(),
      ]);
      let report = {};
      report.AgendadosMes = totalAgendaMes;
      report.HorariosMes = horarioMes;
      report.AgendamentoFuncinarios = agendadoMesAgent;
      report.AgendamentoDia = agendadoDia;
      report.ExamesAgendado = exames;
      report.TaxaOcupacao = txOcupacao;

      return report;
    } catch (error) {
      return error;
    }
  },
};
