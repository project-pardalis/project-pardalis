var dashModel = require("../models/dashModel")

async function getMaquinas(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let response = await dashModel.getMaquinas(fkEmpresa);
    res.json({"maquinas": response});
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

async function getComponente(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let fkMaquina = req.body.fkMaquina;
    let nomeComponente = req.body.nomeComponente;
    
    let response = await dashModel.getComponente(fkEmpresa, fkMaquina, nomeComponente);
    res.json(response[0]);
}

module.exports = {
    getMaquinas,
    getDados,
    getMetricas,
    getMaquina,
    getComponente
}