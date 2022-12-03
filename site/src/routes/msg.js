var express = require("express");
var router = express.Router();


var msgModel = require("../models/msgModel")


router.get("/numero", function (req, res) {
   msgModel.enviarSMS(req, res); 
});

module.exports = router;