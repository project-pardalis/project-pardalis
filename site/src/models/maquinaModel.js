var database = require("../database/config")
var dashModel = require("./dashModel")

async function appendMachine(fkEmpresa, hashMaquina, nomeMaquina) {
    let existsHash = await database.executar(`SELECT * FROM Maquina WHERE hashMaquina = '${hashMaquina}'`);
    if (existsHash.length == 0) {
        try {
            if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") await database.executar(`INSERT INTO Maquina (fkEmpresa, hashMaquina, nomeMaquina, sistemaOperacional, onCloud) VALUES ('${fkEmpresa}', '${hashMaquina}', '${nomeMaquina}', "", 0)`);
            else await database.executar(`INSERT INTO Maquina (fkEmpresa, hashMaquina, nomeMaquina, sistemaOperacional, onCloud) VALUES ('${fkEmpresa}', '${hashMaquina}', '${nomeMaquina}', '', 0)`);
            console.log(`Maquina ${nomeMaquina} cadastrada com sucesso!`);
            return true
        } catch (error) {
            return false;
        }

    }
}

async function getMeanDates(fkEmpresa, fkMaquina) {
    let maquinaInfo = await dashModel.getMaquinaInfo(fkEmpresa, fkMaquina);
    let metricas = await dashModel.getMetricas();
    let res = {};
    let finalRes = {};
    for (let i = 0; i < metricas.length; i++) {
        let element = metricas[i];
        if (element.isEstatico == 0) {
            view = await dashModel.getView(maquinaInfo[0].nomeEmpresa, maquinaInfo[0].nomeMaquina, element.nomeMetrica, false, false);
            
            view.forEach((element, i, arr) => {
                if (i == 0) return;
                
                let dataColeta = new Date(element.dataColeta);
                dataColeta = `${dataColeta.getDate()}/${dataColeta.getMonth() + 1}/${dataColeta.getFullYear()} ${dataColeta.getHours()}`;
                if (res[dataColeta] == undefined) res[dataColeta] = [];
                if (finalRes[dataColeta] == undefined) finalRes[dataColeta] = {};
                if (res[dataColeta][element.nomeMetrica] == undefined) res[dataColeta][element.nomeMetrica] = [];
                res[dataColeta][element.nomeMetrica].push(parseFloat(element.valorLeitura));
            });


            for (const key in res) {
                for (const metrica in res[key]) {
                    let valores = res[key][metrica];
                    mean = getMean(valores);
                    if (finalRes[key] == undefined) finalRes[key] = {};
                    if (finalRes[key][metrica] == undefined) finalRes[key][metrica] = {};
                    finalRes[key][metrica] = mean;
                }
                
            }
        }
    }
    
    finalRes = organizeData(finalRes);
    return finalRes;
}

function organizeData(data) {
    let keys = Object.keys(data);
    keys.sort((a, b) => {
        let hourA = parseInt(a.substring(10, 12));
        let hourB = parseInt(b.substring(10, 12));
        a = a.substring(0, 9);
        b = b.substring(0, 9);
        a = `${a.split("/")[2]}/${a.split("/")[1]}/${a.split("/")[0]}`;
        b = `${b.split("/")[2]}/${b.split("/")[1]}/${b.split("/")[0]}`;
        let dateA = new Date(a.substring(0, 9));
        let dateB = new Date(b.substring(0, 9));
        dateA.setHours(hourA);
        dateB.setHours(hourB);
        return dateA - dateB;
    });
    let newData = {};
    for (let i = 0; i < keys.length; i++) {
        newData = {...newData, [keys[i]]: data[keys[i]]};
    }
    return newData;
}

function getMean(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += parseInt(data[i]);
    }
    return sum / data.length;
}

module.exports = {
    appendMachine,
    getMeanDates
};