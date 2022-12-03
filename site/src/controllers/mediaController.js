var mediaModel = require("../models/mediaModel");

function buscarMedia(req, res) {

    
    const limite_linhas = 1; 

    var idCPU = req.params.idCPU;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    mediaModel.buscarMedia(idCPU, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarMedia,
    

}