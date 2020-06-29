const { erroResponse, defaultResponse } = require("../response");
const Users = require("../models/Users");

class usersController {
  async getall(req, res) {
    try {
      const users = await Users.find();
      res.json(defaultResponse(users));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      const userExist = await Users.findOne({ email: email });

      if (userExist) {
        res.send(erroResponse("Usuario ja cadastrado", 409));
      } else {
        const newUser = await Users.create({
          name,
          email,
        });
        res.send(defaultResponse(newUser, 201));
      }
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  async findByName(req, res) {
    try {
      const { name } = req.params;
      const userExist = await Users.findOne({ name });
      if (!userExist) {
        res.send(erroResponse(`User: ${name} not found`, 404));
      } else {
        res.send(defaultResponse(userExist));
      }
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const { name } = req.body;
      const update = await Users.updateOne({ email }, { $set: { name } });
      res.send(defaultResponse(update));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async delelteUser(req, res) {
    try {
      const { email } = req.params;
      const users = await Users.deleteOne({ email });
      if (users.deletedCount !== 0) {
        res.send(defaultResponse("User Deleted", 204));
      } else {
        res.send(defaultResponse("User not found", 404));
      }
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new usersController();
