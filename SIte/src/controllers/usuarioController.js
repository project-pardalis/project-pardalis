var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function entrar(req, res) {
  var email = req.body.userEmailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu usuário está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var username = req.body.usernameServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (username == undefined) {
    res.status(400).send("Seu username está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, username)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}


function updatePassword(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var username = req.body.usernameServer;
    var senha = req.body.senhaServer;
  
    // Faça as validações dos valores
    if (username == undefined) {
      res.status(400).send("Seu username está undefined!");
    } else if (senha == undefined) {
      res.status(400).send("Seu ID está undefined!");
    } else {
      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      usuarioModel
        .updatePassword(username, senha)
        .then(function (resultado) {
          res.json(resultado);
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a alteração! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
  }





module.exports = {
  entrar,
  cadastrar,
  updatePassword,
  testar
};
