var fkEmpresa;
var machines = [];
var filtroPossiveis = [
    "name",
    "cpu_Temperature",
    "cpu_Utilizacao",
    "ram_Usada",
    "disco_Usado",
];

var possibleIcons = {
    "reload": ["fa-solid", "fa-rotate-right"],
    "crescent": ["fa-solid", "fa-arrow-up-a-z"],
    "arrowUp": ["fa-solid", "fa-arrow-up"],
    "arrowDown": ["fa-solid", "fa-arrow-down"],
    "cpu_Utilizacao": ["fa-solid", "fa-microchip"],
    "cpu_Temperature": ["fa-solid", "fa-thermometer-three-quarters"],
    "ram_Usada": ["fa-solid", "fa-memory"],
    "disco_Usado": ["fa-solid", "fa-hard-drive"],    
}
var filter = "name";
let colors = {
    "normal": "#00FF00",
    "alerta": "#FFFF00",
    "risco": "#FF0000",
    "nenhum": "#808080"
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

function changeOrder (element) {
    let filterElement = element;
    let currentFilter = filterElement.id;
    let keys = Object.keys(possibleIcons);
    let index = keys.indexOf(currentFilter);

    index = index == 4 ? 3 : 4;

    filterElement.id = keys[index];
    
    filterElement.removeAttribute("class");
    filterElement.classList.add("h2");
    filterElement.classList.add("ms-1");
    filterElement.classList.add("m-0");


    for (let i = 0; i < possibleIcons[keys[index]].length; i++) {
        filterElement.classList.add(possibleIcons[keys[index]][i]);
    }
    let result;
    if (index == 3) result = changeOrderMachine(true)
    else result = changeOrderMachine(false)
    appendMachine(result);
}

function changeOrderMachine(crescent = true) {
    let newOrder;
    if (crescent) {
        newOrder = machines.sort((a, b) => {
            if (a.nomeMaquina > b.nomeMaquina) return 1;
            if (a.nomeMaquina < b.nomeMaquina) return -1;

        });
    } else {
        newOrder = machines.sort((a, b) => {
            if (a.nomeMaquina > b.nomeMaquina) return -1;
            if (a.nomeMaquina < b.nomeMaquina) return 1;
        });
    }
    return newOrder;
}

function changeFilter(element) {
    let filterElement = element;
    let currentFilter = filterElement.id;
    let keys = Object.keys(possibleIcons);
    let index = keys.indexOf(currentFilter);
    if (index == keys.length - 1) index = 1;
    else index++;
    
    if (index == 2 || index == 3) index = 4;
    
    filterElement.id = keys[index];
    filter = keys[index];

    filterElement.removeAttribute("class");
    filterElement.classList.add("h2");
    filterElement.classList.add("m-0");

    for (let i = 0; i < possibleIcons[keys[index]].length; i++) {
        filterElement.classList.add(possibleIcons[keys[index]][i]);
    }

    console.log("Old order:");
    console.log(machines);
    console.log("New order:");
    let newOrder = changeFilterMachine();
    console.log(newOrder)
    appendMachine(newOrder);
}

/* Erro aqui no sort quando não a utilização é undefined */
function changeFilterMachine() {
    console.log("Filtro: " + filter);
    switch (filter) {
        case "name":
            let orderChoosed = document.getElementById("crescent");
            if (orderChoosed == null) return changeOrderMachine(true);
            else return changeOrderMachine(false);

        case "cpu_Temperature":
            return machines.sort((a, b) => {
                return parseFloat(a.lastData.cpu_Temperature.valorLeitura) - parseFloat(b.lastData.cpu_Temperature.valorLeitura);
            });
        case "cpu_Utilizacao":
            return machines.sort((a, b) => {
                if (a.lastData.cpu_Utilizacao == undefined) return 0 - b.lastData.cpu_Utilizacao;
                else if (b.lastData.cpu_Utilizacao == undefined) return a.lastData.cpu_Utilizacao.valorLeitura - 0;
                return parseFloat(a.lastData.cpu_Utilizacao.valorLeitura) - parseFloat(b.lastData.cpu_Utilizacao.valorLeitura);
            });
        case "ram_Usada":
            return machines.sort((a, b) => {
                return parseFloat(a.lastData.ram_Usada.valorLeitura) - parseFloat(b.lastData.ram_Usada.valorLeitura);
            });
        case "disco_Usado":
            return machines.sort((a, b) => {
                return parseFloat(a.lastData.disco_Usado.valorLeitura) - parseFloat(b.lastData.disco_Usado.valorLeitura);
            });
    }
}

async function reloadMachine() {
    console.log("Atualizando maquinas...");
    start();
}

/* Inicialização */

/* Adicionar Servidor */
function appendMachine(maq) {
    let wideServerList = document.getElementById("wide-server-list");
    let infoServerList = document.getElementById("info-server-list");
    wideServerList.innerHTML = "";
    //infoServerList.innerHTML = "";
    for (let i = 0; i < maq.length; i++) {
        let element = document.createElement("div");
        element.classList.add("server")
        element.classList.add("card")
        element.classList.add("ms-1")
        element.classList.add("fw-bold")
        element.innerHTML = maq[i].nomeMaquina[0].toUpperCase();
        element.id = `idServer${maq[i].idMaquina}`;
        element.onclick = () => trocarPagina(maq[i].idMaquina);
        element = verificarCor(maq[i], element);
        wideServerList.appendChild(element);
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

function verificarCor(server, element) {
    let summary;
    switch (filter) {
        case "name":
            element.style.backgroundColor = colors.nenhum
            break;
        case "cpu_Temperature":
            summary = getSummary(0, 100);
            break;
        case "cpu_Utilizacao":
            summary = getSummary(0, 100);
            break;
        case "ram_Usada":
            let ramTotalData = server.lastData.estatico.filter((metrica) => metrica.nomeMetrica == "ram_Total")[0];
            summary = getSummary(0, ramTotalData);
            break;
        case "disco_Usado":
            let discoTotalData = server.lastData.estatico.filter((metrica) => metrica.nomeMetrica == "disco_Total")[0];
            summary = getSummary(0, discoTotalData);
            break;
    }

    if (filter == "name") return element;
     else if (server.lastData[filter] > summary.max) {
        /* VERMELHO */
        element.style.backgroundColor = colors.risco;
    } else if (server.lastData[filter] > summary.q3) {
        element.style.backgroundColor = colors.alerta;
    } else if (server.lastData[filter] == null) {
        element.style.backgroundColor = colors.nenhum;
        /* document.getElementById(`idServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusLista${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).innerHTML = `${rand}ºC` */
    } else {
        element.style.backgroundColor = colors.normal;
    }
    return element
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
    let result = changeOrderMachine(true)
    appendMachine(result);
}

start();
