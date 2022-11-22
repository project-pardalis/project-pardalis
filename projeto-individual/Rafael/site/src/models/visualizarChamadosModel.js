var database = require("../database/config")



function listarChamados() {
    instrucao = "SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario, isAberto FROM Chamado JOIN Usuario ; "
    return database.executar(instrucao)

}


module.exports = {
    listarChamados,

}