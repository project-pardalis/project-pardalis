servers = []
serversFiltro = []
listStyle = 1
contFiltro = 1
serverQtd = 0
isFiltro = false
dadosServer = []
document.getElementById("filterSearch").addEventListener("keypress", function (e) {
    if (e.key == 'Enter') {
        filtro = filterSearch.value
        filterSearch.value = ''
        filtrarServers(filtro)
        isFiltro = true
        filters.innerHTML = `<div class="filterSelected">${filtro}<img onclick="cancelFilter(1)" class="filterCancel" src="../../assets/img/x.svg" alt=""></div>`

    }
})
document.getElementById("filterSearch2").addEventListener("keypress", function (e) {
    if (e.key == 'Enter') {
        filtro = filterSearch2.value
        filterSearch2.value = ''
        filtrarServers(filtro)
        isFiltro = false
        filters2.innerHTML = `<div class="filterSelected">${filtro}<img onclick="cancelFilter(2)" class="filterCancel" src="../../assets/img/x.svg" alt=""></div>`
    }
})
function cancelFilter(x) {
    if (x == 1) {
        filters.innerHTML = ''
        serverCont.innerHTML = ''
        serverList.innerHTML = ''
        serversFiltro = []
        isFiltro = false
        montarLista()
    } else if (x == 2) {
        filters2.innerHTML = ''
        serverCont.innerHTML = ''
        serverList.innerHTML = ''
        serversFiltro = []
        isFiltro = false
        montarLista()
    }
}
function mudarFiltro() {
    contFiltro++
    if (contFiltro == 1) {
        sumirFiltros()
        filtroNumerico.style.display = 'block'
        serverCont.innerHTML = ''
        serverList.innerHTML = ''
        if (isFiltro) {
            serversFiltro.sort(mudarOrdem("IdServer"))
            montarListaFiltro()
        } else {
            servers.sort(mudarOrdem("IdServer"))
            montarLista()
        }
    } else if (contFiltro == 2) {
        sumirFiltros()
        filtroAlfa.style.display = 'block'
        serverCont.innerHTML = ''
        serverList.innerHTML = ''
        if (isFiltro) {
            serversFiltro.sort(mudarOrdem("Setor"))
            montarListaFiltro()
        } else {
            servers.sort(mudarOrdem("Setor"))
            montarLista()
        }
    } else if (contFiltro == 3) {
        sumirFiltros()
        filtroGrau.style.display = 'block'
        serverCont.innerHTML = ''
        serverList.innerHTML = ''
        if (isFiltro) {
            serversFiltro.sort(mudarOrdem("cpuTemp"))
            montarListaFiltro()
        } else {
            servers.sort(mudarOrdem("cpuTemp"))
            montarLista()
        }
        contFiltro = 0
    }
}
function mudarOrdem(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
function sumirFiltros() {
    filtroNumerico.style.display = 'none'
    filtroAlfa.style.display = 'none'
    filtroGrau.style.display = 'none'
}
function mostrarLista(x) {
    if (x == 1) {
        serverCont.style.display = 'grid'
        serverList.style.display = 'none'
    } else if (x == 2) {
        serverCont.style.display = 'none'
        serverList.style.display = 'block'
    }
}

function salvarDados(dados) {
    dadosServer = dados;
}

function montarLista(maq) {
    for (let x = 0; x < maq.length; x++) {
        serverCont.innerHTML += `<div id="idServer${maq[x].idMaquina}"  class="server"></div>`
        serverList.innerHTML += `<div class="serverLista">
        <div id="statusServer${maq[x].idMaquina}" class="statusServer position-absolute"></div>
        <img class="serverSvg" src="../assets/img/hdd-stack-fill.svg" alt="">
        <span class="hexLista position-absolute">${maq[x].nomeMaquina}</span>
        <span id=statusLista${maq[x].idMaquina} class="qtdArmazem position-absolute"></span>
        <div id=armazemProgress${maq[x].idMaquina} class="armazemProgress position-absolute"></div>
        <div id="serverArma${maq[x].idMaquina}" class="armazemHas position-absolute"></div>
        <span id="cpuTemperatura${maq[x].idMaquina}" class="cpuTemperatura position-absolute">ºC</span>
        </div>`
    }
    verificarCor(maq)
}

function filtrarServers(filtro) {
    serverCont.innerHTML = ''
    serverList.innerHTML = ''
    for (let x = 0; x < servers.length; x++) {
        if (servers[x].Setor == filtro) {
            serversFiltro.push(servers[x])
        }
    }
    montarListaFiltro()
}
// function montarListaFiltro() {
//     for (let x = 0; x < serversFiltro.length; x++) {
//         serverQtd++
//         setor = serversFiltro[x].Setor
//         serverCont.innerHTML += ` <div id="idServer${x}"  class="server">${setor.slice(0, 1)}</div>`
//         serverList.innerHTML += `<div class="serverLista">
//         <div id="statusServer${x}" href="server_analysys.html" class="statusServer position-absolute"></div>
//         <img class="serverSvg" src="../../assets/img/hdd-stack-fill.svg" alt="">
//         <span class="setorLista position-absolute"><b>${serversFiltro[x].Setor}</b></span>
//         <span class="hexLista position-absolute">${serversFiltro[x].Serial}</span>
//         <span class="qtdArmazem position-absolute">${serversFiltro[x].Armazenamento}GB de 1tb</span>
//         <div class="armazemProgress position-absolute"></div>
//         <div id="serverArma${x}" class="armazemHas position-absolute"></div>
//         <span id="cpuTemperatura${x}" class="cpuTemperatura position-absolute">${serversFiltro[x].cpuTemp}ºC</span>
//         </div>`
//     }
//     verificarCor(serversFiltro)
// }

function verificarCor(servers) {
    normal = '#00FF00'
    alerta = '#FFFF00'
    risco = '#FF0000'
    for (let x = 0; x < servers.length; x++) {
        rand = Math.floor(Math.random() * 100)
        if (rand > 90) {
            document.getElementById(`idServer${servers[x].idMaquina}`).style.backgroundColor = risco
            document.getElementById(`statusServer${servers[x].idMaquina}`).style.backgroundColor = risco
            document.getElementById(`statusLista${servers[x].idMaquina}`).style.backgroundColor = risco
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).style.backgroundColor = risco
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).innerHTML = `${rand}ºC`
        } else if (rand > 70) {
            document.getElementById(`idServer${servers[x].idMaquina}`).style.backgroundColor = alerta
            document.getElementById(`statusServer${servers[x].idMaquina}`).style.backgroundColor = alerta
            document.getElementById(`statusLista${servers[x].idMaquina}`).style.backgroundColor = alerta
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).style.backgroundColor = alerta
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).innerHTML = `${rand}ºC`
        } else {
            document.getElementById(`idServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusServer${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`statusLista${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).style.backgroundColor = normal
            document.getElementById(`cpuTemperatura${servers[x].idMaquina}`).innerHTML = `${rand}ºC`
        }
    }
}