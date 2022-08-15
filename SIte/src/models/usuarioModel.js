var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM USUARIO WHERE USUARIO_EMAIL = '${email}' AND USUARIO_SENHA = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(nome, cnpj) {
    var instrucao = `
        INSERT INTO EMPRESA (EMPRESA_NOME, EMPRESA_CNPJ) VALUES ('${nome}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nome, email, senha, nivelAcesso, fkEmpresa) {
    var instrucao = `
        INSERT INTO USUARIO (USUARIO_NOME, USUARIO_EMAIL, USUARIO_SENHA, USUARIO_ACESSO, USUARIO_FKEMPRESA) VALUES ('${nome}', '${email}', '${senha}', ${nivelAcesso}, ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updatePassword(email, senha){

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updatePassword:","" );
    
    var instrucao = `
   
    UPDATE EMPRESA SET EMPRESA_SENHA = '${senha}' WHERE EMPRESA_EMAIL = '${email}';

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}





module.exports = {
    entrar,
    cadastrarEmpresa,
    updatePassword,
    cadastrarFuncionario
};