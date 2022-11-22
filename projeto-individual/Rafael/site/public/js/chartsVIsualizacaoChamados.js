
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
                label: 'My First Dataset',
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