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
                    label: 'Cpu',
                    borderColor: '#117dbb',
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
                    label: 'Ram',
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
                    label: 'Disk',
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
                    label: 'xxxxxx',
                    backgroundColor: "#9cdbffa0",
                    borderColor: '#117dbb',
                    data: [],
                    tension: 0.1,
                    pointRadius: 0,
                    hoverPointRadius: 0,
                    borderWidth: 0.8
                }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
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
    backgroundColor: "#9cdbffa0",
    borderColor: '#117dbb',
    clickedChart: "cpu_Utilizacao",
    data: []
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

/* Componente */

async function getComponent(componentName) {
    let response = await (await fetch(`http://localhost:3000/dash/getComponenteServer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina,
            "componente": componentName
        })
    })).json();
    let component = response;
    return component;
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

function loadGraphData(graphic, graphicName, repeat = false, reverse = false) {
    console.log("Carregando dados do gráfico " + graphicName);
    let dataName = graphicName;
    
    switch (graphicName) {
        case 'cpu':
            graphicName = "cpu_Utilizacao";
            break;
        case 'ram':
            graphicName = "ram_Usada";
            
            break;
        case 'disk':
            graphicName = "disco_Usado";
            
            break;
        case 'bigChart':
            graphicName = bigChart.clickedChart;
            break;
    }

    if (reverse && dataName != "bigChart") {
        metricas[graphicName] = metricas[graphicName].reverse();
    }

    if (dataName != "bigChart") updateDataNum(dataName, metricas[graphicName][0]);
    else {

        if (bigChart.borderColor != graphic.config.data.datasets[0].borderColor) {
            graphic.data.datasets[0].data = [];
            graphic.data.labels = [];
            graphic.config.data.datasets[0].borderColor = bigChart.borderColor;
            graphic.config.data.datasets[0].backgroundColor = bigChart.backgroundColor;
            repeat = false;
        }
        
    }

    let data = metricas[graphicName];

    if (!repeat) {
        for (let i = 0; i < data.length; i++) {
            graphic.data.labels.push(new Date(data[i].dataColeta).toLocaleTimeString());
            graphic.data.datasets[0].data.push(data[i].valorLeitura);
            /* 
                grafico.data.datasets[0].backgroundColor
                grafico.data.datasets[0].borderColor
                #F04A5B
                #FFCD56
                #36A2EB
            */
        }
        
    } else {

        graphic.data.labels.shift();
        graphic.data.labels.push(new Date(metricas[graphicName][0].dataColeta).toLocaleTimeString());
        graphic.data.datasets[0].data.shift();
        graphic.data.datasets[0].data.push(metricas[graphicName][0].valorLeitura);
    }
    graphic.update();
}

function updateDataNum(name, data) {
    let element = document.getElementById(name + "-data");
    switch (name) {
        case 'cpu':
            let atualFrequencyData = metricas.cpu_Frequencia_Atual[0];
            element.innerHTML = `${data.valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${atualFrequencyData.valorLeitura} ${atualFrequencyData.unidadeDeMedida}`;
            break;
        case 'ram':
            let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
            element.innerHTML = `${data.valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${ramTotalData.valorLeitura} ${ramTotalData.unidadeDeMedida}`;
            break;
        case 'disk':
            let diskTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0];
            element.innerHTML = `${data.valorLeitura} ${data.unidadeDeMedida} <br>――――<br> ${diskTotalData.valorLeitura} ${diskTotalData.unidadeDeMedida}`;
            break;
        default:
            element.innerHTML = `${data.valorLeitura} ${data.unidadeDeMedida}`;
            break;
    }
}

/* Big Chart */

function setEventClick(componentName) {
    if (componentName == "bigChart") return;
    document.getElementById(`${componentName}-card`).onclick = async function (evt) {
        let element = document.getElementById(`component-name`);
        let element2 = document.getElementById(`component-complement`);

        switch (componentName) {
            case 'cpu':
                bigChart.clickedChart = "cpu_Utilizacao";
                bigChart.backgroundColor = "#9cdbffa0";
                bigChart.borderColor = '#117dbb';
                element.innerHTML = "Cpu";
                let specification = await getComponent("cpu");
                console.log(specification)
                specification.descricao = JSON.parse(specification.descricao)
                element2.innerHTML = specification[0].descricao["Nome do modelo"];
                /* Colocar para pegar informações da cpu */
                break;
            case 'ram':
                bigChart.clickedChart = "ram_Usada";
                bigChart.backgroundColor = "#eba4ff7e";
                bigChart.borderColor = '#9528b4';
                element.innerHTML = "Ram";
                // element2.innerHTML = specification[0].descricao["Nome do modelo"]; Ram total

                break;
            case 'disk':
                bigChart.clickedChart = "disco_Usado";
                bigChart.backgroundColor = "#b8ff8684";
                bigChart.borderColor = '#62b02a';
                element.innerHTML = "Disco";
                // element2.innerHTML = specification[0].descricao["Nome do modelo"]; Ver se consegue pegar o modelo do disco
                
                break;
        }
        document.getElementsByClassName("selected")[0].classList.remove("selected");
        document.getElementById(`${componentName}-card`).classList.add("selected");
    }
}

/* Start */

async function start() {
    getMaquinaParamsAndSet();
    console.log('Iniciando plotagem do gráfico...');
    await getServerInfo(true);
    await getMachineInfo();

    for (const key in charts) {
        loadGraphData(charts[key], key, false, true);
        setEventClick(key);
    }

    setInterval(async () => {
        await getServerInfo();
        for (const key in charts) {
            loadGraphData(charts[key], key, true);
        }
    }, 1000);
}

start();


