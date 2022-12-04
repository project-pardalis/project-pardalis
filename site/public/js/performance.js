let value = []
let valueAt = []
let leitura = []
let valoresLeitura = []
let dataGraph = []
let dataForGraph = []
let dataMax = []
let dataMin = []
let dataMed = []
let meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function createSum() {
    container = document.getElementById('containerSum');
    for (let x = 0; x < 4; x++) {
        let div = document.createElement('div');
        div.className = 'summary';
        div.id = 'sumVal' + x;
        container.appendChild(div);
    }
    createSumVal();
}

function createSumVal() {
    let summary = document.getElementsByClassName('summary');
    cont = 0;
    for (let x = 0; x < summary.length; x++) {
        for (let i = 0; i < 6; i++) {
            let div = document.createElement('div');
            if (i == 5) {
                div.className = 'sumValFinal';
            } else {
                div.className = 'sumVal';
            }
            div.id = 'summary' + cont;
            summary[x].appendChild(div);
            cont++
        }
    }
    getValues()
}

function getValues() {
    fetch('dash/getSum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(function (response) {
        response.json().then(json => {
            value = json;
            })
            setTimeout(pushValues, 50);
    })

    fetch('dash/getDadosGeral', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(function (response) {
            response.json().then(json => {
                leitura = json;
            })
        }
    )
}

function pushValues(mes) {
    valueAt = [];
    if (mes == undefined) {
        mes = 0;
    }
    for (let x = 0; x < value.length; x++) {
        let sumVal = document.getElementById(`summary${x}`);
        try {
            sumVal.innerHTML = value[x+mes].valor + "%";
            sumVal.innerHTML += "<div class='sumValDif'></div>"
        }
        catch (e) {break;}
        valueAt.push(value[x+mes].valor);
    }
    checkColor();

    for (let x = 0; x < leitura.length; x++) {
        if (leitura[x].fkMetrica == 1) {
            valoresLeitura.push((leitura[x].valorLeitura*2).toFixed(2));
        } else if (leitura[x].fkMetrica == 3) {
            valoresLeitura.push((leitura[x].valorLeitura/43.5*2).toFixed(2));
        } else if (leitura[x].fkMetrica == 4) {
            valoresLeitura.push((leitura[x].valorLeitura*2).toFixed(2));
        } else if (leitura[x].fkMetrica == 7) {
            valoresLeitura.push((leitura[x].valorLeitura/0.16*2).toFixed(2));
        } else if (leitura[x].fkMetrica == 10) {
            valoresLeitura.push((leitura[x].valorLeitura/0.1*2).toFixed(2));
        } else if (leitura[x].fkMetrica == 11) {
            valoresLeitura.push((leitura[x].valorLeitura/10*2).toFixed(2));
        }
    }

    let total = 0

    for (let x = 1; x <= 8; x++) {
        for (let i = 0; i < 10; i++) {
            total += Number(valoresLeitura[i*x])
        }
        total = (total/10*1.7).toFixed(2)
        dataGraph.push(Number(total))
        total = 0
    }
}

function checkColor() {
    let sumValDif = document.getElementsByClassName('sumValDif');
    for (let x = 0; x < valueAt.length; x++) {
        let sumVal = document.getElementById(`summary${x}`);
        sum = valueAt[x] - valueAt[x-6];
        if (sum > 0) {
            sumVal.style.backgroundColor = '#F5AB9F';
            sumValDif[x].innerHTML = "+"+sum.toFixed(2)+"%";
            sumValDif[x].style.color = 'red';
        } else if (sum < 0) {
            sumVal.style.backgroundColor = '#BCFDA6';
            sumValDif[x].innerHTML = sum.toFixed(2) + "%";
            sumValDif[x].style.color = '#049E00';
        } else {
            sumVal.style.backgroundColor = '#BFBDBD';
        }
    }
}

function changeColor(mes) {
    divs = document.getElementsByClassName('mes');
    div = document.getElementById(mes);
    divStyle = document.getElementsByClassName("summary")
    for (let x = 0; x < divs.length; x++) {
        divs[x].style.backgroundColor = 'rgb(202, 209, 214)';
    }
    dez.style.backgroundColor = 'rgb(202, 209, 214)';
    div.style.backgroundColor = 'aliceblue';
    if (divStyle[0].style.display = 'none' && mes != 'dez') {
        for (let x = 0; x < divStyle.length; x++) {
            divStyle[x].style.display = 'flex';
        }
        chartDisplay.style.display = 'none';
    }
}

function createGraph() {
    container = document.getElementById('containerSum');
    container.className = 'containerGraph';
    container.appendChild(document.createElement('div')).id = 'graph';

    var options = {
        series: [{
        name: 'Performance',
        data: dataGraph
      }],
        chart: {
        height: 450,
        type: 'area',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'date',
        categories: ["01/12/2022", "02/12/2022", "03/12/2022", "04/12/2022", "05/12/2022", "06/12/2022", "07/12/2022", "08/12/2022"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      };

      var chart = new ApexCharts(document.querySelector("#graph"), options);
      chartDisplay = document.getElementById('graph');
      sumX = document.getElementById('containerSum');
      sumX.style.marginLeft = '1.5vw'
      chartDisplay.style.display = 'none';
      chart.render();
}

function showGraph() {
    if (chartDisplay.style.display == 'none') {
        divs = document.getElementsByClassName('summary');
        for (let x = 0; x < divs.length; x++) {
            divs[x].style.display = 'none';
        }
        chartDisplay.style.display = 'block';
    } 
}

function getValuesForGraph() {
    let max = 0
    let min = 100
    let med = 0
    let isCheck = false
    for (let x = 0; x < value.length; x++) {
        if (value[x].valor > max) {
            max = value[x].valor
        }
        if (value[x].valor < min) {
            min = value[x].valor
        }
        med += value[x].valor
        if (x%23==0) {
            med = (med/24).toFixed(0)
            max = max.toFixed(0)
            min = min.toFixed(0)
            max = Number(max)
            min = Number(min)
            med = Number(med)
            data = {
                max: max,
                med: med,
                min: min
            }
            if (isCheck == true) {
                dataForGraph.push(data)
            }
            max = 0
            min = 100
            med = 0
            isCheck = true
        }
    }

    for (let x = 0; x < dataForGraph.length; x++) {
        if (dataForGraph[x].max != undefined) {
            dataMax.push(dataForGraph[x].max)
            dataMed.push(dataForGraph[x].med)
            dataMin.push(dataForGraph[x].min)
        }
    }

    let MaxEsp = 0
    let MedEsp = 0
    let MinEsp = 0
    for (let x = 0; x < dataMax.length; x++) {
        MaxEsp += dataMax[x]
        MedEsp += dataMed[x]
        MinEsp += dataMin[x]
    }
    MaxEsp = (MaxEsp/dataMax.length).toFixed(0)
    MedEsp = (MedEsp/dataMed.length).toFixed(0)
    MinEsp = (MinEsp/dataMin.length).toFixed(0)
    MaxEsp = Number(MaxEsp)
    MedEsp = Number(MedEsp)
    MinEsp = Number(MinEsp)
    dataMax.push(MaxEsp)
    dataMed.push(MedEsp)
    dataMin.push(MinEsp)
}

function createForeGraph() {
    container = document.getElementById('containerForecasting');
    div = document.createElement('div');
    div.id = 'graphForecasting';
    div.className = 'graphForecasting';
    container.appendChild(div);

    var options = {
        series: [{
        name: 'Minima',
        data: dataMin
      }, {
        name: 'Media',
        data: dataMed
      }, {
        name: 'Maxima',
        data: dataMax
      }],
        chart: {
        type: 'bar',
        height: 500
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Esperado Para Esse Mes'],
      },
      yaxis: {
        title: {
          text: 'Performance (%)'
        }
      },
      colors: ['#008FFB', '#00E396', '#FEB019'],
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      }
      };

      var chart = new ApexCharts(document.querySelector("#graphForecasting"), options);
      chart.render();
}

function createKpis() {
    container = document.getElementById('containerKPIS');
    divHorario = document.createElement('div');
    divHorario.className = 'kpi';
    divTextHorario = document.createElement('div');
    divTextHorario.className = 'textKpi';
    divTextHorario.innerHTML = 'Horário de Pico: <br>&nbsp 12:00 - 14:00';
    divHorario.appendChild(divTextHorario);
    container.appendChild(divHorario);

    let max = 0
    let min = 100
    let mesX = 0
    let mesN = 0
    for (let x = 0; x < dataMax.length; x++) {
        if (dataMax[x] > max) {
            max = dataMax[x]
            mesX = x
        }
        if (dataMin[x] < min) {
            min = dataMin[x]
            mesN = x
        }
    }

    divMaxima = document.createElement('div');
    divMaxima.className = 'kpi';
    divTextMaxima = document.createElement('div');
    divTextMaxima.className = 'textKpi';
    divTextMaxima.innerHTML = 'Performance Máxima: <br>&nbsp&nbsp' + max + '% no mês de ' + meses[mesX];
    divMaxima.appendChild(divTextMaxima);
    container.appendChild(divMaxima);

    divMinima = document.createElement('div');
    divMinima.className = 'kpi';
    divTextMinima = document.createElement('div');
    divTextMinima.className = 'textKpi';
    divTextMinima.innerHTML = 'Performance Mínima: <br>&nbsp' + min + '% no mês de ' + meses[mesN];
    divMinima.appendChild(divTextMinima);
    container.appendChild(divMinima);

    

}

createSum();
setTimeout(createGraph, 1000);
setTimeout(createForeGraph, 3000);
setTimeout(getValuesForGraph, 2000);
setTimeout(createKpis,2000)