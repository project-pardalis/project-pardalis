servers = []
serversFiltro = []
listStyle = 1
contFiltro = 1
serverQtd = 0
isFiltro = false
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
function gerarServers() {
    setores = ["Alpha", "Bravo", "Charlie", "Delta"]
    z = Math.floor(Math.random() * (250 - 50)) + 50
    for (let x = 0; x < z; x++) {
        var length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            hexkey = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            hexkey += charset.charAt(Math.floor(Math.random() * n));
        }
        cpuTemp = Math.floor(Math.random() * (100 - 40)) + 40
        armazem = Math.floor(Math.random() * (1000 - 200)) + 200
        setorR = Math.floor(Math.random() * 4)
        servers.push({
            "IdServer": x,
            "Setor": setores[setorR],
            "Serial": hexkey,
            "cpuTemp": cpuTemp,
            "Armazenamento": armazem
        })
    }
    montarLista(1)
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
function montarLista() {
    for (let x = 0; x < servers.length; x++) {
        serverQtd++
        setor = servers[x].Setor
        serverCont.innerHTML += `<div id="idServer${x}"  class="server">${setor.slice(0, 1)}</div>`
        serverList.innerHTML += `<div class="serverLista">
        <div id="statusServer${x}" class="statusServer position-absolute"></div>
        <img class="serverSvg" src="../assets/img/hdd-stack-fill.svg" alt="">
        <span class="setorLista position-absolute"><b>${servers[x].Setor}</b></span>
        <span class="hexLista position-absolute">${servers[x].Serial}</span>
        <span class="qtdArmazem position-absolute">${servers[x].Armazenamento}GB de 1tb</span>
        <div class="armazemProgress position-absolute"></div>
        <div id="serverArma${x}" class="armazemHas position-absolute"></div>
        <span id="cpuTemperatura${x}" class="cpuTemperatura position-absolute">${servers[x].cpuTemp}ºC</span>
        </div>`
    }
    verificarCor(servers)
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
function montarListaFiltro() {
    for (let x = 0; x < serversFiltro.length; x++) {
        serverQtd++
        setor = serversFiltro[x].Setor
        serverCont.innerHTML += ` <div id="idServer${x}"  class="server">${setor.slice(0, 1)}</div>`
        serverList.innerHTML += `<div class="serverLista">
        <div id="statusServer${x}" href="server_analysys.html" class="statusServer position-absolute"></div>
        <img class="serverSvg" src="../../assets/img/hdd-stack-fill.svg" alt="">
        <span class="setorLista position-absolute"><b>${serversFiltro[x].Setor}</b></span>
        <span class="hexLista position-absolute">${serversFiltro[x].Serial}</span>
        <span class="qtdArmazem position-absolute">${serversFiltro[x].Armazenamento}GB de 1tb</span>
        <div class="armazemProgress position-absolute"></div>
        <div id="serverArma${x}" class="armazemHas position-absolute"></div>
        <span id="cpuTemperatura${x}" class="cpuTemperatura position-absolute">${serversFiltro[x].cpuTemp}ºC</span>
        </div>`
    }
    verificarCor(serversFiltro)
}

function verificarCor(filtro) {
    normal = '#00FF00'
    alerta = '#FFFF00'
    risco = '#FF0000'
    for (let x = 0; x < serverQtd; x++) {
        if (filtro[x].cpuTemp > 95 || filtro[x].Armazenamento > 950) {
            document.getElementById(`idServer${x}`).style.backgroundColor = risco
        } else if (filtro[x].cpuTemp > 85 || filtro[x].Armazenamento > 800) {
            document.getElementById(`idServer${x}`).style.backgroundColor = alerta
        } else {
            document.getElementById(`idServer${x}`).style.backgroundColor = normal
        }
    }
    for (let x = 0; x < serverQtd; x++) {
        if (filtro[x].cpuTemp >= 95 || filtro[x].Armazenamento > 950) {
            document.getElementById(`statusServer${x}`).style.backgroundColor = risco
        } else if (filtro[x].cpuTemp >= 85 || filtro[x].Armazenamento > 800) {
            document.getElementById(`statusServer${x}`).style.backgroundColor = alerta
        } else if (filtro[x].cpuTemp < 85 && filtro[x].Armazenamento < 800) {
            document.getElementById(`statusServer${x}`).style.backgroundColor = normal
        }
        if (filtro[x].cpuTemp >= 95) {
            document.getElementById(`cpuTemperatura${x}`).style.color = risco
        } else if (filtro[x].cpuTemp >= 85) {
            document.getElementById(`cpuTemperatura${x}`).style.color = alerta
        }
        if (filtro[x].Armazenamento > 950) {
            document.getElementById(`serverArma${x}`).style.backgroundColor = risco
        } else if (filtro[x].Armazenamento > 800) {
            document.getElementById(`serverArma${x}`).style.backgroundColor = alerta
        } else if (filtro[x].Armazenamento < 800) {
            document.getElementById(`serverArma${x}`).style.backgroundColor = normal
        }
        document.getElementById(`serverArma${x}`).style.width = `${servers[x].Armazenamento / 50}vw`
    }
    serverQtd = 0




}