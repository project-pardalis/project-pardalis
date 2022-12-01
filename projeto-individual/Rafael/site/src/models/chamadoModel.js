var database = require("../database/config")

dataAtual = new Date()
dataAtual = String(`${dataAtual.getUTCFullYear()}-${dataAtual.getUTCMonth()}-${corrigirData(dataAtual.getUTCDay())} ${dataAtual.getHours()}:${dataAtual.getMinutes()}:${corrigirSegundos(dataAtual.getSeconds())}`)

function corrigirSegundos(segundos) {
    if (String(segundos).length == 1) {
        return String("0" + segundos)
    }
    return segundos;
}

function getDataLeituraMetrica(id, dataChamado, dataAntesChamado, metrica) {
    instrucao = `select valorLeitura, nomeMetrica,dataColeta, unidadeDeMedida from Leitura JOIN Maquina Join Metrica  WHERE idMaquina=${id}  and fkMaquina=idMaquina and fkMetrica=idMetrica and nomeMetrica='${metrica}' and dataColeta BETWEEN '${dataAntesChamado}' and '${dataChamado}';`
    return database.executar(instrucao)
}


async function addChamado(assuntoChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario, fkMaquina) {

    verifyIdUsuario = await database.executar(`SELECT idUsuario FROM Usuario WHERE emailUsuario = '${emailUsuario}'`)

    if (verifyIdUsuario[0] == undefined) {
        console.log("E-mail inválido")
    }
    else {
        console.log(fkMaquina)
        database.executar(`INSERT INTO Chamado (assuntoChamado, descricaoChamado,  categoriaChamado, dataChamado, isAberto, prioridadeChamado, fkUsuario, fkMaquina ) VALUES ( '${assuntoChamado}',  '${descricaoChamado}', '${categoriaChamado}',NOW(),1,'Normal' ,${verifyIdUsuario[0].idUsuario}, ${fkMaquina} ) ;`)
        // GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'Bahia Standard Time' 
        console.log(verifyIdUsuario)
        console.log("Cadastro efetuado com sucesso! ")
    }
}


// adicionar where nomeMaquina = maquina e ajustar o sistema para pegar o nome da maquina no chamado
function listarChamados(conditionalId) {
    if (conditionalId == false) {
        instrucao = "SELECT idChamado, assuntoChamado, descricaoChamado, categoriaChamado, dataChamado, nomeUsuario, emailUsuario,  isAberto, prioridadeChamado, idUsuario,fkMaquina FROM Chamado JOIN Usuario JOIN Maquina WHERE fkMaquina=idMaquina; "

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


function corrigirData(dia) {
    if (String(dia).length == 1) {
        return `0${dia}`
    }
    console.log("tamanho dia : " + dia.length)
    return dia
}


function updateChamado(id, risco) {
    instrucao = "UPDATE Chamado set prioridadeChamado = '" + risco + "' WHERE idChamado=" + id

    database.executar(instrucao)
}

function responderChamado(resposta, id) {
    instrucao = "UPDATE Chamado SET respostaChamado='" + resposta + "' WHERE idChamado=" + id
    database.executar(instrucao)
}

module.exports = {
    addChamado, listarChamados, fecharChamado, getDadosMaquina, getDataLeituraMetrica, updateChamado, responderChamado
}