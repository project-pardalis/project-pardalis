var database = require("../database/config")

/* Dashboard */
async function getMaquinas(fkEmpresa) {
    var sql = `SELECT idMaquina, nomeEmpresa, nomeMaquina, sistemaOperacional, onCloud, dataCriacao, hashMaquina FROM Maquina JOIN Empresa ON fkEmpresa = idEmpresa WHERE fkEmpresa = ${fkEmpresa};`
    let res = await database.executar(sql)
    let metricas = await getMetricas();
    for (let i = 0; i < res.length; i++) {
        res[i].lastData = {};
    }
    for (let i = 0; metricas.length > i; i++) {
        for (let j = 0; j < res.length; j++) {
            if (metricas[i].isEstatico == 0) {
                res[j].lastData[metricas[i].nomeMetrica] = await getDados(res[j].nomeEmpresa, res[j].nomeMaquina, metricas[i].nomeMetrica);
            }
        }
    }
    for (let i = 0; i < res.length; i++) {
        res[i].lastData.estatico = (await getView(res[i].nomeEmpresa, res[i].nomeMaquina, "estatico", true));
    }

    return res;



}

async function getDados(nomeEmpresa, nomeMaquina, nomeMetrica) {
    return (await getView(nomeEmpresa, nomeMaquina, nomeMetrica, true, true))[0];
}

/* Server-Analysys */

async function analysys(fkEmpresa, fkMaquina, order, limit) {
    let maquinaInfo = await getMaquinaInfo(fkEmpresa, fkMaquina);
    let nomeEmpresa = maquinaInfo[0].nomeEmpresa, nomeMaquina = maquinaInfo[0].nomeMaquina;
    let metricas = await getMetricas();
    let res = {};
    for (let i = 0; i < metricas.length; i++) {
        let nomeMetrica = metricas[i].nomeMetrica;
        if (metricas[i].isEstatico == 0) {
            res[nomeMetrica] = await getView(nomeEmpresa, nomeMaquina, nomeMetrica, order, limit);
        }
    }
    res.estatico = await getView(nomeEmpresa, nomeMaquina, "estatico", limit);

    return res;
}

async function getView(nomeEmpresa, nomeMaquina, nomeMetrica, order, limit) {
    let teste;
    try {
        let sql = "SELECT * FROM `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + nomeMetrica + "`";
        if (order) {
            sql += ` ORDER BY dataColeta DESC `;
        }
        if (limit) sql += "LIMIT 10;"
        teste = await database.executar(sql);
    } catch {
        teste = [];
    }
    return teste;

}

function getMaquinaInfo(fkEmpresa, fkMaquina) {
    let sql = `SELECT nomeMaquina, nomeEmpresa, hashMaquina, sistemaOperacional, onCloud, dataCriacao FROM Maquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE idMaquina = ${fkMaquina} AND fkEmpresa = ${fkEmpresa} LIMIT 1`
    return database.executar(sql)
}

async function checkIfViewExists(nomeEmpresa, nomeMaquina, nomeMetrica) {
    let sql = `SHOW FULL TABLES iN PARDALIS;`
    let res = await database.executar(sql)
    res = res.filter((table) => {
        if (table.Table_type == 'VIEW' && table.Tables_in_pardalis == "vw_" + nomeEmpresa.toLowerCase() + "_" + nomeMaquina.toLowerCase() + "_" + nomeMetrica.toLowerCase()) {
            return true;
        }
    })
    return res;
}

async function createViewMetricas(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina) {
    let res = await getMetricas();

    let estatico = [];
    for (let i = 0; i < res.length; i++) {
        let nomeMetrica = res[i].nomeMetrica;
        if (res[i].isEstatico == 1) {
            estatico.push(nomeMetrica);
        } else {
            let viewExists = await checkIfViewExists(nomeEmpresa, nomeMaquina, nomeMetrica);
            if (viewExists.length == 0 && res[i].isEstatico == 0) {
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
    let sql = "CREATE OR REPLACE VIEW" + " `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + nomeMetrica + "`";
    sql += ` AS SELECT nomeMaquina, nomeComponente, nomeMetrica, unidadeDeMedida, dataColeta, valorLeitura FROM Leitura  JOIN Componente on idComponente = Leitura.fkComponente JOIN Metrica on idMetrica = Leitura.fkMetrica JOIN Maquina on idMaquina = Leitura.fkMaquina  and Maquina.fkEmpresa = ${fkEmpresa}  and Maquina.idMaquina = ${fkMaquina} and Metrica.nomeMetrica = '${nomeMetrica}';`
    let res = await database.executar(sql);
    return res;
}

async function createViewEstatica(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina, nomesMetrica) {
    let nomesMetrica2 = "";
    for (let i = 0; i < nomesMetrica.length; i++) {
        if (i == nomesMetrica.length - 1) {
            nomesMetrica2 += "'" + nomesMetrica[i] + "'";
        } else {
            nomesMetrica2 += "'" + nomesMetrica[i] + "', ";
        }
    }
    let sql = "CREATE OR REPLACE VIEW" + " `vw_" + nomeEmpresa + "_" + nomeMaquina + "_" + "estatico` ";
    sql += `AS SELECT nomeMaquina, nomeComponente, nomeMetrica, unidadeDeMedida, dataColeta, valorLeitura FROM Leitura  JOIN Componente on idComponente = Leitura.fkComponente JOIN Metrica on idMetrica = Leitura.fkMetrica JOIN Maquina on idMaquina = Leitura.fkMaquina  and Maquina.fkEmpresa = ${fkEmpresa}  and Maquina.idMaquina = ${fkMaquina} and Metrica.nomeMetrica in (${nomesMetrica2});`
    let res = await database.executar(sql);
    return res;
}

async function createViews(fkEmpresa, fkMaquina) {
    let maquinaInfo = await getMaquinaInfo(fkEmpresa, fkMaquina);
    let nomeEmpresa = maquinaInfo[0].nomeEmpresa, nomeMaquina = maquinaInfo[0].nomeMaquina;
    await createViewMetricas(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina);
}

async function getMetricas() {
    let sql = `SELECT nomeMetrica, unidadeDeMedida, isEstatico FROM Metrica`;
    let res = await database.executar(sql);

    return res;
}

async function getComponente(fkEmpresa, fkMaquina, nomeComponente) {
    let sql = `SELECT nomeComponente, isComponenteValido, descricao FROM Componente WHERE nomeComponente = '${nomeComponente}' AND fkEmpresa = ${fkEmpresa} AND fkMaquina = ${fkMaquina} LIMIT 1`;
    let res = await database.executar(sql);
    return res;
}

module.exports = {
    getMaquinas,
    getDados,
    analysys,
    createViews,
    getMaquinaInfo,
    getComponente
}