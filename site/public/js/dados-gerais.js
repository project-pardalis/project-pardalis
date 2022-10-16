
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
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
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
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
    }]
};




const dataStorageAvg = {

    datasets: [{
        data: [200, 220, 240, 260, 280, 290, 300, 350, 400],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        borderWidth: 8,
        data: [100, 999, 400],
        fill: false

    }]
}




const dataDynamic = {
    datasets: [{
        backgroundColor: [
            'rgb(255, 99, 132)',
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        borderWidth: 10,
        data: [100, 999, 400],
        fill: false
    }]
}


const dataTemperature = {
    datasets: [{
        backgroundColor: [
            'rgb(255, 99, 132)',
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        borderWidth: 10,
        data: [100, 999, 400],
        fill: false
    }]
}

const dataRam = {
    datasets: [{
        backgroundColor: [
            'rgb(255, 99, 132)',
        ],
        borderColor: 'rgb(75, 192, 192)',
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



const configStorageAvg = new Chart(
    document.getElementById('chart-avgstorage'), {
    type: 'line',
    data: dataStorageAvg,

    options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
            display: false,
        }
    }

})


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