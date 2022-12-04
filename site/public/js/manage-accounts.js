async function getAllUserInfo() {
    let response = await fetch(`http://localhost:3000/usuarios/getAllUser/${sessionStorage.FK_EMPRESA}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data = await response.json();
    console.log(data)
    return data;
}

async function visualizarUsuario() {
    let data = await getAllUserInfo()
    data.forEach(
        (user) => {

            let trElement = document.createElement('tr');
            trElement.innerHTML = `
            <td>${user.nomeUsuario}</td>
            <td>${user.cargo == null ? 'Indefinido' : user.cargo}</td>
            <td>${user.emailUsuario}</td>
            `;
            trElement.onclick = () => {
                updateUser(user.idUsuario, user.nomeUsuario, user.emailUsuario, user.cargo);
            }
            document.getElementById('usuarios-table').appendChild(trElement);
        }
    )
}

function updateUser(userId, userName, userEmail, userCargo) {
    swal.fire({
        title: "Atualizar Usuário",
        html: `
        <div class="form-group d-flex align-items-center">
            <label for="ipt-nome" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Nome:</label>
            <input type="text" class="form-control w-50 ms-2" id="ipt-nome" placeholder="Nome" value="${userName}">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-email" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Email:</label>
            <input type="email" class="form-control w-50 ms-2" id="ipt-email" placeholder="Email" value="${userEmail}">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-cargo" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Cargo:</label>
            <input type="text" class="form-control w-50 ms-2" id="ipt-cargo" placeholder="Cargo" value="${userCargo}">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">   
            <label for="ipt-senha" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Senha:</label>
            <input type="password" class="form-control w-50 ms-2" id="ipt-senha" placeholder="Senha">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-confirmar-senha" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Confirmar Senha:</label>
            <input type="password" class="form-control w-50 ms-2" id="ipt-confirmar-senha" placeholder="Confirmar Senha">
        </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Atualizar",
        cancelButtonText: "Cancelar",
        denyButtonText: "Excluir",
        showLoaderOnConfirm: true,
        showDenyButton: true,
    }).then(async (result) => {

        if (result.isDenied) {
            deleteAccount(userId);
        } else {
            let checker = checkIfIsFull(
                document.getElementById('ipt-nome').value,
                document.getElementById('ipt-email').value,
                document.getElementById('ipt-senha').value,
                document.getElementById('ipt-confirmar-senha').value,
                document.getElementById('ipt-cargo').value
            )
            if (checker) {
                let senha, cargo;
                if (document.getElementById('ipt-senha').value == "") senha = undefined;
                else senha = document.getElementById('ipt-senha').value;

                if (document.getElementById('ipt-cargo').value == "") cargo = 'Indefinido';
                else cargo = document.getElementById('ipt-cargo').value;

                return await updateAccount(
                    {
                        idUsuario: userId,
                        userName: document.getElementById('ipt-nome').value,
                        userEmail: document.getElementById('ipt-email').value,
                        userPassword: senha,
                        userCargo: cargo
                    }
                )
            } else {
                swal.alert({
                    title: "Erro",
                    text: checker,
                    icon: "error"

                })
            }
        }

    })
}

function deleteAccount(userId) {
    swal.fire(
        {
            title: "Excluir Usuário",
            text: "Tem certeza que deseja excluir este usuário?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
        }
    ).then(
        async (result) => {
            if (result.isConfirmed) {
                let res = await fetch(`http://localhost:3000/usuarios/deletarUsuario`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idUsuario: userId
                    })
                });
                if (res.status == 200) {
                    swal.fire({
                        title: "Sucesso",
                        text: "Usuário excluído com sucesso!",
                        icon: "success"
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } else {
                    swal.fire({
                        title: "Erro",
                        text: "Erro ao excluir usuário!",
                        icon: "error"
                    })
                }

            }
        }
    )
}

function checkIfIsFull(nomeUsuario, emailUsuario, senhaUsuario, confirmarSenha, cargoUsuario) {

    if ((senhaUsuario == "" && confirmarSenha != "")) {
        return "Preencha a senha!";
    } else if ((senhaUsuario != "" && confirmarSenha == "")) {
        return "Preencha a confirmação da senha!";
    } else if (nomeUsuario != "" && emailUsuario != "" && cargoUsuario != "") {
        return true;
    } else if (nomeUsuario == "" || emailUsuario == "" || cargoUsuario == "" || (senhaUsuario != "" && confirmarSenha == "")) {
        return "Preencha todos os campos";
    } else if (senhaUsuario != confirmarSenha) {
        return "As senhas não são iguais";
    } else {
        return "Erro desconhecido";
    }
}

async function updateAccount(data) {

    let res = await fetch(`http://localhost:3000/usuarios/atualizar/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ID_USUARIO: data.idUsuario,
            NOME_USUARIO: data.userName,
            EMAIL_USUARIO: data.userEmail,
            CARGO_USUARIO: data.userCargo,
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
                window.location.reload();
            }
        });
    }
}

function appendUser() {
    swal.fire({
        title: "Adicionar Usuário",
        html: `
        <div class="form-group d-flex align-items-center">
            <label for="ipt-nome" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Nome:</label>
            <input type="text" class="form-control w-50 ms-2" id="ipt-nome" placeholder="Nome">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-email" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Email:</label>
            <input type="email" class="form-control w-50 ms-2" id="ipt-email" placeholder="Email">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-cargo" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Cargo:</label>
            <input type="text" class="form-control w-50 ms-2" id="ipt-cargo" placeholder="Cargo">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">   
            <label for="ipt-senha" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Senha:</label>
            <input type="password" class="form-control w-50 ms-2" id="ipt-senha" placeholder="Senha">
        </div>
        <div class="form-group  d-flex align-items-center mt-2">
            <label for="ipt-confirmar-senha" style="width: fit-content !important; height: fit-content; white-space: nowrap;">Confirmar Senha:</label>
            <input type="password" class="form-control w-50 ms-2" id="ipt-confirmar-senha" placeholder="Confirmar Senha">
        </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Adicionar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            let checker = checkIfIsFull(
                document.getElementById('ipt-nome').value,
                document.getElementById('ipt-email').value,
                document.getElementById('ipt-senha').value,
                document.getElementById('ipt-confirmar-senha').value,
                document.getElementById('ipt-cargo').value
            )
            if (checker) {
                return await addAccount(
                    {
                        userName: document.getElementById('ipt-nome').value,
                        userEmail: document.getElementById('ipt-email').value,
                        userPassword: document.getElementById('ipt-senha').value,
                        userCargo: document.getElementById('ipt-cargo').value
                    }
                )
            }
            else {
                swal.alert({
                    title: "Erro",
                    text: checker,
                    icon: "error"

                })
            }
        }
    })
}

async function addAccount(data) {
    let res = await fetch(`http://localhost:3000/usuarios/cadastrarFuncionario/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            NOME_USUARIO: data.userName,
            EMAIL_USUARIO: data.userEmail,
            CARGO_USUARIO: data.userCargo,
            SENHA_USUARIO: data.userPassword,
            FK_EMPRESA: sessionStorage.FK_EMPRESA
        }),
    })

    if (res.status == 200) {
        swal.fire({
            title: "Sucesso!",
            text: "Usuário adicionado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    } else {
        swal.fire({
            title: "Erro!",
            text: "Erro ao adicionar usuário!",
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}



if (sessionStorage.FK_ADMINISTRADOR !== 'null') {
    window.location.href = "/dashboard.html";
}
visualizarUsuario();

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}