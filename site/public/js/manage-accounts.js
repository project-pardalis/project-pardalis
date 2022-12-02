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
            if (user.fkAdministrador == null) return;

            let trElement = document.createElement('tr');
            trElement.innerHTML = `
            <td>${user.nomeUsuario}</td>
            <td>${user.cargo == null ? 'Indefinido': user.cargo}</td>
            <td>${user.emailUsuario}</td>
            `;
            trElement.style.cursor = 'pointer';
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
                return await updateAccount(
                    {
                        idUsuario: userId,
                        userName: document.getElementById('ipt-nome').value,
                        userEmail: document.getElementById('ipt-email').value,
                        userPassword: document.getElementById('ipt-senha').value,
                        userCargo: document.getElementById('ipt-cargo').value
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
                window.location.href = "./visualizar-contas.html";
            }
        });
    }
}

 
visualizarUsuario();