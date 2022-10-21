var maquinaModel = require("../models/maquinaModel");

async function appendMachine(req, res) {
    let fkEmpresa = req.body.fkEmpresa;
    let hashMaquina = req.body.hashMaquina;
    let nomeMaquina = req.body.nomeMaquina;

    let resultMachine = await maquinaModel.appendMachine(fkEmpresa, hashMaquina, nomeMaquina);
    res.json({'hash': resultMachine});
}

module.exports = {
  appendMachine,
};