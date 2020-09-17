const permissao = require("express").Router();
const permissaoController = require("../app/controller/permissaoController");
const permissaoGrupos = require("../app/controller/PermissaoGrupos");
const verifyToken = require("../middlewares/checkToken");

permissao.get("/api/permissao", verifyToken, permissaoController.index);
permissao.post("/api/permissao", verifyToken, permissaoController.store);
permissao.get("/api/permissao/:_id", verifyToken, permissaoController.getByid);
// permissao.put("/api/permissao/:nome", permissaoController.editPermissao);
// permissao.delete("/api/permissao/:_id", permissaoController.delete);

permissao.post("/api/gp", verifyToken, permissaoGrupos.include);

module.exports = permissao;
