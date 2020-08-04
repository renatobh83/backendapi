const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");

const GruposSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
  },
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  permissaoId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permissao",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Grupos = mongoose.model("Grupos", GruposSchema);

module.exports = Grupos;
