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

async function analysys(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let nomeMetrica = req.body.nomeMetrica;

    let response = await dashModel.analysys(fkEmpresa, fkMaquina, nomeMetrica);
    //console.log(response)
    res.json({"metricas": response})/* .catch((err) => {console.log(err);}) */
}

function getMetricas(req, res) {
    res.json(dashModel.createViewMetricas())
}
module.exports = {
    getMaquinas,
    getComponente,
    getDados,
    analysys,
    getMetricas
}