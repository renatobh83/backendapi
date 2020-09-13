const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");
const TabelaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
    trim: true,
  },
  exames: [
    {
      type: Object,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

TabelaSchema.pre("deleteOne", function (next) {
  next(new Error("error"));
});

const Tabela = mongoose.model("Tabela", TabelaSchema);

module.exports = Tabela;
