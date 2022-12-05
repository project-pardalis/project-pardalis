var chartAllDataMean = new Chart(
    document.getElementById('chart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                spanGaps: false,
                label: 'Média da Utilização Da CPU',
                backgroundColor: '#00CCC0',
                borderColor: '#00CCC0',
                fill: false,
                data: [],

                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1

            },
            {
                spanGaps: false,
                label: 'Média da Temperatura Da CPU',
                backgroundColor: '#FF6F3B',
                borderColor: '#FF6F3B',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            },
            {
                spanGaps: false,
                label: 'Média da Utilização Da Memória Ram',
                backgroundColor: '#FF4858',
                borderColor: '#FF4858',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            },
            {
                spanGaps: false,
                label: 'Média da Utilização Do Disco',
                backgroundColor: '#DBF227',
                borderColor: '#DBF227',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            },]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        stepSize: 50
                    }
                },
                x: {
                    ticks: {
                        maxTicksLimit: 12,
                        minRotation: 0,
                        maxRotation: 0,
                    }
                }
            },
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    }
);

var chartSpecificData = new Chart(
    document.getElementById('chart2'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                spanGaps: false,
                label: 'Valor Leitura',
                backgroundColor: '#00CCC0',
                borderColor: '#00CCC0',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            }, {
                spanGaps: false,
                label: 'Desvio Padrão',
                backgroundColor: '#FF4858',
                borderColor: '#FF4858',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            },
            {
                spanGaps: false,
                label: 'Desvio Padrão',
                backgroundColor: '#FF4858',
                borderColor: '#FF4858',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            },
            {
                spanGaps: false,
                label: 'Média',
                backgroundColor: 'orange',
                borderColor: 'orange',
                fill: false,
                data: [],
                lineTension: 0.3,
                pointRadius: 2,
                pointHitRadius: 100,
                pointBorderWidth: 2,
                borderRadius: 0.1
            }],
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        stepSize: 50,
                    }
                },
                x: {
                    ticks: {
                        maxTicksLimit: 12,
                        minRotation: 0,
                        maxRotation: 0,
                    }
                }
            },
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });