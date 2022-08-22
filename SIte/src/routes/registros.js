var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/", function (req, res) {
    registroController.testar(req, res);
});

router.get("/pegarDados", function(req, res){
    registroController.pegarDados(req, res);
});

module.exports = router;