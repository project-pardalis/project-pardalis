var database = require("../database/config")

function getMaquinas(empresa) {
    var sql = `SELECT * FROM Maquina`
    return database.executar(sql)
}

function getComponente(empresa) {
    var sql = `SELECT * FROM Componente`
    return database.executar(sql)
}

function getDados(empresa) {
    var sql = `select * from vw_empresa_sptech_maquina1_leitura order by dataColeta DESC limit 200`
    return database.executar(sql)
}

async function analysys(fkEmpresa, fkMaquina, nomeMetrica) {
    let maquinaInfo = await getMaquinaInfo(fkEmpresa, fkMaquina);
    let nomeEmpresa = maquinaInfo[0].nomeEmpresa, nomeMaquina = maquinaInfo[0].nomeMaquina;
    createViewMetricas(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina);

    /* let sql = "SELECT * FROM `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + nomeMetrica + "`";
    let res = await database.executar(sql);
    console.log(res)
    return res; */
}

async function checkIfViewExists(nomeEmpresa, nomeMaquina, nomeMetrica) {
    let sql = `SHOW FULL TABLES iN PARDALIS;`
    let res = await database.executar(sql)
    res = res.filter((table) => {
        if (table.Table_type == 'VIEW' && table.Tables_in_pardalis == `vw_${nomeEmpresa}_${nomeMaquina}_${nomeMetrica}`) {
            return true;
        }
    })
    return res;
}

function getMaquinaInfo(fkEmpresa, fkMaquina) {
    let sql = `SELECT nomeMaquina, nomeEmpresa FROM Maquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE idMaquina = ${fkMaquina} AND fkEmpresa = ${fkEmpresa}`
    return database.executar(sql)
}

async function createViewMetricas(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina) {
    let res = await getMetricas();
    
    let estatico = [];
    for (let i = 0; i < res.length; i++) {
        let nomeMetrica = res[i].nomeMetrica;

        if (res[i].isEstatico == 0) {
            estatico.push(nomeMetrica);
        } else {
            let viewExists = await checkIfViewExists(nomeEmpresa, nomeMaquina, nomeMetrica);
            if (viewExists.length == 0) {
                await createView(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina, nomeMetrica);
            }
        }
    }

    if (estatico.length > 0) {
        let viewExists = await checkIfViewExists(nomeEmpresa, nomeMaquina, "estatico");
        if (viewExists.length == 0) {
            await createViewEstatica(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina, estatico);
        }
    }

}

async function createView(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina, nomeMetrica) {
    let sql = "CREATE VIEW" + " `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + nomeMetrica + "`";
    sql += `AS
        SELECT nomeMaquina, dataCriacao, nomeComponente, nomeMetrica, 
        unidadeDeMedida, dataColeta, valorLeitura FROM Leitura 
        JOIN Componente on idComponente = Leitura.fkComponente
        JOIN Metrica on idMetrica = Leitura.fkMetrica
        JOIN Maquina on idMaquina = Leitura.fkMaquina 
        and Maquina.fkEmpresa = ${fkEmpresa} 
        and Maquina.idMaquina = ${fkMaquina};
    `
    let res = await database.executar(sql);
    return res;
}

async function createViewEstatica(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina, nomesMetrica) {
    let sql = "CREATE VIEW" + " `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + "estatico`";
    sql += `AS
        SELECT nomeMaquina, dataCriacao, nomeComponente, nomeMetrica, 
        unidadeDeMedida, dataColeta, valorLeitura FROM Leitura 
        JOIN Componente on idComponente = Leitura.fkComponente
        JOIN Metrica on idMetrica = Leitura.fkMetrica
        JOIN Maquina on idMaquina = Leitura.fkMaquina 
        and Maquina.fkEmpresa = ${fkEmpresa} 
        and Maquina.idMaquina = ${fkMaquina}
        and Leitura.fkMetrica in (${nomesMetrica});
    `
    let res = await database.executar(sql);
    return res;
}

async function getMetricas() {
    let sql = `SELECT nomeMetrica, unidadeDeMedida, isEstatico FROM Metrica`;
    let res = await database.executar(sql);
    return res;
}

module.exports = {
    getMaquinas,
    getComponente,
    getDados,
    analysys,
    getMetricas
}