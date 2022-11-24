
function plotarGraficoPizzaChamados() {
    let chartChamadoAbertosFechados = new Chart(
        document.getElementById('graficoChamadosAbertosFechados'), {
        type: 'doughnut',
        data: {
            labels: [
                'Abertos',
                'Fechados',

            ],
            datasets: [{
                label: ['Abertos', 'Fechados'],
                data: [countAbertos, countFechados],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    }
    )
}

function plotarGraficoDataChamados(label) {
    let chartChamadoAbertosFechados = new Chart(
        document.getElementById('graficoChamadosBarraPorData'), {
        type: 'bar',
        data: {
            labels: [
                'Abertos',
                'Fechados',

            ],
            datasets: [{
                label: label,
                data: [0, 1, 1],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    }
    )
}

function plotarGraficoPorChamadoDados(data, label, comp) {

    graficoCpuChamados = 0
    switch (comp) {
        case 'cpu':
            graficoCpuChamados = new Chart(
                document.getElementById('lineChartCompUse' + comp), {
                type: 'bar',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;
        case 'disco':
            graficoCpuChamados = new Chart(
                document.getElementById('lineChartCompUse' + comp), {
                type: 'bar',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;
        case 'ram':
            graficoCpuChamados = new Chart(
                document.getElementById('lineChartCompUse' + comp), {
                type: 'bar',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'ram',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;
    }


}

function maxUsoComp(data, label, comp) {
    console.log(comp + " COMPONENTE")
    switch (comp) {
        case 'cpu':
            data.push(100)
            graficoCpuChamados = new Chart(
                document.getElementById('maxUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;
        case 'disco':
            graficoCpuChamados = new Chart(
                document.getElementById('maxUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;

        case 'ram':
            data.push(100)
            graficoCpuChamados = new Chart(
                document.getElementById('maxUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;
    }

}

function chartmetricasUsoComp(data, label, comp) {
    console.log('metricasUsoComp' + comp + " <- COMPONENTE CHARTMETRICASUSOCOMP()")
    switch (comp) {
        case 'cpu':
            chartMetricaUsoCpu = new Chart(
                document.getElementById('metricasUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [

                            'rgb(255, 205, 86)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            break;
        case 'disco':
            data.push(1000)
            chartMetricaUsoCpu = new Chart(

                document.getElementById('metricasUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;

        case 'ram':
            console.log('eroo eroo')
            chartMetricaUsoCpu = new Chart(
                document.getElementById('metricasUsoComp' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'ram',
                        data: [100, 200],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )

            break;
    }

}

function generalChartUsePercent(data, label, comp) {
    switch (comp) {
        case 'cpu':
            chartMetricaUsoCpu = new Chart(
                document.getElementById('generalChartUsePercent' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [

                            'rgb(255, 205, 86)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            break;
        case 'disco':
            data.push(1000)
            chartMetricaUsoCpu = new Chart(

                document.getElementById('generalChartUsePercent' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'cpu',
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )
            console.log(data)
            break;

        case 'ram':
            console.log('eroo eroo')
            chartMetricaUsoCpu = new Chart(
                document.getElementById('generalChartUsePercent' + comp), {
                type: 'pie',
                data: {
                    labels: label
                    ,
                    datasets: [{
                        label: 'ram',
                        data: [100, 200],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                }
            }
            )

            break;
    }
}
