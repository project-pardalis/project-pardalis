var charts = {};

charts.cpu = new Chart(
    document.getElementById('cpu-chart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    backgroundColor: "#9cdbffa0",
                    label: 'Utilização',
                    borderColor: '#117dbb',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                },
                {
                    backgroundColor: "#7fffe86e",
                    label: 'Temperatura',
                    borderColor: '#45a593',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                }]
        },
        options: {
            legend: {
                display: false,
            }
        }
    }
);

charts.ram = new Chart(
    document.getElementById('ram-chart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    backgroundColor: "#eba4ff7e",
                    label: 'Usado',
                    borderColor: '#9528b4',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                }]
        },
        options: {
            legend: {
                display: false,
            }
        }
    }
);

charts.disk = new Chart(
    document.getElementById('disk-chart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    backgroundColor: "#b8ff8684",
                    label: 'Usado',
                    borderColor: '#62b02a',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                }]
        },
        options: {
            legend: {
                display: false,
            },
            events: ["click"]
        }
    }
);

charts.bigChart = new Chart(
    document.getElementById('big-chart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    backgroundColor: "#9cdbffa0",
                    label: 'Utilização',
                    borderColor: '#117dbb',
                    data: [],
                    tension: 0.1,
                    pointRadius: 1,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                },
                {
                    backgroundColor: "#7fffe86e",
                    label: 'Temperatura',
                    borderColor: '#45a593',
                    data: [],
                    tension: 0.1,
                    pointRadius: 1,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true,
            }
        }
    }
);

/* const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const barConfig = {
    type: 'bar',
    data: dataCPU,
    options: { maintainAspectRatio: false }
};

const dataDiaHora = {
    datasets: [{
        label: 'My First dataset',
        backgroundColor: '#6B46D7',
        borderColor: '#6B46D7',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};


const configPizza = {
    type: 'doughnut',
    data: dataDiaHora,
    options: {}

};


const barChart = new Chart(
    document.getElementById('myChart4'),
    {
        type: 'bar',
        data: dataCPU,
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            }
        }
    }
); */

var idMaquina;
var fkEmpresa;
var metricas;
var bigChart = {
    lastChart: "cpu",
    clickedChart: "cpu",
    datasets: {
        cpu: [
            {
                backgroundColor: "#9cdbffa0",
                label: 'Utilização',
                borderColor: '#117dbb',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.8
            },
            {
                backgroundColor: "#7fffe86e",
                label: 'Temperatura',
                borderColor: '#45a593',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.8
            }],
        ram: [
            {
                backgroundColor: "#eba4ff7e",
                label: 'Usado',
                borderColor: '#9528b4',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.8
            }],
        disk: [
            {
                backgroundColor: "#b8ff8684",
                label: 'Usado',
                borderColor: '#62b02a',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.8
            }]

    }
}

// Pega os parametros da URL
function getMaquinaParamsAndSet() {
    const urlParams = new URLSearchParams(window.location.search);
    idMaquina = urlParams.get('idMaquina');
    fkEmpresa = sessionStorage.FK_EMPRESA;
    if (idMaquina == null) {
        window.location.href = `./dashboard.html`;
        window.focus();
    }
}

/* Maquina Info */

async function getMachineInfo() {
    let response = await (await fetch(`http://localhost:3000/dash/getMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina
        })
    })).json();
    let machineInfo = response;
    saveMachineInfo(machineInfo.nomeMaquina, machineInfo.hashMaquina);
}

function saveMachineInfo(machineName, hashMaquina) {
    let serverName = document.getElementById("server-name");
    serverName.innerHTML = machineName;
    let serverNum = document.getElementById("server-num");
    serverNum.innerHTML = "Hash: " + hashMaquina;
    /* Deixar o setor para depois */
}

/* Componentes */
async function getComponent(componentName) {
    let response = await (await fetch(`http://localhost:3000/dash/getComponenteServer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina,
            "nomeComponente": componentName
        })
    })).json();
    let component = response;
    console.log("Componente Obtido: " + componentName);
    return component;
}

async function getCPUInfo() {
    let specification = await getComponent("cpu");
    specification.descricao = specification.descricao.split("'")
    let jsonSpecification = {};

    for (let i = 0; i < specification.descricao.length; i++) {
        if (specification.descricao[i].indexOf("Arquitetura") != -1 || specification.descricao[i].indexOf("Nome do modelo") != -1 || specification.descricao[i].indexOf("Núcleo por soquete") != -1 ||
            specification.descricao[i].indexOf("Thread per núcleo") != -1) {
            jsonSpecification[specification.descricao[i]] = specification.descricao[i + 2];
        }
    }
    return jsonSpecification;
}

/* Metricas */

async function getServerInfo(order = false) {
    let response = await (await fetch(`http://localhost:3000/dash/getMetrica`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina,
            "order": order
        })
    })).json();
    metricas = response.metricas;
    console.log("Metrica Atualizada")

}

/* Chart */

/* Carrega os dados do gráfico */
async function appendChartData(chart, chartName, label, repeat = false, reverse = false) {
    if (label == "disco_read_time" || label == "disco_write_time") return;
    console.log("Carregando dados do gráfico: " + chartName + " | Métrica: " + label);

    if (chartName != "bigChart") {
        if (reverse) metricas[label] = metricas[label].reverse();
        updateDataNum(chartName, metricas[label][0], label);
    }

    let data = metricas[label];

    if (!repeat) {
        for (let i = 0; i < data.length; i++) {
            selectDatasetToAppend(chart, label, data[i], false);
            /* 
                grafico.data.datasets[0].backgroundColor
                grafico.data.datasets[0].borderColor
                #F04A5B
                #FFCD56
                #36A2EB
            */
        }

    } else {
        selectDatasetToAppend(chart, label, data[0]);
    }
    chart.update();
}

/* Seleciona um dataset para adicionar os dados */
function selectDatasetToAppend(chart, label, data, repeat = true) {
    let dataset = chart.data.datasets.filter((dataset) => {
        switch (label) {
            case "cpu_Utilizacao":
                return dataset.label == "Utilização";
            case "cpu_Temperature":
                return dataset.label == "Temperatura";
            case "ram_Usada":
                return dataset.label == "Usado";
            case "disco_Usado":
                return dataset.label == "Usado";
        }
    })[0];

    if (repeat && (label == "cpu_Utilizacao" || label == "disco_Usado" || label == "ram_Usada")) chart.data.labels.shift();
    if (label == "cpu_Utilizacao" || label == "disco_Usado" || label == "ram_Usada") chart.data.labels.push(new Date(data.dataColeta).toLocaleTimeString());
    if (repeat) dataset.data.shift();
    dataset.data.push(data.valorLeitura);
}

/* Atualiza os elementos */
function updateDataNum(name, data, label) {
    if (label == "cpu_Temperature") return;
    let element = document.getElementById(name + "-data");
    let valorLeitura = parseFloat(data.valorLeitura).toFixed(1);
    switch (name) {
        case 'cpu':
            let atualFrequencyData = metricas.cpu_Frequencia_Atual[0];
            element.innerHTML = `${valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${parseFloat(atualFrequencyData.valorLeitura).toFixed(1)} ${atualFrequencyData.unidadeDeMedida}`;
            break;
        case 'ram':
            let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
            element.innerHTML = `${valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${parseFloat(ramTotalData.valorLeitura).toFixed(1)} ${ramTotalData.unidadeDeMedida}`;
            break;
        case 'disk':
            let diskTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0];
            element.innerHTML = `${valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${parseFloat(diskTotalData.valorLeitura).toFixed(1)} ${diskTotalData.unidadeDeMedida}`;
            break;
        default:
            element.innerHTML = `${valorLeitura} ${data.unidadeDeMedida}`;
            break;
    }
}

/* Pega as métricas de cada componente */
function getComponentMetricas(key) {
    let newKey = key;
    if (key == "disk") newKey = "disco";
    else if (key == "bigChart") newKey = bigChart.clickedChart;

    let componentMetrica = Object.keys(metricas).filter(
        (metrica) => {
            return metrica.indexOf(newKey) != -1 && metrica != "cpu_Frequencia_Atual"
        }
    );
    return componentMetrica;
}


/* Carrega as informações do big chart */
async function startChart(key, repeat, reverse) {
    let componentMetrica = getComponentMetricas(key);
    for (let i = 0; i < componentMetrica.length; i++) {
        if (key == "bigChart" && bigChart.clickedChart != bigChart.lastChart) {

            bigChart.lastChart = bigChart.clickedChart;
            if (bigChart.clickedChart == "disco") charts.bigChart.data.datasets = bigChart.datasets.disk;
            else charts.bigChart.data.datasets = bigChart.datasets[bigChart.clickedChart];

            charts.bigChart.data.labels = [];
            repeat = false, reverse = false;
            componentMetrica = getComponentMetricas(key);
        }
        await appendChartData(charts[key], key, componentMetrica[i], repeat, reverse);
    }
}

/* Big Chart Event Click */
function setEventClick(componentName) {
    if (componentName == "bigChart") return;
    document.getElementById(`${componentName}-card`).onclick = async function (evt) {
        let element = document.getElementById(`component-name`);
        let element2 = document.getElementById(`component-complement`);
        let specification;
        switch (componentName) {
            case 'cpu':
                bigChart.clickedChart = "cpu";
                element.innerHTML = "Cpu";

                specification.descricao = getCPUInfo()
                element2.innerHTML = specification.descricao["Nome do modelo"];
                /* Colocar para pegar informações da cpu */
                break;
            case 'ram':
                bigChart.clickedChart = "ram";
                element.innerHTML = "Ram";
                let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
                element2.innerHTML = ramTotalData.valorLeitura + ramTotalData.unidadeDeMedida;
                break;
            case 'disk':
                bigChart.clickedChart = "disco";
                element.innerHTML = "Disco";
                // element2.innerHTML = specification[0].descricao["Nome do modelo"]; Ver se consegue pegar o modelo do disc
                break;
        }
        document.getElementsByClassName("selected")[0].classList.remove("selected");
        document.getElementById(`${componentName}-card`).classList.add("selected");
    }
}

/* Carrega informação da cpu quando carregar */
async function loadCpuInfo() {
    let element = document.getElementById(`component-complement`);
    let specification = await getCPUInfo();
    element.innerHTML = specification["Nome do modelo"];

}

/* Start */

async function start() {
    getMaquinaParamsAndSet();
    console.log('Iniciando plotagem do gráfico...');
    loadCpuInfo();
    await getServerInfo(true);
    await getMachineInfo();

    for (const key in charts) {
        startChart(key, false, true);
        setEventClick(key);
    }

    setInterval(async () => {
        console.log("------------------------------------------------------------");
        await getServerInfo(true);
        for (const key in charts) {
            startChart(key, true);
        }
    }, 1000);
}

start();


