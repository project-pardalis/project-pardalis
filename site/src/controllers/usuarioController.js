var usuarioModel = require("../models/usuarioModel");
var sha512 = require('js-sha512');
var sessoes = [];

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

async function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var empresa = req.body.empresaServer;
  var cnpj = req.body.cnpjServer;
  var gerente = req.body.adminServer;
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
    let resEmpresa;
    try {
      resEmpresa = await usuarioModel.cadastrarEmpresa(empresa, cnpj);
      try {
        let resultado = await usuarioModel.cadastrarFuncionario(gerente, email, sha512(senha), resEmpresa[0].idEmpresa, "Programador")
        res.json({ "ok": true });
      } catch (error) {
        res.status(500).json({ "erro": error.sqlMessage });
      }
    } catch (error) {
      res.status(500).json({ "erro": error.sqlMessage });
      usuarioModel.deleteEmpresa(resEmpresa[0].idEmpresa);

    }

  }
}
async function cadastrarUsuario(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.userEmailServer;
  var senha = req.body.senhaServer;
  var cargo = req.body.cargoServer;
  var empresa = req.body.empresaServer


  resUsuario = await usuarioModel.cadastrarFuncionario(nome, email, senha, cargo, empresa)
    .then(function (resposta) {
      res.json(resposta)
      console.log(resposta)
    });



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

async function getInfo(req, res) {
  let idUsuario = req.params.idUsuario;
  res.json(await usuarioModel.getInfo(idUsuario));
}

async function updateUser(req, res) {
  let idUsuario = req.body.ID_USUARIO;
  let nome = req.body.NOME_USUARIO;
  let email = req.body.EMAIL_USUARIO;
  let senha = req.body.SENHA_USUARIO;

  res.status(200).json(await usuarioModel.updateUser(idUsuario, nome, email, sha512(senha), req.body.CARGO_USUARIO));
  
}

async function getAllUserInfo(req, res) {
  let fkEmpresa = req.params.fkEmpresa;

  resUsuario = await usuarioModel.getAllUserInfo(fkEmpresa)
    .then(function (resposta) {
      res.json(resposta)
      console.log(resposta)
    });
}
module.exports = {
  entrar,
  cadastrar,
  updatePassword,
  getInfo,
  updateUser,
  cadastrarUsuario,
  getAllUserInfo
};
