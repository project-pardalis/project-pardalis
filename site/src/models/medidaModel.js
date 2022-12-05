var database = require("../database/config");

function buscarUltimasMedidas(idCPU, limite_linhas) {
    instrucaoSql = `select 
                        temperatura, 
                        ram, 
                        frequencia,
                        disco
                    from CPU_metricas
                    where fkCpu = ${idCPU}
                    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,

}