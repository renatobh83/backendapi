const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");

const procedimentoSchema = new mongoose.Schema({
  procedimento: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
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
  updatedAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Procedimentos = mongoose.model("Procedimentos", procedimentoSchema);

module.exports = Procedimentos;
