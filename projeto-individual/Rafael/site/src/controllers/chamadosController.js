chamadoModel = require('../models/chamadoModel')
function addChamado(req, res) {
    let emailUsuario = req.body.emailChamado;
    let tituloChamado = req.body.tituloChamado;
    let descricaoChamado = req.body.descricaoChamado;
    let assuntoChamado = req.body.assuntoChamado;
    let categoriaChamado = req.body.categoriaChamado;
    let hashChamado = req.body.hashChamado;
    chamadoModel.addChamado(tituloChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario);



}

function listarChamado(req, res) {
    chamadoModel.listarChamados()
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
function pegarMaquinasCliente(req, res) {
    idCliente = req.body.idCliente;
    chamadoModel.pegarMaquinasCliente(idCliente)
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

function fecharChamado(req, res) {
    let idChamado = req.body.idChamado;

    chamadoModel.fecharChamado(idChamado)
}



module.exports = {
    addChamado, listarChamado, fecharChamado, pegarMaquinasCliente
};