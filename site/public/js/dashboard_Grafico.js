

ideal = '#aa98ed'
risco = 'rgb(255, 205, 86)'
alerta = '#d93675'



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
    console.log(countLinux)

    return [countLinux, countMac, countWindows]
}

function setMbPerMachineUseRam() {
    let chartDataAvgTemperature = new Chart(
        document.getElementById('chartRam'), {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Uso de Ram (MB) ',
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
            }
        }
    });
    avgTemp = 0
    for (i = 0; i < machines.length; i++) {


        try {
            chartDataAvgTemperature.data.labels.push(machines[i].nomeMaquina)
            data = Math.round(machines[i].lastData.ram_Usada.valorLeitura * 1000, 2)
            chartDataAvgTemperature.data.datasets[0].data.push(data)
        } catch {

        }

    }
    chartDataAvgTemperature.update()
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
                    '#47408e',
                    '#d3d3d9',
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

        console.log(machines[i])
        console.log(i)
        console.log(machines[i].lastData.ram_Usada)

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
                    '#47408e',
                    '#d3d3d9',
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

        total += parseFloat((machine.lastData.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0]).valorLeitura);
        used += data;
    }

    chartMaquinasArmazenamentoTotal.data.datasets[0].data = [used, total - used];
    chartMaquinasArmazenamentoTotal.update();
}

function setAlertsMetricas() {
    ok = 0
    alerta = 0
    risco = 0



    for (i = 0; i < machines.length; i++) {
        try {
            ramPercent = (machines[i].lastData.ram_Usada.valorLeitura * 1024) * 100 / (machines[i].lastData.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0].valorLeitura * 1024)

            cpuPercent = tratarDados(machines[i].lastData.cpu_Utilizacao.valorLeitura)
        }
        catch {
            console.log("erro: maquina com valor undefined")
        }


        valores = [ramPercent, cpuPercent]

        for (j = 0; j < valores.length; j++) {

            console.log(ramPercent + " ram percent ")
            console.log(cpuPercent + ' cpu percent')
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

    console.log("ok: " + ok + "risco: " + risco + "alerta: " + alerta)
    plotOnPage(ok, risco, alerta)
}

function plotOnPage(ok, risco, alerta) {
    riscoKpi.innerHTML = risco
    alertaKpi.innerHTML = alerta
    okKpi.innerHTML = ok
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
    setMbPerMachineUseRam();
    setSoChart();
    setAlertsMetricas();
}



function setChartStateData() {
    /* let risco = 0, alerta = 0, normal = 0, notEstablished = 0;
    for (let i = 0; i < machines.length; i++) {
        let machine = machines[i];

        if (filter == "name") return;
        else if (machine.lastData[filter] === undefined || machine.lastData[filter].valorLeitura == '-500.00') {
            notEstablished++;
            continue;
        }

        let data = machine.lastData[filter].valorLeitura;
        let summary = filterSummary(null, machine).summary;

        if (data >= summary.max) alerta++;
        else if (data > summary.q3) risco++;
        else normal++;

    } */

    /* if (filter == "name") document.getElementsByClassName('maquinas-estado')[0].style.opacity = '0';
    else document.getElementsByClassName('maquinas-estado')[0].style.opacity = '100';

    if (machines.length == 0) document.getElementsByClassName('armazenamento-total')[0].style.opacity = '0';
    else document.getElementsByClassName('armazenamento-total')[0].style.opacity = '100';

    
    

    console.log("Risco: " + risco + " Alerta: " + alerta + " Normal: " + normal + " Não Estabelecido: " + notEstablished)

    chartMaquinasEstado.data.datasets[0].data = [notEstablished, normal, risco, alerta];
    chartMaquinasEstado.update(); */
}