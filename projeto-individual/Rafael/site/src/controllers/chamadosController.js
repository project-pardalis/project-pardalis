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




function removeHours(data, value) {
    if (data - value <= 0) {
        if (data - value == 0) {
            return '00'
        }
        return (data + 24) - value
    }
    return data
}
function sumDays(data, value) {
    if (data + value > 31) {
        return (data + value) - 30
    }
    return data + value
}

function conversor(data) {
    return String(`${data.getUTCFullYear()}-${data.getUTCMonth() + 2}-${sumDays(data.getDate(), 20)} ${removeHours(data.getUTCHours(), 3)}:${corrigirLength1(data.getUTCMinutes())}:${data.getUTCSeconds()}`)
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