let chartMaquinasEstado = new Chart(
    document.getElementById("chart-maquinas-estado"), {
    type: 'doughnut',
    data: {
        labels: ["Não Encontrado", 'Normal', 'Risco', 'Alerta'],
        datasets: [{
            label: 'Maquinas',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'gray',
                'rgb(25,135,84)',
                'rgb(255,193,7)',
                'rgb(220,53,69)',
            ]
        }]
    },
    options: {
        legend: {
            reverse: true
        }
    }
});

let chartMaquinasArmazenamentoTotal = new Chart(
    document.getElementById("chart-armazenamento-total"), {
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

function setChartStateData() {
    let risco = 0, alerta = 0, normal = 0, notEstablished = 0;

    if (filter == "name") document.getElementsByClassName('maquinas-estado')[0].style.opacity = '0';
    else document.getElementsByClassName('maquinas-estado')[0].style.opacity = '100';

    if(machines.length == 0) document.getElementsByClassName('armazenamento-total')[0].style.opacity = '0';
    else document.getElementsByClassName('armazenamento-total')[0].style.opacity = '100';

    setChartDiskTotal();
    for (let i = 0; i < machines.length; i++) {
        let machine = machines[i];

        if (filter == "name") return;
        else if (machine.lastData[filter] === undefined || machine.lastData[filter].valorLeitura == '-500.00') {
            notEstablished++;
            continue;
        }

        let data = machine.lastData[filter].valorLeitura;
        let summary = filterSummary(null , machine).summary;

        if (data >= summary.max) alerta++;
        else if (data > summary.q3) risco++;
        else normal++;
        
    }

    console.log("Risco: " + risco + " Alerta: " + alerta + " Normal: " + normal + " Não Estabelecido: " + notEstablished)

    chartMaquinasEstado.data.datasets[0].data = [notEstablished, normal, risco, alerta];
    chartMaquinasEstado.update();
}

function setChartDiskTotal() {
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