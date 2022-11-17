var maquinaModel = require("../models/maquinaModel");

async function appendMachine(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let hashMaquina = req.body.hashMaquina;
    let nomeMaquina = req.body.nomeMaquina;

    let resultMachine = await maquinaModel.appendMachine(fkEmpresa, hashMaquina, nomeMaquina);
    res.json({'hash': resultMachine});
}

async function getMeanDates(req, res) {
  let fkEmpresa = req.params.fkEmpresa;
  let fkMaquina = req.params.fkMaquina;
  res.json(await maquinaModel.getMeanDates(fkEmpresa, fkMaquina));
}

module.exports = {
  appendMachine,
  getMeanDates
};