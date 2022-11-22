var express = require("express");
var router = express.Router();

var visualizarChamadosController = require("../controllers/visualizarChamadosController");

router.get("/", function (req, res) {
    res.render("index", { title: "Express" });
});

router.get("/listarChamados", function (req, res) {
    visualizarChamadosController.listarChamados(req, res);
});




module.exports = router;