var database = require("../database/config")

function pegarDados() {
    var comandoSql = `SELECT * FROM registro;`;
    console.log("Executando a instrução SQL: \n" + comandoSql);
    return database.executar(comandoSql);
}

module.exports = {
    pegarDados,
};