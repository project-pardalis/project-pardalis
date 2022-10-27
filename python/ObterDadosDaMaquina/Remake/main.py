import os
import platform
import time
from tkinter import N
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
    if (db.get_computer_with_hash(computer_hash))["count"] == 1:
        computer_db = db.get_computer_hash(computer_hash)
        command()
    else:
        print("Adicione a máquina pelo nosso site!")
# ----------------------------------------------------------------------------------------------------------------------
def menu_select():
    while True:
        #clear_screen()
        print("==========================================")
        print("=              Mac Address:              =")
        print(f"=           {computer_hash}            =")
        print("=                                        =")
        print("= 1 - Obter informações do Computador    =")
        print("= 2 - Obter Estado dos Componentes       =")
        print("= 3 - Sair                               =")
        print("=                                        =")
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
#Opção 1
def get_computer_info():
        computer_info = ci.get_all_info()
        
        computer_components = db.get_componentes_computer(computer_hash)
        if len(computer_components) == 0:
            ask_for_active_components()
        else:
            print("Componentes já cadastrados")
        
        get_informations_to_db()

def get_informations_to_db():
    while True:
        computer_info = ci.get_all_info()
        computer_components = db.get_componentes_computer(computer_hash)
        
        for component in computer_components:
            metricas_component = db.get_metricas_connection(component["idComponente"], component["fkMaquina"], component["fkEmpresa"])
            for metrica in metricas_component:
                db.append_information(component["idComponente"], component["fkMaquina"], component["fkEmpresa"], metrica["idMetrica"], computer_info[component["nomeComponente"]])

#Opção 2
def change_components_state():
    components = db.get_componentes_computer("1234567890")#(computer_hash

    print("{:<8} {:<5} {:<30}".format("Nome do Componente", "Estado", "Descrição"))
    for component in components:
        print("{:<8} {:<5} {:<30}".format(component["nomeComponente"], component["isComponenteValido"], component["descricao"]))

# ----------------------------------------------------------------------------------------------------------------------
def ask_for_active_components():
    components = ["Cpu", "Disco", "Ram"]
    for component in components:
        print(f"Gostaria do componente {component} ativo? (S/N)")
        state_component = False
        while True:
            option = input("Resposta: ")
            if option.upper() == "S":
                state_component = True
                break
            elif option.upper() == "N":
                state_component = False
                break
            else:
                print("Opção inválida, tente novamente!")
        db.create_components(computer_db["idMaquina"], computer_db["fkEmpresa"], {component: state_component})


# ----------------------------------------------------------------------------------------------------------------------

menu_select()