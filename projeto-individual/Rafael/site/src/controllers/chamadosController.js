chamadoModel = require('../models/chamadoModel')
function addChamado(req, res) {
    let emailUsuario = req.body.emailChamado;
    let tituloChamado = req.body.tituloChamado;
    let descricaoChamado = req.body.descricaoChamado;
    let assuntoChamado = req.body.assuntoChamado;
    let categoriaChamado = req.body.categoriaChamado;

    let fkMaquina = req.body.fkMaquina;
    chamadoModel.addChamado(tituloChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario, fkMaquina);



}




function corrigirData(dia) {
    if (String(dia).length == 1) {
        return `0${dia}`
    }
    console.log("tamanho dia : " + dia.length)
    return dia
}

function getDataLeituraMetrica(req, res) {


    let dataChamado = new Date(req.query.dataChamado)

    let dataComparacao = dataChamado - 1000 * 60 * 30
    dataComparacao = new Date(dataComparacao)
    dataChamado = String(`${dataChamado.getUTCFullYear()}-${dataChamado.getUTCMonth()}-${corrigirData(dataChamado.getUTCDay())} ${dataChamado.getHours()}:${dataChamado.getMinutes()}:${dataChamado.getSeconds()}`)

    dataComparacao = String(`${dataComparacao.getUTCFullYear()}-${dataComparacao.getUTCMonth()}-${corrigirData(dataComparacao.getUTCDay())} ${dataComparacao.getHours()}:${dataComparacao.getMinutes()}:${dataComparacao.getSeconds()}`)

    idMaquina = req.query.idMaquina


    if (idMaquina >= 0) {
        chamadoModel.getDataLeituraMetrica(idMaquina, dataChamado, dataComparacao).then(function (resultado) {
            if (resultado.length >= 0) {
                console.log(req.query)
                res.status(200).json(resultado);
            } else {
                console.log(dataChamado)
                console.log(dataComparacao)
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}
function listarChamado(req, res) {
    if (req.query.id != undefined && req.query.id > 0) {
        chamadoModel.listarChamados(req.query.id)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
    else {
        chamadoModel.listarChamados(false)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function getDadosMaquina(req, res) {

    if (req.query.emailCliente != undefined) {
        console.log("SUFHAILFGWQIYGFBWQGFUYWQGFYWGQFUYWGQ")
        chamadoModel.getDadosMaquina(req.query.emailCliente)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
    else {
        idMaquina = req.query.idMaquina;
        chamadoModel.getDadosMaquina(idMaquina)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function fecharChamado(req, res) {
    let idChamado = req.body.idChamado;

    chamadoModel.fecharChamado(idChamado)
}



module.exports = {
    addChamado, listarChamado, fecharChamado, getDadosMaquina, getDataLeituraMetrica
};