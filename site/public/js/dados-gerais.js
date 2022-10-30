

ideal = '#aa98ed'
risco = 'rgb(255, 205, 86)'
alerta = '#d93675'
const data = {

    labels: [
        'Ideal',
        'Alerta',
        'Risco'
    ],

    datasets: [{

        label: 'Servidores em risco',
        data: [300, 50, 100],
        backgroundColor: [
            ideal,
            alerta,
            risco
        ],
    }]
};



const dataSo = {

    labels: [
        'LINUX',
        'WINDOWS',
        'MAC'
    ],

    datasets: [{

        label: 'Servidores com SO',
        data: [600, 20, 10],
        backgroundColor: [
            ideal,
            alerta,
            risco
        ],
    }]
};




const dataStorageAvg = {

    datasets: [{
        data: [200, 220, 240, 260, 280, 290, 300, 350, 400],
        backgroundColor: [
            ideal,
            alerta,
            risco
        ],
        fill: false,
        borderColor: ideal,
        tension: 0.3,
        borderWidth: 8,
        data: [100, 999, 400],
        fill: false

    }]
}




const dataDynamic = {
    datasets: [{
        backgroundColor: [
            ideal,
        ],
        borderColor: ideal,
        tension: 0.3,
        borderWidth: 10,
        data: [100, 999, 400],
        fill: false
    }]
}


const dataTemperature = {
    datasets: [{
        backgroundColor: [
            ideal,
        ],
        borderColor: ideal,
        tension: 0.3,
        borderWidth: 10,
        data: [100, 999, 400],
        fill: false
    }]
}

const dataRam = {
    datasets: [{
        backgroundColor: [
            ideal,
        ],
        borderColor: ideal,
        tension: 0.3,
        borderWidth: 10,
        data: [100, 999, 400],
        fill: false
    }]
}


const configServerRisk = new Chart(
    document.getElementById("chart-risk-server"), {
    data: data,
    type: 'doughnut',
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false,
        }
    }
});






const configDynamicChart = new Chart(
    document.getElementById('chart-dynamic'), {
    type: 'line',
    data: dataDynamic
}
)

const configSo = new Chart(
    document.getElementById("chart-so"), {
    data: dataSo,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false,
        }
    }
}
)

const configRam = new Chart(
    document.getElementById('chart-ram'), {
    type: 'line',
    data: dataRam,
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false,
        }
    }
}
)

const configTemperatureChart = new Chart(
    document.getElementById('chart-temperature'), {
    type: 'line',
    data: dataTemperature
}
)