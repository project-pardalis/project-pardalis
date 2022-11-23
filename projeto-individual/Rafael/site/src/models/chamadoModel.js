var database = require("../database/config")


dataAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');



function getDataLeituraMetrica(id, dataChamado, dataAntesChamado) {
    instrucao = `select valorLeitura, nomeMetrica,dataColeta, unidadeDeMedida from Leitura JOIN Maquina Join Metrica  WHERE idMaquina=${id} and idMetrica=fkMetrica and fkMaquina=idMaquina BETWEEN '${dataAntesChamado}' and '${dataChamado}'  LIMIT 60 ;`
    return database.executar(instrucao)
}


async function addChamado(assuntoChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario, fkMaquina) {

    verifyIdUsuario = await database.executar(`SELECT idUsuario FROM Usuario WHERE emailUsuario = '${emailUsuario}'`)

    if (verifyIdUsuario[0] == undefined) {
        console.log("E-mail inválido")
    }
    else {

        database.executar(`INSERT INTO Chamado (assuntoChamado, descricaoChamado,  categoriaChamado, dataChamado, isAberto, fkUsuario, fkMaquina ) VALUES ( '${assuntoChamado}',  '${descricaoChamado}', '${categoriaChamado}','${dataAtual}',1, ${verifyIdUsuario[0].idUsuario}, ${fkMaquina} ) ;`)

        console.log(verifyIdUsuario)
        console.log("Cadastro efetuado com sucesso! ")
    }
}


// adicionar where nomeMaquina = maquina e ajustar o sistema para pegar o nome da maquina no chamado
function listarChamados(conditionalId) {
    if (conditionalId == false) {
        instrucao = "SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario, emailUsuario,  isAberto, idUsuario,fkMaquina FROM Chamado JOIN Usuario JOIN Maquina WHERE fkMaquina=idMaquina; "

        return database.executar(instrucao)
    }
    else {
        instrucao = `SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario, emailUsuario,   nomeMaquina, hashMaquina, isAberto, idUsuario, fkMaquina FROM Chamado JOIN Usuario JOIN Maquina WHERE fkMaquina=idMaquina and idChamado=${conditionalId} `

        return database.executar(instrucao)
    }


}

function fecharChamado(idChamado) {
    instrucao = `UPDATE Chamado SET isAberto=0 WHERE idChamado=${idChamado};`
    return database.executar(instrucao)
}

function getDadosMaquina(id) {

    if (id.indexOf('.com') != -1) {

        instrucao = `select idMaquina, nomeMaquina, sistemaOperacional, dataCriacao, hashMaquina from Maquina Join Usuario WHERE emailUsuario='${id}'`
    }
    else {
        instrucao = `select * from Maquina WHERE idMaquina='${id}'`
    }
    return database.executar(instrucao)

}
module.exports = {
    addChamado, listarChamados, fecharChamado, getDadosMaquina, getDataLeituraMetrica
}