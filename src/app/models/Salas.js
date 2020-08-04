const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");
const Horarios = require("./Horarios");
const SalaSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
  },
  setorId: {
    type: Schema.Types.ObjectId,
    ref: "Setor",
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Sala = mongoose.model("Sala", SalaSchema);

module.exports = Sala;
