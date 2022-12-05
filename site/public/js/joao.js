const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

var alert, allLabels = [], allData;

let predictLock = false;

const labelsTranslate = {
    "cpu_Utilizacao": "Média da Utilização Da CPU",
    "cpu_Temperature": "Média da Temperatura Da CPU",
    "ram_Usada": "Média da Utilização Da Memória Ram",
    "disco_Usado": "Média da Utilização Do Disco",
    "disco_read_time": "Leitura Do Disco",
    "disco_write_time": "Escrita Do Disco",
    "cpu_Frequencia_Atual": "Frequência Da CPU",
}
var hashMaquina, fkMaquina, fkEmpresa;

/* 
    ---------------------------------------------------------------------------------
                            Carrega o gráfico com as médias e os dias
    ---------------------------------------------------------------------------------
*/


/* Faz as requisi;óes dos dados do gráfico */

async function getDates() {
    let res = await fetch(`/npd/getInformationsByDateHour/${fkMaquina}&${fkEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    res = await res.json();
    allData = res.response;
    console.log(res);

    appendLabels(res.response);
    loadMachineInfo(res.nomeMaquina, res.hashMaquina);
    alert.close()
}

function loadMachineInfo(machineName, machineHash) {
    /* Atualizar o nome da maquina e a hash */
    document.getElementById('server-name').innerHTML = machineName;

    let macAddress = '';
    machineHash = machineHash.split("");
    for (let i = 2; i < machineHash.length; i += 2) {
        if (i % 2 == 0) {
            if (i == machineHash.length - 2) macAddress += machineHash[i - 1] + machineHash[i];
            else macAddress += machineHash[i - 1] + machineHash[i] + ":";

        }
    }

    document.getElementById('server-num').innerHTML = macAddress;
}

/* Adiciona as labels no gráfico */
function appendLabels(data) {
    let label;

    for (let date in data) {
        for (let hour in data[date]) {
            label = `${date}-${hour}h`;
            if (chartAllDataMean.data.labels.indexOf(label) == -1) {
                chartAllDataMean.data.labels.push(label);
                allLabels.push(label);

            }
        }
    }
    chartAllDataMean.update();
    console.log("Labels adicionadas.");
    separateChartData(data)
}

/* Separa os dados, para que possa adicionar no gráfico */
function separateChartData(data) {
    for (let date in data) {
        for (let hour in data[date]) {
            for (let metric in data[date][hour]) {
                if (metric == "cpu_Frequencia_Atual" || metric == "disco_read_time" || metric == "disco_write_time") continue;
                let datasetPosArr = findDataset(labelsTranslate[metric]);
                let chartAllDataMeanLabelPos = chartAllDataMean.data.labels.indexOf(`${date}-${hour}h`);

                if (chartAllDataMean.data.datasets[datasetPosArr].data[chartAllDataMeanLabelPos] === undefined) {
                    for (let i = chartAllDataMean.data.datasets[datasetPosArr].data.length; i < chartAllDataMeanLabelPos; i++) {
                        chartAllDataMean.data.datasets[datasetPosArr].data.push(null);
                    }
                }
                /* if (chartAllDataMean.data.datasets[datasetPosArr].data.length >= 10)  */document.getElementById("predict-button").style.display = 'block';
                if (data[date][hour][metric].math == undefined) appendChartData(null, metric);
                else appendChartData(data[date][hour][metric].math.mean, metric);
            }
        }
    }
    console.log("Dados Adicionados.");
    chartAllDataMean.update();
    appendSelectDates();
}

/* Procura o dataset através de sua label */
function findDataset(label) {
    for (let i = 0; i < chartAllDataMean.data.datasets.length; i++) {
        if (chartAllDataMean.data.datasets[i].label == label) {
            return i;
        }
    }
}

/* Adiciona um valor em algum dataset */
function appendChartData(value, metrica) {
    let dataset_num = findDataset(labelsTranslate[metrica]);
    if (value != null) {
        chartAllDataMean.data.datasets[dataset_num].data.push(parseFloat(value.toFixed(1)));
    } else {
        chartAllDataMean.data.datasets[dataset_num].data.push(null);
    }
}

/* Adiciona as datas e horas disponíveis no gráfico para poder verificar a sua media, variancia e desvio padrão */
function appendSelectDates() {
    allLabels.forEach((label) => {
        let option = document.createElement("option");
        option.value = label;
        option.innerHTML = label;
        document.getElementById("labels").appendChild(option);
    });
}


/* 
    ---------------------------------------------------------------------------------
                            Atualizar Select do HTML
    ---------------------------------------------------------------------------------
*/

/* Faz a manipulação da tabela e da hora para adicionar os gráficos na tablea */
function updateSelect() {
    let table = document.getElementById("table-metric");
    table.innerHTML = ``;

    let label = document.getElementById("labels").value;
    document.getElementById("chart-specific-metric").style.opacity = "";
    clearChart();
    if (label == "0") {
        return;
    }

    let date = label.split("-")[0];
    let hour = label.split("-")[1].split("h")[0];

    Object.keys(allData[date][hour]).forEach(
        (metric) => {
            let metricValue = allData[date][hour][metric];
            loadTable(metric, date, hour, metricValue.math.mean, metricValue.math.standardDeviation, metricValue.math.min, metricValue.math.max);
        });


}

/* Gera um elemento tr para adicionar uma nova linha na tabela */
function loadTable(metricName, date, hour, mean, std, min, max) {
    let table = document.getElementById("table-metric");

    let tr = document.createElement("tr");

    let unidade;
    if (metricName == "cpu_Frequencia_Atual") unidade = "MHz";
    switch (metricName) {
        case "cpu_Frequencia_Atual":
            unidade = "MHz";
            break;
        case "cpu_Utilizacao":
            unidade = "%";
            break;
        case "disco_read_time":
            unidade = "Mb";
            break;
        case "disco_Usado":
            unidade = "Gb";
            break;
        case "disco_write_time":
            unidade = "Mb";
            break;
        case "ram_Usada":
            unidade = "Gb";
            break;
        
    }
    tr.innerHTML = `
                <td scope="row">${labelsTranslate[metricName]}</td>
                <td>${mean.toFixed(1)} ${unidade}</td>
                <td>${std.toFixed(1)} ${unidade}</td>
                <td>${min.toFixed(1)} ${unidade}</td>
                <td>${max.toFixed(1)} ${unidade}</td>`;
    tr.onclick = () => {
        selectMetric(metricName, date, hour);
    }
    tr.style.cursor = "pointer";
    table.appendChild(tr);
}


/* 
    ---------------------------------------------------------------------------------
                Cria o predict através da média entre os pontos do gráfico
    ---------------------------------------------------------------------------------
*/

/* Faz toda a parte inicial para poder criar um predict de um dataset */
async function createPredict() {
    if (predictLock) return;
    for (let i = 0; i < 5; i++) {
        let nextDate = createNextDate();
        chartAllDataMean.data.labels.push(nextDate);
    }
    let allPromises = [];
    for (let dataset in chartAllDataMean.data.datasets) {
        allPromises.push(createPredictUsingDataset(dataset, chartAllDataMean.data.datasets[dataset]));
    }
    let values = await Promise.all(allPromises);

    removeLastDatasetData();

    chartAllDataMean.update();
    console.log("Previsão criada.");
    predictLock = true;
}

/* Através do primeiro gráfico, irá criar uma nova data para adicionar na label*/
function createNextDate() {
    let lastDateChart = chartAllDataMean.data.labels[chartAllDataMean.data.labels.length - 1];
    let lastDateSplited = lastDateChart.split("-");
    let lastDay = lastDateSplited[0];

    if (lastDay.length == 9) lastDay = "0" + lastDay;
    lastDay = `${lastDay.substring(6, 10)}/${lastDay.substring(3, 5)}/${lastDay.substring(0, 2)}`;
    let lastHour = lastDateSplited[1].split("h")[0];

    let date = lastDay + " " + lastHour + ":00:00";
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 1);

    newDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}-${newDate.getHours()}h`;
    return newDate;
}

/* Faz a manipulação dos dados para obter a média do ângulo dos pontos*/
function createPredictUsingDataset(datasetPosArr, dataset) {
    return new Promise((resolve, reject) => {
        if (dataset.data.length > 0) {

            for (let i = 0; i < 5; i++) {

                let graph = [];
                let lengthDataset = dataset.data.length - 1;
                let medianDataset = Math.floor(lengthDataset / 2);

                /* for (let j = medianDataset - i; j < lengthDataset; j++) { */
                for (let j = lengthDataset; j >= medianDataset + i; j--) {

                    if (dataset.data[j] != null && dataset.data[j - 1] != null && dataset.data[j - 1] != undefined) {
                        graph.push([dataset.data[j - 1], dataset.data[j]]);
                    }
                }

                let meanAngle = getMeanGraphAngle(graph);

                let predict = (meanAngle * ((lengthDataset + 1) - lengthDataset)) + dataset.data[lengthDataset - 1];

                chartAllDataMean.data.datasets[datasetPosArr].data.push(parseFloat(predict.toFixed(1)));
            }
            chartAllDataMean.update();
        }
        resolve("Finalizado");
        /* reject("Erro"); */
    });
}

/* Pega a média dos angulos entre cada ponto do gráfico */
function getMeanGraphAngle(data) {
    let graphAngles = [];

    data.forEach((value, i, arr) => {
        let x1 = i + 1;
        let y1 = value[0];
        let x2 = i + 2;
        let y2 = value[1];

        let a = (y2 - y1) / (x2 - x1);

        graphAngles.push(a);
    });
    let totalAngle = 0;
    graphAngles.forEach(
        (value) => {
            totalAngle += value;
        }
    )

    totalAngle /= graphAngles.length;
    /* console.log("Angulo médio do gráfico: " + totalAngle); */
    return totalAngle;
}


/* Remove o primeiro valor dos dados do gráfico */
function removeLastDatasetData() {
    if (chartAllDataMean.data.labels.length == 10) {
        for (let i = 0; i < 3; i++) {
            chartAllDataMean.data.labels.shift();
        }
        for (let dataset in chartAllDataMean.data.datasets) {
            for (let i = 0; i < 3; i++) {
                chartAllDataMean.data.datasets[dataset].data.shift();
            }
        }
    }

}

/* 
    ---------------------------------------------------------------------------------
                                        Inicio
    ---------------------------------------------------------------------------------
*/
function main() {
    swal.fire({
        title: "Digite o hash da máquina",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Buscar",
        showLoaderOnConfirm: true
        
    }).then(
        async (result) => {
            if (result.isConfirmed) {
                let res = await fetch(`http://localhost:3000/npd/getMaquina/${result.value.split(":").join("").toUpperCase()}`);

                if (res.status == 200) {
                    let json = await res.json();
                    fkMaquina = json.idMaquina;
                    fkEmpresa = json.fkEmpresa;
                    alert = swal.fire({
                        title: "Carregando...",
                        didOpen: () => {
                            Swal.showLoading()
                            getDates();
                        }
                    });
                } else {
                    swal.fire({
                        title: "Erro",
                        text: "Maquina não encontrada",
                        icon: "error"
                    })
                }
            }
        }
    )
    
}

main();


/* 
    ---------------------------------------------------------------------------------
                            Selecionar Métrica na tabela  
    ---------------------------------------------------------------------------------
*/

/* Altera a opacidade do gráfico, manipula o dia para funcionar os dados e adiciona os dados no outro gráfico*/
function selectMetric(metric, date, hour) {
    clearChart();
    let chart = document.getElementById('chart-specific-metric');
    if (chart.style.opacity == '') chart.style.opacity = '1';

    let metricElement = allData[date][hour][metric];
    let metricData = metricElement.allDataHour;

    Object.keys(metricData).reverse().forEach(
        (minuteData) => {

            chartSpecificData.data.labels.push(minuteData);
            chartSpecificData.data.datasets[0].data.push(parseFloat(metricData[minuteData].toFixed(1)));
            chartSpecificData.data.datasets[1].data.push(parseFloat((metricElement.math.mean - metricElement.math.standardDeviation).toFixed(1)));
            chartSpecificData.data.datasets[2].data.push(parseFloat((metricElement.math.mean + metricElement.math.standardDeviation).toFixed(1)));
            chartSpecificData.data.datasets[3].data.push(parseFloat(metricElement.math.mean.toFixed(1)));
        }
    )

    chartSpecificData.update();
}

/* Limpa o gráfico para outra métrica ser inserida */
function clearChart() {
    chartSpecificData.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chartSpecificData.data.labels = [];
    chartSpecificData.update();
}


/* 
    ---------------------------------------------------------------------------------
            Criar predict através de uma machine learning de modelo linear
    ---------------------------------------------------------------------------------
*/


/* Inicia a requisição dos dados, junto com o SweetAlert */
function startPredictWithMl() {
    if (predictLock) return;
    alert = swal.fire({
        title: "Carregando...",
        didOpen: async () => {
            Swal.showLoading()
            createPredictWithMl();
        }
    })
}

/* Faz a requisição e adiciona os valores no gráfico */
async function createPredictWithMl() {
    let res = await fetch(`http://localhost:3000/npd/predictWithMl/${fkMaquina}&${fkEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    let json = await res.json();
    alert.close();
    console.log(json);

    for (let i = 0; i < 5; i++) {
        let nextDate = createNextDate();
        chartAllDataMean.data.labels.push(nextDate);
    }

    appendPredictWithMlData(json);

    removeLastDatasetData();
    chartAllDataMean.update();

}

function appendPredictWithMlData(json) {
    for (let metrica in json) {
        let dataset = chartAllDataMean.data.datasets.filter(x => { return x.label == labelsTranslate[metrica] });

        if (dataset.length > 0) {
            for (let data in json[metrica]) {
                if (json[metrica][data] <= 0) dataset[0].data.push(0);
                else dataset[0].data.push(json[metrica][data]);

            }
        }
    }
    predictLock = true;
}

/* ------------------------------------------------------------------------------------- */
class MyLm {
    constructor() {
        this.epoch = 1;
        this.epochs = 1000;

        this.angle = 0;
        this.intercept = 0;
        this.learningRate = 1.08;

        this.lockAngle = false;
        this.lockIntercept = false;
        this.lastStd = 9007199254740991;
        this.totalStd = 0;
    }

    train(xData, yData) {
        for (this.epoch = 1; this.epoch <= this.epochs; this.epoch++) {
            this.trainLinear(xData, yData);
            /* this.printEpochInfo(); */
        }
        console.log("Terminei: Angulo: " + this.angle + " Intercept: " + this.intercept);
    }
    trainLinear(xData, yData) {
        this.totalStd = getTotalStd(xData, yData, this.angle, this.intercept);

        if (this.totalStd < 1) return false;
        else {
            let angleValue = 1;
            if (yData[0] > yData[yData.length - 1]) angleValue = -1;

            if (!this.lockAngle) {
                this.angle += this.learningRate * angleValue;
                this.totalStd = getTotalStd(xData, yData, this.angle, this.intercept);
                if (this.lastStd < this.totalStd) {
                    this.angle -= this.learningRate * angleValue;
                    this.lockAngle = true;
                }
            }

            if (!this.lockIntercept) {
                this.intercept += this.learningRate;
                this.totalStd = getTotalStd(xData, yData, this.angle, this.intercept);
                if (this.lastStd < this.totalStd) {
                    this.intercept -= this.learningRate;
                    this.lockIntercept = true;
                }
            }
            
        }
        this.lastStd = this.totalStd;
        return true;
        /* 142.05 */
    }
    
    printEpochInfo() {
        console.log(`
            Epoch: ${this.epoch.toFixed(2)}
            Angle: ${this.angle.toFixed(2)}
            Intercept: ${this.intercept.toFixed(2)}
            Total Std: ${this.totalStd.toFixed(2)}
            Last Std: ${this.lastStd.toFixed(2)}
            Last Std < Total Std: ${this.lastStd < this.totalStd}
            Lock Angle: ${this.lockAngle}
            Lock Intercept: ${this.lockIntercept}
            ------------------------------------------------------------------------------------------
        `)
    }
}

function getTotalStd(xData, yData, angle, intercept) {
    let totalStd = 0;
    for (let i = 0; i < xData.length; i++) {
        y= angle*xData[i] + intercept
        let dataStd = Math.pow(yData[i] - y, 2);
        dataStd = Math.sqrt(dataStd);
        totalStd += dataStd;
    }
    return totalStd / xData.length;
}

function plotNewValues(angle, intercept, x, metrica) {
    if (metrica =="disco_read_time" || metrica =="disco_write_time" || metrica == "cpu_Frequencia_Atual") return;
    let datasetPos = findDataset(labelsTranslate[metrica]);

    
    let allY = [];

    for (let i = 0; i < x.length; i++) {
        let y = angle * x[i] + intercept
        if (y < 0) y = 0;
        chartAllDataMean.data.datasets[datasetPos].data.push(y);
        allY.push(y);
    }

    chartAllDataMean.update();
    return allY;
}

async function createPredict2() {
    if (predictLock) return;
    for (let i = 0; i < 5; i++) {
        let nextDate = createNextDate();
        chartAllDataMean.data.labels.push(nextDate);
    }
    let metricas = {};
    for (let day in allData) {
        for (let hour in allData[day]) {
            for(let metrica in allData[day][hour]) {
                if (metricas[metrica] == undefined) metricas[metrica] = [];
                metricas[metrica].push(allData[day][hour][metrica].math.mean);
            }
        }
    }
    
    let ramValues;
    let myMl;
    console.log(metricas);
    for (let metrica in metricas) {
        myMl = new MyLm();
        
        if (metrica == "cpu_Utilizacao") {
            continue;
        } else {
            await myMl.train([... Array(metricas[metrica].length).keys()], metricas[metrica]);
            if (metrica == "ram_Usada") {
                ramValues = plotNewValues(myMl.angle, myMl.intercept, 
                    [... Array(metricas[metrica].length + metricas[metrica].length + 2).keys()]
                    .filter((x) => { return x > metricas[metrica].length; }), 
                    metrica);
            } else {
                plotNewValues(myMl.angle, myMl.intercept, 
                    [... Array(metricas[metrica].length + metricas[metrica].length + 2).keys()]
                    .filter((x) => { return x > metricas[metrica].length; }), 
                    metrica);
            }
        }

        
         
    }
    
    myMl = new MyLm();
    myMl.train(metricas["ram_Usada"], metricas["cpu_Utilizacao"]);
    plotNewValues(myMl.angle, myMl.intercept, 
        [... Array(metricas["cpu_Utilizacao"].length + metricas["cpu_Utilizacao"].length + 2).keys()]
        .filter((x) => { return x > metricas["cpu_Utilizacao"].length; }), 
        "cpu_Utilizacao");
    predictLock = true;
    
}

function sair() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}