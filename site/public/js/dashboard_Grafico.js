

ideal = '#aa98ed'
risco = 'rgb(255, 205, 86)'
alerta = '#d93675'

let chartDataComponent = new Chart(
    document.getElementById('chartComponente'), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso da CPU (%) ',
            data: [],
            backgroundColor: [
                '#47408e',
                '#d3d3d9',
            ]
        }],
    },
    options: {
        legend: {
            reverse: true
        },
        maintainAspectRatio: false,
    }
});

function plotMachinesChart() {
    countWindows = 0
    countLinux = 0
    countMac = 0

    for (i = 0; i < this.machines.length; i++) {
        switch (machines[i].sistemaOperacional) {
            case "Linux":
                countLinux++;
            case "Mac":
                countMac++;
            case "Windows":
                countWindows;
        }
    }

    return [countLinux, countMac, countWindows]
}



function setUsePeerComponent(component) {
    chartDataComponent.data.datasets[0].data = [];
    chartDataComponent.data.labels = [];
    switch (component) {
        case 'cpu':
            chartDataComponent.data.datasets = [
                {
                    label: 'Uso da CPU (%) ',
                    data: [],
                    backgroundColor: [
                        '#47408e',
                        '#d3d3d9',
                    ]
                },
                {
                    label: 'Frequência da CPU (Mhz) ',
                    data: [],
                    backgroundColor: [
                        '#47408e',
                        '#d3d3d9',
                    ]
                }
            ]
            for (i = 0; i < machines.length; i++) {

                try {
                    chartDataComponent.data.labels.push(machines[i].nomeMaquina)
                    data = Math.round(machines[i].lastData.cpu_Utilizacao.valorLeitura, 2)
                    dataFrequencia = Math.round(machines[i].lastData.cpu_Frequencia_Atual.valorLeitura, 2)
                    console.log(machines[i].lastData.cpu_Frequencia_Atual.valorLeitura)
                    if (data == -500) data = 0
                    if (dataFrequencia == -500) dataFrequencia = 0
                    chartDataComponent.data.datasets[0].data.push(data)
                    chartDataComponent.data.datasets[1].data.push(dataFrequencia)
                } catch {
                }

            }
            break;
        case 'ram':
            chartDataComponent.data.datasets = [
                {
                    label: 'Uso da Ram (Gb) ',
                    data: [],
                    backgroundColor: [
                        '#47408e',
                        '#d3d3d9',
                    ]
                }
            ]

            for (i = 0; i < machines.length; i++) {
                try {
                    chartDataComponent.data.labels.push(machines[i].nomeMaquina)
                    data = Math.round(machines[i].lastData.ram_Usada.valorLeitura * 1000, 2)
                    chartDataComponent.data.datasets[0].data.push(data)
                } catch {
                }

            }
            break;

        case 'disco':
            chartDataComponent.data.datasets = [
                {
                    label: 'Uso do Disco (Gb) ',
                    data: [],
                    backgroundColor: [
                        '#47408e',
                        '#d3d3d9',
                    ]
                }
            ]
            for (i = 0; i < machines.length; i++) {
                try {
                    chartDataComponent.data.labels.push(machines[i].nomeMaquina)
                    data = Math.round(machines[i].lastData.disco_Usado.valorLeitura, 2)
                    chartDataComponent.data.datasets[0].data.push(data)
                } catch {

                }

            }
    }
    chartDataComponent.update()

}



function setSoChart() {

    let chartDataSistemaOperacional = new Chart(
        document.getElementById('chartSo'), {
        type: 'pie',
        data: {
            labels: ['Linux', 'Windows'],
            datasets: [{
                label: ['Linux', 'Windows'],
                data: [0, 0],
                backgroundColor: [
                    '#466af0',
                    '#f7b660',
                ]
            }],
        },
        options: {
            legend: {
                reverse: true
            }
        }
    });

    linux = 0
    windows = 0
    for (i = 0; i < machines.length; i++) {
        if (machines[i].sistemaOperacional == "Linux") {
            linux++;

        }
        else if (machines[i].sistemaOperacional == "Windows") {
            windows++;
        }


    }
    chartDataSistemaOperacional.data.datasets[0].data = [linux, windows]
    chartDataSistemaOperacional.update()
}

function setChartDiskTotal() {
    let chartMaquinasArmazenamentoTotal = new Chart(
        document.getElementById('chart-armazenamento-total'), {
        type: 'doughnut',
        data: {
            labels: ['Usado', 'Livre'],
            datasets: [{
                label: 'Armagenamento Gb',
                data: [0, 0],
                backgroundColor: [
                    '#f7b660',
                    '#466af0'
                ]
            }],
        },
        options: {
            legend: {
                reverse: true
            }
        }
    });

    let total = 0, used = 0;

    for (let i = 0; i < machines.length; i++) {
        let machine = machines[i];

        if (machine.lastData.disco_Usado === undefined || machine.lastData.estatico === undefined) continue;
        
        let data = machine.lastData.disco_Usado.valorLeitura;

        total += parseFloat((machines[i].lastData.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0]).valorLeitura);
        used += parseFloat(data);
    }
    
    chartMaquinasArmazenamentoTotal.data.datasets[0].data = [used, total - used];
    chartMaquinasArmazenamentoTotal.update();
}

function setAlertsMetricas() {
    ok = 0
    alerta = 0
    risco = 0

    cpuPercent = 0

    for (i = 0; i < machines.length; i++) {
        try {
            if (machines[i].lastData.ramUsada == undefined) ramPercent = 0;
            ramPercent = (machines[i].lastData.ram_Usada.valorLeitura * 1024) * 100 / (machines[i].lastData.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0].valorLeitura * 1024)
            if (machines[i].lastData.cpu_Utilizacao == undefined) cpuPercent = 0;
            cpuPercent = tratarDados(machines[i].lastData.cpu_Utilizacao.valorLeitura)
        }
        catch {

        }


        valores = [ramPercent, cpuPercent]

        for (j = 0; j < valores.length; j++) {


            condition = alertsRisk(valores[j], 80, 60)
            if (condition == 'risco') {
                risco++;
            }
            else if (condition == 'alerta') {
                alerta++;
            }
            else {
                ok++;

            }
        }
    }

    ok = Math.floor(ok / 2)
    plotOnPage(ok, risco, alerta)
    chartCpuTotal(ok, risco, alerta)
}

//
function chartCpuTotal(ok, risco, alerta) {
    let chartMaquinasArmazenamentoTotal = new Chart(
        document.getElementById('chart-cpu-total'), {
        type: 'doughnut',
        data: {
            labels: ['Normal', 'Alerta', 'Risco'],
            datasets: [{
                label: 'Métricas',
                data: [ok, risco, alerta],
                backgroundColor: [
                    '#30bf7a',
                    '#f5e462',
                    '#fa3d39'
                ]
            }],
        },
        options: {
            legend: {
                reverse: true
            }
        }
    });

}
function plotOnPage(ok, risco, alerta) {
    riscoKpi.innerHTML = `${risco} Servidores estão críticos`
    alertaKpi.innerHTML = `${alerta} Servidores requer atenção`
    okKpi.innerHTML = `${ok} Servidores estão OK!`
    qtdServidores.innerHTML = `Quantidade de Servidores: ${machines.length}`
    lastServer.innerHTML = getLastServer()
    serverMoreUse.innerHTML = ` ${getServerMoreUse()}`
}
function getLastServer() {
    if (machines.length == 0) return 'Nenhum servidor cadastrado'
    return `Último servidor cadastrado: ${machines[machines.length - 1].nomeMaquina}`
}
function getServerMoreUse() {
    max = 0
    indexMaxCpuFreq = 0
    for (i = 0; i < machines.length; i++) {
        try {
            if (data = machines[i].lastData.cpu_Utilizacao == undefined) data = 0;
            data = machines[i].lastData.cpu_Utilizacao.valorLeitura
        } catch {

        }

        if (data == -500 || data == undefined) {
            data = 0
        }
        if (data > max) {
            max = data
            indexMaxCpuFreq = i
        }

    }
    if (machines.length == 0) return 'Nenhum servidor cadastrado'
    return `Servidor com maior uso: ${machines[indexMaxCpuFreq].nomeMaquina}`;
}
function alertsRisk(val, risco, alerta) {

    if (val >= risco) {
        return "risco"
    }
    else if (val < risco && val > alerta) {
        return "alerta"
    }
    else {
        return "ok"
    }
}


function tratarDados(data) {
    if (data < 0) {
        return 0;
    }
    return data
}
function mainChart() {
    setChartDiskTotal();
    setUsePeerComponent('cpu');
    setSoChart();
    setAlertsMetricas();
}

