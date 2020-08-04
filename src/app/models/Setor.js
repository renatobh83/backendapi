const mongoose = require("../../database/database");

const SetorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Setor = mongoose.model("Setor", SetorSchema);

module.exports = Setor;
