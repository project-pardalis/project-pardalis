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
    "nenhum": "#aa98ed"
}

/* Pegar dados da empresa */
function getParams() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    if (fkEmpresa == undefined) {
        window.location.href = "../login.html";
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

function appendMachineDataBase() {
    let machineName, hash;
    swal.fire({
        title: "Adicione o nome da máquina",
        html: `<input type="text" id="machineNameInput" class="swal2-input w-75" placeholder="Nome da máquina" pattern=".{,50}">
        <input type="text" id="hashMachine" class="swal2-input w-75" placeholder="Mac Address da máquina" pattern=".{,12}">`,
        showCancelButton: true,
        confirmButtonText: 'Adicionar',
        preConfirm: (inputResult) => {
            machineName = machineNameInput.value;
            hash = hashMachine.value.replaceAll(":", "").toUpperCase();
        }

    }).then(async (result) => {
        console.log(machineName)
        console.log(hash)

        if (machineName === undefined || hash === undefined) return;

        if (result.isConfirmed) {
            let response = await (await fetch("/maquina/appendMaquina", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "fkEmpresa": fkEmpresa,
                    "nomeMaquina": machineName,
                    "hashMaquina": hash
                })
            })).json();
            response.hash = hash
            console.log(response.hash)

            if (response.hash) {
                swal.fire(
                    {
                        title: "Máquina adicionada com sucesso!",
                        text: "Agora você pode começar a obter os dados da máquina",
                        icon: "success",
                        confirmButtonText: "Continuar"
                    }
                ).then((confirmed) => {
                    if (confirmed.isConfirmed) {
                        reloadMachine();
                    }

                })
            } else {
                swal.fire(
                    {
                        title: "Não foi possível adicionar a sua máquina",
                        text: "Chame o nosso suporte",
                        icon: "error",
                        confirmButtonText: "Continuar"
                    }
                )
            }
        }
    });

}

/* Ir para a página de máquina separada */
function trocarPagina(idMaquina) {
    window.location.href = `./server-analysys.html?idMaquina=${idMaquina}`;
    console.log(window.location.href)
    //window.focus();
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
    let separated = machines.filter((machine) => {
        return machine.lastData[filter] !== undefined;
    });
    let separatedNull = machines.filter((machine) => {
        return machine.lastData[filter] === undefined;
    });

    separated.sort((a, b) => {
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
    let wideServerList = document.getElementById("wide-server-list");
    let infoServerList = document.getElementById("info-server-list");
    wideServerList.innerHTML = "";
    infoServerList.innerHTML = "";
    start();
}

/* Adiciona Servidor */
async function appendMachine(maq) {
    let wideServerList = document.getElementById("wide-server-list");
    let infoServerList = document.getElementById("info-server-list");
    wideServerList.innerHTML = "";
    //infoServerList.innerHTML = "";
    for (let i = 0; i < maq.length; i++) {
        wideServerList.appendChild(createWideServer(maq[i]));
        infoServerList.appendChild(await createInfoServer(maq[i]));
        /* serverList.innerHTML += `` */
    }
    //verificarCor(maq)
}

function createWideServer(maq) {
    let element = document.createElement("div");
    element.classList.add("server")
    element.classList.add("card")
    element.classList.add("ms-1")
    element.classList.add("fw-bold")
    element.classList.add("h5");
    element.title = maq.nomeMaquina;
    element.innerHTML = maq.nomeMaquina[0].toUpperCase();
    element.id = `idServer${maq.idMaquina}`;
    element.onclick = () => trocarPagina(maq.idMaquina);
    element = verificarCor(maq, element);

    return element;
}

async function createInfoServer(maq) {
    let element = document.createElement("div");

    element.classList.add("d-flex", "px-2", "flex-row", "server-background")
    let diskInfo = await verifyColorInfoDisk(maq);

    let diskText, diskColor, diskMax = "???", diskUsage = "???", diskPercentage, diskDate = "???", diskTitle;
    let temperatureColor, temperatureText = "??°C";
    if (diskInfo === "???") diskText = "???";
    else {
        let dateTime = moment(new Date(maq.lastData.disco_Usado.dataColeta));
        dateTime.locale('pt-br');
        diskDate = dateTime.calendar('');
        diskTitle = dateTime.format('[Última atualização obtida:] Do MMMM YYYY, hh:mm:ss a');
        diskColor = diskInfo.color;
        diskMax = diskInfo.max.valorLeitura;
        diskUsage = maq.lastData.disco_Usado.valorLeitura;
        diskText = `<span>${diskUsage}`;
        diskPercentage = (diskUsage / diskMax) * 100;
        temperatureColor = verifiyColorInfoCpuTemperature(maq).color;
        if (temperatureColor !== null) temperatureText = maq.lastData.cpu_Temperature.valorLeitura + "°C";
    }



    element.innerHTML = `
        <div class="w-auto d-flex justify-content-center align-items-center">
                <img class="server-svg" src="../assets/img/hdd-stack-fill.svg" alt="">
              </div>
              <div class="ms-2 mt-1 d-flex w-100 justify-content-between px-2 py-2">
                
                <div class="d-flex flex-column align-items-start">
                  <span class="h5 fw-semibold m-0">${maq.nomeMaquina}</span>
                <span class="fw-light m-0" title="${diskTitle}">${diskDate}</span>
                </div>
                <div class="w-25 d-flex align-items-end flex-column">
                  <span class="h5 fw-light" style="${temperatureColor}">${temperatureText}</span>
                  <span class="h5 fw-light" id="disk-element"><span style="${diskColor}">${diskUsage}</span> / ${diskMax} Gb</span>
                  <div class="w-100 disk-background">
                    <div class="disk-usage h-100" style="width:${diskPercentage}%"></div>
                  </div>
                </div>
              </div>`;
    return element;
}

function verifiyColorInfoCpuTemperature(maq) {
    let color;

    let summary = filterSummary(null, maq, "cpu_Temperature").summary
    
    if (maq.lastData.cpu_Temperature.valorLeitura > summary.max) color = colors.risco;
    if (maq.lastData.cpu_Temperature.valorLeitura > summary.q3) color = colors.alerta;
    if (maq.lastData.cpu_Temperature.valorLeitura == '-500.00') color = colors.nenhum;
    else color = colors.normal;

    return `color: ${color}`;
}

function verifyColorInfoDisk(maq) {
    let color;
    let summary = filterSummary(null, maq, "disco_Usado").summary

    if (maq.lastData.disco_Usado === undefined) return '???';
    if (maq.lastData.disco_Usado.valorLeitura > summary.max) color = colors.risco;
    if (maq.lastData.disco_Usado.valorLeitura > summary.q3) color = colors.alerta;
    else color = colors.normal;

    return {
        color: `color: ${color}`,
        max: summary.max,
        atual: maq.lastData.disco_Usado.valorLeitura
    }
}

/* Modifica a cor do element */
function verificarCor(server, element) {
    let filterResponse = filterSummary(element, server);
    let summary = filterResponse.summary;
    element = filterResponse.element;
    let color = colors.nenhum;
    console.log()

    if (filter == "name") return element;
    else if (server.lastData.estatico.length == 0 || (server.lastData.cpu_Temperature.valorLeitura == "-500.00" && filter == "cpu_Temperature")) {
        color = colors.nenhum;
    } else if (server.lastData[filter] > summary.max) {
        color = colors.risco;
    } else if (server.lastData[filter] > summary.q3) {
        color = colors.alerta;
    } else {
        color = colors.normal;
    }
    
    element.style.backgroundColor = color;
    return element;
}

/* Pegar o summary baseado no filtro atual */
function filterSummary(element, server, newFilter = null) {
    if (newFilter == null) newFilter = filter;
    let summary;
    switch (newFilter) {
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
    /* setInterval(reloadMachine(), 10000); */
}

start();


