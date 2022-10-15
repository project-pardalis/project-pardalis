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

async function getMetricas(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    await dashModel.createViews(
        fkEmpresa, fkMaquina
    );
    let response = await dashModel.analysys(fkEmpresa, fkMaquina);
    res.json({"metricas": response})
}

async function getMaquina(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;

    let response = await dashModel.getMaquinaInfo(fkEmpresa, fkMaquina);
    res.json(response[0])
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados,
    getMetricas,
    getMaquina
}