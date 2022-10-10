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

pegarMaquinas()
pegarComponente()
pegarDados()