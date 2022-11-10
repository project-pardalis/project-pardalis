var express = require("express");
var router = express.Router();

var jiraController = require("../controllers/jiraController.js");

router.post("/createIssue", function(req, res){
    jiraController.createIssue(req, res);
});

module.exports = router;