var database = require("../database/config")

function entrar(email, senha) {
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT idUsuario, nomeUsuario, emailUsuario, cargo, fkEmpresa, fkAdministrador FROM Usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}' LIMIT 1;
    `;
    } else {
        var instrucao = `
        SELECT TOP 1 idUsuario, nomeUsuario, emailUsuario, cargo, fkEmpresa, fkAdministrador FROM Usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
    }
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
async function cadastrarEmpresa(nome, cnpj) {
    var instrucao = `
        INSERT INTO Empresa (nomeEmpresa, cnpjEmpresa) VALUES ('${nome}', '${cnpj}');
    `;
    await database.executar(instrucao);
    return await database.executar(`SELECT TOP 1 idEmpresa FROM Empresa WHERE cnpjEmpresa = '${cnpj}' ORDER BY idEmpresa DESC;`);
}

async function cadastrarFuncionario(nome, email, senha, fkEmpresa, tipo = "gerente") {
    var instrucao;
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `
        INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, fkEmpresa, fkAdministrador)
        SELECT '${nome}', '${email}', '${senha}', ${fkEmpresa}, idUsuario FROM Usuario
        WHERE fkEmpresa = ${fkEmpresa} AND fkAdministrador IS NULL LIMIT 1;
        `;
    } else {
        instrucao = `
            INSERT INTO Usuario (nomeUsuario, emailUsuario, senhaUsuario, fkEmpresa, fkAdministrador)`;
        if (tipo == "funcionario") {
            instrucao += `
            SELECT TOP 1 '${nome}', '${email}', '${senha}', ${fkEmpresa}, idUsuario FROM Usuario
            WHERE fkEmpresa = ${fkEmpresa} AND fkAdministrador IS NULL;`;
        } else {
            instrucao += ` VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, NULL);`;
        }

    }
    return await database.executar(instrucao);
}

function updatePassword(idUsuario, novaSenha) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updatePassword:", "");

    var instrucao = `
   
    UPDATE Usuario SET senhaUsuario = '${novaSenha}' WHERE idUsuario = '${idUsuario}';

    `;
    return database.executar(instrucao);
}

function deleteEmpresa(idEmpresa) {
    var instrucao = `
        DELETE FROM Empresa WHERE idEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}



module.exports = {
    entrar,
    cadastrarEmpresa,
    updatePassword,
    cadastrarFuncionario,
    deleteEmpresa
};