var database = require("../database/config")


dataAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

async function addChamado(assuntoChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario) {

    verifyIdUsuario = await database.executar(`SELECT idUsuario FROM Usuario WHERE emailUsuario = '${emailUsuario}'`)

    if (verifyIdUsuario[0] == undefined) {
        console.log("E-mail inválido")
    }
    else {

        database.executar(`INSERT INTO Chamado (assuntoChamado, descricaoChamado,  categoriaChamado, dataChamado, isAberto, fkUsuario ) VALUES ( '${assuntoChamado}',  '${descricaoChamado}', '${categoriaChamado}','${dataAtual}',1, ${verifyIdUsuario[0].idUsuario}) ;`)

        console.log(verifyIdUsuario)
        console.log("Cadastro efetuado com sucesso! ")
    }
}



function listarChamados() {
    instrucao = "SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario, isAberto, idUsuario FROM Chamado JOIN Usuario ; "
    return database.executar(instrucao)

}

function fecharChamado(idChamado) {
    instrucao = `UPDATE Chamado SET isAberto=0 WHERE idChamado=${idChamado};`
    return database.executar(instrucao)
}

function pegarMaquinasCliente(idCliente) {
    instrucao = `select nomeMaquina, hashMaquina from Usuario JOIN Empresa JOIN Maquina WHERE idUsuario=${idCliente};`
    return database.executar(instrucao)

}
module.exports = {
    addChamado, listarChamados, fecharChamado, pegarMaquinasCliente
}