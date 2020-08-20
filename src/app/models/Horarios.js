const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");

const HorariosSchema = new mongoose.Schema({
  periodo: [
    {
      type: Object,
    },
  ],
  salaId: {
    type: Schema.Types.ObjectId,
    ref: "Sala",
  },

  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Horarios = mongoose.model("Horarios", HorariosSchema);

module.exports = Horarios;