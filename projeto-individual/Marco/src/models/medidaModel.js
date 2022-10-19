var database = require("../database/config");

function buscarUltimasMedidas(idCPU, limite_linhas) {
    instrucaoSql = `select 
                        temperatura, 
                        livre, 
                        frequencia,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from CPU
                    where fk_CPU = ${idCPU}
                    order by id desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
    
}