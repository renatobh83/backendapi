const mongoose = require("../../database/database");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  telefone: {
    type: String,
    trim: true,
    minlength: 9,
  },
  paciente: {
    type: Boolean,
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

UserSchema.pre("updateOne", async function (next) {
  if (this.getUpdate().$set.group) {
    await User.findOne(this.getQuery()).then((res) => {
      if (res.group != 1) {
        next(new Error("Você não tem permissão para trocar de grupo"));
      }
    });
  } else {
    next();
  }
});
UserSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000)
    next(new Error("E-mail/Usuario já existe, por favor tente novamente"));
  else next(error);
});
const User = mongoose.model("User", UserSchema);

module.exports = User;