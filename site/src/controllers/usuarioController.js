var usuarioModel = require("../models/usuarioModel");
var sha512 = require('js-sha512');
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
      .entrar(email, sha512(senha))
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
  var empresa = req.body.empresaServer;
  var cnpj = req.body.cnpjServer;
  var gerente = req.body.gerenteServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (empresa == undefined) {
    res.status(400).send("O nome da empresa está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("O cnpj da empresa está undefined!");
  } else if (gerente == undefined) {
    res.status(400).send("O nome do gerente está undefined!");
  } else if (email == undefined) {
    res.status(400).send("O e-mail está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("A senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarEmpresa(empresa, cnpj)
      .then(function (resultado) {
        // console.log(resultado);
        usuarioModel.cadastrarFuncionario(gerente, email, sha512(senha), 1, resultado.insertId)
          .then(function (resultado) {
            res.json(resultado);
          })
          .catch((erro) => {
            console.log('Houve um erro ao realizar o cadastro do funcionário. Erro: ', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
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
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Seu ID está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .updatePassword(email, senha)
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
