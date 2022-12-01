var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/getInfo/:idUsuario", function (req, res) {
    usuarioController.getInfo(req, res);
})

router.post("/atualizar", function (req, res) {
    usuarioController.updateUser(req, res);
})


router.post("/cadastrarFuncionario", (req, res) => {
    usuarioController.cadastrarUsuario(req, res)
})

router.get("/getAllUser", (req, res) => {
    usuarioController.getAllUserInfo(req, res)
})

module.exports = router;