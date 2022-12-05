chamadoModel = require('../models/chamadoModel')
const axios = require('axios');
tokenSlack = require('./token.js')
function addChamado(req, res) {
    let emailUsuario = req.body.emailChamado;
    let tituloChamado = req.body.tituloChamado;
    let descricaoChamado = req.body.descricaoChamado;
    let assuntoChamado = req.body.assuntoChamado;
    let categoriaChamado = req.body.categoriaChamado;

    let fkMaquina = req.body.fkMaquina;
    chamadoModel.addChamado(tituloChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario, fkMaquina);



}




function conversor(data) {
    return String(`${data.getUTCFullYear()}-${data.getUTCMonth() + 1}-${data.getDate()} ${tratarHoras(data.getUTCHours() - 3)}:${corrigirLength1(data.getUTCMinutes())}:${data.getUTCSeconds()}`)
}

function tratarHoras(hora) {
    if (hora < 0) {
        return hora + 24
    }
    return hora
}
function corrigirLength1(number) {
    if (String(number).length == 1) {
        return String("0" + number)
    }
    return number
}
function getDataLeituraMetrica(req, res) {


    let dataChamado = new Date(req.query.dataChamado)
    let metrica = req.query.metrica
    let dataComparacao = dataChamado - 1000 * 60 * 30
    dataComparacao = new Date(dataComparacao)
    dataChamado = conversor(dataChamado)
    dataComparacao = conversor(dataComparacao)
    idMaquina = req.query.idMaquina


    if (idMaquina >= 0) {
        chamadoModel.getDataLeituraMetrica(idMaquina, dataChamado, dataComparacao, metrica).then(function (resultado) {
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

function updateChamado(req, res) {
    let idChamado = req.query.idChamado;
    let risco = req.query.riscoChamado;

    chamadoModel.updateChamado(idChamado, risco)
}

function responderChamado(req, res) {

    let respostaChamado = req.body.respostaChamado
    let idChamado = req.body.idServer
    const slackToken = tokenSlack.token;
    chamadoModel.responderChamado(respostaChamado, idChamado)

    const url = 'https://hooks.slack.com/services/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';
    const resposta = axios.post(url, {
        channel: '#geral',
        text: `Olá! O seu chamado acaba de ser respondido! 😅 \n De: Analista de sistemas (𝐩𝐚𝐫𝐝𝐚𝐥𝐢𝐬𝐩𝐫𝐨𝐣𝐞𝐭𝐨@𝐠𝐦𝐚𝐢𝐥.𝐜𝐨𝐦)\n \n Resposta:\n ${respostaChamado} \n\nᶜᵃˢᵒ ᵉˢˢᵃ ʳᵉˢᵖᵒˢᵗᵃ ⁿᵃᵒ ˢᵉʲᵃ ᵃ ˢᵒˡᵘᶜᵃᵒ ⁿᵒˢ ᶜᵒⁿᵗᵃᵗᵉ ᵖᵒʳ ᵉᵐᵃᶦˡ 📧   `
    }, { headers: { authorization: `Bearer ${slackToken}` } });

    console.log('Done', resposta.data);
}

module.exports = {
    addChamado, listarChamado, fecharChamado, getDadosMaquina, getDataLeituraMetrica, updateChamado, responderChamado
};