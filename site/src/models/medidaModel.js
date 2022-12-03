var database = require("../database/config");

function buscarUltimasMedidas(idCPU, limite_linhas) {
    instrucaoSql = `select 
                        temperatura, 
                        ram, 
                        frequencia,
                        disco
                    from CPU_metricas
                    where fk_Cpu = ${idCPU}
                    order by idCPU desc `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
    
}