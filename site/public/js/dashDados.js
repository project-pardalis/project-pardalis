var fkEmpresa;
var machines = [];
var filtroPossiveis = [
    "cpu_Temperature",
    "cpu_Utilizacao",
    "ram_Usada",
    "disco_Usado",
];
let colors = {
    "normal": "#00FF00",
    "alerta": "#FFFF00",
    "risco": "#FF0000",
}

/* Pegar dados da empresa */
function getParams() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    if (fkEmpresa == undefined) {
        windows.location.href = "./login.html";
    }
}

/* Pegar dados da Maquina */
async function getMachine() {
    let response = await (await fetch("/dash/getMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa
        })
    })).json();
    let maquinas = response.maquinas;
    return maquinas;
}

/* Event Clicks */

function trocarPagina(idMaquina) {
    window.location.href = `./server-analysys.html?idMaquina=${idMaquina, fkEmpresa}`;
        window.focus();
}

function sair() {
    sessionStorage.clear();
    window.location.href = "./login.html";
}

function wideMode() {

}

/* Inicialização */

/* Adicionar Servidor */
function appendMachine(maq) {
    let wideServerList = document.getElementById("wide-server-list");
    let infoServerList = document.getElementById("info-server-list");
    for (let i = 0; i < maq.length; i++) {
        wideServerList.innerHTML += `<div id="idServer${maq[i].idMaquina}"  class="server"></div>`
        /* serverList.innerHTML += `<div class="serverLista">
        <div id="statusServer${maq[i].idMaquina}" class="statusServer position-absolute"></div>
        <img class="serverSvg" src="../assets/img/hdd-stack-fill.svg" alt="">
        <span class="heiLista position-absolute">${maq[i].nomeMaquina}</span>
        <span id=statusLista${maq[i].idMaquina} class="qtdArmazem position-absolute"></span>
        <div id=armazemProgress${maq[i].idMaquina} class="armazemProgress position-absolute"></div>
        <div id="serverArma${maq[i].idMaquina}" class="armazemHas position-absolute"></div>
        <span id="cpuTemperatura${maq[i].idMaquina}" class="cpuTemperatura position-absolute">ºC</span>
        </div>` */
    }
    //verificarCor(maq)
}

function verificarCor(server) {
    let summary;
    switch (filtro) {
        case "cpu_Temperature":
            summary = getSummary(0, 100);
            break;
        case "cpu_Utilizacao":
            summary = getSummary(0, 100);
            break;
        case "ram_Usada":
            let ramTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
            summary = getSummary(0, ramTotalData);
            break;
        case "disco_Usado":
            let discoTotalData = metricas.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0];
            summary = getSummary(0, discoTotalData);
            break;
    }
    if (server.lastData[filtro] > summary.max) {
        /* VERMELHO */
    } else if (server.lastData[filtro] > summary.q3) {
        /* AMARELO */
    } else {
        /* VERDE */
        /* document.getElementById(`idServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusLista${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).innerHTML = `${rand}ºC` */
    }
}

function getSummary(min, max) {
    let mediana = (min + max) / 2;
    let q1 = (min + mediana) / 2;
    let q3 = (max + mediana) / 2;
    return {
        "q1": q1,
        "q3": q3,
        "max": max,
    }
} 

/* Inicialização */
async function start() {
    getParams();
    machines = await getMachine();
    console.log(machines)
    appendMachine(machines);
}

start();
