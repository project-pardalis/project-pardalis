

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

console.log(plotMachinesChart())
const dataSo = {

    labels: [
        'LINUX',
        'WINDOWS',
        'MAC'
    ],

    datasets: [{

        label: 'Servidores com SO',
        data: plotMachinesChart(),
        backgroundColor: [
            ideal,
            alerta,
            risco
        ],
    }]
};

const chartSistemaOperacionalMaquinas = new Chart(
    document.getElementById("chart-so"), {
    data: dataSo,
    type: 'pie',
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false,
        }
    }
}
)


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

function mainChart() {
    setChartDiskTotal();
}