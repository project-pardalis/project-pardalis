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
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let nomeMetrica = req.body.nomeMetrica;

    res.json(dashModel.analysys(fkEmpresa, fkMaquina, nomeMetrica)/* .catch((err) => {console.log(err);}) */)
}

function getMetricas(req, res) {
    res.json(dashModel.getMetricas())
}
module.exports = {
    getMaquinas,
    getComponente,
    getDados,
    analysys,
    getMetricas
}