
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [

        {

            fill: true,
            fillColor: " #6B46D750 ",
            label: 'CPU',

            borderColor: '#6B46D7',
            data: [80, 78, 70, 65, 50, 40, 50],
        }]
};

const data_without_labels = {

    datasets: [{
        label: 'My First dataset',
        backgroundColor: '#6B46D7',
        borderColor: '#6B46D7',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
}

    ;

const configBig = {
    type: 'bar',
    data: data,
    options: {}
};

const configPizza = {
    type: 'doughnut',
    data: data_without_labels,
    options: {}

};

const cpu = new Chart(
    document.getElementById('myChart'),
    config
);

const ram = new Chart(
    document.getElementById('myChart1'),
    config
);

const disk = new Chart(
    document.getElementById('myChart2'),
    config
);

const big = new Chart(
    document.getElementById('myChart3'),
    config
);

const bar_component = new Chart(
    document.getElementById('myChart4'),
    configBig
);



console.log(config)