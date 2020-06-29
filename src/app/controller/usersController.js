const fakeDb = require("../fakeDb");
const { erroResponse, defaultResponse } = require("../response");
const { INTERNAL_SERVER_ERROR } = require("http-status");

class usersController {
  async getall(req, res) {
    try {
      const users = await fakeDb;
      res.json(defaultResponse(users));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async createUser(req, res) {
    try {
      const { name } = req.body;
      const userExist = await fakeDb.find((userBd) => name === userBd.name);

      if (userExist) {
        res.send(erroResponse("Usuario ja cadastrado", 201));
      } else {
        const a = await fakeDb.push({
          id: Math.floor(1) + 1,
          name: name,
        });
        res.send(defaultResponse(a, 201));
      }
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }

  async findByName(req, res) {
    try {
      const { name } = req.params;
      const userExist = await fakeDb.find((userBd) => name === userBd.name);
      if (!userExist) {
        res.send(erroResponse(`User: ${name} not found`));
      } else {
        res.send(defaultResponse(userExist));
      }
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async updateUser(req, res) {
    try {
      const { update } = req.params;
      const { name } = req.body;
      const userForUpdate = fakeDb.filter((userBd) => update === userBd.name);
      userForUpdate[0].name = name;
      res.send(defaultResponse("update"));
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
  async delelteUser(req, res) {
    try {
      const { name } = req.params;
      const users = fakeDb.filter((users) => users.name !== name);

      res.send(users);
    } catch (error) {
      res.send(erroResponse(error.message));
    }
  }
}

module.exports = new usersController();
