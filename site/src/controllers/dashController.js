var dashModel = require("../models/dashModel")

function getMaquinas(req, res) {
    dashModel.getMaquinas()
        .then(function(resultado) {
            res.json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
        })
}

function getComponente(req, res) {
    dashModel.getComponente()
        .then(function(resultado) {
            res.json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
        })
} 

function getDados(req, res) {
    dashModel.getDados()
        .then(function(resultado) {
            res.json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
        })
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados
}