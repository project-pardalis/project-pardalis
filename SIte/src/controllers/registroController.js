var registroModel = require("../models/registroModel");

function testar(req, res) {
  console.log("ENTRAMOS NA registroController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function pegarDados(req, res) {
    registroModel.pegarDados()
    .then(function (resultado) {
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length > 0) {
            console.log(resultado);
            res.json(resultado);
        }
        else {
            res.status(403).send("Nenhum registro encontrado!");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  testar,
  pegarDados,
};