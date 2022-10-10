var database = require("../database/config")

function getMaquinas(empresa) {
    var sql = `SELECT * FROM Maquina`
    return database.executar(sql)
}

function getComponente(empresa) {
    var sql = `SELECT * FROM Componente`
    return database.executar(sql)
}

function getDados(empresa) {
    var sql = `select * from vw_empresa_sptech_maquina1_leitura order by dataColeta DESC limit 200`
    return database.executar(sql)
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados
}