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

function analysys(req, res) {
    let fkEmpresa = res.body.fkEmpresa;
    let fkMaquina = res.body.fkMaquina;
}
module.exports = {
    getMaquinas,
    getComponente,
    getDados
}