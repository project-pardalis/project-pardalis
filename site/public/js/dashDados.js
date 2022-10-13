function pegarMaquinas() {
    fetch("/dash/getMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: sessionStorage.ID_USUARIO
    }).then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                maquinas = json
                montarLista(maquinas)
            });
        }
    })
}

function pegarComponente() {
    fetch("/dash/getComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: ''
    }).then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                componentes = json
            })
        }
    })
}

function pegarDados() {
    fetch('/dash/getDados', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: ''
    }).then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                dados = json
                salvarDados(dados)
            })
        }
    })
}

function trocarPagina(idMaquina, fkEmpresa) {
    window.location.href = `./server-analysys.html?idMaquina=${idMaquina, fkEmpresa}`;
        window.focus();
}

pegarMaquinas()
pegarComponente()
pegarDados()