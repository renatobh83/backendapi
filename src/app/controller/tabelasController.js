// const { defaultResponse, erroResponse } = require("../response");

// const Tabelas = require("../models/Tabelas");
// const mongoose = require("../../database/database");
// const httpStatus = require("http-status");
// const ObjectId = mongoose.Types.ObjectId;

// class TabelasController {
//   async store(req, res) {
//     try {
//       const find = await Tabelas.findOne({ nome: req.body.nome });
//       if (find) return res.send(erroResponse("Tabela ja cadastrada"));
//       const tabela = await Tabelas.create(req.body);
//       res.send(defaultResponse(tabela));
//     } catch (error) {
//       res.send(erroResponse(error.message));
//     }
//   }

//   async index(req, res) {
//     try {
//       const tabelas = await Tabelas.find({});
//       res.send(defaultResponse(tabelas));
//     } catch (error) {
//       res.send(erroResponse(error.message));
//     }
//   }

//   async updateExames(req, res) {
//     try {
//       const { _id: id } = req.params;

//       const response = await Tabelas.updateOne(
//         { _id: ObjectId(id) },
//         { $set: { exames: req.body } }
//       );

//       res.send(defaultResponse("response"));
//     } catch (error) {
//       res.send(erroResponse(error.message));
//     }
//   }

//   async deleteProcedimento(req, res) {
//     const { procedimento } = req.body;
//     try {
//       await Tabelas.updateOne(req.params, {
//         $pull: { exames: { procedimento: procedimento } },
//       });

//       res.send(defaultResponse(httpStatus.NO_CONTENT));
//     } catch (error) {
//       res.send(erroResponse(error.message));
//     }
//   }
// }

// module.exports = new TabelasController();
