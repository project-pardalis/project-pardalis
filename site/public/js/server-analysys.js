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
                    backgroundColor: "#b8ff8684",
                    label: 'xxxxxx',
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
var clickedChart = "cpu_Utilizacao";
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
    console.log(response);
}

function saveMachineInfo(machineName, hashMaquina) {
    let serverName = document.getElementById("server-name");
    serverName.innerHTML = machineName;
    let serverNum = document.getElementById("server-num");
    serverNum.innerHTML = "Hash: " + hashMaquina;
    /* Deixar o setor para depois */
}

/* Chart */

async function getServerInfo() {
    let response = await (await fetch(`http://localhost:3000/dash/getMetrica`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "fkMaquina": idMaquina
        })
    })).json();
    console.log("Metrica Atualizada")
    metricas = response.metricas;

}

function loadGraphData(graphic, graphicName, repeat = false) {
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
            graphicName = clickedChart;
            break;
    }

    if (dataName != "bigChart") updateDataNum(dataName, metricas[graphicName][0]);
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
    element.innerHTML = data.valorLeitura + " "+ data.unidadeDeMedida;
}

function setEventClick() {
    document.getElementById('cpu-card').onclick = function (evt) {
        clickedChart = "cpu_Utilizacao";
        loadGraphData(charts.bigChart, "big-chart");
        //document.getElementById('big-chart-card').style.display = "block";
    }
}

async function start() {
    getMaquinaParamsAndSet();
    console.log('Iniciando plotagem do gráfico...');
    await getServerInfo();
    await getMachineInfo();

    for (const key in charts) {
        loadGraphData(charts[key], key, false);
    }

    setInterval(async () => {
        await getServerInfo();
        for (const key in charts) {
            loadGraphData(charts[key], key, true);
        }
    }, 1000);
}

start();
setEventClick();


