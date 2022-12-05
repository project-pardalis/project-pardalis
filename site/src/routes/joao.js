var express = require("express")
var router = express.Router()

var dashController = require("../controllers/joaoController.js");

/* router.get("/getDataByDate/:fkMaquina&:fkEmpresa", function(req, res) {
    dashController.getDataDate(req, res)
}) */
/* Novo */

router.get("/getInformationsByDateHour/:fkMaquina&:fkEmpresa", function(req, res) {
    dashController.getMeanHours(req, res);
})

router.get("/predictWithMl/:fkMaquina&:fkEmpresa", (req, res) => {
    dashController.predictWithMl(req, res);
})

router.get("/getMaquina/:hashMaquina", (req, res) => {
    dashController.getMaquina(req, res);
})

module.exports = router