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
    var sql = `SELECT * FROM Leitura ORDER BY dataColeta DESC LIMIT 60`
    return database.executar(sql)
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados
}