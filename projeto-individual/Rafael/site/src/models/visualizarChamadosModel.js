var database = require("../database/config")



function listarChamados() {
    instrucao = "SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario FROM Chamado JOIN Usuario ; "
    return database.executar(instrucao)

}

function getDataCountChamadosAbertos() {
    instrucao = "select count(*) as selectChamadoAberto from Chamado WHERE isAberto =1 ;"
    return database.executar(instrucao)
}


module.exports = {
    listarChamados,
    getDataCountChamadosAbertos
}