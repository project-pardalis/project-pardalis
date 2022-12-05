var database = require("../database/config");
const MLR = require("ml-regression-multivariate-linear");
const math = require("mathjs");

async function getMetricas() {
    return await database.executar(
        `SELECT * FROM Metrica`
    );
}

async function createViewAllStats(fkEmpresa, fkMaquina, nomeEmpresa, nomeMaquina) {
    let sql = "CREATE OR REPLACE VIEW" + " `vw_" + nomeEmpresa + "_" + nomeMaquina + "` ";
    sql += `AS SELECT Distinct fkMetrica, date_format(dataColeta, '%Y-%m-%d') AS 'diaInteiro', 
    HOUR(dataColeta) AS 'hora', MINUTE(dataColeta) AS 'minuto', SECOND(dataColeta) AS 'segundo',
    valorLeitura FROM Leitura JOIN Metrica ON idMetrica = fkMetrica AND isEstatico = 0 WHERE fkEmpresa = ${fkEmpresa} AND fkMaquina = ${fkMaquina}
    AND valorLeitura != -500.00 AND dataColeta > (SELECT dataColeta FROM Leitura WHERE fkMaquina = ${fkMaquina} and fkEmpresa = ${fkEmpresa} ORDER BY dataColeta DESC LIMIT 1) 
    - INTERVAL 7 DAY ORDER BY dataColeta DESC;`
    return await database.executar(sql);
}

async function getDataByHour(nomeEmpresa, nomeMaquina) {
    return await database.executar(`
    SELECT fkMetrica, diaInteiro, hora, minuto, segundo, valorLeitura
    from ` + "`vw_" + nomeEmpresa + "_" + nomeMaquina + "`" + ` order by fkMetrica`);
}

/* Novo */
async function getMetricaInfoByDateHour(nomeEmpresa, nomeMaquina, metricas) {

    let res = await getDataByHour(nomeEmpresa, nomeMaquina);
    let resultFiltered = {};

    res = getLastHourData(res);

    let init = 0;

    res.forEach(
        (item, i) => {
            if (i > 0 && item !== undefined) {
                let metricaNome = metricas.find((metrica) => {
                    return metrica.idMetrica == res[i - 1].fkMetrica;
                }).nomeMetrica;

                let itemDate = new Date(item.dataColeta);
                let prevItemDate = new Date(res[i - 1].dataColeta);

                if (`${itemDate.getHours()}` !=
                    `${prevItemDate.getHours()}` ||
                    `${itemDate.getDate()}/${itemDate.getMonth()}/${itemDate.getFullYear()}` !=
                    `${prevItemDate.getDate()}/${prevItemDate.getMonth()}/${prevItemDate.getFullYear()}` ||
                    i == res.length - 1) {
                    let allDataHour = {};

                    let itemDate;
                    for (let j = init, len = i; j < len; j++) {
                        itemDate = new Date(res[j].dataColeta);
                        itemDate = `${itemDate.getDate()}/${itemDate.getMonth() + 1}/${itemDate.getFullYear()} ${itemDate.getHours()}:${itemDate.getMinutes()}:00`
                        allDataHour[itemDate] = res[j].valorLeitura;
                    }

                    let dateMeaned = `${prevItemDate.getMonth() + 1}/${prevItemDate.getDate()}/${prevItemDate.getFullYear()}`;
                    if (resultFiltered[dateMeaned] === undefined) resultFiltered[dateMeaned] = {};
                    if (resultFiltered[dateMeaned][prevItemDate.getHours()] === undefined) resultFiltered[dateMeaned][prevItemDate.getHours()] = {};
                    if (resultFiltered[dateMeaned][prevItemDate.getHours()][metricaNome] == undefined) resultFiltered[dateMeaned][prevItemDate.getHours()][metricaNome] = {};
                    let mathInfo = getMathInformationsEnhanced(
                        Object.keys(allDataHour).map((item2) => {
                            return allDataHour[item2];
                        })
                    );

                    resultFiltered[dateMeaned][prevItemDate.getHours()][metricaNome] = {
                        math: mathInfo,
                        allDataHour: allDataHour
                    }

                    init = i;
                }
            }
        }
    )
    let fim = new Date();
    console.log("Etapa 2 Terminada: " + `${fim.getHours()}:${fim.getMinutes()}:${fim.getSeconds()}`)

    return resultFiltered

}

function getLastHourData(res) {
    res = res.map((item, i) => {
        if (i > 0) {
            let itemDate = new Date(
                item.diaInteiro + ` ${item.hora}:${item.minuto}:${item.segundo}`
            );
            let prevItemDate = new Date(
                res[i - 1].diaInteiro + ` ${res[i - 1].hora}:${res[i - 1].minuto}:${item.segundo}`
            );
            if (`${itemDate.getHours()}:${itemDate.getMinutes()}` !=
                `${prevItemDate.getHours()}:${prevItemDate.getMinutes()}` ||
                `${itemDate.getDate()}/${itemDate.getMonth()}/${itemDate.getFullYear()}` !=
                `${prevItemDate.getDate()}/${prevItemDate.getMonth()}/${prevItemDate.getFullYear()}` ||
                i == res.length - 1) {
                let dateMeaned = `${prevItemDate.getMonth() + 1}/${prevItemDate.getDate()}/${prevItemDate.getFullYear()} ${prevItemDate.getHours()}:${prevItemDate.getMinutes()}:00`;
                return {
                    fkMetrica: res[i - 1].fkMetrica,
                    valorLeitura: parseFloat(res[i - 1].valorLeitura),
                    dataColeta: dateMeaned,
                }
            }
        }

    });
    let inicio = new Date();
    console.log("Etapa 1 Terminada: " + `${inicio.getHours()}:${inicio.getMinutes()}:${inicio.getSeconds()}`)

    res = res.filter((item) => { return item !== undefined });
    return res;
}

function getMathInformationsEnhanced(data) {
    return {
        mean: math.round(math.mean(data), 3),
        /* variance: math.round(math.variance(data, "uncorrected"), 3), */
        standardDeviation: math.round(math.std(data), 3),
        min: math.round(math.min(data), 3),
        max: math.round(math.max(data), 3),
    }
}

/* ---------------------------------------------------------------------------------------------------------- */
function predictWithMl(data, x = null) {

    if (x == null || x.length != data.length) {
        x = [...Array(data.length + 1).keys()].map((x) => { if (x > 0) return [x]; }).filter((x) => { return x !== undefined });
    }

    let model = new MLR(x, data);

    let result = model.predict([x[x.length - 1][0] + 1]);

    return result;

}

async function getMaquinaInfo(hashMaquina) {
    let hashMaq = hashMaquina;

    sql = `SELECT idMaquina, fkEmpresa, nomeMaquina, nomeEmpresa, hashMaquina, sistemaOperacional, onCloud, dataCriacao FROM Maquina JOIN Empresa on idEmpresa = Maquina.fkEmpresa WHERE hashMaquina='${hashMaq}' LIMIT 1`

    return await database.executar(sql)
}
module.exports = {
    getMetricas,
    getMetricaInfoByDateHour,
    predictWithMl,
    createViewAllStats,
    getMaquinaInfo
} 