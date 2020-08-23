const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");
const bcrypt = require("bcrypt");
const Grupos = require("./Grupos");
const UserSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
    },
    grupoId: {
      type: Schema.Types.ObjectId,
      ref: "Grupos",
    },
    grupo: {
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

UserSchema.pre("updateOne", async function (next) {
  const self = this;
  if (self.password) {
    bcrypt.hash(self.getUpdate().$set.password, 10, function (err, hash) {
      if (err) return next(new Error(" Erro inset"));
      self.update({}, { password: hash });
      next();
    });
  }
  next();
});

UserSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000)
    next(new Error("E-mail/Usuario já existe, por favor tente novamente"));
  else next(error);
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(new Error(" Erro inset"));
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
