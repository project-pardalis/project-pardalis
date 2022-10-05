var serverCont = document.getElementById('server-cont')
var serverList = document.getElementById('server-list')

function mostrarLista(x) {
    if (x == 1) {
        serverCont.style.display = 'grid'
        serverList.style.display = 'none'
    } else if (x == 2) {
        serverCont.style.display = 'none'
        serverList.style.display = 'block'
    }
}

function obterServidores() {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            empresaServer: nomeEmpresa,
            cnpjServer: cnpjEmpresa,
            adminServer: adminEmpresa,
            emailServer: emailEmpresa,
            senhaServer: senhaAdmin,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            window.location.href = "login.html";
        }
        else {
            console.log("Houve um erro ao tentar realizar o cadastro!");
            resposta.text().then((texto) => {
                console.error(texto);
                error_msg.innerHTML = texto;
                setTimeout(() => {
                    error_msg.innerHTML = '';
                }, 4000);
            })
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}