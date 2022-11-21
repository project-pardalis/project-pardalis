var express = require("express");
var router = express.Router();

var abrirChamadosController = require("../controllers/abrirChamadosController");

router.post("/adicionarChamado", function (req, res) {
    abrirChamadosController.addChamado(req, res);
});



module.exports = router;