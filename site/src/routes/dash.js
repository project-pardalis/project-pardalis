var express = require("express")
var router = express.Router()

var dashController = require("../controllers/dashController");

router.post("/getMaquinas", function (req, res) {
    dashController.getMaquinas(req, res)
});

router.post("/getComponente", function(req, res) {
    dashController.getComponente(req, res)
})

router.post("/getDados", function(req, res) {
    dashController.getDados(req, res)
})

router.post("/analysys", function(req, res) {
    dashController.analysys(req, res)
})

module.exports = router