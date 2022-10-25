import os
import platform
import time
import hash
import computer_data as dados
import data_base as db

# Início do programa
# Verificar se é Linux

machine_information = {
    "fkMaquina": "",
    "fkEmpresa": "",
    "hash": ""
}
hash_computer = False
sistema_operacional = platform.system()

# Opção 1 - Obter Dados do Computador


def start_get_values():
    computer_info = dados.get_all_info()
    db.create_components(
        machine_information["fkMaquina"], machine_information["fkEmpresa"])
    db.insert_component_info(
        computer_info["cpu"], "cpu", machine_information["fkMaquina"], machine_information["fkEmpresa"])

    components = db.get_components(
        machine_information["fkMaquina"], machine_information["fkEmpresa"])
    exists = db.update_machine(
        machine_information["fkMaquina"], machine_information["fkEmpresa"], computer_info["system"]["system"])
    os.system("clear")

    for component in components:
        insert_metrica(computer_info, component, exists, 0, True)

    while True:
        computer_info = dados.get_all_info()

        components = db.get_components(
            machine_information["fkMaquina"], machine_information["fkEmpresa"])
        for component in components:
            insert_metrica(computer_info, component, True, 1, False)

        time.sleep(3)
        os.system("clear")


def insert_metrica(computer_info: dict, component: tuple, exists: bool, type=0, static=False):
    if (exists and component[2] == 1):
        component_name = component[1]
        db.insert_metrica(component_name, component[0],
                          component[4], component[-1], computer_info, type, static)

# Opção 2 - Atualizar Componentes do Computador


def update_components():
    computer_info = dados.get_all_info()
    db.insert_component_info(
        computer_info["cpu"], "cpu", machine_information["fkMaquina"], machine_information["fkEmpresa"])


def select_menu():
    while True:

        print("Bem vindo ao Pardalis!")
        print("Opções Dinponíveis:")
        # 1 - Padrão adicionado no Banco
        print("1 - Obter Dados do Computador")
        print("2 - Atualizar Componentes do Computador")
        # 1234567890 - Padrão adicionado no Banco
        print("3 - Obter Endereço / Hash do Computador")
        print("0 - Sair")

        hash_computer = hash.load_hash()

        if hash_computer:

            machine_information["fkMaquina"] = hash_computer[0][0]
            machine_information["fkEmpresa"] = hash_computer[0][len(
                hash_computer[0]) - 1]
            machine_information["hash"] = hash_computer[0][5]

        option = int(input("Digite a opção desejada: "))

        if option == 1:
            if (not hash_computer):
                break
            else:
                db.get_metricas()
                start_get_values()

        elif option == 2:
            if (not hash_computer):
                break
            else:
                update_components()

        elif option == 3:
            hash.get_mac_address()

        elif option == 0:
            print("Obrigado por utilizar o Pardalis!")
            break
        else:
            print("Opção inválida")


def main():
    if sistema_operacional == "Linux":
        select_menu()
    else:
        print("Sistema Operacional não suportado, utilize Linux!")
        exit()


main()
