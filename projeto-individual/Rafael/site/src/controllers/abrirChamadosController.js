var abrirChamadoModel = require("../models/abrirChamadosModel");

async function addChamado(req, res) {
    let emailUsuario = req.body.emailChamado;
    let tituloChamado = req.body.tituloChamado;
    let descricaoChamado = req.body.descricaoChamado;
    let assuntoChamado = req.body.assuntoChamado;
    let categoriaChamado = req.body.categoriaChamado;

    let resultadoAberturaChamado = await abrirChamadoModel.addChamado(tituloChamado, descricaoChamado, assuntoChamado, categoriaChamado, emailUsuario);



}



module.exports = {
    addChamado
};