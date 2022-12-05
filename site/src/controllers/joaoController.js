var dashModel = require("../models/joaoModel")
var dashModel2 = require("../models/dashModel")

/* Método principal */


async function getMeanHours(req, res, type = "get") {
    let inicio = new Date();
    console.log("Inicio: " + `${inicio.getHours()}:${inicio.getMinutes()}:${inicio.getSeconds()}`);

    let fkMaquina = req.params.fkMaquina;
    let fkEmpresa = req.params.fkEmpresa;

    if (fkMaquina == undefined) {
        res.status(400).json({ "result": "fkMaquina não foi passado como parâmetro" });
        return { "result": "fkMaquina não foi passado como parâmetro" };
    } else if (fkEmpresa == undefined) {
        res.status(400).json({ "result": "fkEmpresa não foi passado como parâmetro" });
        return { "result": "fkEmpresa não foi passado como parâmetro" };
    }
    
    let metricas = await dashModel.getMetricas();

    let machineInfo = (await dashModel2.getMaquinaInfo(fkEmpresa, fkMaquina))[0];
    if (machineInfo == undefined) res.status(400).json({ "result": "fkMaquina não existe" });
    await dashModel.createViewAllStats(fkEmpresa, fkMaquina, machineInfo.nomeEmpresa, machineInfo.nomeMaquina);

    let response = await dashModel.getMetricaInfoByDateHour(machineInfo.nomeEmpresa, machineInfo.nomeMaquina, metricas);
    let datesOrdened = Object.keys(response).sort(
        (a, b) => {
            return new Date(a) - new Date(b);
        }
    )

    let response2 = {};
    for (let date of datesOrdened) {
        let dateFormated = new Date(date);
        dateFormated = `${dateFormated.getDate()}/${dateFormated.getMonth() + 1}/${dateFormated.getFullYear()}`;
        response2[dateFormated] = response[date];
    }
    response = response2;
    let fim = new Date();
    console.log("Fim: " + `${fim.getHours()}:${fim.getMinutes()}:${fim.getSeconds()}`);
    console.log("Tempo: " + (fim.getTime() - inicio.getTime()) / 1000 + "s");

    if (type == "get") {
        response = {
            "nomeMaquina": machineInfo.nomeMaquina,
            "hashMaquina": machineInfo.hashMaquina,
            response: response
        };
        res.json(response);
    } else {
        return response;
    }
}

/* Faz o predict através de um */
async function predictWithMl(req, res) {
    let response = {};

    let data = await getMeanHours(req, res, "predict")
    let predictDataArray = {};
    for (let date in data) {

        for (let hour in data[date]) {
            for (let metrica in data[date][hour]) {
                if (predictDataArray[metrica] == undefined) predictDataArray[metrica] = [];
                predictDataArray[metrica].push([data[date][hour][metrica].math.mean]);                
            }
        }
    }

    
    for (let metrica in predictDataArray) {

        for (let i = 0; i < 5; i++) {
            /* console.log("Metrica: " + metrica); */
            if (response[metrica] == undefined) response[metrica] = [];
            let predictResult;
            if (metrica == "cpu_Utilizacao") {
                predictResult = await dashModel.predictWithMl(predictDataArray[metrica], predictDataArray["ram_Usada"]);
            }
            else if (metrica == "ram_Usada") {
                predictResult = await dashModel.predictWithMl(predictDataArray[metrica], predictDataArray["cpu_Utilizacao"]);
            } else {
                predictResult = await dashModel.predictWithMl(predictDataArray[metrica]);
            }
            response[metrica].push(predictResult[0]);
            predictDataArray[metrica].push(predictResult);
        }
    }

    res.json(response);
}

async function getMaquina(req, res) {
    let hashMaquina = req.params.hashMaquina;
    if (hashMaquina == undefined) {
        res.status(400).json({ "result": "hashMaquina não foi passado como parâmetro" });
        return { "result": "hashMaquina não foi passado como parâmetro" };
    }
    let machineInfo = (await dashModel.getMaquinaInfo(hashMaquina));

    if (machineInfo.length == 0) res.status(400).json({ "result": "fkMaquina não existe" });
    else res.status(200).json(machineInfo[0]);
}

module.exports = {
    getMeanHours,
    predictWithMl,
    getMaquina
}