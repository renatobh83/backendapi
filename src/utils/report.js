const { startOfMonth } = require("date-fns");
const DadosAgendamento = require("../app/models/DadosAgendamento");
const Horarios = require("../app/models/Horarios");
const User = require("../app/models/Users");

const firstDayMonth = (date) => {
  return startOfMonth(date);
};

module.exports = {
  async relatorios(params) {
    const data = params;
    let dataAtual;
    if (data) {
      dataAtual = new Date(data);
    } else {
      dataAtual = new Date();
    }
    const inicioMes = firstDayMonth(dataAtual);
    try {
      const totalAgendadosMes = () => {
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
          { $match: { data: { $gt: inicioMes, $lt: dataAtual } } },
          { $group: { _id: "$dados.exame.exame.setorId", count: { $sum: 1 } } },
        ]);
        return response;
      };

      const totalHorarioMes = () => {
        const response = Horarios.aggregate([
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
          // { $project: { data: 1 } },
          { $match: { data: { $gt: inicioMes, $lt: dataAtual } } },
          { $group: { _id: "$setorId", count: { $sum: 1 } } },
        ]);

        return response;
      };

      const totalAgendadosMesFuncionario = () => {
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
          { $match: { data: { $gt: inicioMes, $lt: dataAtual } } },
          { $group: { _id: "$agent", count: { $sum: 1 } } },
        ]);
        return response;
      };

      const totalagandadodia = () => {
        const dataInicio = new Date();
        const dataFim = new Date();
        dataInicio.setHours(0);

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
          { $match: { data: { $gt: dataInicio, $lt: dataFim } } },

          { $group: { _id: "$agent", count: { $sum: 1 } } },
        ]);
        return response;
      };
      const AgendmentoDiaPaciente = async () => {
        const pacientes = User.find({});

        console.log(pacientes);
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
        teste,
      ] = await Promise.all([
        totalAgendadosMes(),
        totalHorarioMes(),
        totalAgendadosMesFuncionario(),
        totalagandadodia(),
        taxaOcupacao(),
        AgendmentoDiaPaciente(),
      ]);
      let result = {};
      result.AgendadosMes = totalAgendaMes;
      result.HorariosMes = horarioMes;
      result.AgendamentoFuncinarios = agendadoMesAgent;
      result.AgendamentoDia = agendadoDia;
      result.TaxaOcupacao = txOcupacao;
      result.
      return result;
    } catch (error) {
      return error;
    }
  },
};
