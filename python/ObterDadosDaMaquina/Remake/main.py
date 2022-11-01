import os
import platform
import time
import getmac
import computer_info as ci
import data_base_connection as db

computer_hash = getmac.get_mac_address().upper()
computer_db = None


def clear_screen():
    if platform.system() == "Linux":
        os.system("clear")
    elif platform.system() == "Windows":
        os.system("cls")


def run_command_verifying_hash(command):
    if (db.get_computer_with_hash(computer_hash))["qtdServidores"] == 1:
        command()
    else:
        print("Adicione a máquina pelo nosso site!")
# ----------------------------------------------------------------------------------------------------------------------


def menu_select():
    while True:
        clear_screen()
        print("=========================================")
        print("|                PARDALIS                |")
        print("|========================================|")
        print("|              Mac Address:              |")
        print(f"|           {computer_hash}            |")
        print("|                                        |")
        print("| 1 - Obter informações do Computador    |")
        print("| 2 - Obter Estado dos Componentes       |")
        print("| 3 - Sair                               |")
        print("|                                        |")
        print("==========================================")
        option = input("Escolha uma opção: ")
        if option == "1":
            run_command_verifying_hash(get_computer_info)
        elif option == "2":
            run_command_verifying_hash(change_components_state)
        elif option == "3":
            clear_screen()
            print("Saindo...")
            exit()

# ----------------------------------------------------------------------------------------------------------------------

# Opção 1
def get_computer_info():

    computer_components = db.get_componentes_computer(computer_hash)
    if len(computer_components) == 0:
        ask_for_active_components()
    elif len(computer_components) == 1 or len(computer_components) == 2 :
        db.clear_components(computer_hash)
        ask_for_active_components()
    else:
        print("Componentes já cadastrados")

    computer_components = db.get_componentes_computer(computer_hash)
    update_static_metricas(computer_components)
    send_informations_to_db(computer_components)

def update_static_metricas(computer_components : list):
    clear_screen()
    computer_info = ci.get_all_info()

    for component in computer_components:
        metricas_component = db.get_metricas_connection(
            component["idComponente"], component["fkMaquina"], component["fkEmpresa"], 1)
        for metrica in metricas_component:
            leituras = db.get_leituras(component["idComponente"], component["fkMaquina"], component["fkEmpresa"], metrica["idMetrica"])
            
            if len(leituras) == 0:  
                db.append_information(component["idComponente"], component["fkMaquina"], component["fkEmpresa"], metrica["idMetrica"], computer_info[component["nomeComponente"]][metrica["nomeMetrica"]])
            else:
                db.update_static_metrica(computer_info[component["nomeComponente"]][metrica["nomeMetrica"]], component["idComponente"],
                                        component["fkMaquina"], component["fkEmpresa"], metrica["idMetrica"])
        print("Informações estáticas do computador adicionadas/atualizadas.")

def send_informations_to_db(computer_components : list):
    while True:
        clear_screen()
        try:
            computer_info = ci.get_all_info()

            for component in computer_components:
                if component["isComponenteValido"] == 1:
                    metricas_component = db.get_metricas_connection(
                        component["idComponente"], component["fkMaquina"], component["fkEmpresa"])
                    
                    for metrica in metricas_component:
                        db.append_information(component["idComponente"], component["fkMaquina"], component["fkEmpresa"], metrica["idMetrica"], computer_info[component["nomeComponente"]][metrica["nomeMetrica"]])
            print("Informações do Computador adicionadas.")
            time.sleep(1)
        except KeyboardInterrupt:
            print("Saindo...")
            break

# Opção 2
def change_components_state():
    components = db.get_componentes_computer(computer_hash)

    if len(components) == 0:
        print("Não há componentes cadastrados.")
        return
    
    print("{0:<25} {1:<10} {2}".format(
        "Nome do Componente", "Estado", "Descrição"))
    for component in components:
        if component["descricao"] == None:
            descricao = "Sem descrição"
        else:
            descricao = component["descricao"]

        if component["isComponenteValido"] == 1:
            estado = "Ativo"
        else:
            estado = "Inativo"

        print("{0:<25} {1:<10} {2}".format(
            component["nomeComponente"][0].upper() + component["nomeComponente"][1:], estado, descricao))

    res = input("Gostaria de mudar o estado de algum componente? (S/N): ")
    
    if res.upper() == "S":
        change_component_state(components)
        

    elif res.upper() == "N":
        print("Voltando ao menu...")
        time.sleep(1)
    else:
        print("Opção inválida!")

def change_component_state(components : list):
    state = None
    while True:
        res = input("Digite o nome do componente: ")
        for component in components:
            if component["nomeComponente"] == res.lower():
                if component["isComponenteValido"] == 1:
                    state = 0
                else:
                    state = 1
                break
        if state != None:
            db.change_component_state(res.lower(), computer_hash, state)
            break
        else:
            print("Componente não encontrado!")
            state 
            time.sleep(1)
    
# ----------------------------------------------------------------------------------------------------------------------


def ask_for_active_components():
    components = ["Cpu", "Disco", "Ram"]
    computer_db = db.get_computer_hash(computer_hash)
    computer_info = ci.get_all_info()
    for component in components:
        print(f"Gostaria do componente {component} ativo? (S/N)")
        state_component = 0
        while True:
            option = input("Resposta: ")
            if option.upper() == "S":
                state_component = 1
                break
            elif option.upper() == "N":
                state_component = 0
                break
            else:
                print("Opção inválida, tente novamente!")
        if component == "Cpu":
            db.create_components(computer_db["idMaquina"], computer_db["fkEmpresa"], {
                                component.lower(): state_component}, computer_info[component.lower()]["cpu_type"])
        else:
            db.create_components(computer_db["idMaquina"], computer_db["fkEmpresa"], {
                                component.lower(): state_component})


# ----------------------------------------------------------------------------------------------------------------------

menu_select()
