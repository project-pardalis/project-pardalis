
if (sessionStorage.ID_USUARIO == undefined) {
    window.location.href = "./index.html";
}

function logout() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}

function changeName() {
    console.log(document.getElementById("ipt-nome").style.display)
    if (document.getElementById("ipt-nome").style.display == "none") {
        document.getElementById("ipt-nome").value = document.getElementById("nome-usuario").innerHTML;
        document.getElementById("ipt-nome").style.display = "block";
        document.getElementById("nome-usuario").style.display = "none";
        
    } else {
        document.getElementById("ipt-nome").value = "";
        document.getElementById("ipt-nome").style.display = "none";
        document.getElementById("nome-usuario").style.display = "block";
    }
}

function changeEmail() {
    if (document.getElementById("ipt-email").style.display == "none") {
        document.getElementById("ipt-email").value = document.getElementById("email-usuario").innerHTML;
        document.getElementById("ipt-email").style.display = "block";
        document.getElementById("email-usuario").style.display = "none";
    } else {
        document.getElementById("ipt-email").value = "";
        document.getElementById("ipt-email").style.display = "none";
        document.getElementById("email-usuario").style.display = "block";
    }
}

async function getUserInfo() {
    let response = await fetch(`http://localhost:3000/usuarios/getInfo/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data = await response.json();
    return data;
}

async function updateUserInfo() {
    let data = await getUserInfo();
    data = data[0];
    document.getElementById("nome-usuario").innerHTML = data.nomeUsuario;
    document.getElementById("ipt-nome").value = data.nomeUsuario;
    document.getElementById("ipt-email").value = data.emailUsuario;
    document.getElementById("email-usuario").innerHTML = data.emailUsuario;
}

function confirmClick() {
    if (checkIfIsFull() == true) {
        swal.fire({
            title: "Tem certeza?",
            text: "Os dados da sua conta irá atualizar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Atualizar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                updateAccount();
            }
        });
    } else {
        swal.fire({
            title: "Erro!",
            text: checkIfIsFull(),
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
    
}

function checkIfIsFull() {
    let nomeUsuario = document.getElementById("ipt-nome").value;
    let emailUsuario = document.getElementById("ipt-email").value;
    let senhaUsuario = document.getElementById("ipt-passwd").value;
    let confirmarSenha = document.getElementById("ipt-confirm-passwd").value;

    if ((senhaUsuario == "" && confirmarSenha != "")) {
        return "Preencha a senha!";
    } else if ((senhaUsuario != "" && confirmarSenha == "")) {
        return "Preencha a confirmação da senha!";
    } else if (nomeUsuario != "" && emailUsuario != "") {
        return true;
    } else if (nomeUsuario == "" || emailUsuario == "" || (senhaUsuario != "" && confirmarSenha == "")) {
        return "Preencha todos os campos";
    } else if (senhaUsuario != confirmarSenha) {
        return "As senhas não são iguais";
    } else {
        return "Erro desconhecido";
    }
}

async function updateAccount() {
        let data = {
            idUsuario: sessionStorage.ID_USUARIO,
            userName: document.getElementById("ipt-nome").value,
            userEmail: document.getElementById("ipt-email").value,
            userPassword: document.getElementById("ipt-passwd").value
        };
        console.log(data)
        let res = await fetch(`http://localhost:3000/usuarios/atualizar/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_USUARIO: data.idUsuario,
                NOME_USUARIO: data.userName,
                EMAIL_USUARIO: data.userEmail,
                SENHA_USUARIO: data.userPassword,
            }),
        })
        if (res.status == 200) {
            swal.fire({
                title: "Sucesso!",
                text: "Dados atualizados com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "./edit-account.html";
                }
            });
        }
}

updateUserInfo();