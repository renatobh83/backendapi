const mongoose = require("../../database/database");
const { Schema } = require("../../database/database");

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

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(new Error(" Erro inset"));
    user.password = hash;
    next();
  });
});
UserSchema.pre("updateOne", function (next) {
  const user = this;
  bcrypt.hash(user.getUpdate().$set.password, 10, function (err, hash) {
    if (err) return next(new Error(" Erro inset"));
    user.update({}, { password: hash });

    next();
  });
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
