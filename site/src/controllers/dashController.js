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

async function getDados(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let nomeMetrica = req.body.nomeMetrica;
    
    let maquinaInfo = await dashModel.getMaquinaInfo(fkEmpresa, fkMaquina);
    let response = await dashModel.getDados(maquinaInfo[0].nomeEmpresa, maquinaInfo[0].nomeMaquina, nomeMetrica);
    res.json({"metricas": response});
}

async function getMetricas(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let order = req.body.order;
    let limit = req.body.limit;
    if (limit == undefined) limit = true;
    await dashModel.createViews(
        fkEmpresa, fkMaquina
    );
    let response = await dashModel.analysys(fkEmpresa, fkMaquina, order, limit);
    res.json({"metricas": response})
}

async function getMaquina(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;

    let response = await dashModel.getMaquinaInfo(fkEmpresa, fkMaquina);
    res.json(response[0])
}

async function getComponente2(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let nomeComponente = req.body.nomeComponente;
    
    let response = await dashModel.getComponente2(fkEmpresa, fkMaquina, nomeComponente);
    res.json(response[0]);
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados,
    getMetricas,
    getMaquina,
    getComponente2
}