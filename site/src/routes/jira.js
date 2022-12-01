var express = require("express");
var router = express.Router();

var jiraController = require("../controllers/jiraController.js");

router.post("/createIssue", function(req, res){
    jiraController.createIssueMain(req, res);
});

router.post("/verifyEmail", function(req, res){
    jiraController.verifyEmail(req, res);
});

module.exports = router;