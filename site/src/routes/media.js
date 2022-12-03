var express = require("express");
var router = express.Router();

var mediaController = require("../controllers/mediaController");

router.get("/media/:idCPU", function (req, res) {
    mediaController.buscarMedia(req, res);
});

module.exports = router;