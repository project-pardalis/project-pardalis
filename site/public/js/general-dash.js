const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const dataCPU = {
    labels: labels,
    datasets: [
        {
            fill: true,
            fillColor: " #6B46D750 ",
            label: 'Cpu',
            borderColor: '#6B46D7',
            data: [80, 78, 70, 65, 50, 40, 50],
        }]
};
const dataRAM = {
    labels: labels,
    datasets: [
        {
            fill: true,
            fillColor: " #6B46D750 ",
            label: 'Ram',
            borderColor: '#6B46D7',
            data: [80, 78, 70, 65, 50, 40, 50],
        }]
};
const dataDisco = {
    labels: labels,
    datasets: [
        {
            fill: true,
            fillColor: " #6B46D750 ",
            label: 'Disco',
            borderColor: '#6B46D7',
            data: [80, 78, 70, 65, 50, 40, 50],
        }]
};

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

const chartCpu = new Chart(
    document.getElementById('myChart'),
    {
        type: 'line',
        data: dataCPU,
        options: {
            legend: {
                display: false,
            }
        }
    }
);

const chartRam = new Chart(
    document.getElementById('myChart1'),
    {
        type: 'line',
        data: dataRAM,
        options: {
            legend: {
                display: false,
            }
        }
    }
);

const chartDisco = new Chart(
    document.getElementById('myChart2'),
    {
        type: 'line',
        data: dataDisco,
        options: {
            legend: {
                display: false,
            }
        }
    }
);

const bigChart = new Chart(
    document.getElementById('myChart3'),
    {
        type: 'line',
        data: dataCPU,
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            }
        }
    }
);

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
);

const serverRiskPie = new Chart(
    documento.getElementById("serverRiskPie"), {
    data: serverRiskPie
}


);

console.log(config)