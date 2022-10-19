var fkEmpresa;
var machines = [];

var possibleIcons = {
    "reload": ["fa-solid", "fa-rotate-right"],
    "name": ["fa-solid", "fa-arrow-up-a-z"],
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

/* Ir para a página de máquina separada */
function trocarPagina(idMaquina) {
    window.location.href = `./server-analysys.html?idMaquina=${idMaquina, fkEmpresa}`;
        window.focus();
}

/* Sai da página */
function sair() {
    sessionStorage.clear();
    window.location.href = "./login.html";
}

/* Modifica a ordem das máquinas baseado no filtro */
function changeOrder(element) {
    let filterElement = element;
    let currentFilter = filterElement.id;
    let keys = Object.keys(possibleIcons);
    let index = keys.indexOf(currentFilter);

    index = index == 3 ? 2 : 3;

    filterElement.id = keys[index];
    
    filterElement.removeAttribute("class");
    filterElement.classList.add("h2");
    filterElement.classList.add("m-0");


    for (let i = 0; i < possibleIcons[keys[index]].length; i++) {
        filterElement.classList.add(possibleIcons[keys[index]][i]);
    }
    let result;
    if (index == 3) result = changeOrderMachine(true)
    else result = changeOrderMachine(false)
    appendMachine(result);
}

/* Modifica o filtro */
function changeFilter(element) {
    let filterElement = element;
    let currentFilter = filterElement.id;
    let keys = Object.keys(possibleIcons);
    let index = keys.indexOf(currentFilter);
    console.log("Filtro antigo: " + currentFilter);
    if (index == keys.length - 1) index = 1;
    else index++;
    
    if (index == 2 || index == 3) index = 4;
    
    filterElement.id = keys[index];
    filter = keys[index];
    console.log("Novo Filtro: " + filter);

    filterElement.removeAttribute("class");
    filterElement.classList.add("h2");
    filterElement.classList.add("m-0");

    for (let i = 0; i < possibleIcons[keys[index]].length; i++) {
        filterElement.classList.add(possibleIcons[keys[index]][i]);
    }

    let newOrder = changeOrderMachine();
    appendMachine(newOrder);
    setChartStateData();
}

/* Escolhe qual função deve ser usada para aquele filtro */
function changeOrderMachine() {
    let orderChoosed = document.getElementById("arrowUp");
    switch (filter) {
        case "name":
            return changeOrderMachineByName(orderChoosed);
            
        default:
            return separateMachines(orderChoosed);
    }
}

/* Ordena as máquinas pelo nome  */
function changeOrderMachineByName(orderChoosed) {
    if (orderChoosed == null) {
        return machines.sort((a, b) => {
            if (a.nomeMaquina > b.nomeMaquina) return 1;
            if (a.nomeMaquina < b.nomeMaquina) return -1;

        });
    } else {
        return machines.sort((a, b) => {
            if (a.nomeMaquina > b.nomeMaquina) return -1;
            if (a.nomeMaquina < b.nomeMaquina) return 1;
        });
    }
}

/* Ordena a máquina baseado no seu filtro  */
function separateMachines(orderChoosed) {
    let separated = machines.filter( (machine) => {
        return machine.lastData[filter] !== undefined;
    });
    let separatedNull = machines.filter( (machine) => {
        return machine.lastData[filter] === undefined;
    });

    separated.sort( (a, b) => {
        if (orderChoosed == null) return parseFloat(a.lastData[filter].valorLeitura) - parseFloat(b.lastData[filter].valorLeitura);
        else return parseFloat(b.lastData[filter].valorLeitura) - parseFloat(a.lastData[filter].valorLeitura);
    });

    for (let i = 0; i < separatedNull.length; i++) {
        separated.push(separatedNull[i]);
    }
    return separated;
}

/* Recarrega as máquinas */
async function reloadMachine() {
    console.log("Atualizando maquinas...");
    start();
}

/* Adiciona Servidor */
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
        element.classList.add("h5");
        element.title = maq[i].nomeMaquina;
        element.innerHTML = maq[i].nomeMaquina[0].toUpperCase();
        element.id = `idServer${maq[i].idMaquina}`;
        console.log(maq[i].idMaquina);
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

/* Modifica a cor do element */
function verificarCor(server, element) {
    let filterResponse = filterSummary(element, server);
    let summary = filterResponse.summary;
    element = filterResponse.element;

    if (filter == "name") return element;
    else if (server.lastData[filter] > summary.max) {
        /* VERMELHO */
        element.style.backgroundColor = colors.risco;
    } else if (server.lastData[filter] > summary.q3) {
        element.style.backgroundColor = colors.alerta;
    } else if (server.lastData[filter] == null) {
        element.style.backgroundColor = colors.nenhum;
        
    } else {
        element.style.backgroundColor = colors.normal;
    }
    return element
}

/* Pegar o summary baseado no filtro atual */
function filterSummary(element, server) {
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
    return {
        "summary": summary,
        "element": element
    }
}

/* Faz o summary */
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

function mostrarLista(num) {
    if (num == 1) {
        document.getElementById("wide-server-list").style.display = "block";
        document.getElementById("info-server-list").style.display = "none";
    } else {
        document.getElementById("wide-server-list").style.display = "none";
        document.getElementById("info-server-list").style.display = "block";
    }
    
}
/* Inicialização */
async function start() {
    getParams();
    machines = await getMachine();
    console.log(machines)
    setChartStateData();
    let result = changeOrderMachine(true)
    appendMachine(result);
}

start();
