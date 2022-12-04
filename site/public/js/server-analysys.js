var charts = {};
var alert;
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
                    borderWidth: 0.5
                },
                {
                    backgroundColor: "#7fffe86e",
                    label: 'Temperatura',
                    borderColor: '#45a593',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.5
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
                    borderWidth: 0.5
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
                    borderWidth: 0.5
                },
                {
                    backgroundColor: "#1b717145",
                    label: 'Velocidade de Escrita',
                    borderColor: '#1b7171',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.5
                },
                {
                    backgroundColor: "#6a46d742",
                    label: 'Velocidade de Leitura',
                    borderColor: '#6B46D7',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.5
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
                    borderWidth: 1.5
                },
                {
                    backgroundColor: "#7fffe86e",
                    label: 'Temperatura',
                    borderColor: '#45a593',
                    data: [],
                    tension: 0.1,
                    pointRadius: 1,
                    hoverPointRadius: 0,
                    borderWidth: 1.5
                }]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true,
            }
        }
    }
);

charts.dayChart = new Chart(
    document.getElementById('day-chart'),
    {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    spanGaps: false,
                    backgroundColor: "#9cdbffa0",
                    label: 'Utilização da Cpu',
                    borderColor: '#117dbb',
                    data: [],
                    tension: 0.1,
                    pointRadius: 2,
                    hoverPointRadius: 0,
                    borderWidth: 1.5
                },
                {
                    spanGaps: false,
                    backgroundColor: "#7fffe86e",
                    label: 'Temperatura da Cpu',
                    borderColor: '#45a593',
                    data: [],
                    tension: 0.1,
                    pointRadius: 2,
                    hoverPointRadius: 0,
                    borderWidth: 1.5
                },
                {
                    spanGaps: false,
                    backgroundColor: "#eba4ff7e",
                    label: 'Ram Usada',
                    borderColor: '#9528b4',
                    data: [],
                    tension: 0.1,
                    pointRadius: 2,
                    hoverPointRadius: 0,
                    borderWidth: 1.5
                },
                {
                    spanGaps: false,
                    backgroundColor: "#b8ff8684",
                    label: 'Disco Usado',
                    borderColor: '#62b02a',
                    data: [],
                    tension: 0.1,
                    pointRadius: 2,
                    hoverPointRadius: 0,
                    borderWidth: 1.5
                },
                {
                    spanGaps: false,
                    backgroundColor: "#1b717145",
                    label: 'Velocidade de Escrita',
                    borderColor: '#1b7171',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.5
                },
                {
                    spanGaps: false,
                    backgroundColor: "#6a46d742",
                    label: 'Velocidade de Leitura',
                    borderColor: '#6B46D7',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.5
                }]
        },
        options: {
            legend: {
                display: true,
            }
        }
    }
);

var chartsColors = {
    "cpu_Utilizacao": {
        "backgroundColor": "#9cdbffa0",
        "borderColor": "#117dbb"
    },
    "cpu_Temperature": {
        "backgroundColor": "#7fffe86e",
        "borderColor": "#45a593"
    },
    "ram_Usada": {
        "backgroundColor": "#eba4ff7e",
        "borderColor": "#9528b4"
    },
    "disco_Usado": {
        "backgroundColor": "#b8ff8684",
        "borderColor": "#62b02a"
    },
    "disco_write_time": {
        "backgroundColor": "#1b717145",
        "borderColor": "#1b7171"
    },
    "disco_read_time": {
        "backgroundColor": "#6a46d742",
        "borderColor": "#6B46D7"
    }
}

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
                pointRadius: 1.5,
                hoverPointRadius: 0,
                borderWidth: 1.5
            },
            {
                backgroundColor: "#7fffe86e",
                label: 'Temperatura',
                borderColor: '#45a593',
                data: [],
                tension: 0.1,
                pointRadius: 1.5,
                hoverPointRadius: 0,
                borderWidth: 1.5
            }],
        ram: [
            {
                backgroundColor: "#eba4ff7e",
                label: 'Usado',
                borderColor: '#9528b4',
                data: [],
                tension: 0.1,
                pointRadius: 1.5,
                hoverPointRadius: 0,
                borderWidth: 1.5
            }],
        disk: [
            {
                backgroundColor: "#b8ff8684",
                label: 'Usado',
                borderColor: '#62b02a',
                data: [],
                tension: 0.1,
                pointRadius: 1.5,
                hoverPointRadius: 0,
                borderWidth: 1.5
            },
            {
                backgroundColor: "#1b717145",
                label: 'Velocidade de Escrita',
                borderColor: '#1b7171',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.5
            },
            {
                backgroundColor: "#6a46d742",
                label: 'Velocidade de Leitura',
                borderColor: '#6B46D7',
                data: [],
                tension: 0.1,
                pointRadius: 0,
                hoverPointRadius: 0,
                borderWidth: 0.5
            }]

    }
}
var interval;

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
    let macAddress = '';
    hashMaquina = hashMaquina.split("");
    for (let i = 2; i < hashMaquina.length; i += 2) {
        if (i % 2 == 0) {
            if (i == hashMaquina.length - 2) macAddress += hashMaquina[i - 1] + hashMaquina[i];
            else macAddress += hashMaquina[i - 1] + hashMaquina[i] + ":";

        }
    }
    serverNum.innerHTML = "Mac Address: " + macAddress;
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
    if (specification.descricao !== null) {

        return specification.descricao;
    } else {
        return null;
    }

}

/* Metricas */

async function getServerInfo(order = false, limit = true) {
    let response = await (await fetch(`http://localhost:3000/dash/getMetrica`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina,
            "order": order,
            "limit": limit
        })
    })).json();
    console.log("Metrica Atualizada")
    return response.metricas;

}

function loadLastUpdate(date) {
    let element = document.getElementById("last-update");
    let dateTime = moment(date);
    dateTime.locale('pt-br');
    element.title = dateTime.format('[Última atualização obtida:] Do MMMM YYYY, hh:mm:ss a');
    element.innerHTML = dateTime.calendar('');
}

/* Alertas */

function getSummary(min, max) {
    let mediana = (min + max) / 2;
    let q1 = (min + mediana) / 2;
    let q3 = (max + mediana) / 2;
    return {
        "q1": q1,
        "q3": q3,
        "max": max,
    }
}

/* Chart */

/* Carrega os dados do gráfico */
async function appendChartData(chart, chartName, label, repeat = false, reverse = false) {
    //if (label == "disco_read_time" || label == "disco_write_time") return;
    console.log("Carregando dados do gráfico: " + chartName + " | Métrica: " + label);

    if (chartName != "bigChart") {
        if (reverse) metricas[label] = metricas[label].reverse();
        updateDataNum(chartName, metricas[label][0], label);
    } else {
        loadLastUpdate(metricas[label][0].dataColeta);
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

function sair() {
    sessionStorage.clear();
    window.location.href = "./login.html";
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
            case "disco_read_time":
                return dataset.label == "Velocidade de Leitura";
            case "disco_write_time":
                return dataset.label == "Velocidade de Escrita";
        }
    })[0];

    if (repeat && (label == "cpu_Utilizacao" || label == "disco_Usado" || label == "ram_Usada")) chart.data.labels.shift();
    if (label == "cpu_Utilizacao" || label == "disco_Usado" || label == "ram_Usada") chart.data.labels.push(new Date(data.dataColeta).toLocaleTimeString());
    if (repeat) dataset.data.shift();
    let summary;
    switch (label) {
        case "cpu_Utilizacao":
            summary = getSummary(0, 100);
            break;
        case "cpu_Temperature":
            summary = getSummary(0, 100);
            break;
        case "ram_Usada":
            let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
            summary = getSummary(0, ramTotalData);
            break;
        case "disco_Usado":
            let discoTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0];
            summary = getSummary(0, discoTotalData);
            break;
        case 'disco_write_time':
            summary = getSummary(0, metricas.disco_write_time.sort((a, b) => a.valorMetrica - b.valorMetrica)[0].valorLeitura);
            break;
        case 'disco_read_time':
            summary = getSummary(0, metricas.disco_read_time.sort((a, b) => a.valorMetrica - b.valorMetrica)[0].valorLeitura);
            break;
    }
    data.valorLeitura = parseFloat(data.valorLeitura);
    if (data.valorLeitura == -500) return;
    if (data.valorLeitura >= summary.max && label != "disco_read_time" && label != "disco_write_time") {
        dataset.backgroundColor = "#F04A5B";
        dataset.borderColor = "#F04A5B";
    } else if (data.valorLeitura >= summary.q3 && label != "disco_read_time" && label != "disco_write_time") {
        dataset.backgroundColor = "#FFCD56";
        dataset.borderColor = "#FFCD56";
    } else {
        dataset.backgroundColor = chartsColors[label]["backgroundColor"];
        dataset.borderColor = chartsColors[label]["borderColor"];
    }
    dataset.data.push(data.valorLeitura);
}

/* Atualiza os elementos */
function updateDataNum(name, data, label) {
    if (label == "cpu_Temperature") return;
    let element = document.getElementById(name + "-data");
    if (data === undefined) {
        clearInterval(interval);
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não foi possível carregar os dados do servidor!',
            confirmButtonText: 'Entendi',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./dashboard.html";
            }

        })
    }
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
async function setEventClick(componentName) {
    if (componentName == "bigChart" || componentName == "dayChart") return;
    document.getElementById(`${componentName}-card`).onclick = async function (evt) {
        let element = document.getElementById(`component-name`);
        let element2 = document.getElementById(`component-complement`);
        switch (componentName) {
            case 'cpu':
                bigChart.clickedChart = "cpu";
                element.innerHTML = "Cpu";

                loadCpuInfo();
                
                break;
            case 'ram':
                bigChart.clickedChart = "ram";
                element.innerHTML = "Ram";
                let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
                element2.title = "";
                element2.innerHTML = ramTotalData.valorLeitura + ramTotalData.unidadeDeMedida;
                break;
            case 'disk':
                bigChart.clickedChart = "disco";
                element.innerHTML = "Disco";
                element2.title = "";
                element2.innerHTML = "";
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
    
    if (specification != null) element.innerHTML = specification["Nome do modelo"];

    element.title = `Nucleos: ${specification["Nucleo(s) por soquete"]} Threads: ${specification["Thread(s) per nucleo"]}`;

}

/* Start */

async function start() {
    getMaquinaParamsAndSet();
    console.log('Iniciando plotagem do gráfico...');
    loadCpuInfo();
    metricas = await getServerInfo(true);
    console.log(metricas);
    await getMachineInfo();

    for (const key in charts) {
        startChart(key, false, true);
        setEventClick(key);
    }

    loadDataDayChart();
    alert.close();
    interval = setInterval(async () => {
        console.log("------------------------------------------------------------");
        metricas = await getServerInfo(true);
        for (const key in charts) {
            startChart(key, true);
        }
    }, 5000);
}


alert = swal.fire(
    {
        title: "Carregando",
        text: "Aguarde enquanto os dados são carregados",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: false,

        didOpen: () => {
            Swal.showLoading()
            start();
        }

    }
)


/* ----------------------------- DAY CHART ------------------------------------------- */

async function getMeanDates() {
    let response = await (await fetch(`http://localhost:3000/maquina/getMeanDates/${fkEmpresa}&${idMaquina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
    console.log("Metrica Atualizada")
    return response;
}

async function loadDataDayChart() {
    let metricasDayChart = await getMeanDates();

    for (let key in metricasDayChart) {
        charts.dayChart.data.labels.push(key+"h");
        
    }


    for (const metrica in chartsColors) {
        for (let day in metricasDayChart) {
            if (metricasDayChart[day][metrica] == undefined) {
                findDataset(metrica, null);
            } else {
                findDataset(metrica, metricasDayChart[day][metrica]);
               
            }
        }
    }
    

    charts.dayChart.update();
}

async function separateHours(data) {
    let hours = [];
    for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].dataColeta);
        let hour = date.getHours();
        if (hours.indexOf(hour) == -1) hours.push(hour);
    }
    return hours
}

function getMean(data) {
    let mean = 0;
    for (let i = 0; i < data.length; i++) {
        mean += parseFloat(data[i].valorLeitura);
    }
    mean /= data.length;
    return mean.toFixed(2);
}

function findDataset2(metrica) {
    let labelName;
    switch (metrica) {
        case 'cpu_Utilizacao':
            labelName = "Utilização da Cpu";
            break;
        case 'cpu_Temperature':
            labelName = "Temperatura da Cpu";
            break;
        case 'ram_Usada':
            labelName = "Ram Usada";
            break;
        case 'disco_Usado':
            labelName = "Disco Usado";
            break;
        case 'disco_write_time':
            labelName = "Velocidade de Escrita";
            break;
        case 'disco_read_time':
            labelName = "Velocidade de Leitura";
            break;
    }

    for (let i = 0; i < charts.dayChart.data.datasets.length; i++) {
        if (charts.dayChart.data.datasets[i].label == labelName) {
            return i;
        }
    }
}

function findDataset(metrica, value) {
    let labelName;
    switch (metrica) {
        case 'cpu_Utilizacao':
            labelName = "Utilização da Cpu";
            break;
        case 'cpu_Temperature':
            labelName = "Temperatura da Cpu";
            break;
        case 'ram_Usada':
            labelName = "Ram Usada";
            break;
        case 'disco_Usado':
            labelName = "Disco Usado";
            break;
        case 'disco_write_time':
            labelName = "Velocidade de Escrita";
            break;
        case 'disco_read_time':
            labelName = "Velocidade de Leitura";
            break;
    }
    if (value == -500.00) return;

    for (let i = 0; i < charts.dayChart.data.datasets.length; i++) {
        if (charts.dayChart.data.datasets[i].label == labelName) {
            if (value == null) charts.dayChart.data.datasets[i].data.push(value);
            else charts.dayChart.data.datasets[i].data.push(parseFloat(value.toFixed(2)));
        }
    }
}

function changeChartStyle(chartType) {
    switch (chartType) {
        case 'line':
            charts.dayChart.config.type = 'line';
            break;
        case 'bar':
            charts.dayChart.config.type = 'bar';
            break;
    }
    charts.dayChart.update();
} 

function logout() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}