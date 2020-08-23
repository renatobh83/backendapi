const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");
const User = require("./Users");

const GruposSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
  },
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
GruposSchema.pre("deleteOne", { document: true }, async function (next) {
  console.log(this);
  const users = await User.findById({ grupoId: this._conditions });
  console.log(users);
  return next(new Error("Você não tem permissão para trocar de grupo"));
});

const Grupos = mongoose.model("Grupos", GruposSchema);

module.exports = Grupos;
