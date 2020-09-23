const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");
const Tabela = require("./Tabelas");

const procedimentoSchema = new mongoose.Schema(
  {
    procedimento: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      trim: true,
    },
    setor: {
      type: Schema.Types.ObjectId,
      ref: "Setor",
      required: true,
    },
    tempo: {
      type: String,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now() - 3 * 60 * 60 * 1000,
    },
    updatedAt: {
      type: Date,
      default: Date.now() - 3 * 60 * 60 * 1000,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

procedimentoSchema.pre("updateOne", function (next) {
  const self = this;
  const id = self._conditions._id;
  Tabela.findOne({ "exames.exame._id": id }).then((res) => {
    if (res) {
      return next(
        new Error(
          "Exame não pode ser desativado pois já este associado a uma tabela de procedimento, por favor remova da tabela para ser desativado"
        )
      );
    } else {
      next();
    }
  });
});
procedimentoSchema.pre("deleteOne", function (next) {
  const self = this;
  const id = self._conditions._id;
  Tabela.findOne({ "exames.exame._id": id }).then((res) => {
    if (res)
      return next(
        Error(
          "Exame não pode ser excluído pois já esta associado a uma tabela de procedimento, por favor remova da tabela para ser excluído"
        )
      );
    next();
  });
});

const Procedimentos = mongoose.model("Procedimentos", procedimentoSchema);

module.exports = Procedimentos;
