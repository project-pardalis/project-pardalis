var express = require("express")
var router = express.Router()

var dashController = require("../controllers/dashController");

router.post("/getMaquinas", function (req, res) {
    dashController.getMaquinas(req, res)
});

router.post("/getDados", function (req, res) {
    dashController.getDados(req, res)
})

router.post("/getMetrica", function (req, res) {
    dashController.getMetricas(req, res)
})

router.post("/getMaquina", function (req, res) {
    dashController.getMaquina(req, res)
})

router.post("/getComponenteServer", function (req, res) {
    dashController.getComponente(req, res)
})

router.post("/getSum", function (req, res) {
    dashController.getSum(req, res)
})

router.post("/getDadosGeral", function (req, res) {
    dashController.getDadosGeral(req, res)
})

/* router.post("/getDadosMaquina", function (req, res) {
    dashController.getDadosMaquina(req, res)
}) */

module.exports = router