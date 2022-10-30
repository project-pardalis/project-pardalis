var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idUsuario, nomeUsuario, emailUsuario, cargo, fkEmpresa, fkAdministrador FROM Usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}' LIMIT 1;
    `;
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome, cnpj) {
    var instrucao = `
        INSERT INTO Empresa (nomeEmpresa, cnpjEmpresa) VALUES ('${nome}', '${cnpj}');
    `;
    return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, senha, nivelAcesso, fkEmpresa) {
    var instrucao = `
    INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, fkEmpresa, fkAdministrador)
    SELECT ${nome}, ${email}, ${senha}, ${fkEmpresa}, idUsuario FROM Usuario
    WHERE fkEmpresa = ${fkEmpresa} AND fkAdministrador IS NULL LIMIT 1;
    `;
    return database.executar(instrucao);
}

function updatePassword(idUsuario, novaSenha){

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updatePassword:","" );
    
    var instrucao = `
   
    UPDATE Usuario SET senhaUsuario = '${novaSenha}' WHERE idUsuario = '${idUsuario}';

    `;
    return database.executar(instrucao);
}





module.exports = {
    entrar,
    cadastrarEmpresa,
    updatePassword,
    cadastrarFuncionario
};