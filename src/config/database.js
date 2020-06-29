require("dotenv").config();

module.exports = {
  host: "ec2-18-214-119-135.compute-1.amazonaws.com",
  username: "cppuxlloxuuens",
  password: "ebc0040901222a602a743ba2c40b7b44407430bbf2a9fbe098fdfe2cb0c91c42",
  port: 5432,
  database: "d6rk9r6bmba3h0",
  dialect: "postgres",
  ssl: true,
  protocol: "postgres",
  dialectOptions: {
    ssl: true,
  },
  timestamps: true,
  underscored: true,
  underscoredAll: true,
};
