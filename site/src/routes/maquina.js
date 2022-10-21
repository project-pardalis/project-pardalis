var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/appendMaquina", function(req, res){
    maquinaController.appendMachine(req, res);
});

module.exports = router;