var express = require("express");
var router = express.Router();


var chamadosController = require("../controllers/chamadosController");





router.get("/", function (req, res) {
    res.render("index", { title: "Express" });
});

router.get("/listarChamado", function (req, res) {
    chamadosController.listarChamado(req, res);
});



router.post("/adicionarChamado", function (req, res) {
    chamadosController.addChamado(req, res);
});

router.post("/fecharChamado", function (req, res) {
    chamadosController.fecharChamado(req, res);
});

router.get("/getDadosMaquina", function (req, res) {
    chamadosController.getDadosMaquina(req, res);
});

router.get("/getLeituraMetricaDados", function (req, res) {
    chamadosController.getDataLeituraMetrica(req, res);
});

router.get("/updatePrioridade", (req, res) => {
    chamadosController.updateChamado(req, res)
})

router.post("/responderChamado", (req, res) => {
    chamadosController.responderChamado(req, res)
})



module.exports = router;

