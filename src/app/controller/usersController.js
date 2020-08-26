const { erroResponse, defaultResponse } = require("../response");
const mongoose = require("../../database/database");
const Users = require("../models/Users");
const Grupos = require("../models/Grupos");
const httpStatus = require("http-status");
const ObjectId = mongoose.Types.ObjectId;
class UsersController {
  //Get all patients
  async indexPacientes(req, res) {
    try {
      const pacientes = await Users.find({
        $and: [{ ativo: true }, { paciente: true }],
      });
      res.send(defaultResponse(pacientes));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Get all Users
  async indexUsers(req, res) {
    try {
      const users = await Users.find({
        $or: [{ paciente: false }, { paciente: null }],
      });
      res.send(defaultResponse(users));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async getUserByEmail(req, res) {
    try {
      const user = await Users.findOne(req.params, { password: 0 });

      res.send(defaultResponse(user));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Get user/Patient inactive
  async getAllInactive(req, res) {
    try {
      const users = await Users.find({
        $and: [{ ativo: false }],
      });
      res.send(defaultResponse(users));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // create a Patient/Users
  async findOrCreate(req, res) {
    const { email } = req.body;

    const dataCreate = req.body;
    try {
      const userExist = await Users.findOne({ email: email });
      if (userExist) {
        return res.send(defaultResponse(userExist));
      }
      const user = await Users.create(dataCreate);
      res.send(defaultResponse(user, httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  async createOrUpdate(req, res) {
    const { email, group } = req.body;

    const dataCreate = req.body;
    try {
      const userExist = await Users.findOne({ email: email });
      if (userExist) {
        await Users.updateOne({ email: email }, { $set: dataCreate });
        return res.send(defaultResponse(userExist));
      }
      const { _id: newUser, ...user } = await Users.create(dataCreate);
      if (group) {
        const g = await Grupos.findById(group);
        g.userId.push(newUser);
        await g.save();
      }
      res.send(defaultResponse(user, httpStatus.CREATED));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  //Update patient/users
  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const update = await Users.updateOne({ email }, { $set: req.body });
      res.send(defaultResponse(update.nModified, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  // inactive Patient/users
  async delete(req, res) {
    try {
      const response = await Users.updateOne(req.query, {
        $set: { ativo: false },
      });
      res.send(defaultResponse(response.nModified, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  // Restoring patient/users
  async restoring(req, res) {
    try {
      const response = await Users.updateOne(req.query, {
        $set: { ativo: true },
      });
      res.send(defaultResponse(response.nModified, httpStatus.NO_CONTENT));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new UsersController();
